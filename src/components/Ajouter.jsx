import PropTypes from 'prop-types';

function Ajouter({ setModale, modale }) {
    return (
        <section className="section-btn-ajouter">
            <button className="btn-ajouter" onClick={() => setModale(!modale)}>

                <img src="ajouter.png" alt="" />
            </button>
        </section>
    );
}


Ajouter.propTypes = {
    setModale: PropTypes.func.isRequired,
    modale: PropTypes.bool.isRequired,   
};

export default Ajouter;
