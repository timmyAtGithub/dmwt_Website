import React from 'react';
import styles from '../styles/ModalS.module.css';

const ModalS = ({ exercise, onClose, onDoToday, onToggleFavorite, isFavorite }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalVideo}>
          <iframe 
            width="960" 
            height="540" 
            src={exercise.ytlink} 
            title={exercise.nameexercise} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.modalText}>
          <h2>{exercise.nameexercise}</h2>
          <p>{exercise.guide}</p>
          <p>Muskeln: {exercise.muscle}</p>
          <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(exercise._id); }}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalS;
