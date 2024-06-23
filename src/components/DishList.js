import React from 'react';
import styles from '../styles/DishList.module.css';
import Dish from './Dish';

const DishList = ({ dishes, favorites, onDishClick, onToggleFavorite }) => {
  return (
    <div className={styles.dishList}>
      {dishes.map((dish) => (
        <Dish
          key={dish._id}
          dish={dish}
          isFavorite={favorites.includes(dish._id)}
          onClick={() => onDishClick(dish)}
          onToggleFavorite={(e) => {
            e.stopPropagation();
            onToggleFavorite(dish._id);
          }}
        />
      ))}
    </div>
  );
};

export default DishList;
