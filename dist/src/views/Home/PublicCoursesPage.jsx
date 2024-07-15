// src/views/Home/PublicCoursesPage.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  AlertInfo,
  Breadcrumbs,
  FilterBar,
  Loader,
  Courses,
} from "../../components/Layout";
import { Footer } from "../../components/";

const URL = import.meta.env.VITE_BACKEND_URL;

const PublicCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    tags: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${URL}/cursos-free/`);
        if (response.ok) {
          const responseData = await response.json();
          const coursesData = Array.isArray(responseData)
            ? responseData[0]
            : [];
          setCourses(coursesData);
          setFilteredCourses(coursesData);
          setLoading(false);
        } else {
          console.error("Error al obtener los cursos:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let updatedCourses = [...courses];
      if (filters.name) {
        updatedCourses = updatedCourses.filter((course) =>
          course.nombre_curso.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.category) {
        updatedCourses = updatedCourses.filter((course) =>
          course.categoria_curso
            ?.toLowerCase()
            .includes(filters.category.toLowerCase())
        );
      }
      if (filters.tags) {
        updatedCourses = updatedCourses.filter((course) =>
          course.tags_curso.toLowerCase().includes(filters.tags.toLowerCase())
        );
      }
      setFilteredCourses(updatedCourses);
    };

    applyFilters();
  }, [filters, courses]);

  const itemsBread = [
    { href: "/", label: "Inicio" },
    { href: "/all-courses", label: "Cursos" },
  ];

  const services = {
    title: "Información",
    links: [
      { text: "Explorar", href: "/explore" },
      { text: "Artículos", href: "/articles" },
      { text: "Soporte", href: "/support" },
      { text: "FAQS", href: "/faqs" },
      { text: "Reportar un problema", href: "/report" },
    ],
  };

  const company = {
    title: "Compañía",
    links: [
      { text: "Documentación", href: "/docs" },
      { text: "Manual de usuario", href: "/manual-user" },
      { text: "Manual técnico", href: "/manual-tech" },
    ],
  };

  const legal = {
    title: "Legal",
    links: [
      { text: "Términos y condiciones", href: "/terms" },
      { text: "Política de privacidad", href: "/policy" },
      { text: "Derechos de autor", href: "/rights-autor" },
    ],
  };

  const companyName = "FastLearn INC";
  const companyDescription = "Todos los derechos reservados";

  if (loading) {
    return <Loader />; // Mostrar indicador de carga mientras se cargan los datos
  }

  return (
    <>
      <Helmet>
        <title>Cursos Disponibles</title>
      </Helmet>
      <header className="flex flex-col justify-center m-8 space-y-4">
        <h1 className="text-3xl font-bold">Cursos Disponibles</h1>
        <FilterBar filters={filters} setFilters={setFilters} />
        <Breadcrumbs items={itemsBread} />
      </header>
      <main className="flex flex-col mx-5">
        <AlertInfo />
        <Courses courses={filteredCourses} />
      </main>
      <Footer
        services={services}
        company={company}
        legal={legal}
        companyName={companyName}
        companyDescription={companyDescription}
      />
    </>
  );
};

export default PublicCoursesPage;
