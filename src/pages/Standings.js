import React, { useEffect, useContext } from 'react';
import Table from '../components/Table';
import { TableContext } from '../context/tableContext';
import SwitchButtons from '../components/SwitchButtons';
import ErrorFetch from '../components/ErrorFetch';
import Loading from '../components/Loading';
import { GlobalContext } from '../context/globalContext';
import { SET_DRIVERS_STANDINGS, SET_CONSTRUCTORS_STANDINGS } from '../actions';

const HomePage = () => {
  const { season } = useContext(GlobalContext);

  const {
    fetchStatisticsData,
    table_title: tableTitle,
    table_type: tableType,
    table_headings: tableHeadings,
    table_data: tableData,
    is_loading: isLoading,
    is_error: error,
  } = useContext(TableContext);

  useEffect(() => {
    if (tableType === 'constructors' && season >= 1958) {
      fetchStatisticsData(
        `${season}/constructorStandings.json`,
        SET_CONSTRUCTORS_STANDINGS
      );
    } else {
      fetchStatisticsData(
        `${season}/driverStandings.json`,
        SET_DRIVERS_STANDINGS
      );
    }
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
            {season >= 1958 ? (
              <SwitchButtons switchTypes={['drivers', 'constructors']} />
            ) : null}
          </div>
          <Table tableData={tableData} tableHeadings={tableHeadings} />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
