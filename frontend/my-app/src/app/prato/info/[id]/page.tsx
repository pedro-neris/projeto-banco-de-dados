'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import HeaderLogado from '@/components/headers/logado';
import HeaderDeslogado from '@/components/headers/deslogado';
import { Prato, Setor, User, Avaliacao, infoPrato } from '@/types';

export default function PratoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [prato, setPrato] = useState<infoPrato | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados do modal de avaliação
  const [pratos, setPratos] = useState<Prato[]>([]);
  const [isModalAvaliacaoOpen, setIsModalAvaliacaoOpen] = useState(false);
  const [textoAvaliacao, setTextoAvaliacao] = useState("");
  const [notaAvaliacao, setNotaAvaliacao] = useState(-1);
  const [refeicaoAvaliacao, setRefeicaoAvaliacao] = useState("");
  const [dataConsumoAvaliacao, setdataConsumoAvaliacao] = useState<Date | null>(null);
  const [pratoAvaliacao, setPratoAvaliacao] = useState<Prato | null>(null);

  // Autenticação e carregamento inicial
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      const decoded: { sub: number } = jwtDecode(token);
      const idUser = decoded.sub;
      axios.get(`http://localhost:3000/user/${idUser}`).then(res => setUserInfo(res.data));
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:3000/prato/info/${id}`)
      .then(res => setPrato(res.data))
      .catch(() => toast.error("Erro ao buscar prato."))
      .finally(() => setLoading(false));

    axios.get(`http://localhost:3000/prato`).then(res => setPratos(res.data));
  }, [id]);



  const resetAvaliacaoModalFields = () => {
    setTextoAvaliacao("");
    setNotaAvaliacao(-1);
    setRefeicaoAvaliacao("");
    setdataConsumoAvaliacao(null);
    setPratoAvaliacao(null);
  }

  const creatingAvaliacao = async (avaliacao: Partial<Avaliacao>) => {
    try {
      await axios.post("http://localhost:3000/avaliacao", avaliacao);
      toast.success("Avaliação criada com sucesso!", { autoClose: 2000 });
      resetAvaliacaoModalFields();
      setTimeout(() => {
        toggleModalAvaliacao();
      }, 500);
    } catch {
      toast.error("Erro ao criar avaliação. Por favor, tente novamente.");
    }
  };

  const toggleModalAvaliacao = () => {
    setIsModalAvaliacaoOpen(!isModalAvaliacaoOpen);
  };

  const modalAvaliacao = () => (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="h-auto text-black w-[60%] max-w-lg flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center p-6">
        <h2 className="text-white text-xl font-bold mb-4">Nova Avaliação</h2>

        <select
          value={pratoAvaliacao?.nome || "-1"}
          className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
          onChange={(event) => {
            const selectedNome = event.target.value;
            const selectedPrato = pratos.find((prato) => prato.nome === selectedNome) || null;
            setPratoAvaliacao(selectedPrato);
          }}
        >
          <option value="-1" disabled>Selecione o prato</option>
          {pratos.map((prato) => (
            <option key={prato.id} value={prato.nome}>
              {prato.nome}
            </option>
          ))}
        </select>

        <select
          value={notaAvaliacao}
          className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
          onChange={(event) => setNotaAvaliacao(Number(event.target.value))}
        >
          <option value={-1} disabled>Selecione a nota</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select
          value={refeicaoAvaliacao}
          className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
          onChange={(event) => setRefeicaoAvaliacao(event.target.value)}
        >
          <option value="" disabled>Selecione a refeição</option>
          <option value="Café da Manhã">Café da Manhã</option>
          <option value="Almoço">Almoço</option>
          <option value="Jantar">Jantar</option>
        </select>
        <input
          type="date"
          value={dataConsumoAvaliacao?.toISOString().split('T')[0] || ''}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setdataConsumoAvaliacao(new Date(e.target.value))}
          className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
        />

        <div className="flex flex-col h-[12rem] w-[90%] bg-[#A4FED3] mt-[2rem] rounded-md">
          <textarea
            value={textoAvaliacao}
            maxLength={500}
            placeholder="Texto da avaliação"
            onChange={(event) => setTextoAvaliacao(event.target.value)}
            className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
          />
        </div>

        <div className="flex justify-between items-center w-[90%] mt-6">
          <span className="text-white text-base pl-1">
            {textoAvaliacao.length}/500
          </span>
          <div className="flex justify-end items-center w-full mt-6 space-x-4 px-4 pb-2">
            <button
              onClick={() => { resetAvaliacaoModalFields(); toggleModalAvaliacao(); }}
              className="bg-white text-black border border-[#4a71ff] rounded-lg px-4 py-2 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all cursor-pointer"
              onClick={() => {
                if (!dataConsumoAvaliacao || dataConsumoAvaliacao.toISOString().split('T')[0] > new Date().toISOString().split('T')[0]) {
                  toast.error("Data de consumo inválida!");
                  return;
                }

                if (!textoAvaliacao.trim() || notaAvaliacao === -1 || !dataConsumoAvaliacao || !pratoAvaliacao || !refeicaoAvaliacao) {
                  toast.error("Preencha todos os campos!");
                } else {
                  const dataAvaliacao = new Date().toISOString();
                  creatingAvaliacao({
                    texto: textoAvaliacao,
                    nota: notaAvaliacao,
                    data_avaliacao: dataAvaliacao,
                    data_consumo: dataConsumoAvaliacao.toLocaleDateString(),
                    id_prato: pratoAvaliacao.id,
                    id_usuario: userInfo?.id,
                    refeicao: refeicaoAvaliacao,
                  });
                }
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded: { sub: number } = jwtDecode(token);
          const id = decoded.sub;
          const userResponse: User = (await axios.get(`http://localhost:3000/user/${id}`)).data;
          setUserInfo(userResponse);
        }
      } catch (error) {
        toast.error("Erro ao buscar informações do usuário");
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-100">
        <HeaderDeslogado />
        <div className="flex justify-center mt-4">
          <button onClick={() => router.push('/login')} className="text-white text-xl font-bold mb-4">Nova avaliação</button>
        </div>
      </div>
    );
  }

  function bufferToBase64(buffer: { type: string; data: number[] }) {
    let binary = '';
    const bytes = new Uint8Array(buffer.data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderLogado />
      {isModalAvaliacaoOpen && modalAvaliacao()}
      <div className="flex justify-center mt-4">
        <button onClick={toggleModalAvaliacao} className="bg-blue-500 text-white px-4 py-2 rounded">Nova avaliação</button>
      </div>

      <div className="flex justify-center items-center mt-10">
        {loading ? (
          <p>Carregando prato...</p>
        ) : prato ? (
          <div className="flex border border-blue-500 rounded p-4 max-w-lg w-full bg-white">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{prato.nome}</h2>
              <p>Avaliações: {prato.qtd_avaliacoes}</p>
              <p>Nota Média: {prato.media_avaliacoes ? Number(prato.media_avaliacoes).toFixed(2) : 'N/A'}</p>
            </div>
            <div className="flex-[2] bg-white flex items-center justify-center">
              {prato.icone ? (
                <img
                  src={`data:image/png;base64,${bufferToBase64(prato.icone)}`}
                  alt={prato.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-white text-xs text-center p-1">
                  Sem imagem
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Prato não encontrado.</p>
        )}
      </div>
    </div>
  );
}