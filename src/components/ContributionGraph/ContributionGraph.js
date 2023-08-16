import React, {useState} from 'react';
import './ContributionGraph.css';

const daysOfWeek = ['Пн', 'Ср', 'Пт'];
const months = [
  'Апр', 'Май', 'Инюь', 'Июль', 'Авг', 'Сент',
  'Окт', 'Нояб', 'Дек', 'Янв', 'Февр', 'Март'
];

const ContributionGraph = ({data}) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const formatDate = inputDate => {
    const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
    return new Date(inputDate).toLocaleDateString('ru-RU', options);
  };

  const getNumberForClass = count => {
    if (count === 0) return 0;
    if (count >= 1 && count <= 9) return 1;
    if (count >= 10 && count <= 19) return 2;
    if (count >= 20 && count <= 29) return 3;
    return 4;
  };

  const contributionsWithNoData = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 356);

  while (currentDate <= new Date()) {
    currentDate.setDate(currentDate.getDate() + 1);
    contributionsWithNoData.push(currentDate.toISOString().split('T')[0]);
  }

  const contributionsByDate = {};
  Object.keys(data)?.forEach(date => {
    contributionsByDate[date] = data[date];
  });

  return (
    <div className="contribution-graph">
      <div className="months">
        {months.map(month => (
          <div key={month} className="month">{month}.</div>
        ))}
      </div>
      <div className="contribution-graph-inner">
        <div className="days-of-week">
          {daysOfWeek.map(day => (
            <div key={day} className="day-of-week">{day}</div>
          ))}
        </div>
        <div className="grid">
          {contributionsWithNoData.map(date => (
            <div
              key={date}
              className={`contribution-box contribution-${getNumberForClass(contributionsByDate[date] || 0)} ${activeTooltip === date ? ' visible' : ''}`}
              onClick={() => setActiveTooltip(date)}
            >
              <span className={`tooltip ${activeTooltip === date ? 'visible' : ''}`}>
                <span>{contributionsByDate[date] || 'No'} contributions</span>
                <span>{formatDate(date)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="contribution-graph-under">
        <p>Меньше</p>
        <div
          className='contribution-box contribution-0'
          onClick={() => setActiveTooltip('preview-1')}
        >
          <span className={`tooltip ${activeTooltip === 'preview-1' ? 'visible' : ''}`}>
            No contributions
          </span>
        </div>
        <div
          className='contribution-box contribution-1'
          onClick={() => setActiveTooltip('preview-2')}
        >
          <span className={`tooltip ${activeTooltip === 'preview-2' ? 'visible' : ''}`}>
            1-9 contributions
          </span>
        </div>
        <div
          className='contribution-box contribution-2'
          onClick={() => setActiveTooltip('preview-3')}
        >
          <span className={`tooltip ${activeTooltip === 'preview-3' ? 'visible' : ''}`}>
            10-19 contributions
          </span>
        </div>
        <div
          className='contribution-box contribution-3'
          onClick={() => setActiveTooltip('preview-4')}
        >
          <span className={`tooltip ${activeTooltip === 'preview-4' ? 'visible' : ''}`}>
            20-29 contributions
          </span>
        </div>
        <div
          className='contribution-box contribution-4'
          onClick={() => setActiveTooltip('preview-5')}
        >
          <span className={`tooltip ${activeTooltip === 'preview-5' ? 'visible' : ''}`}>
            30+ contributions
          </span>
        </div>
        <p>Больше</p>
      </div>
    </div>
  );
};

export default ContributionGraph;
