import { useQuery } from "@tanstack/react-query";
import type { Coordinates } from "../api/types";
import { weatherAPI } from "../api/weather";

export const WEATHER_KEYS={
    weather:(coords:Coordinates) => ['weather', coords] as const , /* coords will be unique for every location so the key will also be unique for every location */
    forecast:(coords:Coordinates) => ['forecast', coords] as const,
    location:(coords:Coordinates) => ['location', coords] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? {lat:0, lon:0}),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates, /* enabled only when coordinates are present */

    })
}

export function useForecastQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? {lat:0, lon:0}),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates, /* enabled only when coordinates are present */
    })
}

export function useReverseGeocodeQuery(coordinates: Coordinates|null){
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? {lat:0, lon:0}),
        queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates, /* enabled only when coordinates are present */
    })
}