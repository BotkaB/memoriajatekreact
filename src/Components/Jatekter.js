import React, { useContext, useState } from 'react';
import { JatekContext } from '../Context/JatekContext';
import Kep from './Kep';
import Kezdokep from './Kezdokep';

export default function Jatekter() {
  const { jatekKepek, parokSzama, ParokSzamaBeallitas, jatekKezdese, lepesekSzama, nyert } = useContext(JatekContext);
  const [kezdodott, setKezdodott] = useState(false);

  function jatekInditas() {
    jatekKezdese();
    setKezdodott(true);
  }

  const sorokSzama = Math.ceil(Math.sqrt(jatekKepek.length)); // Sorok és oszlopok számának meghatározása

  return (
    <>
      {!kezdodott ? (
        <div>
          <button onClick={jatekInditas}>Játék kezdése</button>
          <Kezdokep />
        </div>
      ) : (
        <div>
          <div className="parvalaszto">
            <label htmlFor="parokSzama">Párok száma:</label>
            <input
              type="number"
              id="parokSzama"
              value={parokSzama}
              onChange={(e) => ParokSzamaBeallitas(e.target.value)}
              min="2"
              max="20"
            />
            <button onClick={jatekKezdese}>Új játék</button>
          </div>
          <h3>Lépések száma: {lepesekSzama}</h3>
          {nyert && <h2>{nyert}</h2>}
          <div className="kep-container">
            <table>
              <tbody>
                {Array.from({ length: sorokSzama }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {jatekKepek
                      .slice(rowIndex * sorokSzama, rowIndex * sorokSzama + sorokSzama)
                      .map((kep, index) => (
                        <td key={index}>
                          <Kep
                            id={kep.id}
                            url={kep.url}
                            hatterkep={`${process.env.PUBLIC_URL}/images/hatter.jpg`}
                            elrejtve={kep.elrejtve}
                          />
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
