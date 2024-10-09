import { useEffect, useState } from "react";
import Phone from "./components/icon/phone";
import Mail from "./components/icon/Mail";
import Date from "./components/icon/Date";
import Position from "./components/icon/Position";
import Lock from "./components/icon/Lock";


export default function Card({ }) {
    const [data, setData] = useState({});


    const fetchNewUser = async () => {
        try {
            const response = await fetch("https://randomuser.me/api/?results=9");
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNewUser();
    }, []);

    if (!data?.results) {
        return (<p>Loading...</p>);
    }

    return (
        <>
            <div className="h-screen flex flex-wrap justify-center items-center bg-white gap-10 p-20">

                {data?.results.map((user) => (
                    <section className="flex flex-col bg-background text-white p-7 gap-5 rounded-2xl h-[20.5rem] aspect-square">


                        <ul className="flex  items-center gap-4"><img className="w-fit max-w-[100px] rounded-full" src={user.picture.large} alt="Picture Profile" />
                            <p className="text-xl font-bold w-full text-center max-w-[160px]">{user.name.first} {user.name.last}</p></ul>

                        <div className="flex flex-col gap-2 max-w-[272px]">
                            <ul className="flex gap-4"><Phone className="size-5 min-w-fit" /> <p className="truncate ">{user.phone}</p></ul>
                            <ul className="flex gap-4"><Mail className="size-5 min-w-fit" /> <p className="truncate ">{user.email}</p></ul>
                            <ul className="flex gap-4"><Date className="size-5 min-w-fit" /> <p className="truncate ">{user.dob.date}</p></ul>
                            <ul className="flex gap-4 "><Position className="size-5 min-w-fit" />  <p className="truncate">{user.location.street.number} {user.location.street.name}, {user.location.country}</p></ul>
                            <ul className="flex gap-4"><Lock className="size-5 min-w-fit" /> <p className="truncate ">{user.login.password}</p></ul>
                        </div>

                    </section>
                ))}

            </div>

        </>
    );
}