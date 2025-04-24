import { NextResponse } from "next/server";
import { PrismaClient ,Prisma , $Enums} from "@prisma/client";

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


// Get bookings by date (required) and optional timePeriod
export async function GET(req: Request) {  



    
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");
        const timePeriod = searchParams.get("timePeriod");

        if (!date) {
            return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
        }

        // Define the filter with the correct type
        const whereClause: Prisma.BookingWhereInput = {
            date: new Date(date),
        };

        // Ensure timePeriod is a valid enum value before adding it
        if (timePeriod && Object.values($Enums.TimePeriod).includes(timePeriod as $Enums.TimePeriod)) {
            whereClause.timePeriod = timePeriod as $Enums.TimePeriod;
        }

        const bookings = await prisma.booking.findMany({ where: whereClause });
console.log('Received request:', {
    method: req.method,
    body: req.body,
    headers: req.headers,
  });
        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
          console.log('Received request:', {
    method: req.method,
    body: req.body,
    headers: req.headers,
    NextResponse.json({ error: (error as Error).message }, { status: 400 })
  });
        
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
