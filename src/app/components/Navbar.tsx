'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-purple-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">Potion Master</h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className="hover:underline">
                            Chaudron
                        </Link>
                    </li>
                    <li>
                        <Link href="/inventory" className="hover:underline">
                            Inventaire
                        </Link>
                    </li>
                    <li>
                        <Link href="/recipes" className="hover:underline">
                            Création
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}