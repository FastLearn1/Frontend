import { Helmet } from "react-helmet-async";
import { Breadcrumbs } from "../../components/Layout";

const PublicArticlesPage = () => {
  const itemsBread = [
    { href: "/", label: "Inicio" },
    { href: "/all-articles", label: "Articulos" },
  ];
  return (
    <>
      <Helmet>
        <title>Todos los articulos</title>
      </Helmet>
      <header className="flex flex-col justify-center m-8 space-y-4">
        <h1 className="text-3xl font-bold">Articulos Disponibles</h1>
        <Breadcrumbs items={itemsBread} />
      </header>
    </>
  );
};

export default PublicArticlesPage;
