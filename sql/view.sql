CREATE VIEW media_prato AS
SELECT prato.id, prato.nome, prato.icone, count (avaliacao.id) AS qtd_avaliacoes, AVG (avaliacao.nota) AS media_avaliacoes
FROM prato
LEFT JOIN
avaliacao  ON
avaliacao.id_prato=prato.id
GROUP BY prato.id, prato.nome, prato.icone
ORDER BY media_avaliacoes DESC;