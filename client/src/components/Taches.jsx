import React, { useEffect, useState } from "react";

function Taches({
    taches,
    setTaches,
    setBtnModal,
    setModale,
    handleModifierClick,
}) {
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/taches/${id}`,
                {
                    method: "DELETE",
                }
            );

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

    return (
        <div className="text">
            <h1 className="h1-tache">Liste des Tâches</h1>
            <ul className="liste-tache">
                {taches.map((tache, index) => {
                    const delay = `${index / 3}s`;

                    const animationStyle = {
                        animation: `slide 1s ${delay} ease-in-out both`,
                    };

                    return (
                        <li
                            key={tache.id}
                            style={animationStyle}
                            className="liste-todo"
                        >
                            <button
                                className="btn-mobile-modifier"
                                onClick={() => handleClick(tache)}
                            >
                                <img
                                    src="modifier.png"
                                    alt="modifier"
                                />
                            </button>
                            <strong>{tache.titre}</strong>: {tache.description}
                            <section className="section-action-liste">
                                <button
                                    className="btn-desktop-modifier"
                                    onClick={() => handleClick(tache)}
                                >
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
                                    <button
                                        onClick={() => handleDelete(tache.id)}
                                    >
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
                    );
                })}
            </ul>
        </div>
    );
}

export default Taches;
