'use client';

import { User } from "@/types";
import { use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import HeaderLogado from "@/components/headers/logado";

export default function Perfil() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [emailEdit, setEmailEdit] = useState('');
    const [usernameEdit, setUsernameEdit] = useState('');
    const [nomeEdit, setNomeEdit] = useState('');
    const [senhaEdit, setSenhaEdit] = useState('');

    const handleCancel= () => {
        setEmailEdit('');
        setUsernameEdit('');
        setNomeEdit('');
        setSenhaEdit('');
    }


    const ConfirmDelete = () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
        if (confirmDelete) {
            handleDelete();
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/user/${userInfo?.id}`);
            toast.success("Conta excluída com sucesso!", { autoClose: 2000 });
            localStorage.removeItem('token');
            router.push('/feed');
        } catch (error: any) {
            toast.error("Erro ao excluir conta.");
        }
    }
    const handleEdit = async () => {
        const confirm = window.confirm("Tem certeza que deseja atualizar suas informações?");
        if (confirm) {
        try {
            const updateUser = {
                email: emailEdit,
                username: usernameEdit,
                nome: nomeEdit,
                senha: senhaEdit,
            }
                
                await axios.patch(`http://localhost:3000/user/${userInfo?.id}`,
                updateUser
            );
            toast.success("Informações atualizadas com sucesso!", { autoClose: 2000 });
            const newToken = await axios.post(`http://localhost:3000/auth/login`, {
                email: updateUser.email,
                senha: updateUser.senha
            });
            const { token } = newToken.data;
            localStorage.removeItem('token');
            localStorage.setItem('token', token);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                if (error.response.data.message === 'Email já cadastrado') {
                    toast.error("Este email já está cadastrado!", {
                        autoClose: 2000,
                    });
                } else if (error.response.data.message === 'Nome de usuário em uso') {
                    toast.error("Este nome de usuário já está em uso!", {
                        autoClose: 2000,
                    });
                }
            } else {
                toast.error("Erro ao atualizar informações do usuário.");
            }
        }
    }}
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

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
        if (userInfo) {
            setEmailEdit(userInfo.email);
            setUsernameEdit(userInfo.username);
            setNomeEdit(userInfo.nome);
            setSenhaEdit(userInfo.senha);
        }
    }, [userInfo]);

    if (!userInfo) {
        return <div className="min-h-screen bg-gray-200">  </div>
    }
    return (
        <div className="min-h-screen bg-gray-200">
            <HeaderLogado />
            <div className="flex flex-col items-center justify-center pt-4">
                <h1 className="text-2xl font-bold mb-4">Informações do perfil</h1>
                <div className="w-2/4 h-1/2 flex flex-row items-center justify-center bg-white rounded-lg shadow-lg p-10">
                    <form >
                        <label className=" mb-2 text-sm font-medium text-gray-700">Nome</label>
                        <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                            <input
                                type="text"
                                name="nome"
                                value={nomeEdit}
                                onChange={(e) => setNomeEdit(e.target.value)}
                                maxLength={100}
                                className="pl-2 pb-1 w-full"
                                required
                            />
                        </div>
                        <label className=" mb-2 text-sm font-medium text-gray-700">Email</label>
                        <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                            <input
                                type="email"
                                name="email"
                                value={emailEdit}
                                onChange={(e) => setEmailEdit(e.target.value)}
                                maxLength={100}
                                className="pl-2 pb-1 w-full"
                                required
                            />

                        </div>
                        <label className=" mb-2 text-sm font-medium text-gray-700">Senha</label>
                        <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                            <input
                                type="password"
                                name="senha"
                                value={senhaEdit}
                                onChange={(e) => setSenhaEdit(e.target.value)}
                                maxLength={100}
                                className="pl-2 pb-1 w-full"
                                required
                            />
                        </div>
                        <label className=" mb-2 text-sm font-medium text-gray-700">Nome de usuário</label>
                        <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                            <input
                                type="text"
                                name="username"
                                value={usernameEdit}
                                onChange={(e) => setUsernameEdit(e.target.value)}
                                maxLength={70}
                                className="pl-2 pb-1 w-full"
                                required
                            />
                        </div>

                        <div className="flex flex-row space-x-2">
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 cursor-pointer rounded"
                                onClick={handleCancel}>
                                Cancelar
                            </button>
                            <button
                                onClick={ConfirmDelete}
                                type="button"
                                className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 cursor-pointer rounded">
                                Excluir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}