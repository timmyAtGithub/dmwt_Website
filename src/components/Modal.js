import React from 'react';
import imageMapping from '../utils/imageMapping';

import styles from '../styles/Modal.module.css';

const Modal = ({ dish, onClose, onEatToday, onToggleFavorite, isFavorite }) => {
    const imageUrl = imageMapping[dish._id] ? `/images/${imageMapping[dish._id]}` : '/images/default.jpeg';
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
        <img className={styles.modalImg} src={imageUrl} alt={dish.namegericht} />
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalText}>
          <h2>{dish.namegericht}</h2>
          <p>{dish.textbeschreibung}</p>
          <p>Kohlenhydrate: {dish.kolenhydrate}g</p>
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
