
import { SunIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

export async function WeatherCard() {
  const weather = await fetchWeatherData();

  if(!weather) {
    return (
      <div className="w-full h-24 flex items-center justify-center border border-input rounded-2xl">
            Data cuaca tidak tersedia
      </div>
    )
  }

  return (
        <Card className="w-full bg-primary">
      <CardContent className="flex flex-row justify-between items-center pt-6 text-white">
        <div className="flex flex-col gap-y-5 w-full">
          <div className="flex justify-between">
            <CardDescription className="text-md font-medium leading-none text-white">
              Blitar, Jawa Timur
            </CardDescription>
            <SunIcon height={24} width={24} className="animate-bounce" />
          </div>

          <div className="flex flex-row w-full items-center gap-x-5">
            <div className="flex flex-col items-center w-1/4 gap-y-1 md:gap-y-3">
              <CardTitle className="scroll-m-20 text-2xl md:text-5xl font-bold tracking-tight">
                {`${Math.round(weather.main.temp)} °C`}
              </CardTitle>
              <CardDescription className="text-sm lg:text-md font-medium leading-none text-white text-center">
                {weather.weather[0].description}
              </CardDescription>
            </div>
            <div className="grid grid-cols-3 w-3/4 gap-y-3">
              <div className="flex flex-col gap-y-2 text-center">
                <CardDescription className="text-xs lg:text-md font-light leading-none text-white">
                  Kelembapan
                </CardDescription>
                <CardDescription className="text-xs lg:text-md font-medium leading-none text-white">
                  {`${weather.main.humidity} %`}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-y-2 text-center">
                <CardDescription className="text-xs lg:text-md font-light leading-none text-white">
                  Tekanan
                </CardDescription>
                <CardDescription className="text-xs lg:text-md font-medium leading-none text-white">
                  {`${weather.main.pressure} hPa`}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-y-2 text-center">
                <CardDescription className="text-xs lg:text-md font-light leading-none text-white">
                  Angin
                </CardDescription>
                <CardDescription className="text-xs lg:text-md font-medium leading-none text-white">
                  {`${weather.wind.speed} m/s`}
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function fetchWeatherData() {
  const response = await fetch(`/api/weather`);

  if(!response.ok) {
    console.error('[WEATHER] Failed to fetch route');
    return;
  }

  const data = await response.json();
  return data;
}
