import type { AppState, Goal } from '../types';

interface Props {
  tracker: AppState['tracker'];
  goals: Goal[];
  duration: number;
  toggleCell: (goalId: string, dayIndex: number) => void;
}

const getIcon = (goalId: string) => {
  switch (goalId) {
    case 'aptitude':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L4.2 15.3m15.6 0v1.472c0 1.145-.964 2.102-2.115 2.227a48.102 48.102 0 01-11.37 0c-1.151-.125-2.115-1.082-2.115-2.227V15.3" /></svg>;
    case 'communication':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>;
    case 'frontendApi':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>;
    case 'healthyFood':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>;
    case 'hairMaintenance':
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
    default:
      // default icon for new goals
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
  }
};

export const TrackerGrid = ({ tracker, goals, duration, toggleCell }: Props) => {
  return (
    <div className="tracker-section">
      <div className="tracker-grid" style={{ gridTemplateColumns: `240px repeat(${duration}, minmax(20px, 1fr))` }}>
        {/* Header Row */}
        <div className="grid-row">
          <div className="grid-cell header-cell" style={{ justifyContent: 'center' }}>
            GOALS
          </div>
          {Array.from({ length: duration }).map((_, i) => (
            <div key={`day-${i}`} className="grid-cell day-cell">
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Goal Rows */}
        {goals.map((goal) => (
          <div key={goal.id} className="grid-row">
            <div className={`grid-cell goal-label ${goal.colorClass}`}>
              <div className="goal-icon">
                {getIcon(goal.id)}
              </div>
              <div className="goal-text-container">
                <span className="goal-title">{goal.title}</span>
                <span className="goal-subtitle">{goal.subtitle}</span>
              </div>
            </div>
            
            {tracker[goal.id]?.map((state, i) => (
              <div key={`${goal.id}-${i}`} className="grid-cell">
                <button
                  type="button"
                  className="tracker-checkbox-wrapper"
                  onClick={() => toggleCell(goal.id, i)}
                  aria-label={`${goal.title}, Day ${i + 1}`}
                  title={`${goal.title}, Day ${i + 1}`}
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <div className={`tracker-checkbox state-${state}`}>
                    {state === 1 && '✓'}
                  </div>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
