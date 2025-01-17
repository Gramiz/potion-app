'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

export default function PotionsPage() {
    const [potions, setPotions] = useState<{ name: string; createdAt: string }[]>([]);

    useEffect(() => {
        const fetchPotions = async () => {
            try {
                const response = await axios.get('/api/potions');
                setPotions(response.data.potions);
            } catch (error) {
                console.error('Erreur lors de la récupération des potions', error);
            }
        };
        fetchPotions();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Potions et Recettes Découvertes</h1>
            {potions.length > 0 ? (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Potions Créées :</h2>
                    <ul className="list-disc list-inside">
                        {potions.map((potion, index) => (
                            <li key={index}>
                                {potion.name} - Créée le {new Date(potion.createdAt).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Aucune potion n'a encore été créée.</p>
            )}
        </div>
    );
}