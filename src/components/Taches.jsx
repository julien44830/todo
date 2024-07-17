import { useEffect, useState } from "react";

function Taches({ taches }) {
    const [sousTaches, setSousTaches] = useState([]);
    console.log("%c⧭", "color: #00e600", sousTaches);

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
            <h1>Liste des Tâches</h1>
            <ul className="liste-tache">
                {taches.map((tache) => (
                    <>
                        <li key={tache.id}>
                            <button className="btn-mobile-modifier">
                                <img
                                    src="modifier.png"
                                    alt=""
                                />
                            </button>
                            <strong>{tache.titre}</strong>: {tache.description}
                            <section className="section-action-liste">
                                <button className="btn-desktop-modifier">
                                    <img
                                        src="modifier.png"
                                        alt=""
                                    />
                                </button>
                                <section>
                                    <button>
                                        <img
                                            src="valider.png"
                                            alt=""
                                        />
                                    </button>
                                    <button>
                                        <img
                                            src="supprimer.png"
                                            alt=""
                                        />
                                    </button>
                                </section>
                            </section>
                        </li>
                        <img src="derouler.png" alt="" />
                    </>
                ))}
                {taches.map((tache) => (
                    <>
                        <li key={tache.id}>
                            <button className="btn-mobile-modifier">
                                <img
                                    src="modifier.png"
                                    alt=""
                                />
                            </button>
                            <strong>{tache.titre}</strong>: {tache.description}
                            <section className="section-action-liste">
                                <button className="btn-desktop-modifier">
                                    <img
                                        src="modifier.png"
                                        alt=""
                                    />
                                </button>
                                <section>
                                    <button>
                                        <img
                                            src="valider.png"
                                            alt=""
                                        />
                                    </button>
                                    <button>
                                        <img
                                            src="supprimer.png"
                                            alt=""
                                        />
                                    </button>
                                </section>
                            </section>
                        </li>
                        <img src="derouler.png" alt="" />
                    </>
                ))}
                {taches.map((tache) => (
                    <>
                        <li key={tache.id}>
                            <button className="btn-mobile-modifier">
                                <img
                                    src="modifier.png"
                                    alt=""
                                />
                            </button>
                            <strong>{tache.titre}</strong>: {tache.description}
                            <section className="section-action-liste">
                                <button className="btn-desktop-modifier">
                                    <img
                                        src="modifier.png"
                                        alt=""
                                    />
                                </button>
                                <section>
                                    <button>
                                        <img
                                            src="valider.png"
                                            alt=""
                                        />
                                    </button>
                                    <button>
                                        <img
                                            src="supprimer.png"
                                            alt=""
                                        />
                                    </button>
                                </section>
                            </section>
                        </li>
                        <img src="derouler.png" alt="" />
                    </>
                ))}
            </ul>
        </div>
    );
}

export default Taches;
