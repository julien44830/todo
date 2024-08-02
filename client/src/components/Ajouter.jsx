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
          alt=""
        />
      </button>
    </section>
  );
}

Ajouter.propTypes = {
  setModale: PropTypes.func.isRequired,
  modale: PropTypes.bool.isRequired,
};

export default Ajouter;
