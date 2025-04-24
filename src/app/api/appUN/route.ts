import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// Get uncompleted records from today onwards that haven't been called
export async function GET() {
  try {
    // تحويل التاريخ إلى بداية اليوم (00:00:00.000)
    const targetDate = new Date();
    targetDate.setHours(0, 0, 0, 0);

    const uncompleted = await prisma.uncompleted.findMany({
      where: {
        createdAt: {
          gte: targetDate, // جلب السجلات من اليوم فصاعدًا
        },
        called: false, // فقط السجلات التي لم يتم الاتصال بها
      },
      orderBy: { createdAt: 'asc' }, // ترتيب تصاعدي حسب الوقت
    });

    return NextResponse.json(uncompleted, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
