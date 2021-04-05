import React, { useReducer, useCallback } from 'react';
import {
  SWITCH_TABLE_TYPE,
  START_LOADING,
  END_LOADING,
  FETCH_ERROR,
} from '../actions';

import reducer from '../reducer';

const rootUrl = 'http://ergast.com/api/f1';

const initialState = {
  table_title: '',
  table_type: '',
  table_headings: [],
  table_data: [],
  is_loading: true,
  is_error: false,
};

const TableContext = React.createContext();

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStatisticsData = useCallback(async (query, action) => {
    dispatch({ type: START_LOADING });
    try {
      const response = await fetch(`${rootUrl}/${query}`);
      const data = await response.json();
      if (data) {
        dispatch({ type: action, payload: data });
      }
    } catch (error) {
      dispatch({ type: FETCH_ERROR });
    }
    dispatch({ type: END_LOADING });
  }, []);

  const switchTableType = (tableType) => {
    dispatch({ type: SWITCH_TABLE_TYPE, payload: tableType });
  };

  return (
    <TableContext.Provider
      value={{
        ...state,
        fetchStatisticsData,
        switchTableType,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
