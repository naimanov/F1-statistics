import React, { useContext } from 'react';
import seasons from '../context/MockDataSeasons';
import { RiCloseLine } from 'react-icons/ri';
import { GlobalContext } from '../context/globalContext';
import uuid from 'react-uuid';

function SelectSeason() {
  const { isModalOpen, closeModal, choiceSeason } = useContext(GlobalContext);

  return (
    <section>
      <div
        className={`${
          isModalOpen ? 'modal-overlay modal-overlay-open' : 'modal-overlay'
        }`}
        onClick={closeModal}
      ></div>
      <div className={`${isModalOpen ? 'modal modal-open' : 'modal'}`}>
        <div className='modal-title '>
          <button className='btn modal-close-btn' onClick={closeModal}>
            <RiCloseLine />
          </button>

          <h2>Seasons:</h2>
        </div>
        <div>
          <ul className='season-container'>
            {seasons.map((season) => {
              return (
                <li
                  className='year'
                  data-season={season}
                  key={uuid()}
                  onClick={(e) => choiceSeason(e.target.dataset.season)}
                >
                  {season}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SelectSeason;
