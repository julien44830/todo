function Modale() {
    return (
        <section className="modale">
          <article>

            <h1>coucou modale</h1>
            <form action="post">
              <input name="titre" id="titre" type="text" />

              <textarea name="description" id="description"></textarea>
              <button>Créer</button>

            </form>
          </article>
        </section>
    );
}

export default Modale;
