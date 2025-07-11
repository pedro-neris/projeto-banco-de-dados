CREATE VIEW media_prato AS
SELECT prato.id, prato.nome, prato.icone, count (DISTINCT avaliacao.id) AS qtd_avaliacoes, AVG (avaliacao.nota) AS media_avaliacoes,
    count(DISTINCT cardapio_prato.id_cardapio) AS qtd_cardapios
FROM prato
LEFT JOIN
avaliacao  ON
avaliacao.id_prato=prato.id
LEFT JOIN cardapio_prato ON 
cardapio_prato.id_prato = prato.id
GROUP BY prato.id, prato.nome, prato.icone
ORDER BY media_avaliacoes DESC NULLS LAST, qtd_avaliacoes DESC, qtd_cardapios DESC;