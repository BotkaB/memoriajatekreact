import React, { useContext } from 'react';
import { JatekContext } from '../Context/JatekContext';


export default function Kep({ id, url, hatterkep, elrejtve }) {
    const { megforditottKepek, KepMegforditas } = useContext(JatekContext);
    const megforditva = megforditottKepek.includes(id);

    function kattintas() {

        KepMegforditas(id);
    }
console.log("hello")
    return (
        <>
            {elrejtve ? (
                <img src={url} alt="Memóriajáték kép" className=" kep kep-elrejtve" />
            ) : (
                megforditva ? (
                    <img src={url} alt="Memóriajáték kép" className="kep" />
                ) : (
                    <img src={hatterkep} alt="Háttérkép" className="kep" onClick={kattintas} />
                )
            )}
       </>
    );
}


