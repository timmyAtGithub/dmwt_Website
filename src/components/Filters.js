import React from 'react';
import styles from '../styles/Filter.module.css';

const FilterS = ({ filters, onFilterChange, showFavoritesOnly, onShowFavoritesOnlyChange, muscleOptions }) => {
  return (
    <div className={styles.filterContainer}>
      <select name="muscle" onChange={onFilterChange} className={styles.dropdown}>
        <option value="">Muskel</option>
        {muscleOptions.map(muscle => (
          <option key={muscle} value={muscle}>{muscle}</option>
        ))}
      </select>
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={onShowFavoritesOnlyChange}
          className={styles.checkbox}
        />
        Nur Favoriten anzeigen
      </label>
    </div>
  );
};

export default FilterS;
