import { useState, useEffect } from "react";

function Modale({
  setModale,
  onAjoutTache,
  btnModale,
  setBtnModal,
  selectedTache,
  taches,
  setTaches,
}) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (btnModale === "modifier" && selectedTache) {
      setTitre(selectedTache.titre);
      setDescription(selectedTache.description);
    } else {
      setTitre("");
      setDescription("");
    }
  }, [btnModale, selectedTache]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/taches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: titre,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la tâche");
      }

      const data = await response.json();
      console.log(data);
      onAjoutTache(data.task);
      setModale(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/taches/${selectedTache.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titre: titre,
            description: description,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de la tâche");
      }

      const updatedTask = await response.json();
      const updatedTaches = taches.map((t) =>
        t.id === updatedTask.task.id ? updatedTask.task : t,
      );
      setTaches(updatedTaches);
      setModale(false); // Fermer la modale après la modification
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche :", error);
    }
  };

  return (
    <section className="modale">
      <article>
        <h1>{btnModale} une tâche</h1>
        <form
          onSubmit={btnModale === "modifier" ? handleChange : handleSubmit}
          className="form-modale"
        >
          <label htmlFor="titre">
            <input
              name="titre"
              id="titre"
              type="text"
              placeholder="Titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </label>
          <label htmlFor="description" className="label-text-area">
            <textarea
              name="description"
              id="description"
              className="text-area"
              placeholder="Description de la tâche"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </label>
          <button type="submit">{btnModale}</button>
        </form>
      </article>
    </section>
  );
}

export default Modale;
