import { useEffect, useState } from "react";
import Ajouter from "./components/Ajouter";
import Modale from "./components/Modale";
import Taches from "./components/Taches";

function App() {
    const [taches, setTaches] = useState([]);
    const [modale, setModale] = useState(true);
    console.log("%c⧭", "color: red", taches);

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
    return (
        <>
            <main className={modale ?"" :"blur"}>
                <Taches taches={taches} />
            </main>
                <Ajouter setModale={setModale} modale={modale}/>
                {modale ? '': <Modale />}
            
        </>
    );
}

export default App;
