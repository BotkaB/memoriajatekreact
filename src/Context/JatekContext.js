import React, { createContext, useState, useRef } from 'react';
import kepek from '../Adatok';
export const JatekContext = createContext();

export const JatekProvider = ({ children }) => {
    const [megforditottKepek, setMegforditottKepek] = useState([]);
    const [parokSzama, setParokSzama] = useState(4);
    const [jatekKepek, setJatekKepek] = useState([]);
    const [lepesekSzama, setLepesekSzama] = useState(0);
    const [nyert, setNyert] = useState("");
    const [elteltIdo, setElteltIdo]=useState("");
    const idozitoRef=useRef(null);
  

    function KepMegforditas(id) {
        if (megforditottKepek.length === 2) {
            return;
        }

        const tombElozoAllapot = [...megforditottKepek, id];
        setMegforditottKepek(tombElozoAllapot);
        if (tombElozoAllapot.length === 2) {
            const ujLepes = lepesekSzama + 1;
            setLepesekSzama(ujLepes)
            setTimeout(() => {
                ellenorzes(tombElozoAllapot);
            }, 1500);
        }
    }

    function ellenorzes(tomb = []) {
        const [elsoId, masodikId] = tomb;
        const elsoKep = jatekKepek.find(kep => kep.id === elsoId);
        const masodikKep = jatekKepek.find(kep => kep.id === masodikId);


        if (elsoKep.originalId !== masodikKep.originalId) {
            setMegforditottKepek([]);
        } else {

            const modositottJatekKepek = jatekKepek.map(kep => {
                if (kep.id === elsoId || kep.id === masodikId) {
                    return { ...kep, elrejtve: true };
                }
                return kep;
            });

            setJatekKepek(modositottJatekKepek);
            setMegforditottKepek([]);

            const mindenKepElrejtve = modositottJatekKepek.every(kep => kep.elrejtve);
            if (mindenKepElrejtve) {
                clearInterval(idozitoRef.current);
                setNyert("Gratulálok, nyertél!");

            }
        }
    }

        function ParokSzamaBeallitas(ertek) {
            setParokSzama(parseInt(ertek));

        }

        function jatekKezdese() {
            setMegforditottKepek([]);
            setJatekKepek([]);
            setLepesekSzama(0);
            setNyert("");
            if (idozitoRef.current) {
                clearInterval(idozitoRef.current);
            }
          
          
           setElteltIdo("");
            
           
            let elteltMP=0;
            idozitoRef.current=setInterval(() => {
        
               
                let perc = parseInt(elteltMP / 60);
                let mp = elteltMP % 60;
                setElteltIdo(`${perc < 10 ? "0" + perc : perc}:${mp < 10 ? "0" + mp : mp}`);
                elteltMP++;
               
                
            }, 1000);
           
            const kepekValasztottak = kepek.slice(1, parokSzama + 1);
            let egyediId = 1; // Egyedi azonosítók létrehozása
            const duplikaltKepek = [...kepekValasztottak, ...kepekValasztottak].map(kep => ({
                ...kep,
                originalId: kep.id, // Az eredeti azonosító megtartása
                id: egyediId++ // Új egyedi azonosítók hozzárendelése
            }));
            const kevertKepek = duplikaltKepek.sort(() => Math.random() - 0.5);

            setJatekKepek(kevertKepek);

        }            

        return (
            <JatekContext.Provider value={{ kepek, megforditottKepek, parokSzama, jatekKepek, KepMegforditas, ParokSzamaBeallitas, jatekKezdese, lepesekSzama, nyert, elteltIdo }}>
                {children}
            </JatekContext.Provider>
        )
    }