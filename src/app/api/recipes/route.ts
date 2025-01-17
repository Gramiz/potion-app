import { NextResponse } from 'next/server';
import { discoveredRecipes } from '../data';

export async function GET() {
    console.log("Recettes découvertes :", discoveredRecipes);
    return NextResponse.json({ recipes: discoveredRecipes });
}