//é necessario instalar o @types/express -D para que o typescript entenda o express
//necessario tbm instalar o typescript
//importante para evitar que os arquivos sejam compilados em js e fiquem na pasta src mudar o tsconfig.json para "outDir": "./dist" para salvar os arquivos compilados em dist

import express from 'express';
import { CreateCourse } from './routes';

const app = express();

app.get("/", CreateCourse)

app.listen(3002);