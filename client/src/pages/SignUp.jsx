import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function SingUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    checkPassword: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  // Fonction appelée lorsque l'élément reçoit le focus
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  // Fonction appelée lorsque l'élément perd le focus
  const handleBlur = () => {
    setFocusedField(null);
  };

  // Fonction pour gérer les changements dans les champs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getInputClassName = (fieldName) => {
    return `p-input ${
      focusedField === fieldName || formData[fieldName] ? "p-input-focus" : ""
    }`;
  };

  console.log("%c⧭", "color: #aa00ff", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, checkPassword } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du User");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du User :", error);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="form-login" method="POST">
        <p>Créer un compte</p>
        <label>
          <p className={getInputClassName("name")}>Nom</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onFocus={() => handleFocus("name")}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p className={getInputClassName("email")}>Email</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p className={getInputClassName("password")}>Mot de passe</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onFocus={() => handleFocus("password")}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <p className={getInputClassName("checkPassword")}>
            Confirmation de mot de passe
          </p>
          <input
            type="password"
            name="checkPassword"
            value={formData.checkPassword}
            onFocus={() => handleFocus("checkPassword")}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-login">
          Créer ton compte
        </button>
        <NavLink to="/connexion">
          <p>Déjà un compte ? Connecte toi</p>
        </NavLink>
      </form>
      <img className="img-home" src="stylo_plume.png" alt="stylo plume" />
    </>
  );
}
