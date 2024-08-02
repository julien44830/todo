import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-home">
        <p className="text-home">
          Créer une liste de taches facilement et amenez-là partout ou vous
          allez !
        </p>
        <img className="img-home" src="stylo_plume.png" alt="stylo plume" />
        <NavLink to="/connexion" className="login-home">
          <p>Connectez-vous</p>
        </NavLink>
      </main>
    </>
  );
}
