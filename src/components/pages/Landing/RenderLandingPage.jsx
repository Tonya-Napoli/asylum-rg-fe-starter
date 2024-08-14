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

      {/* Graphs Section */}
      <div className="graphs-section" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', margin: '20px 0' }}>
         <div className="grant-rates-by-office-graph-container" style={{ textAlign: 'center', width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <img src={GrantRatesByOfficeImg} alt="Grant Rates by Office" style={{ marginBottom: '10px', width: '100%', height: '200px', objectFit: 'contain' }} />
         <p><h1><strong>Search Grant Rates by Office</strong></h1></p>
     </div>
     <div className="grant-rates-by-nationality-container" style={{ textAlign: 'center', width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={GrantRatesByNationalityImg} alt="Grant Rates by Nationality" style={{ marginBottom: '10px', width: '100%', height: '200px', objectFit: 'contain' }} />
        <p><h1><strong>Search Grant Rates by Nationality</strong></h1></p>
     </div>
     <div className="grant-rates-over-time-container" style={{ textAlign: 'center', width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" style={{ marginBottom: '10px', width: '100%', height: '200px', objectFit: 'contain' }} />
        <p><h1><strong>Search Grant Rates Over Time</strong></h1></p>
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
    onClick={() => {
      const downloadLink = document.createElement('a');
      downloadLink.href = 'https://humanrightsfirst.org/wp-content/uploads/2022/10/COW2021001887-I589Data.csv';
      downloadLink.download = 'COW2021001887-I589Data.csv'; 
      downloadLink.click();
    }}
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
         <h1 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>Systemic Disparity Insights</h1>
  
         <div className="data-container">
           <div className="data-point-container first-data-point-container">
              <h2>36%</h2>
               <p>By the end of the Trump administration, the average asylum office grant rate had fallen
               36 percent from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal
               year 2020.</p>
         </div>
         <div className="data-point-container second-data-point-container">
           <h2>5%</h2>
           <p>The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.</p>
        </div>
       <div className="data-point-container third-data-point-container">
         <h2>6x Lower</h2>
         <p>Between fiscal year 2017 and 2020, the New York asylum office’s average grant 
          rate was six times lower than the San Francisco asylum office.</p>
       </div>
  </div>

        <div className="read-more-btn-container">
          <Button
          type="default"
          onClick={() => {
            const newTab = document.createElement('a');
            newTab.href = 'https://humanrightsfirst.org/library/uscis-records-reveal-systemic-disparities-in-asylum-decisions/';
            newTab.target = '_blank';
            newTab.rel = 'noopener noreferrer';
            newTab.click();
          }}
          style = {{backgroundColor: '#404C4A', color: '#FFFFFF', width: '100px', height: '45px', fontSize: '.75rem', fontWeight: 'bold'}}
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


