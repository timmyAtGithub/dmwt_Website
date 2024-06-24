import React, { useState } from 'react';
import { Element, scroller } from 'react-scroll';
import Home from '../components/Home';
import Entscheidung from '../components/Entscheidung';
import InputPage from '../components/InputPage';
import ChartPage from '../components/ChartPage';
import styles from '../styles/index.module.css';

const IndexPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState([]);

  const handleWeiterClick = () => {
    setStep(step + 1);
    scrollToNextSection(step + 1);
  };

  const handleSetData = (inputData) => {
    setData(inputData);
    setStep(step + 1);
    scrollToNextSection(step + 1);
  };

  const scrollToNextSection = (step) => {
    const sectionNames = ['home', 'decision', 'input', 'chart'];
    if (step < sectionNames.length) {
      scroller.scrollTo(sectionNames[step], {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  };

  return (
    <div className={styles.container}>
      <Element name="home" className={styles.section}>
        <Home />
      </Element>
      <Element name="decision" className={styles.section}>
        <Entscheidung onWeiterClick={handleWeiterClick} />
      </Element>
    </div>
  );
};

export default IndexPage;
