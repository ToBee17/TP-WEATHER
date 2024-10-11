import { label, time } from "framer-motion/client";
import { useEffect, useState } from "react";

const weatherDescriptions = [
    { label: "Ciel clair", icon: '/src/components/icon/Sun.png', mini_icon: '/src/components/icon/Sun2.png', codes: [0] },
    { label: "Nuageux", icon: '/src/components/icon/Nuage.png', mini_icon: '/src/components/icon/Nuage2.png', codes: [1, 2, 3] },
    { label: "Brouillard", icon: '/src/components/icon/Brouillard.png', mini_icon: '/src/components/icon/Brouillard2.png', codes: [45, 48, 51, 53, 55, 56, 57] },
    { label: "Pluie", icon: '/src/components/icon/Pluie.png', mini_icon: '/src/components/icon/PLuie2.png', codes: [61, 63, 65, 66, 67] },
    { label: "Neige", icon: '/src/components/icon/Pluie.png', mini_icon: '/src/components/icon/Pluie2.png', codes: [71, 73, 75, 77, 85, 86] },
    { label: "Averse", icon: '/src/components/icon/Averse.png', mini_icon: '/src/components/icon/Averse2.png', codes: [80, 81, 82] },
    { label: "Orage", icon: '/src/components/icon/Orage.png', mini_icon: '/src/components/icon/Orage2.png', codes: [95, 96, 99] },
];

const TimePeriod = [
    { label: '06:00', startTime: '06:00:00', endTime: '07:00:00', position: '-30%', periode: 'bg-matin' },
    { label: '07:00', startTime: '07:00:00', endTime: '08:00:00', position: '-10%', periode: 'bg-matin' },
    { label: '08:00', startTime: '08:00:00', endTime: '09:00:00', position: '10%', periode: 'bg-matin' },
    { label: '09:00', startTime: '09:00:00', endTime: '10:00:00', position: '30%', periode: 'bg-matin' },
    { label: '10:00', startTime: '10:00:00', endTime: '11:00:00', position: '50%', periode: 'bg-matin' },
    { label: '11:00', startTime: '11:00:00', endTime: '12:00:00', position: '70%', periode: 'bg-midi' },
    { label: '12:00', startTime: '12:00:00', endTime: '13:00:00', position: '85%', periode: 'bg-midi' },
    { label: '13:00', startTime: '13:00:00', endTime: '14:00:00', position: '70%', periode: 'bg-midi' },
    { label: '14:00', startTime: '14:00:00', endTime: '15:00:00', position: '50%', periode: 'bg-midi' },
    { label: '15:00', startTime: '15:00:00', endTime: '16:00:00', position: '30%', periode: 'bg-midi' },
    { label: '16:00', startTime: '16:00:00', endTime: '17:00:00', position: '10%', periode: 'bg-soir' },
    { label: '17:00', startTime: '17:00:00', endTime: '18:00:00', position: '-10%', periode: 'bg-soir' },
    { label: '18:00', startTime: '18:00:00', endTime: '19:00:00', position: '-30%', periode: 'bg-soir' },
    { label: '19:00', startTime: '19:00:00', endTime: '20:00:00', position: '-10%', periode: 'bg-soir' },
    { label: '20:00', startTime: '20:00:00', endTime: '21:00:00', position: '10%', periode: 'bg-soir' },
    { label: '21:00', startTime: '21:00:00', endTime: '22:00:00', position: '30%', periode: 'bg-nuit' },
    { label: '22:00', startTime: '22:00:00', endTime: '23:00:00', position: '50%', periode: 'bg-nuit' },
    { label: '23:00', startTime: '23:00:00', endTime: '00:00:00', position: '70%', periode: 'bg-nuit' },
    { label: '00:00', startTime: '00:00:00', endTime: '01:00:00', position: '85%', periode: 'bg-nuit' },
    { label: '01:00', startTime: '01:00:00', endTime: '02:00:00', position: '70%', periode: 'bg-nuit' },
    { label: '02:00', startTime: '02:00:00', endTime: '03:00:00', position: '50%', periode: 'bg-nuit' },
    { label: '03:00', startTime: '03:00:00', endTime: '04:00:00', position: '30%', periode: 'bg-nuit' },
    { label: '04:00', startTime: '04:00:00', endTime: '05:00:00', position: '10%', periode: 'bg-nuit' },
    { label: '05:00', startTime: '05:00:00', endTime: '06:00:00', position: '-10%', periode: 'bg-nuit' },
];

