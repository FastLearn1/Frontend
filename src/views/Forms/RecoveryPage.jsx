import { Helmet } from "react-helmet-async";
import { SectionForm } from "../../components/";

const RecoveryPage = () => {
  const formFields = [
    { type: "text", placeholder: "Nombre", id: "nombre" },
    { type: "email", placeholder: "Correo electrónico", id: "email" },
  ];

  return (
    <>
      <Helmet>
        <title>Recupera tu cuenta | FastLearn</title>
      </Helmet>

      <main
        className="h-screen bg-center bg-cover flex justify-center items-center"
        style={{ backgroundImage: "url(/img/forms/img3.webp)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <SectionForm
          title="Comienza tu viaje de aventuras"
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit consectetur labore tempora, voluptatum cupiditate quis aspernatur sequi perferendis voluptatibus! Voluptas placeat illum eum tempore cupiditate, facilis nemo doloremque optio temporibus."
          formFields={formFields}
          linkText="Crear una nueva cuenta"
          linkHref="/signup"
        />
      </main>
    </>
  );
};

export default RecoveryPage;
