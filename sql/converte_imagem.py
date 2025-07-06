import binascii

def imagem_para_hex(caminho_imagem):
  """Converte uma imagem em sua representação hexadecimal."""
  with open(caminho_imagem, 'rb') as f:
    conteudo_binario = f.read()
  return binascii.hexlify(conteudo_binario).decode('utf-8')

def gerar_sql(arquivo_entrada, arquivo_saida):
  """
  Lê um arquivo de entrada com caminhos de imagem e Nome_PK,
  e gera um arquivo de saída com comandos UPDATE em SQL.
  """
  try:
    with open(arquivo_entrada, 'r') as f_in, open(arquivo_saida, 'w') as f_out:
      print(f"Lendo de '{arquivo_entrada}' e escrevendo para '{arquivo_saida}'...")
      for linha in f_in:
        linha = linha.strip()
        if not linha:
          continue

        try:
          caminho_imagem, nome_pk = [item.strip().replace('"', '') for item in linha.split(',')]

          hex_imagem = imagem_para_hex(caminho_imagem)

          sql = f"UPDATE prato SET icone = DECODE('{hex_imagem}', 'hex') WHERE nome = '{nome_pk}';\n\n"
          
          f_out.write(sql)
        except FileNotFoundError:
          print(f"AVISO: Arquivo de imagem não encontrado: {caminho_imagem}. Pulando linha.")
        except ValueError:
          print(f"AVISO: Linha mal formatada no arquivo de entrada: '{linha}'. Pulando.")
          
    print("Arquivo SQL gerado com sucesso!")

  except FileNotFoundError:
    print(f"ERRO: Arquivo de entrada '{arquivo_entrada}' não encontrado.")
  except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")

if __name__ == "__main__":
  arquivo_entrada = 'entrada.txt'
  arquivo_saida = 'saida.sql'
  gerar_sql(arquivo_entrada, arquivo_saida)