export default function Weather({ }) {
    const [data, setData] = useState({});
    const [weatherDescription, setWeatherDescription] = useState("");
    const [loading, setLoading] = useState(true);

    const getWeatherDescription = (code) => {
        const weather = weatherDescriptions.find((weather) => weather.codes.includes(code));
        return weather ? weather.label : "Météo inconnue";
    }

    const getWeatherIcon = (code) => {
        const weather = weatherDescriptions.find((weather) => weather.codes.includes(code));
        return weather ? weather.icon : "Sun";
    }

    const getWeatherMiniIcon = (code) => {
        const weather = weatherDescriptions.find((weather) => weather.codes.includes(code));
        return weather ? weather.mini_icon : "Sun2";
    }

    const getTimePeriodPosition = (time) => {
        const currentTime = new Date(time).toTimeString().split(' ')[0];
        for (const period of TimePeriod) {
            const { startTime, endTime, position } = period;
            if (startTime < endTime) {
                if (currentTime >= startTime && currentTime < endTime) {
                    return position;
                }
            } else {
                if (currentTime >= startTime || currentTime < endTime) {
                    return position;
                }
            }
        }
        return "Position inconnue";
    };

    const getPeriod = (time) => {
        const currentTime = new Date(time).toTimeString().split(' ')[0];
        for (const period of TimePeriod) {
            const { startTime, endTime, periode } = period;
            if (startTime < endTime) {
                if (currentTime >= startTime && currentTime < endTime) {
                    return periode;
                }
            } else {
                if (currentTime >= startTime || currentTime < endTime) {
                    return periode;
                }
            }
        }
        return "Période inconnue";
    }

    const fetchNewWeather = async () => {
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=45.8336&longitude=1.2476&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=1");
            const data = await response.json();
            setData(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewWeather();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    const temperature = Math.round(data?.current.temperature_2m);
    const temperatureMax = Math.round(data?.daily.temperature_2m_max[0]);
    const temperatureMin = Math.round(data?.daily.temperature_2m_min[0]);

    return (
        <>
            <section className="h-screen flex flex-col items-center pt-10 gap-10 bg-background text-dark-blue">
                <h1 className="text-3xl font-bold text-center z-10">Limoges</h1>
                <div className="flex flex-col gap-4 z-10">
                    <p className="text-6xl font-bold text-center">{temperature} {data?.current_units.temperature_2m}</p>
                    <div className="flex justify-center items-center gap-2"> 
                        <img src={getWeatherIcon(data?.daily.weather_code[0])} alt="" className="fill-black" /> <p className="text-center font-bold">{getWeatherDescription(data?.daily.weather_code[0])}</p>
                    </div>
                    <p className="font-bold">{temperatureMax}°C /{temperatureMin}°C Ressenti : {data?.current.apparent_temperature}°C</p>
                </div>
                    
                <div className="flex flex-col bg-dark-blue text-white font-bold p-8 rounded-xl gap-6 z-10">
                    <h2 className="text-xl text-center">Aujourd'hui</h2>
                    <ul className="max-h-60 overflow-hidden overflow-y-auto">
                        {data?.hourly.time.map((time, index) => (
                            <li key={index} className="flex gap-2 items-center font-normal text-lg">
                                <p className="font-bold">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <p>{Math.round(data?.hourly.temperature_2m[index])}°C</p>
                                <img src={getWeatherMiniIcon(data?.hourly.weather_code[index])} alt="icon_météo" />
                                <p>{data?.hourly.relative_humidity_2m[index]}%</p>
                                <img src="/src/components/icon/humidite.png" alt="icon_eau" />
                                <p>{Math.round(data?.hourly.wind_speed_10m[index])}Km/h</p>
                                <img src="/src/components/icon/vent.png" alt="icon_wind"/>
                            </li>))}
                    </ul>
                </div>
            </section>

            <div className={`w-80 h-80 rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center ${getPeriod(data?.current.time)}`} style={{ bottom: getTimePeriodPosition(data?.current.time),}}></div>
        </>
    );
}
