import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageMapping from '../utils/imageMapping';
import { useRouter } from 'next/router';

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
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

    fetchMeals();
  }, []);

  const handleSignUp = () => {
    router.push('/registration');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-2xl">Gerichte für dich</div>
        <div>
          <button className="text-gray-300">Login</button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button className="bg-gray-700 p-2 rounded">Ziel1</button>
            <button className="bg-gray-700 p-2 rounded">Protein</button>
            <button className="bg-gray-700 p-2 rounded">Calories</button>
            <button className="bg-gray-700 p-2 rounded">Fav</button>
            <button className="bg-gray-700 p-2 rounded">???</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meals.map(meal => {
            const imageUrl = imageMapping[meal._id] ? `/images/${imageMapping[meal._id]}` : '/images/default.jpeg';
            return (
              <div key={meal._id} className="bg-gray-800 p-4 rounded">
                <img src={imageUrl} alt={meal.namegericht} className="w-full h-40 object-cover rounded" />
                <h2 className="text-xl mt-2">{meal.namegericht}</h2>
                <p>Kohlenhydrate: {meal.kolenhydrate}g</p>
                <p>Fette: {meal.fette}g</p>
                <p>Eiweiß: {meal.eiweiß}g</p>
                <p>Kalorien: {meal.kalorien}kcal</p>
                <p>Beschreibung: {meal.textbeschreibung}</p>
                <p>Rezept: {meal.textrezept}</p>
                <p>Zutaten: {meal.zutaten}</p>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="bg-gray-800 p-4 mt-4 text-center">
        <h2 className="text-2xl">Registrier dich jetzt!</h2>
        <p>Und erhalte Zugriff auf diese und weitere leckere Gerichte die dich auf dem Weg zu deinem Traumkörper unterstützen</p>
        <button className="bg-yellow-500 p-2 rounded mt-2" onClick={handleSignUp}>SIGN UP</button>
      </footer>
    </div>
  );
};

export default MealsPage;
