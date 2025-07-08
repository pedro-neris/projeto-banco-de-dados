
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
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
                            className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Minhas avaliações
                        </Link>
                    </button>
                                        <button>
                        <Link
                            href="/feedback"
                            className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Meus feedbacks
                        </Link>
                    </button>


                    <button>
                        <Link
                            href="/perfil"
                            className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        >
                            Editar perfil
                        </Link>
                    </button>
                    <button
                        className="flex items-center bg-white text-black rounded-[60px] px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        }}
                    >
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-black cursor-pointer" />
                    </button>
                    </div>
                </div>
        </header >
    )
}