import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add new booking
// Add new booking
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const booking = await prisma.booking.create({ data });
        return NextResponse.json({ id: booking.id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

// Edit booking by ID
export async function PUT(req: Request) {
    try {
        const { id, ...data } = await req.json();
        const booking = await prisma.booking.update({ where: { id }, data });
        return NextResponse.json(booking, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

// Remove booking by ID
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.booking.delete({ where: { id } });
        return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
