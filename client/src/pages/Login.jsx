import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <Header />
      <form action="post" className="form-login">
        <p>Connecte toi</p>
        <label>
          <p className={`p-input ${isFocused ? "p-input-focus" : ""}`}>email</p>
          <input type="text" onFocus={handleFocus} onBlur={handleBlur} />
        </label>
        <label>
          <p className={`p-input ${isFocused ? "p-input-focus" : ""}`}>
            mot de passe
          </p>

          <input type="password" onFocus={handleFocus} onBlur={handleBlur} />
        </label>

        <button type="button" className="btn-login">
          connexion
        </button>
        <NavLink to="/creation">
          <p>Pas de compte ? céer en un ici</p>
        </NavLink>
      </form>
      <img className="img-home" src="stylo_plume.png" alt="stylo plume" />
    </>
  );
}
