'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Cadastro() {
    const [emailCadastro, setEmailCadastro] = useState('');
    const [senhaCadastro, setSenhaCadastro] = useState('');
    const [usernameCadastro, setUsernameCadastro] = useState('');
    const [nomeCadastro, setNomeCadastro] = useState('');
    const router = useRouter();


    const handleCadastro = async () => {
        try {
            await axios.post(`http://localhost:3000/user`, {
                email: emailCadastro,
                senha: senhaCadastro,
                username: usernameCadastro,
                nome: nomeCadastro
            });

            const signUp = await axios.post(`http://localhost:3000/auth/login`, {
                email: emailCadastro,
                senha: senhaCadastro
            });
            const { token } = signUp.data;
            localStorage.setItem('token', token);
            router.push('/feed');
            toast.success("Cadastro realizado com sucesso!", {
                autoClose: 2000,
            });
            
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                if (error.response.data.message === 'Email já cadastrado') {
                    toast.error("Este email já está cadastrado!", {
                        autoClose: 3000,
                    });
                } else if (error.response.data.message === 'Nome de usuário em uso') {
                    toast.error("Este nome de usuário já está em uso!", {
                        autoClose: 3000,
                    });
                } 
            } 
            else {
                toast.error("Erro ao realizar cadastro.", {
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="flex min-h-screen">
            <div
                className="w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://live.staticflickr.com/917/28432452267_1d19db2568_b.jpg')`,
                }}
            />
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
                <div className="w-3/4 max-w-md p-10 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center cursor-pointer"
                        onClick={() => router.push('/feed')}>
                         AvaliaRU
                    </h1>

                    <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

                <form>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Nome</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="text"
                            name="nome"
                            value={nomeCadastro}
                            onChange={(event)=> setNomeCadastro(event.target.value)}
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Email</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="email"
                            name="email"
                            value={emailCadastro}
                            onChange={(event) => setEmailCadastro(event.target.value)}
                            className= "pl-2 pb-1 w-full"
                            required
                        />

                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Senha</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="password"
                            name="senha"
                            value={senhaCadastro}
                            onChange={(event) => setSenhaCadastro(event.target.value)}
                            placeholder="********"
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>
                    <label className=" mb-2 text-sm font-medium text-gray-700">Nome de usuário</label>
                    <div className="mb-4 border outline-2 outline-gray-100 rounded-lg">
                        <input
                            type="text"
                            name="username"
                            value={usernameCadastro}
                            onChange={(event) => setUsernameCadastro(event.target.value)}
                            className="pl-2 pb-1 w-full"
                            required
                        />
                    </div>
                    <div className='flex pt-2 flex-col justify-center items-center'>
                        <button
                            type="button"
                            onClick={() => handleCadastro()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Cadastrar
                        </button>
                    </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            <Link href="/login" className="bg-gray-100 text-black px-4 py-2 rounded-md hover:bg-gray-300 cursor-pointer">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}