import {
  SET_DRIVERS_STANDINGS,
  SET_CONSTRUCTORS_STANDINGS,
  SET_RACES_SCHEDULE,
  SET_RACES_RESULT,
  SET_SINGLE_RACE_RESULT,
  SET_QUALIFYING,
  SWITCH_TABLE_TYPE,
  START_LOADING,
  END_LOADING,
  FETCH_ERROR,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, is_loading: true, is_error: false };

    case END_LOADING:
      return { ...state, is_loading: false };

    case FETCH_ERROR:
      return { ...state, is_error: true };

    case SET_DRIVERS_STANDINGS:
      const driverStandings =
        action.payload.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      const driverData = driverStandings.map((obj) => {
        const { position, points } = obj;
        const { givenName, familyName } = obj.Driver;
        const driverName = `${givenName} ${familyName}`;
        const constructor = obj.Constructors[0].name;
        const driver = {
          position,
          driverName,
          constructor,
          points,
        };
        return driver;
      });
      return {
        ...state,
        table_title: 'Drivers standings',
        table_type: 'drivers',
        table_headings: ['Pos', 'Driver', 'Constructor', 'Points'],
        table_data: driverData,
      };

    case SET_CONSTRUCTORS_STANDINGS:
      const constructorStandings =
        action.payload.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      const constructorData = constructorStandings.map((obj) => {
        const { position, points } = obj;
        const { name, nationality } = obj.Constructor;
        const constructor = {
          position,
          name,
          nationality,
          points,
        };
        return constructor;
      });
      return {
        ...state,
        table_title: 'Constructors standings',
        table_type: 'constructors',
        table_headings: ['Pos', 'Constructor', 'Nationality', 'Points'],
        table_data: constructorData,
      };

    case SET_RACES_SCHEDULE:
      const raceSchedule = action.payload.MRData.RaceTable.Races;
      const racesData = raceSchedule.map((obj) => {
        const { round, raceName, date } = obj;
        const { circuitName } = obj.Circuit;
        const { country } = obj.Circuit.Location;
        const race = {
          round,
          raceName,
          circuitName,
          country,
          date,
        };
        return race;
      });
      return {
        ...state,
        table_title: 'Schedule',
        table_type: 'schedule',
        table_headings: ['Round', 'Race', 'Circuit', 'Country', 'Date'],
        table_data: racesData,
      };

    case SET_RACES_RESULT:
      const racesList = action.payload.MRData.RaceTable.Races;
      const racesResultData = racesList.map((obj) => {
        const { round, raceName } = obj;
        const { givenName, familyName } = obj.Results[0].Driver;
        const winner = `${givenName} ${familyName}`;
        const race = {
          round,
          raceName,
          winner,
        };
        return race;
      });
      return {
        ...state,
        table_title: 'Races results',
        table_type: 'racesList',
        table_headings: ['Round', 'Race', 'Winner', ' '],
        table_data: racesResultData,
      };

    case SET_SINGLE_RACE_RESULT:
      const raceTitle = action.payload.MRData.RaceTable.Races[0].raceName;
      const singleRace = action.payload.MRData.RaceTable.Races[0].Results;
      const singleRaceData = singleRace.map((obj) => {
        const { position, points, grid, laps, status } = obj;
        const { givenName, familyName } = obj.Driver;
        const driver = `${givenName} ${familyName}`;
        const constructor = obj.Constructor.name;
        // checking time property
        let time = obj.Time?.time ?? null;

        const race = {
          position,
          driver,
          constructor,
          laps,
          grid,
          time,
          status,
          points,
        };
        return race;
      });
      return {
        ...state,
        table_title: raceTitle,
        table_type: 'race',
        table_headings: [
          'Pos',
          'Driver',
          'Constructor',
          'Laps',
          'Grid',
          'Time',
          'Status',
          'Points',
        ],
        table_data: singleRaceData,
      };

    case SET_QUALIFYING:
      const qualifyingTitle = action.payload.MRData.RaceTable.Races[0].raceName;
      const qualifying =
        action.payload.MRData.RaceTable.Races[0].QualifyingResults;
      const qualifyingData = qualifying.map((obj) => {
        const { position } = obj;
        const { givenName, familyName } = obj.Driver;
        const driver = `${givenName} ${familyName}`;
        const constructor = obj.Constructor.name;
        // checking qualifying time properties
        let q1 = obj.Q1 ?? null;
        let q2 = obj.Q2 ?? null;
        let q3 = obj.Q3 ?? null;

        const singleQualifying = {
          position,
          driver,
          constructor,
          q1,
          q2,
          q3,
        };
        return singleQualifying;
      });
      return {
        ...state,
        table_title: qualifyingTitle,
        table_type: 'qualifying',
        table_headings: ['Pos', 'Driver', 'Constructor', 'Q1', 'Q2', 'Q3'],
        table_data: qualifyingData,
      };

    case SWITCH_TABLE_TYPE:
      return { ...state, table_type: action.payload };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default reducer;
