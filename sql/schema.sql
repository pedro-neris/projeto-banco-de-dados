CREATE TABLE Prato
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(90) UNIQUE NOT NULL,
    icone BYTEA,
    categoria VARCHAR (25)
);

CREATE TABLE Ingrediente
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(40) UNIQUE NOT NULL,
    restricao VARCHAR(50)
);

CREATE TABLE Usuario
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(70) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE Campus
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(25),
    endereco VARCHAR(200) UNIQUE NOT NULL
);


CREATE TABLE Restaurante
(
    id SERIAL PRIMARY KEY, 
    num_restaurante INT NOT NULL,
    status VARCHAR(100),
    capacidade INT,
    id_campus INT NOT NULL REFERENCES Campus(id) ON DELETE CASCADE,
    UNIQUE (num_restaurante, id_campus)
);



CREATE TABLE Setor
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    id_campus INT NOT NULL REFERENCES Campus(id) ON DELETE CASCADE,
    UNIQUE (nome, id_campus)
);


CREATE TABLE Feedback
(
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    texto VARCHAR(500) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    id_setor INT NOT NULL REFERENCES Setor(id) ON DELETE CASCADE,
    id_usuario INT NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE
);


CREATE TABLE Avaliacao
(
    id SERIAL PRIMARY KEY,
    data_avaliacao DATE NOT NULL,
    refeicao VARCHAR(50) NOT NULL,
    data_consumo DATE NOT NULL,
    nota INT NOT NULL,
    texto VARCHAR(500) NOT NULL,
    id_usuario INT NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
    id_prato INT NOT NULL REFERENCES Prato(id) ON DELETE CASCADE
);


CREATE TABLE Comentario
(
    id SERIAL PRIMARY KEY,
    texto VARCHAR(500) NOT NULL,
    data DATE NOT NULL,
    id_avaliacao INT NOT NULL REFERENCES Avaliacao(id) ON DELETE CASCADE,
    id_usuario INT NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE
);


CREATE TABLE Cardapio
(
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    especial VARCHAR(40)
);


CREATE TABLE Ingrediente_Prato
(
    id_ingrediente INT,
    id_prato INT,
    PRIMARY KEY (id_ingrediente, id_prato),
    FOREIGN KEY (id_ingrediente) REFERENCES Ingrediente(id) ON DELETE CASCADE,
    FOREIGN KEY (id_prato) REFERENCES Prato(id) ON DELETE CASCADE
);


CREATE TABLE Cardapio_Restaurante
(
    id_restaurante INT,
    id_cardapio INT,
    PRIMARY KEY (id_restaurante, id_cardapio),
    FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cardapio) REFERENCES Cardapio(id) ON DELETE CASCADE
);


CREATE TABLE Cardapio_Prato
(
    id_cardapio INT,
    id_prato INT,
    refeicao VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_cardapio, id_prato),
    FOREIGN KEY (id_cardapio) REFERENCES Cardapio(id) ON DELETE CASCADE,
    FOREIGN KEY (id_prato) REFERENCES Prato(id) ON DELETE CASCADE,
    UNIQUE (id_cardapio, id_prato, refeicao)
);