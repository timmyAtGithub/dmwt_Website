import React from 'react';
import styles from '../styles/Filter.module.css';

const FilterS = ({ filters, onFilterChange, showFavoritesOnly, onShowFavoritesOnlyChange, muscleOptions }) => {
  return (
    <div className={styles.filterContainer}>
      <select name="muscle" onChange={onFilterChange}>
        <option value="">Muskel</option>
        {muscleOptions.map(muscle => (
          <option key={muscle} value={muscle}>{muscle}</option>
        ))}
      </select>
      <label>
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={onShowFavoritesOnlyChange}
        />
        Nur Favoriten anzeigen
      </label>
    </div>
  );
};

export default FilterS;
