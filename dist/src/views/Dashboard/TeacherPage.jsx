import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
import { Sidebar, Footer } from "../../components/";
import { Loader } from "../../components/Layout";

import { getSidebarLinks } from "../../utils"

const URL = import.meta.env.VITE_BACKEND_URL;

const TeacherPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  const sidebarLinks = getSidebarLinks(token);

  useEffect(() => {
    const fetchUserData = async (id_usuario) => {
      try {
        console.log(`Fetching data for user ID: ${id_usuario}`);
        const response = await fetch(
          `${URL}/usuario/${id_usuario}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userArray = await response.json();
          console.log("User data received:", userArray);
          if (userArray.length > 0) {
            setUserData(userArray[0]);
          } else {
            console.error("No se encontraron datos del usuario.");
          }
        } else {
          console.error(
            "Error al obtener los datos del usuario:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    };

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        const userId = decodedToken.id_usuario;

        if (decodedToken.rol !== "teacher") {
          console.error("Rol no autorizado:", decodedToken.rol);
          navigate("/login");
        } else {
          fetchUserData(userId);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        navigate("/login");
      }
    } else {
      console.error("Token no encontrado en localStorage.");
      navigate("/login");
    }
  }, [navigate, token]);


  const services = {
    title: "Información",
    links: [
      { text: "Explorar", href: "/explore" },
      { text: "Articulos", href: "/articles" },
      { text: "Cursos", href: "/courses" },
      { text: "Soporte", href: "/support" },
      { text: "FAQS", href: "/faqs" },
      { text: "Reportar un problema", href: "/report" },
    ],
  };

  const company = {
    title: "Compañia",
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

  if (!userData) {
    return(
      <Loader />
    ); // Mostrar indicador de carga mientras se cargan los datos
  }

  return (
    <>
      <Helmet>
        <title>Dashboard | {userData.nombre} </title>
      </Helmet>
      <div className="flex h-screen">
        <Sidebar links={sidebarLinks} />
        <div className="flex flex-col w-full">
          <main className="p-4">
            <h1 className="text-xl font-bold">Bienvenido, Docente {userData.nombre}</h1>
            <p className="mt-2">Bienvenido al panel de control.</p>
          </main>
          <Footer
            services={services}
            company={company}
            legal={legal}
            companyName={companyName}
            companyDescription={companyDescription}
          />
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
