"use strict";
//é necessario instalar o @types/express -D para que o typescript entenda o express
//necessario tbm instalar o typescript
//importante para evitar que os arquivos sejam compilados em js e fiquem na pasta src mudar o tsconfig.json para "outDir": "./dist" para salvar os arquivos compilados em dist
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.get("/", routes_1.CreateCourse);
app.listen(3002);
