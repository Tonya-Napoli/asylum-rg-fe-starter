import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions.
          </h3>
        </div>
      </div>

      {/* Graphs Section using inline styles */}
      <div className="graphs-section">
        <div className="grant-rates-by-office-graph-container" style={{ textAlign: 'center' }}>
        <img src={GrantRatesByOfficeImg} alt="Grant Rates by Office" style={{ marginBottom: '25px' }} className="gr-office-img" />
        <p><strong>Search Grant Rates by Office</strong></p>
        </div>
        <div className="grant-rates-by-nationality-container" style={{ textAlign: 'center' }}>
        <img src={GrantRatesByNationalityImg} alt="Grant Rates by Nationality" style={{ marginBottom: '25px' }} className="gr-nationality-img" />
        <p><strong>Search Grant Rates by Nationality</strong></p>
        </div>
        <div className="grant-rates-over-time-container" style={{ textAlign: 'center' }}>
        <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" style={{ marginBottom: '25px' }} className="gr-overtime-img" />
        <p><strong>Search Grant Rates Over Time</strong></p>
        </div>
      </div>

      {/* Buttons using Inline Styles to position horizontally */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', marginBottom: '150px' }}>
  <Button
    type="default"
    style={{ backgroundColor: '#404C4A', color: '#FFFFFF', marginRight: '10px' }}
    onClick={() => history.push('/graphs')}
  >
    View the Data
  </Button>
  <Button
    type="default"
    style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
    onClick={() => history.push('/graphs')}
  >
    Download the Data
  </Button>
</div>


      <div className="middle-section" style={{ marginBottom: '75px' }}>
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set.
          </h3>
        </div>
      </div>
      {/* Systemic Disparity Insights */}
  <div className="system-disparity-section" style={{ textAlign: 'center', padding: '40px 20px' }}>
  <h1 style={{ marginBottom: '40px' }}>Systemic Disparity Insights</h1>
  
  <div className="read-more-btn-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button
      type="default"
      style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
      onClick={() => history.push('/graphs')}
    >
      Read More
    </Button>
  </div>
</div>

<div style={{ textAlign: 'center' }}>
  <p onClick={() => scrollToTop()} className="back-to-top">
    Back To Top ^
  </p>
</div>
    </div>
  );
}
export default RenderLandingPage;

