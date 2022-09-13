import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './Components/Button'
import getData from './services/alumnos'

const baseUrl = "http://localhost:3001/api/alumnos/";

function App() {

  const [alumnos, setAlumnos] = useState([]);
  const [alumno, setAlumno] = useState()

  useEffect(() => {

    const fetchData = async () => {

      const data = await getData(baseUrl)

      setAlumnos(data);
      
    }

    fetchData();

  }, [])

  const generateAlumno = () => alumnos[Math.floor(Math.random() * alumnos.length)];
  
  if(!alumnos) return null;

  const onClickHandler = () => {

    setAlumno(generateAlumno())

    if (alumno) {

      const { id } = alumno;

      alumnos.splice(id - 1, 1)

      setAlumnos(alumnos)

    }
  }

  return (
    <div>

      <Button text={"Alumnos"} onClick={onClickHandler}></Button>

      {alumno && <h1>{alumno.nombre} {alumno.apellido}</h1>}
      
    </div>
  )
}

export default App;