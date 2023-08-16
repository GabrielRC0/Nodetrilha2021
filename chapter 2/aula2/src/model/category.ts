import { v4 as uuidV4 } from "uuid";

// o constructor é um método que é chamado toda vez que a classe é instanciada
// o método construtor é chamado toda vez que a classe é instanciada
// colocamos o ! para dizer que o id pode ser nulo, mas que não vai ser nulo quando a classe for instanciada (quando o objeto for criado) porque o método construtor vai ser chamado e vai gerar um id para o objeto.

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
