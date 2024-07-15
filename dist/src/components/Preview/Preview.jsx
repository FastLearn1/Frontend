import React, { useState, useEffect } from "react";
import axios from "axios";

const URLB = import.meta.env.VITE_BACKEND_URL;

const Preview = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  const categorias = ["Nivel 1", "Nivel 2", "Nivel 3"]; // Lista de categorías

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const enviarFormulario = async (formData) => {
    try {
      const token = localStorage.getItem('token'); // Asumiendo que el token se almacena en localStorage
  
      const response = await axios.post(`${URLB}/cursos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
        },
      });
  
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };


  
  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('linkCurso', event.target.linkCurso.value);
    formData.append('tagsCurso', event.target.tagsCurso.value);
    formData.append('imagen', event.target.imagen.files[0]);
    formData.append('video', event.target.video.files[0]);
  
    enviarFormulario(formData);
  };

  return (
    <section className="flex flex-wrap w-full">
      <div className="w-full sm:w-5/12 m-5 h-60 flex justify-center items-center border border-dashed border-gray-300">
      {videoFile ? (
          <video className="w-full h-full object-cover" controls>
            <source src={URL.createObjectURL(videoFile)}  type="video/mp4" />
            Tu navegador no soporta este formato de video.
          </video>
        ) : (
          <span className="text-gray-500">Sin video</span>
        )}
      </div>

      <div className="w-full sm:w-5/12 m-5">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Título
            </label>
            <input
              type="text"
              onChange={(e) => setTitulo(e.target.value)}
              className="border border-primary rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              name="titulo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descripción
            </label>
            <textarea
              type="text"
              onChange={(e) => setDescripcion(e.target.value)}
              className="border border-primary rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              name="descripcion"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tags
            </label>
            <input
              type="text"
              
              
              name="tagsCurso"
              className="border border-primary rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enlaces
            </label>
            <div className="flex flex-col md:flex-row">
              <input
                type="text"
                name="linkCurso"
                className="border border-primary rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mb-2 md:mb-0 md:mr-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Categoría
            </label>
            <select
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-primary rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              name="categoria"
            >
              <option value="" disabled>
                Seleccione una categoría
              </option>
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 space-x-5 flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Imagen de Previsualización
            </label>
            <div className="flex space-x-5">
              <input
                type="file"
                accept="image/*"
                name="imagen"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>
          </div>
          <div className="mb-4 space-x-5 flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subir video
            </label>
            <div className="flex space-x-5">
              <input
                type="file"
                accept="video/mp4*"
                onChange={handleVideoUpload}
                name="video"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>
          </div>
          <button className="btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Preview;