import { Category } from "../model/category";

// DTO => Data transfer object => Objeto para transferência de dados, é um objeto que serve para transferir dados de um arquivo para outro.
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  // a função list() retorna um array de categorias, o motivo de não ter nada no () é porque não temos nenhum parâmetro para passar para a função, dessa forma, ela não recebe nada e retorna um array de categorias.
  list(): Category[] {
    return this.categories;
  }

  // a função findByName() retorna uma categoria,
  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoryRepository };
