import type { AppState, Goal } from '../types';
import { calculateTotalProgress, calculateGoalProgress, calculateWeeklyProgress } from '../utils/calculations';

// Icons used in panels
const TargetIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const CalendarIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const CheckCircleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const BarChartIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
const EditIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
const HeartIcon = ({ className }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;

export const GoalDetails = ({ goals }: { goals: Goal[] }) => (
  <div className="panel">
    <div className="panel-header">
      <TargetIcon /> GOAL DETAILS
    </div>
    <div className="panel-content">
      <div className="goal-details-list">
        {goals.map(goal => (
          <div key={goal.id} className="goal-detail-item">
            <div className="goal-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <div className="goal-detail-text">
              <h4>{goal.title}</h4>
              <p>{goal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const WeeklyProgress = ({ tracker, duration, goals }: { tracker: AppState['tracker'], duration: number, goals: Goal[] }) => {
  const weeks = calculateWeeklyProgress(tracker, duration, goals);

  return (
    <div className="panel">
      <div className="panel-header">
        <CalendarIcon /> WEEKLY PROGRESS
      </div>
      <div className="panel-content" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="weekly-table">
          <thead>
            <tr>
              <th>WEEK</th>
              {goals.map(g => (
                <th key={g.id} className={g.colorClass} style={{ padding: '0.5rem 0.2rem' }}>
                  {g.title.split('. ')[1] || g.title}
                </th>
              ))}
              <th>% Done</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w.weekNumber}>
                <td>{w.weekNumber}</td>
                {goals.map(g => (
                  <td key={g.id}>{w.goalData[g.id] > 0 ? w.goalData[g.id] : ''}</td>
                ))}
                <td>{w.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Legend = () => (
  <div className="panel">
    <div className="panel-header">
      <CheckCircleIcon /> LEGEND
    </div>
    <div className="panel-content">
      <div className="legend-items">
        <div className="legend-item">
          <div className="tracker-checkbox state-1">✓</div> = Done
        </div>
        <div className="legend-item">
          <div className="tracker-checkbox state-2"></div> = Partial
        </div>
        <div className="legend-item">
          <div className="tracker-checkbox state-0"></div> = Not Done
        </div>
      </div>
    </div>
  </div>
);

export const ProgressOverview = ({ tracker, goals, duration }: { tracker: AppState['tracker'], goals: Goal[], duration: number }) => {
  const total = calculateTotalProgress(tracker);

  return (
    <div className="panel">
      <div className="panel-header">
        <BarChartIcon /> PROGRESS OVERVIEW
      </div>
      <div className="panel-content">
        <div className="overview-list">
          {goals.map(goal => (
            <div key={goal.id} className="overview-item">
              <div className={`overview-dot ${goal.colorClass}`}></div>
              <span className="overview-label">{goal.title.split('. ')[1] || goal.title}</span>
              <span className="overview-colon">:</span>
              <span className="overview-value">{calculateGoalProgress(tracker, goal.id)} / {duration}</span>
            </div>
          ))}
          <div className="overview-total">
            <span className="overview-label">TOTAL</span>
            <span className="overview-colon">:</span>
            <span className="overview-value">{total} / {duration * goals.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotesPanel = ({ notes, updateNotes }: { notes: string, updateNotes: (n: string) => void }) => (
  <div className="panel">
    <div className="panel-header">
      <EditIcon /> NOTES & REFLECTIONS
    </div>
    <div className="panel-content">
      <textarea 
        className="notes-textarea"
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
        placeholder="Write your reflections here..."
      />
    </div>
  </div>
);

export const RememberPanel = () => (
  <div className="remember-panel">
    <HeartIcon className="heart" />
    <div className="remember-text">
      You don't have to be perfect,<br/>
      just consistent.<br/><br/>
      Your future self will thank you.
    </div>
    <svg className="leaf" viewBox="0 0 24 24" fill="none" stroke="var(--text-dark)" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" stroke="none" fill="var(--text-dark)"/></svg>
  </div>
);
