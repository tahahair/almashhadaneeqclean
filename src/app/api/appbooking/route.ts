import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// Get bookings from today onwards
export async function GET() {  
  try {
    // الحصول على تاريخ اليوم مع ضبط الساعة على 00:00:00 لتجاهل الوقت
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ضبط الوقت على بداية اليوم

    // جلب الحجوزات من اليوم وما بعده
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: today, // جلب الحجوزات التي تاريخها أكبر من أو يساوي تاريخ اليوم
        }
      }
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
