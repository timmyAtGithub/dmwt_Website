import React from 'react';
import styles from '../styles/Filter.module.css';

const Filter = ({ filters, onFilterChange, showFavoritesOnly, onShowFavoritesOnlyChange }) => {
  return (
    <div className={styles.filterContainer}>
      <select name="inhalt" onChange={onFilterChange} value={filters.inhalt || ''}>
        <option value="">Inhalt</option>
        <option value="1">Vegetarisch</option>
        <option value="2">Vegan</option>
        <option value="3">Mit Fleisch</option>
      </select>
      <select name="kalorienmenge" onChange={onFilterChange} value={filters.kalorienmenge || ''}>
        <option value="">Kalorienmenge</option>
        <option value="1">Viele Kalorien</option>
        <option value="2">Wenige Kalorien</option>
      </select>
      <select name="ziel" onChange={onFilterChange} value={filters.ziel || ''}>
        <option value="">Ziel</option>
        <option value="1">Muskelaufbau</option>
        <option value="2">Abnehmen</option>
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

export default Filter;
