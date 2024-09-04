import React from 'react';
import PropTypes from "prop-types";

function Ajouter({ setModale, modale, setBtnModal }) {
  return (
    <section className="section-btn-ajouter">
      <button
        className="btn-ajouter"
        onClick={() => {
          setModale(!modale);
          setBtnModal("ajouter");
        }}
      >
        <img
          src="ajouter.png"
          className={modale ? "close img" : "img"}
          alt="bouton ajouter"
        />
      </button>
    </section>
  );
}

Ajouter.propTypes = {
  setBtnModal: PropTypes.func.isRequired,
  setModale: PropTypes.func.isRequired,
  modale: PropTypes.bool.isRequired,
};

export default Ajouter;
