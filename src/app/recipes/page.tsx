'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function RecipesPage() {
    const [potions, setPotions] = useState<{ name: string; createdAt: string }[]>([]);
    const [recipes, setRecipes] = useState<{ name: string; ingredients: string[] }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPotionsAndRecipes = async () => {
            try {
                setLoading(true);

                const potionsResponse = await axios.get('/api/potions');
                setPotions(potionsResponse.data.potions);

                const recipesResponse = await axios.get('/api/recipes');
                setRecipes(recipesResponse.data.recipes);
            } catch (err) {
                console.error('Erreur lors de la récupération des données :', err);
                setError('Impossible de charger les données.');
            } finally {
                setLoading(false);
            }
        };

        fetchPotionsAndRecipes();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Chargement des données...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-xl font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="p-8 bg-gray-100 min-h-screen">
                <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-8">
                    Recettes Découvertes & Potions Créées
                </h1>

                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Potions Créées</h2>
                    {potions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {potions.map((potion, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{potion.name}</h3>
                                    <p className="text-gray-600">
                                        Créée le :{' '}
                                        <span className="font-medium text-purple-600">
                                            {new Date(potion.createdAt).toLocaleString()}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Aucune potion n'a encore été créée.</p>
                    )}
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Recettes Découvertes</h2>
                    {recipes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                                    <p className="text-gray-600">
                                        Ingrédients :{' '}
                                        <span className="font-medium text-purple-600">
                                            {recipe.ingredients.join(', ')}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Aucune recette n'a encore été découverte.</p>
                    )}
                </section>
            </div>
        </>
    );
}