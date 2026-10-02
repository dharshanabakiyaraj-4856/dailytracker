import type { AppState } from '../types';

export const Header = ({ state, updateDates }: { state: AppState, updateDates: (d: string) => void }) => {
  return (
    <header className="header">
      <div className="header-doodle left">
        small<br/>steps<br/>big<br/>changes<br/>♡
      </div>
      <div className="header-center">
        <div className="title-container">
          <h1>{state.title1}</h1>
          <h1>{state.title2}</h1>
        </div>

      </div>
      <div className="header-dates">
        <div className="date-row">
          <span>Start Date :</span>
          <input 
            type="date" 
            className="date-input" 
            value={state.startDate} 
            onChange={(e) => updateDates(e.target.value)}
          />
        </div>
        <div className="date-row">
          <span>End Date :</span>
          <span className="date-display">{state.endDate || ' '}</span>
        </div>
      </div>
      <div className="header-doodle right">
        Discipline<br/>today...<br/>freedom<br/>tomorrow ♡
      </div>
    </header>
  );
};
