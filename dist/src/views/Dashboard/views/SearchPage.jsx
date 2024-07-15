import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sidebar, Footer } from '../../../components/';
import { Loader } from "../../../components/Layout";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRightFromBracket, faSearch} from '@fortawesome/free-solid-svg-icons'

import { getSidebarLinks } from '../../../utils'

const URLB = import.meta.env.VITE_BACKEND_URL

const SearchPage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const [userDataFiltered, setUserDataFiltered] = useState([])
  const [cursoData, setCursoData] = useState([])
  const [cursoDataFiltered, setCursoDataFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const token = localStorage.getItem('token')

  const sidebarLinks = getSidebarLinks(token)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token no encontrado en localStorage')
        }

        const response = await fetch(`${URLB}/usuario/`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          throw new Error(
            `Error al obtener los datos del usuario: ${response.statusText}`
          )
        }

        const responseData = await response.json()
        if (Array.isArray(responseData) && responseData.length > 0) {
          setUserData(responseData[0])
          setUserDataFiltered(responseData[0])
        } else {
          console.error('No se encontraron datos de usuario.')
        }

        setLoading(false)
      } catch (error) {
        console.error('Error en la conexión:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    const fetchCursoData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token no encontrado en localStorage')
        }

        const response = await fetch(`${URLB}/cursos/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(
            `Error al obtener los datos de cursos: ${response.statusText}`
          )
        }

        const responseData = await response.json()
        if (Array.isArray(responseData) && responseData.length > 0) {
          setCursoData(responseData[0])
          setCursoDataFiltered(responseData[0])
        } else {
          console.error('No se encontraron datos de cursos.')
        }

        setLoading(false)
      } catch (error) {
        console.error('Error en la conexión:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchUserData()
    fetchCursoData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    // Filtrar userData según el searchTerm
    const filteredUserData = userData.filter(user => {
      return (
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    const filteredCursoData = cursoData.filter(curso => {
      return (
        curso.nombre_curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.desc_curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.tags_curso.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    setUserDataFiltered(filteredUserData)
    setCursoDataFiltered(filteredCursoData)
  }
  const services = {
    title: 'Información',
    links: [
      { text: 'Explorar', href: '/explore' },
      { text: 'Articulos', href: '/articles' },
      { text: 'Cursos', href: '/courses' },
      { text: 'Soporte', href: '/support' },
      { text: 'FAQS', href: '/faqs' },
      { text: 'Reportar un problema', href: '/report' },
    ],
  }

  const company = {
    title: 'Compañia',
    links: [
      { text: 'Documentación', href: '/docs' },
      { text: 'Manual de usuario', href: '/manual-user' },
      { text: 'Manual técnico', href: '/manual-tech' },
    ],
  }

  const legal = {
    title: 'Legal',
    links: [
      { text: 'Términos y condiciones', href: '/terms' },
      { text: 'Política de privacidad', href: '/policy' },
      { text: 'Derechos de autor', href: '/rights-autor' },
    ],
  }

  const companyName = 'FastLearn INC'
  const companyDescription = 'Todos los derechos reservados'

  if (!userData || !cursoData) {
    return(
      <Loader />
    ); // Mostrar indicador de carga mientras se cargan los datos
  }

  return (
    <>
      <Helmet>
        <title>Buscar | FastLearn</title>
      </Helmet>

      <div className="flex h-screen">
        <Sidebar links={sidebarLinks} />
        <div className="flex flex-col w-full">
          <main className="p-4">

            <h1 className="text-xl font-bold">Buscar contenido</h1>
            <form onSubmit={handleSubmit} className="flex mx-10 space-x-5">
              <input
                type="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-slate-100 w-full p-4 rounded-xl outline-primary"
                placeholder="Buscar contenido"
              />
              <button
                type="submit"
                className="bg-primary text-white p-4 rounded-xl"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
              {loading ? (
                <p className="text-center">Cargando...</p>
              ) : Array.isArray(userDataFiltered) &&
                userDataFiltered.length > 0 ? (
                userDataFiltered.map((user, index) => (
                  <div
                    key={index}
                    className="bg-white flex flex-col justify-start items-start w-48 p-5 shadow-md text-sm rounded-lg"
                  >
                    <div className="w-full h-40 overflow-hidden rounded-t-lg">
                      <img
                        src={user.foto_perfil}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-semibold mt-4">
                      {user.nombre}
                    </h2>
                    <a
                      href={`mailto:${user.correo}`}
                      className="text-gray-600 break-words w-full text-primary"
                    >
                      {user.correo}
                    </a>
                    <p className="text-gray-600">{user.rol}</p>
                    <p className="text-gray-600 text-primary">
                      {user.telefono}
                    </p>
                  </div>
                ))
              ) : (
                <p>No se encontraron datos de usuarios</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {loading ? (
                <p className="text-center">Cargando...</p>
              ) : Array.isArray(cursoDataFiltered) &&
                cursoDataFiltered.length > 0 ? (
                cursoDataFiltered.map((curso, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-sm shadow-md"
                  >
                    <div className="flex justify-center">
                      <img
                        src={curso.imagen}
                        alt=""
                        className="object-cover w-full h-52 rounded-sm"
                      />
                    </div>
                    <h2 className="text-md font-semibold mt-4">
                      {curso.titulo}
                    </h2>
                    <p className="text-gray-600">
                      <b>Descripción: </b>
                      {curso.descripcion}
                    </p>
                    <a
                      href={curso.links}
                      className="text-blue-500 hover:underline"
                    >
                      {curso.links}
                    </a>
                    <p className="text-gray-600">{curso.tags}</p>
                  </div>
                ))
              ) : (
                <p>No se encontraron datos de cursos</p>
              )}
            </div>
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
  )
}

export default SearchPage
