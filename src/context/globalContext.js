import React, { useState } from 'react';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [season, setSeason] = useState('2021');

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const choiceSeason = (season) => {
    setSeason(season);
    setIsModalOpen(false);
  };

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        isModalOpen,
        isMenuOpen,
        season,
        setIsModalOpen,
        setSeason,
        openModal,
        closeModal,
        choiceSeason,
        toogleMenu,
        closeMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
