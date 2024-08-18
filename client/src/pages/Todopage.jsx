import { useEffect, useState } from "react";
import Header from "../components/Header";
import Ajouter from "../components/Ajouter";
import Modale from "../components/Modale";
import Taches from "../components/Taches";

export default function Todopage() {
  const [taches, setTaches] = useState([]);
  const [modale, setModale] = useState(false);
  const [btnModale, setBtnModal] = useState("ajouter");
  const [selectedTache, setSelectedTache] = useState(null);

  
  useEffect(() => {
    fetch("http://localhost:3000/api/taches", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`, // Ajouter l'en-tête Authorization
        },
    })
    .then((response) => {
        // Vérifiez si la réponse est au format texte
        return response.text(); 
    })
    .then((text) => {
        try {
            const data = JSON.parse(text);
            setTaches(data);
        } catch (error) {
            console.error("Erreur lors du parsing JSON :", error);
        }
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
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

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimez le token du stockage local
    localStorage.removeItem('user'); // Supprimez les informations de l'utilisateur du stockage local
    window.location.href = '/connexion'; // Redirigez vers la page de connexion ou d'accueil
  };

  return (
    <>
      <Header />
      <main className={modale ? "blur" : ""}>
        <Taches
          handleModifierClick={handleModifierClick}
          taches={taches}
          setTaches={setTaches}
          setBtnModal={setBtnModal}
          setModale={setModale}
        />
        <button onClick={handleLogout}>Déconnexion</button>
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
