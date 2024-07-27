import { NextResponse } from "next/server";

export async function GET() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=-8.10&lon=112.15&appid=${process.env.NEXT_OPENWEATHER_API_KEY}&lang=id&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[WEATHER] error fetching: ', error);
        return NextResponse.json({
            error: 'Failed to fetch weather data'
        }, {
            status: 500
        });
    }
}