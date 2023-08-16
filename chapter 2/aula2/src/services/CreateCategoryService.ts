import { CategoryRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryService };

/*
[] - Definir o tipo de retorno
[x] - Alterar o retorno de erro
[] - Acessar o repositório dentro do service
*/
