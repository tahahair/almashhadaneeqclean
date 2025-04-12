import { NextResponse } from "next/server";
import { PrismaClient  } from "@prisma/client";

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

// Remove booking by phone
export async function DELETE(req: Request) {
    try {
        const { phone } = await req.json();
        await prisma.uncompleted.delete({ where: { phone } });
        return NextResponse.json({ message: "Uncompleted entry deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

// Get uncompleted records before or equal to a specific date where called is false
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "التاريخ مطلوب" }, { status: 400 });
        }

        // تحويل التاريخ إلى نهاية اليوم (23:59:59.999) لجلب جميع السجلات حتى هذا اليوم
        const targetDate = new Date(date);

        targetDate.setHours(23, 59, 59, 999);

        const uncompleted = await prisma.uncompleted.findMany({
            where: {
            
                called: false, // فقط السجلات التي لم يتم الاتصال بها
            },
            orderBy: { createdAt: "asc" }, // ترتيب تصاعدي حسب الوقت
        });

        return NextResponse.json(uncompleted, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
