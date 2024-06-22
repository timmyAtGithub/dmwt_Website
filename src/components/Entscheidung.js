import React, { useState } from 'react';
import './Entscheidung.css'; 

const Entscheidung = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [gewuenscht, setGewuenscht] = useState(null);

  const handleImageClick = (image) => {
    setActiveImage(activeImage === image ? null : image);
  };

  const handleWeiterClick = () => {
    if (activeImage === 'left') {
      setGewuenscht(2);
    } else if (activeImage === 'right') {
      setGewuenscht(1);
    }
    alert(`Gewünschter Wert: ${gewuenscht}`);
  };

  return (
    <div className={`entscheidung-container ${activeImage ? 'blur-background' : ''}`}>
      <div className={`image-container ${activeImage === 'left' ? 'active' : ''}`} onClick={() => handleImageClick('left')}>
        <img src="./images/muscles.jpeg" alt="Muscles" className="image" />
        <p className="caption">Muskelaufbau</p>
        {activeImage === 'left' && (
          <div className="text-box" style={{left: '420px'}}>
            <p>Eine optimale Ernährung für den Muskelaufbau erfordert ausreichend Protein zur Gewebereparatur und -entwicklung. Kohlenhydrate bieten Energie für das Training, während gesunde Fette den Hormonhaushalt unterstützen. Qualitativ hochwertige Kalorien sind entscheidend für das Muskelwachstum und die Regeneration nach dem Training.</p>
          </div>
        )}
        {activeImage === 'left' && (
          <button className="weiter-button" onClick={handleWeiterClick}>Weiter</button>
        )}
      </div>

      <div className={`image-container ${activeImage === 'right' ? 'active' : ''}`} onClick={() => handleImageClick('right')}>
        <img src="./images/slim.jpeg" alt="Slim" className="image" />
        <p className="caption">Gewichtsverlust</p>
        {activeImage === 'right' && (
          <div className="text-box" style={{right: '420px'}}>
            <p>Eine ausgewogene Ernährung mit Kaloriendefizit hilft, Körperfett zu reduzieren und das Erscheinungsbild zu verbessern. Ausreichend Protein erhält Muskelmasse, während gesunde Fette und komplexe Kohlenhydrate den Stoffwechsel unterstützen. Nährstoffreiche Lebensmittel wie Obst, Gemüse und Vollkornprodukte fördern das Wohlbefinden und den Gewichtsverlust, indem sie langanhaltende Energie liefern.</p>
          </div>
        )}
        {activeImage === 'right' && (
          <button className="weiter-button" onClick={handleWeiterClick}>Weiter</button>
        )}
      </div>
    </div>
  );
};

export default Entscheidung;
