'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

export default function HomePage() {
    const [inventory, setInventory] = useState<{ name: string; quantity: number }[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);

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

    const addIngredient = async (ingredient: string) => {
        if (ingredients.length < 3) {
            const selectedIngredient = inventory.find((item) => item.name === ingredient);

            if (selectedIngredient && selectedIngredient.quantity > 0) {
                const updatedInventory = inventory.map((item) =>
                    item.name === ingredient
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );

                setInventory(updatedInventory);
                setIngredients([...ingredients, ingredient]);

                try {
                    await axios.post('/api/inventory', { name: ingredient, quantity: -1 });
                } catch (error) {
                    console.error('Erreur lors de la mise à jour de l\'inventaire sur le serveur', error);
                }
            }
        }
    };

    const removeIngredientFromPreparation = async (ingredient: string) => {
        const indexToRemove = ingredients.indexOf(ingredient);
        if (indexToRemove > -1) {
            const updatedIngredients = [...ingredients];
            updatedIngredients.splice(indexToRemove, 1);
            setIngredients(updatedIngredients);

            const updatedInventory = inventory.map((item) =>
                item.name === ingredient
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setInventory(updatedInventory);

            try {
                await axios.post('/api/inventory', { name: ingredient, quantity: 1 });
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'inventaire sur le serveur', error);
            }
        }
    };

    const createPotion = async () => {
        try {
            const response = await axios.post('/api/potions', { ingredients });
            setMessage(response.data.message);

            setIngredients([]);
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Une erreur est survenue.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-5xl font-bold mb-6 text-purple-700">Atelier de Potions Magiques</h1>

                <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mb-8">
                    <div
                        className="relative w-64 h-64 bg-center bg-contain"
                        style={{ backgroundImage: 'url("/cauldron.png")' }}
                    >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {ingredients.map((ingredient, index) => (
                                <div
                                    key={index}
                                    onClick={() => removeIngredientFromPreparation(ingredient)}
                                    className="cursor-pointer bg-purple-500 text-white py-1 px-2 rounded shadow hover:bg-purple-600 truncate max-w-[150px] text-center"
                                    title={ingredient}
                                >
                                    {ingredient}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={createPotion}
                    disabled={ingredients.length !== 3}
                    className={`px-6 py-3 mb-8 text-lg font-semibold rounded-lg shadow ${
                        ingredients.length === 3
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                >
                    Valider la potion
                </button>

                {message && (
                    <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                    {inventory.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => addIngredient(item.name)}
                            disabled={item.quantity <= 0}
                            className={`p-4 rounded-lg shadow ${
                                item.quantity > 0 ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-400 text-gray-200'
                            }`}
                        >
                            {item.name} ({item.quantity})
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}