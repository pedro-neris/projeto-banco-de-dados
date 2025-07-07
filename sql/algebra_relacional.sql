-- Consulta 1
CREATE VIEW RestaurantesSemGluten AS
SELECT DISTINCT 
    r.num_restaurante,
    c.nome_campus
FROM 
    ingrediente i
INNER JOIN ingrediente_prato ip ON i.id_ingrediente = ip.id_ingrediente
INNER JOIN prato p ON ip.id_prato = p.id_prato
INNER JOIN cardapio_prato cp ON p.id_prato = cp.id_prato
INNER JOIN cardapio_restaurante cr ON cp.id_cardapio = cr.id_cardapio
INNER JOIN restaurante r ON cr.id_restaurante = r.id_restaurante
INNER JOIN campus c ON r.id_campus = c.id_campus
WHERE 
    i.restricao = 'sem glúten';


-- Consulta 2
CREATE VIEW UsuariosComentaramSobremesa AS
SELECT DISTINCT 
    u.username
FROM 
    usuario u
INNER JOIN comentario c ON u.id_usuario = c.id_usuario
INNER JOIN avaliacao a ON c.id_avaliacao = a.id_avaliacao
INNER JOIN prato p ON a.id_prato = p.id_prato
WHERE 
    p.categoria = 'sobremesa';


-- Consulta 3
CREATE VIEW PratosAvaliadosUsuarioData AS
SELECT DISTINCT 
    p.nome_prato
FROM 
    avaliacao a
INNER JOIN usuario u ON a.id_usuario = u.id_usuario
INNER JOIN prato p ON a.id_prato = p.id_prato
WHERE 
    a.data_avaliacao = '2023-10-01'
    AND u.username = 'usuario1';


-- Consulta 4
CREATE VIEW RestaurantesSemAvaliacaoRecente AS
SELECT num_restaurante
FROM restaurante

EXCEPT

SELECT 
    r.num_restaurante
FROM 
    restaurante r
INNER JOIN cardapio_restaurante cr ON r.id_restaurante = cr.id_restaurante
INNER JOIN cardapio_prato cp ON cr.id_cardapio = cp.id_cardapio
INNER JOIN avaliacao a ON cp.id_prato = a.id_prato;


-- Consulta 5
CREATE VIEW IngredientesCafeDaManha AS
SELECT DISTINCT 
    I.nome
FROM 
    Ingrediente I
JOIN Ingrediente_Prato IP ON I.id = IP.idIngrediente
JOIN Prato P ON IP.idPrato = P.id
JOIN Avaliacao A ON P.id = A.idPrato
WHERE
    A.refeicao = 'café da manhã';
