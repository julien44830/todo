import { useEffect, useState } from "react";
import Ajouter from "./src/components/Ajouter";
import Modale from "./src/components/Modale";
import Taches from "./src/components/Taches";

function App() {
    const [taches, setTaches] = useState([]);
    const [modale, setModale] = useState(false);
    const [btnModale, setBtnModal] = useState("ajouter");
    const [selectedTache, setSelectedTache] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/taches")
            .then((response) => response.json())
            .then((data) => {
                setTaches(data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des données:",
                    error
                );
            });
    }, []);

    const ajouterTache = (nouvelleTache) => {
        setTaches((prevTaches) => [...prevTaches, nouvelleTache]);
    };

    const handleModifierClick = (tache) => {
        setBtnModal("modifier");
        setSelectedTache(tache);
        setModale(true);
    };
    return (
        <>
            <main className={modale ? "blur" : ""}>
                <Taches
                    handleModifierClick={handleModifierClick}
                    taches={taches}
                    setTaches={setTaches}
                    setBtnModal={setBtnModal}
                    setModale={setModale}
                />
            </main>
            <Ajouter
                setBtnModal={setBtnModal}
                setModale={setModale}
                modale={modale}
            />
            {modale ? (
                <Modale
                    setModale={setModale}
                    onAjoutTache={ajouterTache}
                    btnModale={btnModale}
                    setBtnModal={setBtnModal}
                    selectedTache={selectedTache}
                    taches={taches}
                    setTaches={setTaches}
                />
            ) : (
                ""
            )}
        </>
    );
}

export default App;
