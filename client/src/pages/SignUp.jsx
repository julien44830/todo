import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function SingUp() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex  =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`]).{8,}$/;

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        checkPassword: "",
    });

    const [checkedPassword, setCheckedPassword] = useState({
        password: true,
        verifPassword: false,
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

    // fonction pour
    const getInputClassName = (fieldName) => {
        return `p-input ${
            focusedField === fieldName || formData[fieldName]
                ? "p-input-focus"
                : ""
        }`;
    };

    // fonction pour vérifier la dureté du mot de passe
    const forcePassword = () => {
        const isValidPassword = passwordRegex .test(formData.password);
        if (!passwordRegex .test(formData.password)) {
            setCheckedPassword((prev) => ({
                ...prev,
                password: isValidPassword,
            }));
        } else {
            setCheckedPassword((prev) => ({
                ...prev,
                password: isValidPassword,
            }));
        }
    };

    // fonction pour vérifier que les mots de passes sont identiques
    const verifPassword = () => {
        if (formData.password !== formData.checkPassword) {
            alert("Les mots de passe ne correspondent pas");
            setCheckedPassword((prev) => ({
                ...prev,
                verifPassword: false,
            }));
        } else {
            setCheckedPassword((prev) => ({
                ...prev,
                verifPassword: true,
            }));
        }
    };

    // fonction pour vérifier que l'email est correcte
    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    // fonction pour soumettre le formulaire inscription
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            checkedPassword.password &&
            checkedPassword.verifPassword &&
            validateEmail(formData.email)
        ) {
            const { name, email, password } = formData;

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/user/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error("Erreur lors de l'ajout du User");
                }

                // const data = await response.json();
                window.location.href = "/connexion";
            } catch (error) {
                console.error("Erreur lors de l'ajout du User :", error);
            }
        }
    };

    return (
        <>
            <Header />
            <form
                onSubmit={handleSubmit}
                className="form-login"
                method="POST"
            >
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
                        type="email"
                        name="email"
                        value={formData.email}
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
                        type="text"
                        name="password"
                        value={formData.password}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => {
                            handleBlur();
                            forcePassword();
                        }}
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
                        onBlur={() => {
                            handleBlur();
                            verifPassword();
                        }}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="btn-login"
                >
                    Créer ton compte
                </button>
                <NavLink to="/connexion">
                    <p>Déjà un compte ? Connecte toi</p>
                </NavLink>
                {checkedPassword.password ? null : (
                    <p>
                        Ton mot de passe doit contenir 1 Majuscule, 1 minuscule,
                        1 chiffre et 1 carractère spéciale.
                    </p>
                )}
            </form>
            <img
                className="img-home"
                src="stylo_plume.png"
                alt="stylo plume"
            />
        </>
    );
}
