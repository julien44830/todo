import React, { useEffect, useState } from "react";

function Taches({ taches }) {
    const [sousTaches, setSousTaches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/soustaches")
            .then((response) => response.json())
            .then((data) => {
                setSousTaches(data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des données:",
                    error
                );
            });
    }, []);

    return (
        <div>
            <h1 className="h1-tache">Liste des Tâches</h1>
            <ul className="liste-tache">
                {taches.map((tache, index) => {
                    // Calculer le délai d'animation basé sur l'index
                    const delay = `${index / 3}s `;

                    // Style pour l'animation avec un délai dynamique
                    const animationStyle = {
                        animation: `slide ${delay}  ease-in-out `,
                    };

                    return (
                        <React.Fragment key={tache.id}>
                            <li style={animationStyle} className="liste-todo">
                                <button className="btn-mobile-modifier">
                                    <img
                                        src="modifier.png"
                                        alt="modifier"
                                    />
                                </button>
                                <strong>{tache.titre}</strong>:{" "}
                                {tache.description}
                                <section className="section-action-liste">
                                    <button className="btn-desktop-modifier">
                                        <img
                                            src="modifier.png"
                                            alt="modifier"
                                        />
                                    </button>
                                    <section>
                                        <button>
                                            <img
                                                src="valider.png"
                                                alt="valider"
                                            />
                                        </button>
                                        <button>
                                            <img
                                                src="supprimer.png"
                                                alt="supprimer"
                                            />
                                        </button>
                                    </section>
                                </section>
                            <img
                            className="derouler-arrow"
                                src="derouler.png"
                                alt="derouler"
                            />
                            </li>
                        </React.Fragment>
                    );
                })}
            </ul>
        </div>
    );
}

export default Taches;
