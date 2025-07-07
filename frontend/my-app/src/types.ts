export interface User {
    id: number,
    email: string,
    username: string,
    nome: string,
    senha: string,
}

export interface Campus {
    id: number,
    nome: string,
    email: string,
    endereco: string,
    telefone: string | null;
}

export interface Setor {
    id: number,
    nome: string;
    telefone: string | null;
    id_campus: number;
}

export interface Feedback {
    id: number,
    data: Date | string,
    texto: string,
    tipo: string,
    id_setor: number,
    id_usuario: number;
}

export interface Avaliacao {
    id: number;
    nota: number;
    refeicao: string;
    texto: string;
    data_avaliacao: Date | string;
    data_consumo: Date | string;
    id_usuario: number;
    id_prato: number;
}

export interface Prato {
    id: number,
    nome: string,
    categoria: string | null,
    icone?: string | null;
}

export interface Comentario {
    id: number;
    texto: string;
    data: Date | string;
    id_avaliacao: number;
    id_usuario: number;
}

export interface infoPrato {
    id: number,
    nome: string,
    qtd_avaliacoes: number,
    media_avaliacoes: number,
    icone?: string | null;
}
