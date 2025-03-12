import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

 
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const uncompleted = await prisma.uncompleted.create({ data });
        return NextResponse.json({ id: uncompleted.id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

// Edit booking by ID
export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();
        const uncompleted = await prisma.uncompleted.update({ where: { id }, data });
        return NextResponse.json(uncompleted, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

// Remove booking by ID
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.uncompleted.delete({ where: { id } });
        return NextResponse.json({ message: "uncompleted deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
