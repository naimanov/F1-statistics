import React, { useContext, useEffect } from 'react';
import { TableContext } from '../context/tableContext';
import Table from '../components/Table';
import { GlobalContext } from '../context/globalContext';
import SwitchButtons from '../components/SwitchButtons';
import Loading from '../components/Loading';
import ErrorFetch from '../components/ErrorFetch';
import QualifaingError from '../components/QualifyingError';
import { useParams } from 'react-router-dom';
import { SET_SINGLE_RACE_RESULT, SET_QUALIFYING } from '../actions';

function RaceResults() {
  const { round } = useParams();
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
    if (tableType === 'qualifying' && season >= 2003) {
      fetchStatisticsData(`${season}/${round}/qualifying.json`, SET_QUALIFYING);
    } else if (tableType === 'qualifying' && season < 2003) {
      return;
    } else {
      fetchStatisticsData(
        `${season}/${round}/results.json`,
        SET_SINGLE_RACE_RESULT
      );
    }
  }, [tableType, season, round, fetchStatisticsData]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorFetch />;
  }

  if (tableType === 'qualifying' && season < 2003) {
    return <QualifaingError />;
  }

  return (
    <main>
      <div className='wrapper'>
        <div className='table-wrapper'>
          <section className='table-header'>
            <h1 className='table-title'>{tableTitle}</h1>
            {season >= 2003 ? (
              <SwitchButtons switchTypes={['race', 'qualifying']} />
            ) : null}
          </section>
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

export default RaceResults;
