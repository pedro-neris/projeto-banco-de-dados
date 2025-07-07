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
    usuario_existe INTEGER;
    prato_existe INTEGER;
    avaliacao_existe INTEGER;
BEGIN
    SELECT COUNT(*) INTO usuario_existe
    FROM Usuario
    WHERE id = new_aval_id_usuario;

    IF usuario_existe = 0 THEN
        RAISE EXCEPTION 'Usuário não existe.';
    END IF;


    SELECT COUNT(*) INTO prato_existe
    FROM Prato
    WHERE id = new_aval_id_prato;

    IF prato_existe = 0 THEN
        RAISE EXCEPTION 'Prato não existe.';
    END IF;

    
    IF new_aval_data_consumo > CURRENT_DATE THEN
        RAISE EXCEPTION 'A data de consumo não pode ser futura.';
    END IF;

    IF new_aval_data_avaliacao > CURRENT_DATE THEN
        RAISE EXCEPTION 'A data da avaliação não pode ser futura.';
    END IF;


    IF new_aval_tipo_refeicao NOT IN ('Almoço', 'Café da manhã', 'Janta') THEN
        RAISE EXCEPTION 'Tipo de refeição inválido. Deve ser Almoço, Café da manhã ou Janta.';
    END IF;


    IF new_aval_nota_avaliacao < 0 OR new_aval_nota_avaliacao > 5 THEN
        RAISE EXCEPTION 'Nota inválida. Deve estar entre 0 e 5.';
    END IF;


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
$$;