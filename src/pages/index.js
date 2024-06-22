import React, { useState } from 'react';
import InputPage from '../components/InputPage';
import PuffLoader from "react-spinners/PuffLoader";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <InputPage setData={setData} setLoading={setLoading} />
      {loading && (
        <div className="loader-overlay">
          <PuffLoader color={"#ffffff"} loading={true} size={150} cssOverride={{}} />
        </div>
      )}
    </div>
  );
}
