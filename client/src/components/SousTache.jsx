export default function SousTache({selectedTache}) {
    console.log('%c⧭', 'color: #00b300', selectedTache);

    const noSousTache = <p>Aucune sous-tâche pour cette tâche.</p>


  // const sousTaches = selectedTache.sousTaches;
    return (
        <article className="">
            {/* <h1>{selectedTache.titre}</h1>
            <section>
                <p>{selectedTache.description}</p>
                {selectedTache === null ? noSousTache 
                :
                <p>map sur les sous taches ici</p>
                }
            </section>
            <button>ajouter une sous tache</button> */}
        </article>
    );
}
