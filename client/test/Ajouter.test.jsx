import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Ajouter from '../src/components/Ajouter';

// Mock des fonctions pour vérifier leur appel
const mockSetModale = jest.fn();
const mockSetBtnModal = jest.fn();

describe('Ajouter Component', () => {
  // test('renders the button with correct image class', () => {
  //   // Initialisation du composant avec des props fictives
  //   render(
  //     <Ajouter
  //       setModale={mockSetModale}
  //       setBtnModal={mockSetBtnModal}
  //       modale={false} // Valeur initiale de modale
  //     />
  //   );

  //   // Vérifie que le bouton est présent
  //   const button = screen.getByRole('button');
  //   expect(button).toBeInTheDocument();

  //   // Vérifie que l'image a la classe correcte lorsque `modale` est `false`
  //   const image = screen.getByAltText('bouton ajouter');
  //   expect(image).toHaveClass('img');
  // });

  test('calls setModale and setBtnModal on button click', () => {
    // Initialisation du composant avec des props fictives
    render(
      <Ajouter
        setModale={mockSetModale}
        setBtnModal={mockSetBtnModal}
        modale={false} // Valeur initiale de modale
      />
    );

    // Simule un clic sur le bouton
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Vérifie que les fonctions ont été appelées avec les bons arguments
    expect(mockSetModale).toHaveBeenCalledWith(true); // modale devrait passer à true après le clic
    expect(mockSetBtnModal).toHaveBeenCalledWith('ajouter');
  });
});
