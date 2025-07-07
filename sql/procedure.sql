CREATE PROCEDURE inserir_avaliacao(
    IN new_aval_id_usuario INTEGER,
    IN new_aval_id_prato INTEGER,
    IN new_aval_data_consumo DATE,
    IN new_aval_data_avaliacao DATE,
    IN new_aval_tipo_refeicao VARCHAR(50),
    IN new_aval_texto_avaliacao TEXT,
    IN new_aval_nota_avaliacao INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    avaliacao_existe INTEGER;
BEGIN
    SELECT COUNT(*) INTO avaliacao_existe
    FROM Avaliacao
    WHERE id_usuario = new_aval_id_usuario
      AND id_prato = new_aval_id_prato
      AND data_consumo = new_aval_data_consumo
      AND refeicao = new_aval_tipo_refeicao;

    IF avaliacao_existe = 0 THEN
        INSERT INTO Avaliacao (
            id_usuario, 
            id_prato, 
            data_consumo, 
            data_avaliacao, 
            refeicao, 
            texto, 
            nota
        )
        VALUES (
            new_aval_id_usuario, 
            new_aval_id_prato, 
            new_aval_data_consumo, 
            new_aval_data_avaliacao, 
            new_aval_tipo_refeicao, 
            new_aval_texto_avaliacao, 
            new_aval_nota_avaliacao
        );
        RAISE NOTICE 'Avaliação inserida com sucesso.';
    ELSE
        RAISE NOTICE 'Este prato já foi avaliado para esta refeição nesta data.';
    END IF;
END;