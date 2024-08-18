import React, { useEffect, useState } from "react";
import Header from "./Header";

function Taches({
  taches,
  setTaches,
  setBtnModal,
  setModale,
  handleModifierClick,
}) {
  const [sousTaches, setSousTaches] = useState([]);
  const [wrap, setWrap] = useState(taches.map(() => true));
  const [fini, setFini] = useState(taches.map(() => true));

  useEffect(() => {
    fetch("http://localhost:3000/api/soustaches")
      .then((response) => response.json())
      .then((data) => setSousTaches(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error),
      );
  }, []);

  useEffect(() => {
    setWrap(taches.map(() => true));
    setFini(taches.map(() => false)); // Vous pouvez ajuster l'état fini si nécessaire
  }, [taches]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/taches/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la tâche");
      }

      const updatedTaches = taches.filter((tache) => tache.id !== id);
      setTaches(updatedTaches);
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
    }
  };

  const handleClick = (tache) => {
    setBtnModal("modifier");
    setModale(true);
    handleModifierClick(tache);
  };

  const handleDragStart = (e, position) => {
    e.dataTransfer.setData("position", position);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, position) => {
    e.preventDefault();
    const draggedPosition = e.dataTransfer.getData("position");
    const draggedItem = taches[draggedPosition];

    let updatedTaches = [...taches];
    updatedTaches.splice(draggedPosition, 1);
    updatedTaches.splice(position, 0, draggedItem);

    setTaches(updatedTaches);
  };

  const handleDeroulerClick = (index) => {
    setWrap((prevWrap) =>
      prevWrap.map((value, i) => (i === index ? !value : value)),
    );
  };

  const handleFiniClick = (index) => {
    setFini((prevFini) =>
      prevFini.map((value, i) => (i === index ? !value : value)),
    );
  };

  return (
    <div className="text">
      <ul
        className="liste-tache"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, taches.length)}
      >
        {taches.map((tache, index) => {
          const delay = `${index / 10}s`;
          const animationStyle = {
            animation: `slide 0.5s ${delay} ease-in-out both`,
          };

          return (
            <li
              key={tache.id}
              style={animationStyle}
              className={wrap[index] ? "" : "liste-todo"}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
            >
              <input
                type="checkbox"
                onChange={() => handleFiniClick(index)}
              ></input>
              <section className={fini[index] ? "fini" : ""}>
                <p>
                  <strong>{tache.titre}</strong>:
                </p>
                <p>{tache.description}</p>
              </section>
              <section className="section-action-liste">
                <button
                  className="btn-desktop-modifier"
                  onClick={() => handleClick(tache)}
                >
                  <img src="modifier.png" alt="modifier" />
                </button>
                <section className="action">
                  <button
                    className="btn-mobile-modifier"
                    onClick={() => handleClick(tache)}
                  >
                    <img src="modifier.png" alt="modifier" />
                  </button>
                  <button onClick={() => handleDelete(tache.id)}>
                    <img src="supprimer.png" alt="supprimer" />
                  </button>
                </section>
              </section>
              <button
                onClick={() => handleDeroulerClick(index)}
                className="derouler-arrow"
                type="button"
              >
                <img src="derouler.png" alt="derouler" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Taches;
