import Entscheidung from "./Entscheidung";

const Home = () => {
    return (
      <div className="home-container">
        {/* Header-Elemente der Home-Seite */}
        <div className="header-image-container">
          <img src="./images/home.jpg" alt="Header" className="header-image" />
          <h1 className="header-title">Mit der richtigen Ernährung zum Traumkörper</h1>
        </div>
        {/* Einfügen der Entscheidung-Komponente */}
        <Entscheidung />
      </div>
    );
  };