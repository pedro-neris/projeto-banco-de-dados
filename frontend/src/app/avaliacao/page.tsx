'use client';

import { use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import HeaderLogado from "@/components/headers/logado";
import { Avaliacao } from "@/types";
import { User, Prato } from "@/types";

export default function AvaliacaoPage() {
    const router = useRouter();
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [avaliacaoEdit, setAvaliacaoEdit] = useState<Avaliacao | null>(null);
    const [editAvaliacaoTexto, setEditAvaliacaoTexto] = useState<string>('');
    const [editAvaliacaoNota, setEditAvaliacaoNota] = useState<number>(-1);
    const [editAvaliacaoDataConsumo, setEditAvaliacaoDataConsumo] = useState<Date | null>(null);
    const [isModalEditAvaliacaoOpen, setIsModalEditAvaliacaoOpen] = useState(false);
    const [pratosAvaliacoes, setPratoAvaliacoes] = useState<Map<number, Prato>>(new Map());

    const editingAvaliacao = async (avaliacaoEdit: Partial<Avaliacao>, id: number) => {
        try {
            await axios.patch(`http://localhost:3000/avaliacao/${id}`, avaliacaoEdit);
            toast.success("Avaliação editada com sucesso!", { autoClose: 2000 });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error: any) {
            toast.error("Erro ao editar avaliação.");
        }
    }

    const handleDeleteAvaliacao = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta avaliação? Esta ação não pode ser desfeita.");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/avaliacao/${id}`);
                toast.success("Avaliação excluída com sucesso!", { autoClose: 2000 });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error: any) {
                toast.error("Erro ao excluir avaliação.");
            }
        }
    }

    const toggleModalAvaliacao = () => {
        setIsModalEditAvaliacaoOpen(!isModalEditAvaliacaoOpen);
    }
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
                else {
                    router.push('/feed');
                }
            } catch (error) {
                toast.error("Erro ao buscar informações do usuário");
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            fetchAvaliacoesUser(userInfo.id);
        }
    }, [userInfo]);

    const fetchAvaliacoesUser = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:3000/avaliacao/user/${id}`);
            setAvaliacoes(response.data);
        } catch (error) {
            toast.error("Erro ao carregar avaliações.");
        }
    };
    useEffect(() => {
        const findPratosAval = async () => {
            for (const avaliacao of avaliacoes) {
                const response = await axios.get(`http://localhost:3000/prato/id/${avaliacao.id_prato}`);
                const prato = response.data as Prato;
                setPratoAvaliacoes(prev => new Map(prev).set(avaliacao.id, prato));

            }
        }
        findPratosAval();
    }, [avaliacoes])

    const modalEditAvaliacao = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="h-auto text-black w-[60%] max-w-lg flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center p-6">
                <h2 className="text-white text-xl font-bold mb-4">Editar Avaliação</h2>

                <div className="w-full mb-2">
                    <label className="text-white">Prato: </label>
                    <select
                        disabled
                        value={pratosAvaliacoes.get(avaliacaoEdit?.id ?? 0)?.nome || ''}
                        className="bg-gray-200 h-[2rem] w-full pl-[0.325rem] mt-1 mb-2 rounded-md cursor-not-allowed opacity-75"
                    >
                        <option>{pratosAvaliacoes.get(avaliacaoEdit?.id ?? 0)?.nome || ''}</option>
                    </select>
                    <label className="text-white mt-6">Refeição: </label>
                    <select
                        disabled
                        value={avaliacaoEdit?.refeicao}
                        className="bg-gray-200 h-[2rem] w-full pl-[0.325rem] mt-1 mb-2 rounded-md cursor-not-allowed opacity-75"
                    >
                        <option>{avaliacaoEdit?.refeicao}</option>
                    </select>


                    <label className="text-white">Nota:</label>
                    <select
                        value={editAvaliacaoNota}
                        onChange={(event) => setEditAvaliacaoNota(Number(event.target.value))}
                        className="w-full mt-1 mb-2 p-2 rounded-md border"
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="w-full mb-4">
                    <label className="text-white mb-2">Data de Consumo:</label>
                    <input
                        type="date"
                        value={editAvaliacaoDataConsumo?.toISOString?.()?.split('T')[0]}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEditAvaliacaoDataConsumo(new Date(e.target.value))}
                        className="w-full p-2 rounded-md border"
                    />
                </div>

                <div className="flex flex-col h-[12rem] w-full bg-[#A4FED3] rounded-md">
                    <textarea
                        value={editAvaliacaoTexto}
                        maxLength={500}
                        onChange={(event) => setEditAvaliacaoTexto(event.target.value)}
                        placeholder="Digite seu comentário sobre a avaliação..."
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>

                <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-white text-base pl-1">
                        {editAvaliacaoTexto.length}/500
                    </span>
                    <div className="flex justify-end items-center space-x-4">
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all"
                            onClick={() => {
                                if (!editAvaliacaoTexto.trim() || editAvaliacaoNota === -1) {
                                    toast.error("Preencha todos os campos!");
                                }
                                else if (!editAvaliacaoDataConsumo || editAvaliacaoDataConsumo?.toISOString().split('T')[0] > new Date().toISOString().split('T')[0]) {
                                    toast.error("Data de consumo inválida!");
                                }
                                else {
                                    const editedAvaliacao = {
                                        texto: editAvaliacaoTexto,
                                        nota: editAvaliacaoNota,
                                        id_usuario: userInfo?.id,
                                        data_consumo: editAvaliacaoDataConsumo.toISOString(),
                                        data_avaliacao: new Date().toISOString(),
                                        id_prato: avaliacaoEdit?.id_prato,
                                    };
                                    editingAvaliacao(editedAvaliacao, avaliacaoEdit?.id ?? 0);
                                    toggleModalAvaliacao();
                                }
                            }}
                        >
                            Salvar
                        </button>

                        <button
                            onClick={() => toggleModalAvaliacao()}
                            className="bg-white text-[#4a71ff] border border-[#4a71ff] rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    if (!userInfo) return <div className="h-screen bg-gray-100"></div>;

    return (
        <div className="min-h-screen bg-gray-100">
            {isModalEditAvaliacaoOpen && modalEditAvaliacao()}
            <HeaderLogado />
            <div className="container mx-auto px-4 py-8">
                {avaliacoes.length > 0 && (
                    <h1 className="text-2xl font-bold mb-4 text-center">Minhas Avaliações</h1>
                )}
                {avaliacoes.length === 0 ? (
                    <div className="text-center text-gray-600 text-xl mt-20">
                        <p>Você não fez nenhuma avaliação!</p>
                    </div>
                ) : (
                    avaliacoes.map(avaliacao => (
                        <div key={avaliacao.id} className="w-full max-w-[45%] bg-[#49ffff] rounded-md mt-8 flex flex-col mx-auto mb-4 min-h-fit">
                            <div className="w-full max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                                <div
                                    onClick={() => {
                                        router.push(`/avaliacao/${avaliacao.id}`);
                                    }}
                                    className="flex flex-col justify-center items-center pl-3 space-y-4 mt-2 cursor-pointer">
                                    <div className="w-full items-center justify-center flex flex-row space-x-6">
                                        <div className="flex flex-col items-center">
                                            <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Data da avaliação</span>
                                            <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{new Date(avaliacao.data_avaliacao).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Data de consumo</span>
                                            <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{new Date(avaliacao.data_consumo).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Refeição</span>
                                            <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{avaliacao.refeicao}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Nota</span>
                                            <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{avaliacao.nota}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Prato</span>
                                            <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{pratosAvaliacoes.get(avaliacao.id)?.nome}</span>
                                        </div>
                                    </div>
                                    <div className='w-full mt-4'>
                                        <div className="flex flex-col items-center">
                                            <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Texto da Avaliação</span>
                                            <p className="text-black text-[15px] font-[500] leading-[18.15px] pb-2 px-4 whitespace-pre-wrap break-words max-w-full text-center">{avaliacao.texto}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center space-x-4 items-center px-4 py-2'>
                                <button
                                    onClick={() => {
                                        setAvaliacaoEdit(avaliacao);
                                        setEditAvaliacaoTexto(avaliacao.texto);
                                        setEditAvaliacaoNota(avaliacao.nota);
                                        setEditAvaliacaoDataConsumo(new Date(avaliacao.data_consumo));
                                        toggleModalAvaliacao();
                                    }}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer'>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteAvaliacao(avaliacao.id)}
                                    className='bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer'>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}