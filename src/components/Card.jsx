import { useEffect, useState } from "react";

export default function Card({ }) {
    const [data, setData] = useState({});

    const fetchNewAdvice = async () => {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNewAdvice();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-[80%] bg-bg-card rounded-lg px-6 py-8 relative">

            <p className="uppercase text-text-light tracking-widest text-xs font-semibold text-center">Advice #{data?.slip?.id}</p>
            <p className="text-center">"{data?.slip?.advice}"</p>

            <img className="w-full mb-8" src="./public/pattern-divider-mobile.svg" alt="" />

            <button className="bg-text-light p-5 rounded-full absolute bottom-[-32px] hover:shadow-[0_0px_15px] hover:shadow-text-light" onClick={fetchNewAdvice}>
                <img src="./public/icon-dice.svg" alt="" />
            </button>


        </div>
    );
}