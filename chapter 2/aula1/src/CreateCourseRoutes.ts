
/*
name - string
duration - number
educator - string
*/


//adicionar ? na frente do atributo para tornar ele opcional
interface Course {
    name: string;
    duration?: number;
    educator: string;
}


//podemos definir um valor padrão para o atributo, caso ele não seja passado pelo usuário

class CreateCourseService {
    execute({duration = 8, educator, name}: Course) {
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService();