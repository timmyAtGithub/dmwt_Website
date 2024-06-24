import React, { useEffect } from 'react';
import imageMapping from '../utils/imageMapping';
import styles from '../styles/Modal.module.css';

const Modal = ({ dish, onClose, onEatToday, onToggleFavorite, isFavorite }) => {
  const imageUrl = imageMapping[dish._id] ? `/images/${imageMapping[dish._id]}` : '/images/default.jpeg';

  useEffect(() => {
    document.body.classList.add(styles.noScroll);

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, []);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img className={styles.modalImg} src={imageUrl} alt={dish.namegericht} />
        <div className={styles.modalText}>
          <h1>{dish.namegericht}</h1>
          <h2>Zutaten: </h2>
          <p>{dish.zutaten}</p>
          <h2>Rezept: </h2>
          <p>{dish.textrezept}</p>
          <p>Kohlenhydrate: {dish.kohlenhydrate}g</p>
          <p>Fette: {dish.fette}g</p>
          <p>Eiweiß: {dish.eiweiß}g</p>
          <p>Kalorien: {dish.kalorien}kcal</p>
          <button onClick={onEatToday}>Heute gegessen</button>
          <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(dish._id); }}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
