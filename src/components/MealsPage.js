import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/MealsPage.module.css';
import DishList from './DishList';
import RegisterBar from './RegisterBar';
import Modal from './Modal';
import Filter from './Filter';

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [user, setUser] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Session verification failed:', error);
      }
    };

    verifySession();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let response;
        if (user) {
          response = await axios.get('/api/meals');
        } else {
          response = await axios.get('/api/meals');
          const limitedMeals = response.data.slice(0, 3);
          setMeals(limitedMeals);
          return;
        }
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [user]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/getFavorites?userId=${user.userId}`);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    if (!user) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [user]);

  const handleToggleFavorite = async (dishId) => {
    if (!user) return;

    try {
      const response = await axios.post(`/api/favorites?userId=${user.userId}&dishId=${dishId}`);
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

  const applyFilters = (meals) => {
    let filtered = meals;

    if (filters.inhalt) {
      filtered = filtered.filter((meal) => meal.inhalt === filters.inhalt);
    }

    if (filters.kalorienmenge) {
      filtered = filtered.filter((meal) => meal.kalorienmenge === filters.kalorienmenge);
    }

    if (filters.ziel) {
      filtered = filtered.filter((meal) => meal.ziel === filters.ziel);
    }

    return filtered;
  };

  const handleEatToday = async (dish) => {
    if (!user) return;

    const { kohlenhydrate, eiweiß, fette, kalorien } = dish;

    try {
      const response = await axios.post('/api/eatToday', {
        userId: user.userId,
        carbs: parseFloat(kohlenhydrate),
        protein: parseFloat(eiweiß),
        fat: parseFloat(fette),
        calories: parseFloat(kalorien),
      });
      alert('Kalorien hinzugefügt!');
    } catch (error) {
      console.error('Error adding calories:', error);
      alert('Fehler beim Hinzufügen der Kalorien.');
    }
  };

  const filteredMeals = showFavoritesOnly
    ? applyFilters(meals.filter((meal) => favorites.includes(meal._id)))
    : applyFilters(meals);

  return (
    <div className={`${styles.app}`}>
      <Filter
        filters={filters}
        onFilterChange={handleFilterChange}
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesOnlyChange={handleShowFavoritesOnlyChange}
      />
      <DishList 
        dishes={filteredMeals} 
        favorites={favorites} 
        onDishClick={setSelectedDish} 
        onToggleFavorite={handleToggleFavorite} 
      />
      {!user && <RegisterBar />}
      {selectedDish && (
        <Modal 
        dish={selectedDish} 
        onClose={() => {
          setSelectedDish(null);
          document.body.classList.remove(styles.noScroll);
        }} 
        onEatToday={() => handleEatToday(selectedDish)} 
        onToggleFavorite={() => handleToggleFavorite(selectedDish._id)}
        isFavorite={favorites.includes(selectedDish._id)}
      />
      
      )}
      {selectedDish && <div className={styles.backdropBlur} onClick={() => setSelectedDish(null)}></div>}
    </div>
  );
};

export default MealsPage;
