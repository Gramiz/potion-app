import { NextResponse } from 'next/server';

let inventory = [
    { name: 'Argent', quantity: Math.floor(Math.random() * 100) },
    { name: 'Bave de lama', quantity: Math.floor(Math.random() * 100) },
    { name: 'Épine de hérisson', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Plume de griffon', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Hélium liquide', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Poil de yéti', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Or', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Azote liquide', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Queue d\'écureuil', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Crin de licorne', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Jus de Horglup', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Noix de coco', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Yttrium', quantity:  Math.floor(Math.random() * 100) },
    { name: 'Mandragore', quantity:  Math.floor(Math.random() * 100) },
];

export async function GET() {
    return NextResponse.json(inventory);
}

export async function POST(request: Request) {
    const { name, quantity } = await request.json();

    const ingredient = inventory.find((item) => item.name === name);
    if (ingredient) {
        ingredient.quantity += quantity;
    }

    return NextResponse.json(inventory);
}

export async function PUT() {
    inventory = inventory.map((item) => ({
        ...item,
        quantity: Math.floor(Math.random() * 100) + 1,
    }));

    return NextResponse.json({ message: 'Inventaire rechargé avec succès.', inventory });
}