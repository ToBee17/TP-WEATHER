import { label, time } from "framer-motion/client";
import { useEffect, useState } from "react";

const weatherDescriptions = [
    { label: "Ciel clair", icon: '/src/components/icon/Sun.png', codes: [0] },
    { label: "Nuageux", icon: '/src/components/icon/Nuage.png', codes: [1, 2, 3] },
    { label: "Brouillard", icon: '/src/components/icon/Brouillard.png', codes: [45, 48, 51, 53, 55, 56, 57] },
    { label: "Pluie", icon: '/src/components/icon/Pluie.png', codes: [61, 63, 65, 66, 67] },
    { label: "Neige", icon: '/src/components/icon/Pluie.png', codes: [71, 73, 75, 77, 85, 86] },
    { label: "Averse", icon: '/src/components/icon/Averse.png', codes: [80, 81, 82] },
    { label: "Orage", icon: '/src/components/icon/Orage.png', codes: [95, 96, 99] },
];

const TimePeriod = [
    { label: 'matin', startTime: '06:00:00', endTime: '08:00:00', position: { top: '10%', left: '20%' } },
    { label: 'matinée', startTime: '08:00:00', endTime: '12:00:00', position: { top: '20%', left: '40%' } },
    { label: 'après-midi', startTime: '12:00:00', endTime: '18:00:00', position: { top: '30%', left: '60%' } },
    { label: 'soirée', startTime: '18:00:00', endTime: '21:00:00', position: { top: '40%', left: '80%' } },
    { label: 'nuit', startTime: '21:00:00', endTime: '06:00:00', position: { top: '50%', left: '90%' } },
];




export default function Weather({ }) {
    const [data, setData] = useState({});
    const [weatherDescription, setWeatherDescription] = useState("");

    const getWeatherDescription = (code) => {
        const weather = weatherDescriptions.find((weather) => weather.codes.includes(code));
        return weather ? weather.label : "Météo inconnue";
    }

    const getWeatherIcon = (code) => {
        const weather = weatherDescriptions.find((weather) => weather.codes.includes(code));
        return weather ? weather.icon : "Sun";
    }

    const getTimePeriod = (time) => {
        const currentTime = new Date(time).toTimeString().split(' ')[0];
        for (const period of TimePeriod) {
            const { startTime, endTime } = period;
            if (startTime < endTime) {
                if (currentTime >= startTime && currentTime < endTime) {
                    return period.label;
                }
            } else {
                if (currentTime >= startTime || currentTime < endTime) {
                    return period.label;
                }
            }
        }
        return "Période inconnue";
    };

    const fetchNewWeather = async () => {
        try {
            const response = await fetch("/json/data.json");
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNewWeather();
    }, []);

    const temperature = Math.round(data?.current.temperature_2m);
    const temperatureMax = Math.round(data?.daily.temperature_2m_max[0]);
    const temperatureMin = Math.round(data?.daily.temperature_2m_min[0]);


    return (
        <>
            <section className="h-screen flex flex-col items-center pt-10 gap-10 bg-background text-dark-blue">
                <h1 className="text-3xl font-bold text-center">Limoges</h1>
                <div className="flex flex-col gap-4">
                    <p className="text-5xl font-bold text-center">{temperature} {data?.current_units.temperature_2m}</p>
                    <div className="flex justify-center items-center gap-2"> 
                        <img src={getWeatherIcon(data?.daily.weather_code[0])} alt="" className="fill-black" /> <p className="text-center font-bold">{getWeatherDescription(data?.daily.weather_code[0])}</p>
                    </div>
                    <p className="font-bold">{temperatureMax}°C /{temperatureMin}°C Ressenti : {data?.current.apparent_temperature}°C</p>
                    <p className="font-bold">Heure : {new Date(data?.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>{getTimePeriod(data?.current.time)}</p>
                </div>
                    
                <div className="flex flex-col bg-dark-blue text-white font-bold p-8 rounded-xl gap-6">
                    <h2 className="text-xl">Aujourd'hui</h2>
                    <ul>li</ul>
                </div>

                <div className="w-80 h-80 rounded-full bg-orange absolute top-[80%] left-[10%]"> </div>
            </section>
        </>
    );
}


