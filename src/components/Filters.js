import React from 'react';
import styles from '../styles/Filters.module.css';

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.filters}>
      <select name="inhalt" value={filters.inhalt || ''} onChange={handleFilterChange}>
        <option value="">Alle Inhalte</option>
        <option value="1">Vegetarisch</option>
        <option value="2">Vegan</option>
        <option value="3">Mit Fleisch</option>
      </select>
      <select name="ziel" value={filters.ziel || ''} onChange={handleFilterChange}>
        <option value="">Alle Ziele</option>
        <option value="1">Muskelaufbau</option>
        <option value="2">Abnehmen</option>
      </select>
      <select name="kalorienmenge" value={filters.kalorienmenge || ''} onChange={handleFilterChange}>
        <option value="">Alle Kalorienmengen</option>
        <option value="1">Viele Kalorien</option>
        <option value="2">Wenig Kalorien</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="onlyFavorites"
          checked={filters.onlyFavorites || false}
          onChange={(e) => setFilters({ ...filters, onlyFavorites: e.target.checked })}
        />
        Nur Favoriten
      </label>
    </div>
  );
};

export default Filters;
