import React, { useState } from 'react';
import styles from '../styles/Entscheidung.module.css'; 
import InputPage from './InputPage';

const Entscheidung = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [showInputPage, setShowInputPage] = useState(false);

  const handleImageClick = (image) => {
    setActiveImage(activeImage === image ? null : image);
  };

  const handleWeiterClick = () => {
    setShowInputPage(true);
  };

  if (showInputPage) {
    return <InputPage />;
  }

  return (
    <div className={styles.entscheidung}>
      <div className={`${styles['entscheidung-container']} ${activeImage ? styles['blur-background'] : ''}`}>
        <div className={`${styles['image-container']} ${activeImage === 'left' ? `${styles.active} ${styles.left}` : ''}`} onClick={() => handleImageClick('left')}>
          <div className={styles['text-box']}>
            <p>Eine optimale Ernährung für den Muskelaufbau erfordert ausreichend Protein zur Gewebereparatur und -entwicklung. Kohlenhydrate bieten Energie für das Training, während gesunde Fette den Hormonhaushalt unterstützen. Qualitativ hochwertige Kalorien sind entscheidend für das Muskelwachstum und die Regeneration nach dem Training. Essen von Nährstoffen aus Obst, Gemüse und Getreide trägt zur Energie bei.</p>
            <button className={styles['weiter-button']} onClick={handleWeiterClick}>Weiter</button>
          </div>
          <img src="./images/muscles.jpeg" alt="Muscles" className={styles.image} />
          <p className={styles.caption}>Muskelaufbau</p>
        </div>

        {!activeImage && <p className={styles['zwischen-text']}>Wählen Sie Ihr Ziel</p>} {/* Text only shown when no image is active */}

        <div className={`${styles['image-container']} ${activeImage === 'right' ? `${styles.active} ${styles.right}` : ''}`} onClick={() => handleImageClick('right')}>
          <div className={styles['text-box']}>
            <p>Eine ausgewogene Ernährung mit Kaloriendefizit hilft, Körperfett zu reduzieren und das Erscheinungsbild zu verbessern. Ausreichend Protein erhält Muskelmasse, während gesunde Fette und komplexe Kohlenhydrate den Stoffwechsel unterstützen. Nährstoffreiche Lebensmittel wie Obst, Gemüse und Vollkornprodukte fördern das Wohlbefinden und den Gewichtsverlust, indem sie langanhaltende Energie liefern.</p>
            <button className={styles['weiter-button']} onClick={handleWeiterClick}>Weiter</button>
          </div>
          <img src="./images/slim.jpeg" alt="Slim" className={styles.image} />
          <p className={styles.caption}>Abnehmen</p>
        </div>
      </div>
    </div>
  );
};

export default Entscheidung;
