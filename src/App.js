import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContributionGraph from './components/ContributionGraph/ContributionGraph';
import './App.css';

const App = () => {
  const [contributionData, setContributionData] = useState(null);

  useEffect(() => {
    const getContributionData = async () => {
      try {
        const { data } = await axios('https://dpg.gg/test/calendar.json');
        setContributionData(data);
      } catch (error) {
        console.error('Error fetching contribution data:', error);
      }
    };

    getContributionData().catch();
  }, []);

  return (
    <div className="app">
      <h1>Contribution Graph Example</h1>
      {contributionData && <ContributionGraph data={contributionData} />}
    </div>
  );
};

export default App;
