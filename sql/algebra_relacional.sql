-- Alterações no Banco de Dados para as views da Álgebra Relacional retonem pelo menos 1 resultado
UPDATE ingrediente
SET nome = 'Farinha'
WHERE id = 6;

UPDATE cardapio
SET especial = 'Natal'
WHERE id in (4, 5);

-- Consulta 1
CREATE VIEW restaurantes_com_gluten AS
SELECT DISTINCT 
    r.num_restaurante,
    c.nome
FROM 
    ingrediente i
INNER JOIN ingrediente_prato ip ON i.id = ip.id_ingrediente
INNER JOIN prato p ON ip.id_prato = p.id
INNER JOIN cardapio_prato cp ON p.id = cp.id_prato
INNER JOIN cardapio_restaurante cr ON cp.id_cardapio = cr.id_cardapio
INNER JOIN restaurante r ON cr.id_restaurante = r.id
INNER JOIN campus c ON r.id_campus = c.id
WHERE 
    i.restricao = 'Glúten';


-- Consulta 2
CREATE VIEW usuarios_comentaram_vegano AS
SELECT DISTINCT 
    u.username
FROM 
    usuario u
INNER JOIN comentario c ON u.id = c.id_usuario
INNER JOIN avaliacao a ON c.id_avaliacao = a.id
INNER JOIN prato p ON a.id_prato = p.id
WHERE 
    p.categoria = 'Vegano';


-- Consulta 3
CREATE VIEW pratos_avaliados_usuario_data AS
SELECT DISTINCT 
    p.nome
FROM 
    avaliacao a
INNER JOIN usuario u ON a.id_usuario = u.id
INNER JOIN prato p ON a.id_prato = p.id
WHERE 
    a.data_avaliacao = '2025-04-10'
    AND u.username = 'gabigol';


-- Consulta 4
CREATE VIEW restaurantes_com_avaliacao_recente AS
SELECT r.id, r.num_restaurante
FROM restaurante r
WHERE r.id IN (
    SELECT DISTINCT cr.id_restaurante
    FROM avaliacao a
    INNER JOIN prato p ON a.id_prato = p.id
    INNER JOIN cardapio_prato cp ON p.id = cp.id_prato
    INNER JOIN cardapio_restaurante cr ON cp.id_cardapio = cr.id_cardapio
    WHERE a.data_avaliacao >= CURRENT_DATE - INTERVAL '1 month'
);


-- Consulta 5
CREATE VIEW ingredientes_cafe_da_manha AS
SELECT DISTINCT i.nome
FROM avaliacao a
JOIN prato p ON a.id_prato = p.id
JOIN ingrediente_prato ip ON p.id = ip.id_prato
JOIN ingrediente i ON ip.id_ingrediente = i.id
WHERE (a.refeicao = 'Café da Manhã') AND (a.nota >= 4);


-- Visualizar Consultas
SELECT * FROM restaurantes_com_gluten;

SELECT * FROM usuarios_comentaram_vegano;

SELECT * FROM pratos_avaliados_usuario_data;

SELECT * FROM restaurantes_com_avaliacao_recente;

SELECT * FROM ingredientes_cafe_da_manha;

