import { NextResponse } from 'next/server';
import { recipes, potions, discoveredRecipes } from '../data';

export async function POST(request: Request) {
    try {
        const { ingredients } = await request.json();

        if (!Array.isArray(ingredients) || ingredients.length !== 3) {
            return NextResponse.json(
                { error: 'La recette doit contenir exactement 3 ingrédients.' },
                { status: 400 }
            );
        }

        const potionName = Object.keys(recipes).find((key) =>
            JSON.stringify(recipes[key].sort()) === JSON.stringify(ingredients.sort())
        );

        if (!potionName) {
            return NextResponse.json(
                { message: 'Aucune potion correspondante trouvée pour cette combinaison.', success: false },
                { status: 200 }
            );
        }

        potions.push({ name: potionName, createdAt: new Date().toISOString() });

        if (!discoveredRecipes.some((recipe) => recipe.name === potionName)) {
            discoveredRecipes.push({ name: potionName, ingredients: recipes[potionName] });
            console.log(`Recette découverte ajoutée : ${potionName}`);
        } else {
            console.log(`Recette déjà découverte : ${potionName}`);
        }

        return NextResponse.json({
            message: `Potion "${potionName}" créée avec succès !`,
            success: true,
        });
    } catch (error) {
        console.error('Erreur serveur :', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création de la potion.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ potions });
}