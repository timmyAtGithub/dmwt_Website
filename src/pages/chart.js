import React, { useState, useEffect } from 'react';
import ChartPage from '../components/ChartPage';
import PuffLoader from "react-spinners/PuffLoader";

export default function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('sessionToken'));
    if (sessionData) {
      setData(sessionData.macroData);
    }
  }, []);

  return (
    <div>
      <ChartPage data={data} />
      {loading && (
        <div className="loader-overlay">
          <PuffLoader color={"#ffffff"} loading={true} size={150} cssOverride={{}} />
        </div>
      )}
    </div>
  );
}
