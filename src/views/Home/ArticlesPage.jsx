import { Helmet } from "react-helmet-async";
import { Header, Footer } from "../../components/";

const ArticlesPage = () => {
  const headerImages = [
    "/img/header/SectionArticle1.webp",
    "/img/header/SectionArticle2.webp",
  ];

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/explore", label: "Explorar" },
    { href: "/signup", label: "Crear cuenta" },
    { href: "/support", label: "Soporte" },
  ];

  const headerProps = {
    titleHero: "Bienvenido a la sección de articulos",
    textHero: "Estos son los articulos más importantes de la semana",
    btn1Hero: {
      label: "Ver articulos",
      href: "#",
    },
    btn2Hero: {
      label: "Mostrar todos",
      href: "/all-articles",
    },
  };

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
      { text: "Manual de usuario", href: "/manual-usewr" },
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
  return (
    <>
      <Helmet>
        <title>Articulos de FastLearn</title>
      </Helmet>
      <Header
        images={headerImages}
        interval={5000}
        heroProps={headerProps}
        menuItems={navItems}
      />
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

export default ArticlesPage;
