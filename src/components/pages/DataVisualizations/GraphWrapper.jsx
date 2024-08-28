import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery, setVisualizationData } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        map_to_render = null;
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        map_to_render = null;
        break;
    }
  }

   const stateSettingCallback = (view, office, data) => {
    dispatch(setVisualizationData(view, office, data));
  };
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    let apiEndpoint;
  
    switch (view) {
      case 'time-series':
      case 'office-heat-map':
        apiEndpoint = 'https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary';
        break;
      case 'citizenship':
        apiEndpoint = 'https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary';
        break;
      default:
        console.error('Unknown view:', view);
        return;
    }
  
    const params = {
      from: years[0],
      to: years[1],
    };
  
    if (office && office !== 'all') {
      params.office = office;
    }
  
    axios
      .get(apiEndpoint, { params })
      .then(result => {
        const responseData = result.data;
  
        let processedData;
  
        if (view === 'citizenship') {
          if (Array.isArray(responseData)) {
            processedData = {
              countryGrantRateObj: {
                countries: responseData.map(item => item.citizenship),
                countriesPercentGranteds: responseData.map(item => item.granted),
              },
              rowsForTable: responseData.map(item => ({
                Citizenship: item.citizenship,
                'Total Cases': item.totalCases,
                '% Granted': Number(item.granted).toFixed(2),
                '% Admin Close / Dismissal': Number((item.adminClosed / item.totalCases) * 100).toFixed(2),
                '% Denied': Number((item.denied / item.totalCases) * 100).toFixed(2),
              })),
            };
          } else {
            console.error('Unexpected data format for Citizenship View:', responseData);
            return;
          }
        } else if (view === 'time-series') {
          if (responseData.yearResults && Array.isArray(responseData.yearResults)) {
            processedData = {
              xYears: responseData.yearResults.map(item => item.fiscal_year),
              yTotalPercentGranteds: responseData.yearResults.map(item => item.granted),
              rowsForAllDisplay: responseData.yearResults.map(item => ({
                'Fiscal Year': item.fiscal_year,
                'Total Cases': item.totalCases,
                '% Granted': Number(item.granted).toFixed(2),
                '% Admin Close / Dismissal': Number((item.adminClosed / item.totalCases) * 100).toFixed(2),
                '% Denied': Number((item.denied / item.totalCases) * 100).toFixed(2),
              })),
            };
          } else {
            console.error('Unexpected data format for Time Series View:', responseData);
            return;
          }
        } else if (view === 'office-heat-map') {
          if (responseData.yearResults && Array.isArray(responseData.yearResults)) {
            const heatMapData = responseData.yearResults.flatMap(year => 
              year.yearData.map(office => ({
                year: year.fiscal_year,
                office: office.office,
                granted: office.granted
              }))
            );
  
            processedData = {
              officeHeatMapDataObject: {
                x: heatMapData.map(item => item.office),
                y: heatMapData.map(item => item.year),
                z: heatMapData.map(item => item.granted),
              },
              rowsForTable: heatMapData.map(item => ({
                'Year [Office]': `${item.year} [${item.office}]`,
                '% Granted': Number(item.granted).toFixed(2),
              })),
            };
          } else {
            console.error('Unexpected data format for Heat Map View:', responseData);
            return;
          }
        }
  
        if (processedData) {
          stateSettingCallback(view, office, processedData);
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={(years, view, office) => updateStateWithNewData(years, view, office, stateSettingCallback)}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
