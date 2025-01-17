'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function InventoryPage() {
    const [inventory, setInventory] = useState<{ name: string; quantity: number }[]>([]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('/api/inventory');
                setInventory(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'inventaire', error);
            }
        };

        fetchInventory();
    }, []);

    const updateIngredient = async (name: string, quantityChange: number) => {
        try {
            const response = await axios.post('/api/inventory', { name, quantity: quantityChange });
            setInventory(response.data);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'ingrédient', error);
        }
    };

    // Recharger aléatoirement l'inventaire
    const reloadInventory = async () => {
        try {
            const response = await axios.put('/api/inventory');
            setInventory(response.data.inventory);
            alert('Inventaire rechargé avec succès.');
        } catch (error) {
            console.error('Erreur lors du rechargement de l\'inventaire', error);
            alert('Erreur lors du rechargement de l\'inventaire.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-8">Inventaire des Ingrédients</h1>

                <div className="text-center mb-6">
                    <button
                        onClick={reloadInventory}
                        className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700"
                    >
                        Recharger l'Inventaire
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inventory.map((item) => (
                        <div
                            key={item.name}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                <p className="text-lg font-medium text-gray-600">
                                    Quantité : <span className="text-purple-600 font-bold">{item.quantity}</span>
                                </p>
                            </div>
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() => updateIngredient(item.name, 1)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                                >
                                    +1
                                </button>
                                <button
                                    onClick={() => updateIngredient(item.name, -1)}
                                    disabled={item.quantity <= 0}
                                    className={`px-4 py-2 rounded-lg font-medium ${
                                        item.quantity > 0
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    }`}
                                >
                                    -1
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Résumé des Quantités</h2>
                    <p className="text-lg font-medium">
                        <strong className="text-purple-700">Total des Ingrédients :</strong>{' '}
                        {inventory.reduce((total, item) => total + item.quantity, 0)}
                    </p>
                </div>
            </div>
        </>
    );
}