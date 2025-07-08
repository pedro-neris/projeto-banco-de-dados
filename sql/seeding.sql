INSERT INTO Usuario (email, username, nome, senha) VALUES
('pedro@gmail.com', 'pedro.2532', 'Pedro', '412'),
('lucas.g@unb.br', 'lucas_flu', 'Lucas', '421125'),
('haly_cya@hotmail.com', 'haly', 'Halycia', '=421'),
('gabriel@hotmail.com', 'gabigol', 'Gabriel', 'senha101'),
('arthur_007@gmail.com', 'thurzin', 'Arthur', '007');

INSERT INTO Campus (nome, email, telefone, endereco) VALUES
('Darcy Ribeiro', 'saaapoioadm@unb.br', '(61) 3301-0101', 'Asa Norte, Brasília - DF'),
('Ceilândia', 'fcesecadm@unb.br', '(61) 3302-0202', 'Ceilândia, Brasília - DF'),
('Gama', 'unbgama@unb.br', '(61) 3303-0303', 'Gama, Brasília - DF'),
('Planaltina', 'direcaofup@unb.br', '(61) 3304-0404', 'Planaltina, Brasília - DF'),
('Fazenda', 'falunb@unb.br', '(61) 3305-0505', 'Park Way, Brasília - DF');

INSERT INTO Restaurante (num_restaurante, status, capacidade, id_campus) VALUES
(1, 'Aberto', 200, 1),
(2, 'Aberto', 200, 1),
(3, 'Aberto', 300, 1),
(4, 'Aberto', 300, 1),
(5, 'Aberto', 250, 1),
(6, 'Aberto', 250, 1),
(1, 'Aberto', 200, 2),
(1, 'Aberto', 250, 3),
(1, 'Aberto', 150, 4),
(1, 'Aberto', 100, 5);

INSERT INTO Setor (nome, id_campus) VALUES
('Cozinha', 1),
('Atendimento', 1),
('Limpeza', 1),
('Segurança', 1),
('Administração', 1),
('Cozinha',  2),
('Atendimento', 2),
('Limpeza', 2),
('Segurança', 2),
('Administração', 2),
('Cozinha',  3),
('Atendimento', 3),
('Limpeza',  3),
('Segurança', 3),
('Administração', 3),
('Cozinha', 4),
('Atendimento', 4),
('Limpeza', 4),
('Segurança', 4),
('Administração',  4),
('Cozinha', 5),
('Atendimento', 5),
('Limpeza',  5),
('Segurança', 5),
('Administração', 5);

INSERT INTO Ingrediente (nome, restricao) VALUES
('Arroz branco', null),
('Feijão carioca', null),
('Carne suína', null),
('Ovo', null),
('Couve', null),
('Pão integral', 'Glúten'),
('Alface', null),
('Tomate', null),
('Queijo branco', 'Lactose'),
('Frango', null),
('Creme de leite', 'Lactose'),
('Carne bovina', null),
('Beringela', null),
('Trigo', 'Glutén');



INSERT INTO Prato (nome, categoria) VALUES
('Feijoada', null),
('Frango grelhado', null),
('Arroz com ovo', 'Ovolactovegetariano'),
('Salada', 'Vegano'),
('Pão integral com queijo', 'Ovolactovegetariano'),
('Lasanha vegetariana', 'Vegetariano'),
('Strogonoff de frango', null),
('Lagarto bovino', null),
('Pão de queijo', null);

INSERT INTO Ingrediente_Prato (id_ingrediente, id_prato) VALUES
(2, 1),
(3, 1),
(1, 3),
(4, 3),
(7, 4),
(8, 4),
(6, 5),
(10,2),
(11,8),
(9, 5),
(9,9),
(14,9),
(10,7),
(11, 7),
(13,6);

INSERT INTO Cardapio (data, especial) VALUES
('2025-01-16', 'Culinária brasileira'),
('2025-02-13', null),
('2025-02-14', null),
('2025-02-25', null), 
('2025-02-27', null);

INSERT INTO Cardapio_Restaurante (id_restaurante, id_cardapio) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 5);

INSERT INTO Cardapio_Prato (id_cardapio, id_prato, refeicao) VALUES
(1, 5, 'Café da manhã'),
(1, 1, 'Almoço'),
(1, 3, 'Janta'),
(2, 5, 'Café da manhã'),
(2, 2, 'Almoço'),
(2, 3, 'Janta'),
(3, 9, 'Café da manhã'),
(3, 7, 'Almoço'),
(3, 8, 'Janta'),
(4, 9, 'Café da manhã'),
(4, 6, 'Almoço'),
(4, 2, 'Janta'),
(5, 5, 'Café da manhã'),
(5,1, 'Almoço'),
(5, 8, 'Almoço'),
(5, 3, 'Janta');

INSERT INTO Feedback (data, texto, tipo, id_setor, id_usuario) VALUES
('2024-11-02', 'Atendimento muito rápido' ,'Elogio', 1, 1),
('2025-02-10', 'comida estava fria', 'Reclamação', 2, 2),
('2025-03-15', 'achei muito limpo', 'Elogio', 3, 2),
('2025-04-05', 'Falta variedade no cardápio', 'Sugestão', 1, 4),
('2025-05-01', 'segurança muito atento', 'Elogio', 4, 5);

INSERT INTO Avaliacao (data_avaliacao, refeicao, data_consumo, nota, texto, id_usuario, id_prato) VALUES
('2025-01-05', 'Almoço', '2025-01-05', 5, 'Feijoada maravilhosa para começar o ano!', 1, 1),
('2025-02-12', 'Janta', '2025-02-12', 3, 'Macarrão um pouco sem sal', 2, 6),
('2025-03-20', 'Almoço', '2025-03-20', 2, 'frango tava muito seco', 3, 2),
('2025-04-10', 'Café da Manhã', '2025-04-10', 5, 'gostei muito', 4, 5),
('2025-04-02', 'Almoço', '2025-05-02', 4, 'strogonoff sempre é muito bom', 5, 8);

INSERT INTO Comentario (texto, data, id_avaliacao, id_usuario) VALUES
('concordo plenamente!', '2025-01-05', 1, 2),
('eu achei o macarrão ótimo', '2025-02-12', 2, 3),
('podiam fazer mais vezes', '2025-04-03', 5, 4),
('discordo, o frango estava perfeito', '2025-05-02', 3, 1),
('Sério??', '2025-05-02', 2, 5);
