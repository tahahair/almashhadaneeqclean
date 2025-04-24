import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// Create new uncompleted record
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const uncompleted = await prisma.uncompleted.create({ data });
    return NextResponse.json({ id: uncompleted.id }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// Update uncompleted record by ID
export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();
    const uncompleted = await prisma.uncompleted.update({
      where: { id },
      data,
    });
    return NextResponse.json(uncompleted, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// Delete uncompleted record by phone number
export async function DELETE(req: Request) {
  try {
    const { phone } = await req.json();
    await prisma.uncompleted.delete({ where: { phone } });
    return NextResponse.json({ message: 'Uncompleted entry deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

// Get uncompleted records before or equal to a specific date and not called
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'التاريخ مطلوب' }, { status: 400 });
    }

    const targetDate = new Date(date);
    targetDate.setHours(23, 59, 59, 999);

    const uncompleted = await prisma.uncompleted.findMany({
      where: {
        createdAt: { lte: targetDate },
        called: false,
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(uncompleted, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
