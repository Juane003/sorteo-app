import { alumnos } from "./data/alumnos.js";
import express from 'express';

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use((request, response, next) => {
	console.log(request.method);
	console.log(request.path);
	console.log(request.body);
	console.log("------------");
	next();
});

app.get('/api/alumnos', (request, response) => {
  response.json(alumnos)
});

app.get("/api/alumnos/:id", (request, response) => {
  const id = Number(request.params.id);

  const alumno = alumnos.find(alumno => alumno.id === id);

  if (alumno) response.json(alumno);
  else response.send(404)
})

// app.delete("/api/alumnos/:id", (request, response) => {
//   const id = Number(request.params.id);

//   alumnos = alumnos.filter(alumno => alumno.id !== id);

//   response.status(204).end();
// })

// app.post('/api/alumnos', (request, response) => {
//   const alumno = request.body;

//   const ids = alumnos.map(alumno => alumno.id);

//   const maxId = Math.max(...ids)

// 	const newAlumno = {
// 		apellido: alumno.apellido,
// 		nombre: alumno.nombre,
//     id: maxId + 1,
//   }

//   alumnos = [...alumnos, newAlumno]

// 	console.log(alumnos)

//   response.json(alumno)
// })

app.use((request, response) => {
	response.status(404).json({
		error: "Not Found"
	});
});


const port = 3001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});