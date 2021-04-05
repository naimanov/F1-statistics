import React, { useContext, useEffect } from 'react';
import { TableContext } from '../context/tableContext';
import Table from '../components/Table';
import Loading from '../components/Loading';
import ErrorFetch from '../components/ErrorFetch';
import { GlobalContext } from '../context/globalContext';
import { SET_RACES_RESULT } from '../actions';

function Races() {
  const {
    fetchStatisticsData,
    table_title: tableTitle,
    table_type: tableType,
    table_headings: tableHeadings,
    table_data: tableData,
    is_loading: isLoading,
    is_error: error,
  } = useContext(TableContext);

  const { season } = useContext(GlobalContext);

  useEffect(() => {
    fetchStatisticsData(`${season}/results/1.json`, SET_RACES_RESULT);
  }, [tableType, season, fetchStatisticsData]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorFetch />;
  }

  return (
    <main>
      <div className='wrapper'>
        <div className='table-wrapper'>
          <div className='table-header'>
            <h1 className='table-title'>{tableTitle}</h1>
          </div>
          <Table
            tableData={tableData}
            tableHeadings={tableHeadings}
            tableType={tableType}
          />
        </div>
      </div>
    </main>
  );
}

export default Races;
