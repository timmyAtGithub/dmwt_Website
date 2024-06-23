import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dbConnect from '@/utils/dbConnect';

const FilterComponent = () => {
  const [vegetarischfilter, setVegetarischfilter] = useState("");
  const [kalorienfilter, setKalorienfilter] = useState("");
  const [zielsetzung, setZielsetzung] = useState("");
  const [buttonValue, setButtonValue] = useState(0);

  var inhalt = "";
  var ziel = "";
  var kalorienmenge = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/meals'); 
        const data = response.data;

        //hier noch den bums wegen logik
        function veganoderned(vegetarischfilter){
          if (vegetarischfilter == "vegetarisch"){
          }
          else if (vegetarischfilter == "vegan"){
          }
          else {
          }
      }
    
      function kalorienvielodernicht(kalorienfilter){
        if (kalorienfilter == "kalorienviel"){
        }
        else if (kalorienfilter == "kalorienwenig"){
        }
        else {
        }
    }
    
    function wasdeinziel(zielsetzung){
      if (kalorienfilter == "muskelaufbau"){
      }
      else if (kalorienfilter == "gewichtsverlust"){
      }
      else {
      }
    }
    
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [vegetarischfilter, kalorienfilter, zielsetzung]); 

  
  const toggleButton = () => {
    setButtonValue(prevValue => (prevValue === 0 ? 1 : 0));
  };

  return (
    <div>
      <select value={vegetarischfilter} onChange={e => setVegetarischfilter(e.target.value)}>
        <option value="" disabled>Ernährungspräferenz</option>
        <option value="vegetarisch">Vegetarisch</option>
        <option value="vegan">Vegan</option>
        <option value="alle1">Alle Gerichte</option>
      </select>
      
      <select value={kalorienfilter} onChange={e => setKalorienfilter(e.target.value)}>
        <option value="" disabled>Kalorienmenge</option>
        <option value="kalorienviel">Kalorienarm</option>
        <option value="kalorienwenig">Kalorienreich</option>
        <option value="alle2">Alle Gerichte</option>
      </select>

      <select value={zielsetzung} onChange={e => setZielsetzung(e.target.value)}>
        <option value="" disabled>Ziel</option>
        <option value="muskelaufbau">Muskelaufbau</option>
        <option value="gewichtsverlust">Abnehmen</option>
        <option value="alle3">Alle Gerichte</option>
      </select>

      <button onClick={toggleButton}>
        {buttonValue === 0 ? "Favoriten" : "Alle Gerichte"}
      </button>
    </div>
  );
};

export default FilterComponent;
