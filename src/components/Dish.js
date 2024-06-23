import React from 'react';
import styles from '../styles/Dish.module.css';
import imageMapping from '@/utils/imageMapping';

const Dish = ({ dish, onClick, onToggleFavorite, isFavorite }) => {
    const imageUrl = imageMapping[dish._id] ? `/images/${imageMapping[dish._id]}` : '/images/default.jpeg';
  return (
    <div className={styles.dish} onClick={() => onClick(dish)}>
      <img src={imageUrl} alt={dish.namegericht} className={styles.dishImg} />
      <div className={styles.dishContent}>
        <h2>{dish.namegericht}</h2>
        <p>{dish.textbeschreibung}</p>
      </div>
    </div>
  );
};

export default Dish;
