import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/ExercisePage.module.css';
import ExerciseList from './ExerciseList';
import ModalS from './ModalS';
import FilterS from './FilterS';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [user, setUser] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('/api/exercises');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Session verification failed:', error);
        router.push('/loginPage');
      }
    };

    verifySession();
  }, [router]);

  useEffect(() => {
    document.body.classList.remove(styles.noScroll);
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/getFavoritesS?userId=${user.userId}`);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const handleToggleFavorite = async (exerciseId) => {
    if (!user) return;

    try {
      const response = await axios.post(`/api/favoritesS?userId=${user.userId}&exerciseId=${exerciseId}`);
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowFavoritesOnlyChange = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const applyFilters = (exercises) => {
    let filtered = exercises;

    if (filters.muscle) {
      filtered = filtered.filter((exercise) => exercise.muscle === filters.muscle);
    }

    return filtered;
  };

  const handleDoToday = async (exercise) => {
    if (!user) return;

    // Implement the logic to add the exercise to the user's daily log
    // For example, you can make an API call to update the user's log

    alert('Übung hinzugefügt!');
  };

  const filteredExercises = showFavoritesOnly
    ? applyFilters(exercises.filter((exercise) => favorites.includes(exercise._id)))
    : applyFilters(exercises);

  return (
    <div className={`${styles.app}`}>
      <FilterS
        filters={filters}
        onFilterChange={handleFilterChange}
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesOnlyChange={handleShowFavoritesOnlyChange}
        muscleOptions={[...new Set(exercises.map(ex => ex.muscle))]} // Get unique muscle options
      />
      <ExerciseList 
        exercises={filteredExercises} 
        favorites={favorites} 
        onExerciseClick={setSelectedExercise} 
        onToggleFavorite={handleToggleFavorite} 
      />
      {selectedExercise && (
        <ModalS
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
          onDoToday={() => handleDoToday(selectedExercise)} 
          onToggleFavorite={() => handleToggleFavorite(selectedExercise._id)}
          isFavorite={favorites.includes(selectedExercise._id)}
        />
      )}
      {selectedExercise && <div className={styles.backdropBlur} onClick={() => setSelectedExercise(null)}></div>}
    </div>
  );
};

export default ExercisesPage;
