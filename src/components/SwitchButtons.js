import React, { useContext } from 'react';
import { TableContext } from '../context/tableContext';

function SwitchButtons({ switchTypes }) {
  const { switchTableType, table_type: tableType } = useContext(TableContext);

  const [firstType, secondType] = switchTypes;

  return (
    <div className='btn-switch-container'>
      <button
        className={`${
          tableType === firstType
            ? 'btn btn-switch btn-switch-active'
            : 'btn btn-switch'
        }`}
        onClick={() => switchTableType(firstType)}
      >
        {firstType}
      </button>
      <button
        className={`${
          tableType === secondType
            ? 'btn btn-switch btn-switch-active'
            : 'btn btn-switch'
        }`}
        onClick={() => switchTableType(secondType)}
      >
        {secondType}
      </button>
    </div>
  );
}

export default SwitchButtons;
