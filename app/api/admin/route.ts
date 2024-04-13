import { getUserBySession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getUserBySession();
    if (user?.role === "USER") {
        return new NextResponse(null, { status: 403 })
    }
    if (user?.role === "ADMIN") {
        return new NextResponse(null, { status: 200 })
    }
}