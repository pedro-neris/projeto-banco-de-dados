
import Link from 'next/link';
import Image from 'next/image';
import logoUnb from '@/components/logo unb.png';
import { useRouter } from 'next/navigation';

export default function header_logado() {
    const router = useRouter();
    return (
        <header className="flex justify-between pb-1 items-center mb-2 min-h-fit ">
                <div className="flex pb-3 justify-between w-screen bg-green-300 py-3 items-center">
                    <div className='flex items-center space-x-4'>
                    <Link
                        href="/feed">
                        <Image
                            src={logoUnb}
                            alt="Logo da UnB"
                            width={80}
                            height={80}
                            className="w-20 h-10 cursor-pointer ml-5 shadow-md"
                        />
                    </Link>
                    <h2 onClick={() => router.push('/feed')}
                        className='text-2xl font-bold text-black cursor-pointer'>

                        Feed
                    </h2>
                    </div>
                    <div className='flex items-center space-x-4 mr-2'>
                    <button>
                        <Link
                            href="/avaliacao"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Minhas avaliações
                        </Link>
                    </button>
                                        <button>
                        <Link
                            href="/feedback"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Meus feedbacks
                        </Link>
                    </button>


                    <button>
                        <Link
                            href="/perfil"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        >
                            Editar perfil
                        </Link>
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setTimeout(() => {
                                router.push('/feed');
                            }, 1000);
                        }}
                    >
                        Sair
                    </button>
                    </div>
                </div>
        </header >
    )
}