import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from '../styles/Entscheidung.module.css'; 
import InputPage from './InputPage';

const Entscheidung = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [showInputPage, setShowInputPage] = useState(false);
  const [gewuenscht, setGewuenscht] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleImageClick = (image) => {
    setActiveImage(activeImage === image ? null : image);
  };

  const handleWeiterClick = () => {
    if (activeImage === 'left') {
      setShowInputPage(true);
      setGewuenscht(2);
    } else if (activeImage === 'right') {
      setShowInputPage(true);
      setGewuenscht(1);
    }
  };

  if (showInputPage) {
    return <InputPage gewuenscht={gewuenscht} />;
  }

  if (isMobile) {
    return (
      <div className={styles.entscheidung}>
        <div className={styles['entscheidung-container']}>
          <div className={`${styles['image-container']} ${activeImage === 'left' ? styles.active : ''}`} onClick={() => handleImageClick('left')}>
            <img src="./images/muscles.jpeg" alt="Muscles" className={styles.image} />
            <p className={styles.caption}>Muskelaufbau</p>
            {activeImage === 'left' && (
              <>
                <div className={styles['text-box']} style={{ top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }}>
                  <p>Eine optimale Ernährung für den Muskelaufbau erfordert ausreichend Protein zur Gewebereparatur und -entwicklung. Kohlenhydrate bieten Energie für das Training, während gesunde Fette den Hormonhaushalt unterstützen. Qualitativ hochwertige Kalorien sind entscheidend für das Muskelwachstum und die Regeneration nach dem Training. Essen von Nährstoffen aus Obst, Gemüse und Getreide trägt zur Energie bei.</p>
                </div>
              </>
            )}
          </div>

          {!activeImage && <p className={styles['zwischen-text']}>Wählen Sie Ihr Ziel</p>}

          <div className={`${styles['image-container']} ${activeImage === 'right' ? styles.active : ''}`} onClick={() => handleImageClick('right')}>
            <img src="./images/slim.jpeg" alt="Slim" className={styles.image} />
            <p className={styles.caption}>Abnehmen</p>
            {activeImage === 'right' && (
              <>
                <div className={styles['text-box']} style={{ bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)' }}>
                  <p>Eine ausgewogene Ernährung mit Kaloriendefizit hilft, Körperfett zu reduzieren und das Erscheinungsbild zu verbessern. Ausreichend Protein erhält Muskelmasse, während gesunde Fette und komplexe Kohlenhydrate den Stoffwechsel unterstützen. Nährstoffreiche Lebensmittel wie Obst, Gemüse und Vollkornprodukte fördern das Wohlbefinden und den Gewichtsverlust, indem sie langanhaltende Energie liefern.</p>
                </div>
                <button className={styles['weiter-button']} onClick={handleWeiterClick}>Weiter</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.entscheidung}>
      <div className={`${styles['entscheidung-container']} ${activeImage ? styles['blur-background'] : ''}`}>
        <div className={`${styles['image-container']} ${activeImage === 'left' ? `${styles.active} ${styles.left}` : ''}`} onClick={() => handleImageClick('left')}>
          <img src="./images/muscles.jpeg" alt="Muscles" className={styles.image} />
          <p className={styles.caption}>Muskelaufbau</p>
          {activeImage === 'left' && (
            <>
              <div className={styles['text-box']}>
                <p>Eine optimale Ernährung für den Muskelaufbau erfordert ausreichend Protein zur Gewebereparatur und -entwicklung. Kohlenhydrate bieten Energie für das Training, während gesunde Fette den Hormonhaushalt unterstützen. Qualitativ hochwertige Kalorien sind entscheidend für das Muskelwachstum und die Regeneration nach dem Training. Essen von Nährstoffen aus Obst, Gemüse und Getreide trägt zur Energie bei.</p>
              </div>
            </>
          )}
        </div>

        {!activeImage && <p className={styles['zwischen-text']}>Wählen Sie Ihr Ziel</p>}

        <div className={`${styles['image-container']} ${activeImage === 'right' ? `${styles.active} ${styles.right}` : ''}`} onClick={() => handleImageClick('right')}>
          <img src="./images/slim.jpeg" alt="Slim" className={styles.image} />
          <p className={styles.caption}>Abnehmen</p>
          {activeImage === 'right' && (
            <>
              <div className={styles['text-box']}>
                <p>Eine ausgewogene Ernährung mit Kaloriendefizit hilft, Körperfett zu reduzieren und das Erscheinungsbild zu verbessern. Ausreichend Protein erhält Muskelmasse, während gesunde Fette und komplexe Kohlenhydrate den Stoffwechsel unterstützen. Nährstoffreiche Lebensmittel wie Obst, Gemüse und Vollkornprodukte fördern das Wohlbefinden und den Gewichtsverlust, indem sie langanhaltende Energie liefern.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Entscheidung;
