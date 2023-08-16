"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourse = void 0;
const CreateCourseRoutes_1 = __importDefault(require("./CreateCourseRoutes"));
function CreateCourse(request, response) {
    CreateCourseRoutes_1.default.execute("NodeJS", 10, "Dani");
    return response.send();
}
exports.CreateCourse = CreateCourse;
