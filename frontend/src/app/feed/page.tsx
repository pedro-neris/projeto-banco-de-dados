'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderLogado from '../../components/headers/logado';
import HeaderDeslogado from '@/components/headers/deslogado';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Campus, Feedback, Prato, Setor, User, Avaliacao, infoPrato } from '@/types';

export default function FeedPage() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [campus, setCampus] = useState<Campus[]>([]);
    const [setores, setSetores] = useState<Setor[]>([]);
    const [campusSelected, setCampusSelected] = useState("-1");
    const [setorSelected, setSetorSelected] = useState("-1");
    const [textoFeedback, setTextoFeedback] = useState("");
    const [tipo, setTipo] = useState("-1");
    const [pratos, setPratos] = useState<Prato[]>([]);
    const [textoAvaliacao, setTextoAvaliacao] = useState("");
    const [notaAvaliacao, setNotaAvaliacao] = useState(-1);
    const [refeicaoAvaliacao, setRefeicaoAvaliacao] = useState("");
    const [dataConsumoAvaliacao, setdataConsumoAvaliacao] = useState<Date | null>(null);
    const [pratoAvaliacao, setPratoAvaliacao] = useState<Prato | null>(null);
    const [isModalAvaliacaoOpen, setIsModalAvaliacaoOpen] = useState(false);
    const [infoPrato, setInfoPrato] = useState<infoPrato[]>([]);

    useEffect(() => {
        const fetchInfoPrato = async () => {
            try {
                const response_prato = await axios.get("http://localhost:3000/prato/info");
                setInfoPrato(response_prato.data);
            } catch (error) {
                toast.error("Erro ao buscar informações dos pratos");
            }
        };

        fetchInfoPrato();
    }, []);

    useEffect(() => {
        const fetchPratos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/prato");
                setPratos(response.data);
            } catch (error) {
                toast.error("Erro ao buscar pratos");
            }
        };

        fetchPratos();
    }, []);

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
                window.location.reload();
            }, 700);
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
                        const selectedPrato = pratos.find((prato) => prato.nome === event.target.value) || null;
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
                <div className="flex flex-col w-[90%] mt-5 items-start" >                
                    <label className="text-white mb-2">Data de Consumo:</label>
                <input
                    type="date"
                    value={dataConsumoAvaliacao?.toISOString().split('T')[0] || ''}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setdataConsumoAvaliacao(new Date(e.target.value))}
                    className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-1 rounded-md"
                />

