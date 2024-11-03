import React, { useContext } from 'react';
import { JatekContext } from '../Context/JatekContext';

export default function Kezdokep() {
  const { kepek } = useContext(JatekContext);

  return (
    < div className="kep-container">
      {kepek.filter((kep) => kep.id !== 0).map((kep) => (
        <img key={kep.id} src={kep.url} alt={`Kép ${kep.id}`}  className="kezdo-kep"  />
      ))}
    </div>
  );
}


