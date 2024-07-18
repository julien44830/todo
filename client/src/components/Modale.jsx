function Modale() {
  return (
    <section className="modale">
      <article>
        <h1>Ajoutez un tache</h1>
        <form action="post" className="form-modale">
          <input name="titre" id="titre" type="text" placeholder="titre" />

          <textarea
            name="description"
            id="description"
            className="text-area"
            placeholder="description de la tache"
          ></textarea>
          <button>Créer</button>
        </form>
      </article>
    </section>
  );
}

export default Modale;
