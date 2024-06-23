import React from 'react';
import Exercise from './Exercise';
import styles from '../styles/ExerciseList.module.css';

const ExerciseList = ({ exercises, favorites, onExerciseClick, onToggleFavorite }) => {
  if (!exercises || exercises.length === 0) {
    return <p>Keine Übungen gefunden.</p>;
  }

  return (
    <div className={styles.exerciseList}>
      {exercises.map((exercise) => (
        <Exercise
          key={exercise._id}
          exercise={exercise}
          isFavorite={favorites.includes(exercise._id)}
          onClick={() => onExerciseClick(exercise)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
