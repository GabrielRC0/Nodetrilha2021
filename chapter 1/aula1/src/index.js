const express = require('express');

const app = express();
app.use(express.json());

app.get('/cursos', (request, response) => {
    return response.json(["CURSO 1", "CURSO 2", "CURSO 3"]);
});

app.post('/cursos', (request, response) => {
    return response.json(["CURSO 1", "CURSO 2", "CURSO 3", "CURSO 4"]);
});

app.put('/cursos/:id', (request, response) => {
    return response.json(["CURSO 6", "CURSO 2", "CURSO 3", "CURSO 4"]);
});

app.patch('/cursos/:id', (request, response) => {
    return response.json(["CURSO 6", "CURSO 7", "CURSO 3", "CURSO 4"]);
});

app.delete ('/cursos/:id', (request, response) => {
    return response.json(["CURSO 1", "CURSO 2", "CURSO 3"]);
});


app.listen(3333, () => {
  console.log('Server is running on port 3333');
});