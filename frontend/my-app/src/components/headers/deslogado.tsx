'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logoUnb from '@/components/logo unb.png';

export default function header_deslogado() {
    const router = useRouter();
    return (
        <header className="flex justify-between pb-1 items-center mb-2 min-h-fit ">
            <div className="flex pb-1">
                <div className="flex justify-between w-screen bg-green-300 py-3  items-center">
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
                    <h2 className='text-2xl font-bold text-black cursor-pointer'
                        onClick={() => router.push('/feed')}>
                        Feed
                    </h2>

                    </div>
                    <div className="flex flex-row items-center space-x-2 mr-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        onClick={() => {
                            router.push('/login');
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
                        onClick={() => {
                            router.push('/cadastro');
                        }}
                    >
                        Cadastro
                    </button>
                    </div>
                </div>
            </div>
        </header >
    )
}