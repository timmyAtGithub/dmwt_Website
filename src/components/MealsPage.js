import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageMapping from '../utils/imageMapping';
import { useRouter } from 'next/router';
import styles from '../styles/MealsPage.module.css';

const Modal = ({ dish, onClose, onEatToday }) => {
  const imageUrl = imageMapping[dish._id] ? `/images/${imageMapping[dish._id]}` : '/images/default.jpeg';
  return (
    <div className={styles.modal} onClick={onClose}>
      <img className={styles.modalImg} src={imageUrl} alt={dish.namegericht} />
      <div className={styles.modalText}>
        <h2>{dish.namegericht}</h2>
        <p>{dish.textbeschreibung}</p>
        <p>Kohlenhydrate: {dish.kolenhydrate}g</p>
        <p>Fette: {dish.fette}g</p>
        <p>Eiweiß: {dish.eiweiß}g</p>
        <p>Kalorien: {dish.kalorien}kcal</p>
        <button onClick={onEatToday}>Heute gegessen</button>
      </div>
    </div>
  );
};




const Dish = ({ dish, onClick }) => {
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

const DishList = ({ dishes, onDishClick }) => {
  return (
    <div className={styles.dishList}>
      {dishes.map((dish, index) => (
        <Dish key={index} dish={dish} onClick={onDishClick} />
      ))}
    </div>
  );
};

const RegisterBar = () => {
  const router = useRouter();
  const handleSignUp = () => {
    router.push('/registration');
  };

  return (
    <div className={styles.registerBar}>
      <h2>Werden Sie Mitglied</h2>
      <p>Melden Sie sich jetzt an, um exklusive Vorteile zu genießen!</p>
      <button className={styles.registerButton} onClick={handleSignUp}>
        Registrieren
      </button>
    </div>
  );
};

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('/api/meals');
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    

    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Session verification failed:', error);
      }
    };

    fetchMeals();
    verifySession();
  }, []);

  const handleDishClick = dish => {
    setSelectedDish(dish);
  };

  const handleCloseModal = () => {
    setSelectedDish(null);
  };

  const handleEatToday = async () => {
    if (!selectedDish || !user) return;

    const { kolenhydrate, eiweiß, fette, kalorien } = selectedDish;

    try {
      await axios.post('/api/eatToday', {
        userId: user.userId,  // Ensure correct user ID is used here
        carbs: parseFloat(kolenhydrate),
        protein: parseFloat(eiweiß),
        fat: parseFloat(fette),
        calories: parseFloat(kalorien),
      });
      alert('Kalorien hinzugefügt!');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding calories:', error);
      alert('Fehler beim Hinzufügen der Kalorien.');
    }
  };

  return (
    <div className={styles.app} style={{ overflow: user ? 'auto' : 'hidden', minHeight: '100vh' }}>
      <DishList dishes={meals} onDishClick={handleDishClick} />
      {!user && <RegisterBar />}
      {selectedDish && (
        <Modal dish={selectedDish} onClose={handleCloseModal} onEatToday={handleEatToday} />
      )}
      {selectedDish && <div className={styles.backdropBlur} onClick={handleCloseModal}></div>}
    </div>
  );
};

export default MealsPage;