</div>
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
                            Enviar Avaliação
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
        const getCampus = async () => {
            try {
                const response = await axios.get("http://localhost:3000/campus");
                setCampus(response.data);
            } catch {
                toast.error("Erro ao buscar campus");
            }
        };

        getCampus();
    }, []);

    const findSetoresForCampus = async (campusId: string) => {
        try {
            if (campusId !== "-1") {

                const response = await axios.get(`http://localhost:3000/setor/campus/${campusId}`);
                setSetores(response.data as Setor[]);
            } else {
                setSetores([]);
            }
        } catch {
            toast.error("Erro ao procurar setores do campus");
            setSetores([]);
        }
    };

    const creatingFeedback = async (feedback: Partial<Feedback>) => {
        try {
            if (!feedback.texto || feedback.id_setor === -1 || !feedback.tipo) {
                toast.error("Preencha todos os campos!");
                return;
            }
            await axios.post("http://localhost:3000/feedback", feedback);
            toast.success("Feedback criado com sucesso!", { autoClose: 2200 });
            resetFeedbackModalFields();
            setTimeout(() => {
                toggleFeedbackModal();
            }, 500);
        } catch (error) {
            console.error("Erro ao criar feedback", error);
            toast.error("Erro ao criar feedback. Por favor, tente novamente.");
        }
    };

    const toggleFeedbackModal = () => setIsFeedbackModalOpen(!isFeedbackModalOpen);

    const resetFeedbackModalFields = () => {
        setTextoFeedback("");
        setCampusSelected("-1");
        setSetorSelected("-1");
        setTipo("-1");
        setSetores([]);
    };

    const modalFeedback = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="h-auto text-black w-[60%] flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center">
                <select
                    value={campusSelected}
                    className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    onChange={(event) => {
                        setCampusSelected(event.target.value);
                        findSetoresForCampus(event.target.value);
                        setSetorSelected("-1");
                    }}
                >
                    <option value="-1" disabled>Selecione o campus</option>
                    {campus.map((campusItem) => (
                        <option key={campusItem.id} value={campusItem.id}>
                            {campusItem.nome}
                        </option>
                    ))}
                </select>

                {campusSelected !== "-1" && setores.length === 0 && (
                    <select
                        disabled
                        value={setorSelected}
                        className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    >
                        <option value="-1" disabled>Não há setores cadastrados para este campus</option>
                    </select>
                )}

                {campusSelected !== "-1" && setores.length > 0 && (
                    <select
                        value={setorSelected}
                        className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                        onChange={(event) => {
                            setSetorSelected(event.target.value);
                        }}
                    >
                        <option value="-1" disabled>Selecione o setor</option>
                        {setores.map((setor) => (
                            <option key={setor.id} value={setor.id}>
                                {setor.nome}
                            </option>
                        ))}
                    </select>
                )}

                {campusSelected === "-1" && (
                    <select
                        disabled
                        value={setorSelected}
                        className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    >
                        <option value="-1" disabled>Selecione um setor </option>
                    </select>
                )}

                <select
                    value={tipo}
                    className="bg-white h-[2rem] w-[90%] pl-[0.325rem] mt-5 rounded-md"
                    onChange={(event) => {
                        setTipo(event.target.value);
                    }}
                >
                    <option value="-1" disabled>Selecione o tipo</option>
                    <option value="Reclamação">Reclamação</option>
                    <option value="Sugestão">Sugestão</option>
                    <option value="Elogio">Elogio</option>
                </select>

                <div className="flex flex-col h-[12rem] w-[90%] bg-[#A4FED3] mt-[2rem] rounded-md">
                    <textarea
                        value={textoFeedback}
                        maxLength={500}
                        placeholder="Digite seu feedback"
                        onChange={(event) => setTextoFeedback(event.target.value)}
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>

                <div className="flex justify-between items-center w-[90%] mt-6">
                    <span className="text-white text-base pl-1">
                        {textoFeedback.length}/500
                    </span>
                    <div className="flex justify-end items-center w-full mt-6 space-x-4 px-4 pb-2">
                        <button
                            onClick={() => { resetFeedbackModalFields(); toggleFeedbackModal(); }}
                            className="bg-white text-black border border-[#4a71ff] rounded-lg px-4 py-2 cursor-pointer "
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all cursor-pointer"
                            onClick={() => {
                                if (!textoFeedback.trim() || campusSelected === "-1" || setorSelected === "-1" || tipo === "-1") {
                                    toast.error("Preencha todos os campos!");
                                }
                                else {
                                    const dataFeedback = new Date().toISOString();
                                    creatingFeedback({
                                        texto: textoFeedback,
                                        tipo: tipo,
                                        data: dataFeedback,
                                        id_setor: parseInt(setorSelected, 10),
                                        id_usuario: userInfo?.id
                                    });
                                }
                            }}
                        >
                            Enviar Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


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
                <div className='flex items-center justify-center mt-2'>
                    <button
                        onClick={() => router.push('/login')}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
                        Novo feedback
                    </button>
                    <button
                        onClick={() => router.push('/login')}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 cursor-pointer'>
                        Nova avaliação
                    </button>
                </div>
                <div className='grid grid-cols-4 gap-2 p-4'>
                    {infoPrato.map((prato) => (
                        <div key={prato.id} className="w-[300px] h-[110px] border-2 border-blue-500 flex bg-white hover:scale-105 transition-all cursor-pointer" onClick={() => router.push(`/prato/info/${prato.id}`)}>
                            <div className="flex flex-col justify-between flex-[3] text-sm p-2">
                                <div className="font-bold text-gray-800">
                                    {prato.nome}
                                </div>
                                <div className="text-gray-600">
                                    Avaliações: {prato.qtd_avaliacoes}
                                </div>
                                <div className="text-gray-600">
                                    Nota Média: {prato.media_avaliacoes ? Number(prato.media_avaliacoes).toFixed(2) : 'N/A'}
                                </div>
                                                            <button 
                            className="bg-blue-500 hover:bg-blue-700 w-[60%] text-white font-bold rounded cursor-pointer mt-2 mb-2 ml-2"
                                onClick={(event) => {
                                    event.stopPropagation(); 
                                    router.push('/login');
                                }}>
                            </button>

                            </div>
                            <div className="flex-[2] bg-white flex items-center justify-center">
                                {prato.icone ? (
                                    <img 
                                        src={`data:;base64,${prato.icone}`}
                                        alt={`${prato.nome}`}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="text-black text-sm text-center p-1">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {infoPrato.length === 0 && (
                        <p className="text-center text-gray-600 text-xl mt-20">Nenhum prato cadastrado</p>

                    )}
                </div>

            </div>
        )
    }
    else {
        return (
            <div className="min-h-screen bg-gray-100">
                <HeaderLogado />
                {isFeedbackModalOpen && modalFeedback()}
                {isModalAvaliacaoOpen && modalAvaliacao()}
                <div className='flex items-center justify-center mt-2'>
                    <button
                        onClick={toggleFeedbackModal}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>
                        Novo feedback
                    </button>
                    <button
                        onClick={toggleModalAvaliacao}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 cursor-pointer'>
                        Nova avaliação
                    </button>
                </div>               
                <div className='grid grid-cols-4 gap-2 p-4'>
                    {infoPrato.map((prato) => (
                        <div key={prato.id} className="w-[300px] h-[110px] border-2 border-blue-500 flex bg-white hover:scale-105 transition-all cursor-pointer" onClick={() => router.push(`/prato/info/${prato.id}`)}>
                            <div className="flex flex-col justify-between flex-[3] text-sm p-2">
                                <div className="font-bold text-gray-800">
                                    {prato.nome}
                                </div>
                                <div className="text-gray-600">
                                    Avaliações: {prato.qtd_avaliacoes}
                                </div>
                                <div className="text-gray-600">
                                    Nota Média: {prato.media_avaliacoes ? Number(prato.media_avaliacoes).toFixed(2) : 'N/A'}
                                </div>
                                                            <button 
                            className="bg-blue-500 hover:bg-blue-700 w-[60%] text-white font-bold rounded cursor-pointer mt-2 mb-2 ml-2"
                                onClick={(event) => {
                                    event.stopPropagation(); 
                                    const selectedPrato = pratos.find((pratoLoop) => pratoLoop.nome === prato.nome) || null;
                                    setPratoAvaliacao(selectedPrato);
                                    toggleModalAvaliacao();
                                }}>
                                Avaliar
                            </button>

                            </div>
                            <div className="flex-[2] bg-white flex items-center justify-center">
                                {prato.icone ? (
                                    <img 
                                        src={`data:;base64,${prato.icone}`}
                                        alt={`${prato.nome}`}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="text-black text-sm text-center p-1">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {infoPrato.length === 0 && (
                        <p className="text-center text-gray-600 text-xl mt-20">Nenhum prato cadastrado</p>

                    )}
                </div>
              </div>
        );
    }
}