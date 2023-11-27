export interface UserData {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    dataNascimento: string; 
    senha: string;
    resposta: {
      id: number;
      armazenamentoDados: boolean;
      pagamentoDados: boolean;
      propagandas: boolean;
      envioEmail: boolean;
      envioSms: boolean;
    }[];
  }
  