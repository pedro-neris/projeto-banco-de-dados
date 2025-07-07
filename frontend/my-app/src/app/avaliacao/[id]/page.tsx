'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import HeaderLogado from "@/components/headers/logado";
import { Avaliacao, Comentario, User, Prato } from "@/types";

export default function AvaliacaoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [textoNovoComentario, setTextoNovoComentario] = useState<string>('');
    const [textoEditComentario, setTextoEditComentario] = useState<string>('');
    const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
    const [isModalCreateComentarioOpen, setIsModalCreateComentarioOpen] = useState(false);
    const [isModalEditComentarioOpen, setIsModalEditComentarioOpen] = useState(false);
    const [userAval, setUserAval] = useState<User | null>(null);
    const [userComentarios, setUserComentarios] = useState<Map<number, User>>(new Map());
    const [pratoAval, setPratoAval] = useState<Prato | null>(null);
    const [idComentarioEdit, setIdComentarioEdit] = useState<number | null>(null);
    const avaliacaoId = params.id as string;

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
        fetchAvaliacaoAndComentarios();
    }, [avaliacaoId]);

    const fetchAvaliacaoAndComentarios = async () => {
        try {
            const avaliacaoResponse = (await axios.get(`http://localhost:3000/avaliacao/${avaliacaoId}`)).data;
            setAvaliacao(avaliacaoResponse);

            const comentariosResponse = (await axios.get(`http://localhost:3000/comentario/avaliacao/${avaliacaoId}`)).data;
            setComentarios(comentariosResponse);
        } catch (error: any) {
            toast.error("Erro ao carregar avaliação.");
        }
    };

    useEffect(() => {
        const findUserPratoAval = async () => {
            try {
                if (avaliacao && avaliacao.id_usuario) {
                    const userResponse: User = (await axios.get(`http://localhost:3000/user/${avaliacao.id_usuario}`)).data;
                    const pratoAvalResponse: Prato = (await axios.get(`http://localhost:3000/prato/id/${avaliacao.id_prato}`)).data;
                    setUserAval(userResponse);
                    setPratoAval(pratoAvalResponse);
                }
            } catch (error: any) {
                toast.error("Erro ao buscar informações do usuário da avaliação.");
            }
        };
        findUserPratoAval();
    }, [avaliacao]);

    const toggleModalNovoComentario = () => {
        setIsModalCreateComentarioOpen(!isModalCreateComentarioOpen);
        setTextoNovoComentario('');
    };
    const resetEditComentarioFields = () => {
        setTextoEditComentario('');
        setIdComentarioEdit(null);
    }
    const toggleModalEditComentario = () => {
        setIsModalEditComentarioOpen(!isModalEditComentarioOpen)
    }

    const handleCreateComentario = async () => {
        if (textoNovoComentario.trim() == '') {
            toast.error("O texto do comentário não pode estar vazio.");
        }
        else {
            try {
                if (avaliacao && userInfo) {
                    const createComment = {
                        texto: textoNovoComentario,
                        data: new Date().toLocaleString(),
                        id_avaliacao: avaliacao.id,
                        id_usuario: userInfo.id
                    };

                    await axios.post('http://localhost:3000/comentario', createComment);
                    toast.success("Comentário feito com sucesso!");
                    toggleModalNovoComentario();
                    window.location.reload();
                }
            } catch (error: any) {
                toast.error("Erro ao fazer comentário.");
            }
        }
    };

    useEffect(() => {
        const fetchUserComentarios = async () => {
            for (const comentario of comentarios) {
                try {
                    const userResponse: User = (await axios.get(`http://localhost:3000/user/${comentario.id_usuario}`)).data;
                    setUserComentarios(prev => new Map(prev).set(comentario.id, userResponse));
                } catch (error: any) {
                    toast.error("Erro ao buscar informações do usuário do comentário.");
                }
            }
        }
        fetchUserComentarios();
    }, [comentarios]);

    const handleDeleteComentario = async (comentarioId: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/comentario/${comentarioId}`);
                toast.success("Comentário excluído com sucesso!",{autoClose:800});
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } catch (error: any) {
                toast.error("Erro ao excluir comentário.");
            }
        }
    };
    const handleEditComentario = async () => {
        if (textoEditComentario.trim() == '') {
            toast.error("O texto do comentário não pode estar vazio.");
        }
        else {
            try {
                await axios.patch(`http://localhost:3000/comentario/${idComentarioEdit}`, {
                    texto: textoEditComentario,
                    data: new Date().toISOString(),
                    id_avaliacao: avaliacao?.id,
                    id_usuario: userInfo?.id
                })
                toggleModalEditComentario();
                toast.success("Comentário editado com sucesso!",{autoClose:800});
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            catch {
                toast.error("Erro ao editar comentário.");
            }
        }
    };

    const modalCreateComentario = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="h-auto text-black w-[60%] flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center">
                <div className="flex flex-col h-[12rem] w-full bg-[#A4FED3] rounded-md">
                    <textarea
                        maxLength={500}
                        onChange={(event) => setTextoNovoComentario(event.target.value)}
                        placeholder="Digite seu comentário..."
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>

                <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-white text-base pl-1">
                        {textoNovoComentario.length}/500
                    </span>
                    <div className="flex justify-end items-center space-x-4">
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all"
                            onClick={handleCreateComentario}
                        >
                            Comentar
                        </button>

                        <button
                            onClick={toggleModalNovoComentario}
                            className="bg-white text-[#4a71ff] border border-[#4a71ff] rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const modalEditComentario = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="h-auto text-black w-[60%] flex flex-col mx-auto bg-[#4a71ff] rounded-md items-center">
                <div className="flex flex-col h-[12rem] w-full bg-[#A4FED3] rounded-md">
                    <textarea
                        value= {textoEditComentario}
                        maxLength={500}
                        onChange={(event) => setTextoEditComentario(event.target.value)}
                        placeholder="Digite seu comentário..."
                        className="text-black h-full shadow-sm placeholder-black placeholder-opacity-50 mt-2 pt-[2px] border-none pl-[1rem] bg-[#A4FED3] leading-tight focus:outline-none w-full p-2 resize-none overflow-y-auto border rounded-md"
                    />
                </div>

                <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-white text-base pl-1">
                        {textoEditComentario.length}/500
                    </span>
                    <div className="flex justify-end items-center space-x-4">
                        <button
                            className="bg-[#A4FED3] text-[#2B895C] rounded-lg px-4 py-2 hover:scale-105 transition-all"
                            onClick={handleEditComentario}
                        >
                            Salvar
                        </button>

                        <button
                            onClick={() => { toggleModalEditComentario(); resetEditComentarioFields(); }}
                            className="bg-white text-[#4a71ff] border border-[#4a71ff] rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!avaliacao || !userInfo) {
        return <div className="h-screen bg-gray-100"></div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {isModalCreateComentarioOpen && modalCreateComentario()}
            {isModalEditComentarioOpen && modalEditComentario()}
            <HeaderLogado />

            <div className="container mx-auto px-4 py-8">
                <div className="w-full max-w-[45%] bg-[#49ffff] rounded-md mt-8 flex flex-col mx-auto mb-8 min-h-fit">
                    <div className="w-full max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                        <div className="flex flex-col justify-center items-center pl-3 space-y-4 mt-2">
                            <div className="w-full items-center justify-center flex flex-row space-x-6">
                                <div className="flex flex-col items-center">
                                    <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Usuário</span>
                                    <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{userAval?.username}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Data da avaliação</span>
                                    <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{new Date(avaliacao.data_avaliacao).toLocaleString().split(',')[0]}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Data de consumo</span>
                                    <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{new Date(avaliacao.data_consumo).toLocaleString().split(',')[0]}</span>
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
                                    <span className="font-sans text-black text-sm font-[350] leading-[16.94px]">{pratoAval?.nome}</span>
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
                    <div className="flex justify-center items-center mb-6 mt-4">
                        <button
                            onClick={toggleModalNovoComentario}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Comentar
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-[45%] bg-blue-300 rounded-md mt-8 flex flex-col mx-auto mb-8 min-h-fit">

                    <div className="w-full bg-blue-300 p-2 rounded max-w-[100%] flex flex-col mx-auto border-b-[1.5px] border-b-black pb-[0.7rem] mt-2">
                        <p className="text-center"> Comentários </p>
                    </div>
                    {comentarios.length === 0 ? (
                        <p> Nenhum comentário </p>
                    ) : (
                        <div className="space-y-4 bg-blue-300">
                            {comentarios.map((comentario) => (
                                <div key={comentario.id} className="border-b mt-2 border-gray-200 pb-4">
                                    <div className="flex justify-center items-center mb-2">
                                        <div className="flex flex-row items-center space-x-4">
                                            <div className="flex flex-col items-center">
                                                <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Usuário</span>
                                                <span className="font-sans text-[#222E50] text-sm font-[350] leading-[16.94px]">
                                                    {userComentarios.get(comentario.id)?.username || ''}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Data</span>
                                                <span className="font-sans text-[#222E50] text-sm font-[350] leading-[16.94px]">
                                                    {new Date(comentario.data).toLocaleString().split(',')[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mt-4">
                                        <span className="font-sans text-[#71767B] text-sm font-bold leading-[16.94px] mb-1">Texto do Comentário</span>
                                        <p className="text-black text-[15px] font-[500] leading-[18.15px] pb-2 px-4 whitespace-pre-wrap break-words max-w-full text-center">{comentario.texto}</p>
                                    </div>
                                    {userInfo?.id === comentario.id_usuario && (
                                        <div className="flex justify-center space-x-4 mt-2">
                                            <button
                                                onClick={() => {
                                                    setTextoEditComentario(comentario.texto);
                                                    setIsModalEditComentarioOpen(true);
                                                    setIdComentarioEdit(comentario.id);
                                                }}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComentario(comentario.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}