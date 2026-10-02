import { useState } from 'react';
import { useWinterArc } from './hooks/useWinterArc';
import { Header } from './components/Header';
import { TrackerGrid } from './components/TrackerGrid';
import { 
  GoalDetails, 
  WeeklyProgress, 
  Legend, 
  ProgressOverview, 
  NotesPanel, 
  RememberPanel 
} from './components/BottomSections';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const { state, toggleCell, updateDates, updateNotes, resetTracker, updateSettings } = useWinterArc();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="container">
      <Header state={state} updateDates={updateDates} />
      
      <TrackerGrid 
        tracker={state.tracker} 
        goals={state.goals} 
        duration={state.duration} 
        toggleCell={toggleCell} 
      />
      
      <div className="bottom-sections">
        <GoalDetails goals={state.goals} />
        
        <WeeklyProgress tracker={state.tracker} duration={state.duration} goals={state.goals} />
        
        <div className="right-column">
          <Legend />
          <ProgressOverview tracker={state.tracker} goals={state.goals} duration={state.duration} />
          <NotesPanel notes={state.notes} updateNotes={updateNotes} />
          <RememberPanel />
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', zIndex: 100 }}>
        <button className="reset-btn" onClick={() => setIsSettingsOpen(true)} style={{ position: 'static' }}>
          ⚙️ Edit Planner
        </button>
        <button className="reset-btn" onClick={resetTracker} style={{ position: 'static' }}>
          Reset Tracker
        </button>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentState={state} 
        onSave={updateSettings}
      />
    </div>
  );
}

export default App;
