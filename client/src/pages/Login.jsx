import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
    // État pour suivre le focus et la valeur des champs
    const [fields, setFields] = useState({
        email: "",
        password: "",
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
        setFields({
            ...fields,
            [name]: value,
        });
    };

    // Fonction pour déterminer si une classe de focus doit être appliquée
    const getInputClassName = (fieldName) => {
        return `p-input ${
            focusedField === fieldName || fields[fieldName]
                ? "p-input-focus"
                : ""
        }`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fields),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Login successful:", data);

            localStorage.setItem('token', data.token);

            // Stocker d'autres informations utilisateur si nécessaire
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = "/liste";

            // Vous pouvez rediriger ou mettre à jour l'état ici
        } catch (error) {
            console.error("Login error:", error);
            // Affichez un message d'erreur ou mettez à jour l'état
        }
    };

    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit} 
                action="post"
                className="form-login"
            >
                <p>Connecte-toi</p>

                <label>
                    <p className={getInputClassName("email")}>Email</p>

                    <input
                        type="text"
                        name="email"
                        value={fields.email}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <p className={getInputClassName("password")}>
                        Mot de passe
                    </p>
                    <input
                        type="password"
                        name="password"
                        value={fields.password}
                        onFocus={() => handleFocus("password")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="btn-login"
                >
                    Connexion
                </button>
                <NavLink to="/creation">
                    <p>Pas de compte ? Crée-en un ici</p>
                </NavLink>
            </form>
            <img
                className="img-home"
                src="stylo_plume.png"
                alt="stylo plume"
            />
        </>
    );
}
