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

const pagination = (model) => {
	return (request, response, next) => {

		let page = Number(request.query.page);
		let limit = Number(request.query.limit);

		if(!page && !limit) {

			response.json(alumnos)

		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const result = {}

		if (endIndex < model.length) {

			result.next = {
				page: page + 1,
				limit: limit
			}

		}
		
		if (startIndex > 0) {

			result.previous = {
				page: page - 1,
				limit: limit
			}
		
		}

		result.result = model.slice(startIndex, endIndex);

		response.pagination = result;

		next();

	}
	
}

app.get('/api/alumnos', pagination(alumnos) ,(request, response) => {
	response.json(response.pagination)
});

app.get("/api/alumnos/:id", (request, response) => {

  const id = Number(request.params.id);

  const alumno = alumnos.find(alumno => alumno.id === id);

  if (alumno) response.json(alumno);
  else response.send(404);
});

app.use((request, response) => {
	response.status(404).json({
		error: "Not Found"
	});
});


const port = 3001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});