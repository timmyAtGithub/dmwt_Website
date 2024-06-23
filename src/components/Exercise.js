import React from 'react';
import styles from '../styles/Exercise.module.css';
import imageMapping from '../utils/imageMapping';

const Exercise = ({ exercise, isFavorite, onClick, onToggleFavorite }) => {
  const imageUrl = imageMapping[exercise._id] ? `/images/${imageMapping[exercise._id]}` : '/images/default.jpeg';
  return (
    <div className={styles.exercise} onClick={onClick}>
      <img src={imageUrl} alt={exercise.nameexercise} className={styles.exerciseImg} />
      <div className={styles.exerciseDetails}>
        <h2>{exercise.nameexercise}</h2>
      </div>
    </div>
  );
};

export default Exercise;
