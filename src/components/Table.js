import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

function Table({ tableData, tableType, tableHeadings }) {
  const [isMessageShow, setIsMessageShow] = useState(false);

  const tableWidthRef = useRef(null);
  const tableContainerWidthRef = useRef(null);

  const checkTableSize = () => {
    const tableWidth = tableWidthRef.current.getBoundingClientRect().width;
    const tableContainerWidth = tableContainerWidthRef.current.getBoundingClientRect()
      .width;
    if (tableWidth > tableContainerWidth) {
      setIsMessageShow(true);
    } else {
      setIsMessageShow(false);
    }
  };

  useEffect(() => {
    checkTableSize();
    window.addEventListener('resize', checkTableSize);
    return () => {
      window.removeEventListener('resize', checkTableSize);
    };
  }, []);

  return (
    <>
      {isMessageShow && (
        <p className='scroll-message'>&lt;Scroll to see more&gt;</p>
      )}
      <section className='table-container' ref={tableContainerWidthRef}>
        <table className='table' ref={tableWidthRef}>
          <thead>
            <tr>
              {tableHeadings.map((tableHeading) => {
                return (
                  <th key={uuid()} className='table-headings'>
                    {tableHeading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((tableRow) => {
              return (
                <tr key={uuid()}>
                  {Object.keys(tableRow).map((key) => {
                    return (
                      <td key={uuid()} className='table-cell'>
                        {tableRow[key]}
                      </td>
                    );
                  })}
                  {/* for Races page   */}
                  {tableType === 'racesList' ? (
                    <td key={uuid()}>
                      <Link
                        to={`/single-race/${tableRow.round}`}
                        className='btn-link'
                      >
                        See more
                      </Link>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Table;
