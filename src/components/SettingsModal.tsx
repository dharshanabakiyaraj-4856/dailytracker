import { useState } from 'react';
import type { AppState, Goal } from '../types';
import { AVAILABLE_COLORS } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: AppState;
  onSave: (settings: Omit<AppState, 'tracker' | 'notes'>) => void;
}

export const SettingsModal = ({ isOpen, onClose, currentState, onSave }: SettingsModalProps) => {
  const [title1, setTitle1] = useState(currentState.title1);
  const [title2, setTitle2] = useState(currentState.title2);
  const [duration, setDuration] = useState(currentState.duration);
  const [startDate, setStartDate] = useState(currentState.startDate);
  const [goals, setGoals] = useState<Goal[]>(currentState.goals);

  if (!isOpen) return null;

  const handleAddGoal = () => {
    const newId = 'custom-' + Date.now();
    setGoals([
      ...goals, 
      {
        id: newId,
        title: 'NEW GOAL',
        subtitle: 'Subtitle',
        description: 'Description',
        colorClass: AVAILABLE_COLORS[goals.length % AVAILABLE_COLORS.length]
      }
    ]);
  };

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleUpdateGoal = (index: number, key: keyof Goal, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = { ...newGoals[index], [key]: value };
    setGoals(newGoals);
  };

  const moveGoal = (index: number, direction: number) => {
    if (index + direction < 0 || index + direction >= goals.length) return;
    const newGoals = [...goals];
    const temp = newGoals[index];
    newGoals[index] = newGoals[index + direction];
    newGoals[index + direction] = temp;
    setGoals(newGoals);
  };

  const handleSave = () => {
    if (goals.length === 0) {
      alert('You must have at least one goal.');
      return;
    }
    if (duration <= 0) {
      alert('Duration must be greater than 0.');
      return;
    }
    
    // confirm edit 
    if (window.confirm("Saving will update your planner. Depending on duration changes, some future progress might be truncated. Continue?")) {
      onSave({
        title1,
        title2,
        duration: Number(duration),
        startDate,
        endDate: '', // Will be recalculated by the hook
        goals
      });
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid var(--border-color)'
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-main)', fontWeight: 700 }}>Edit Planner Settings</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>Main Title (Left)</label>
            <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>Main Title (Right)</label>
            <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>Duration (Days)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
          </div>
        </div>

        <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-main)', fontWeight: 600 }}>Goals ({goals.length})</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {goals.map((g, index) => (
            <div key={g.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', backgroundColor: '#fcfdfd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Goal {index + 1}</strong>
                <div>
                  <button onClick={() => moveGoal(index, -1)} disabled={index === 0} style={{ marginRight: '0.5rem', cursor: 'pointer' }}>↑</button>
                  <button onClick={() => moveGoal(index, 1)} disabled={index === goals.length - 1} style={{ marginRight: '0.5rem', cursor: 'pointer' }}>↓</button>
                  <button onClick={() => handleRemoveGoal(index)} style={{ color: 'red', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input type="text" placeholder="Title (e.g. 01. APTITUDE)" value={g.title} onChange={e => handleUpdateGoal(index, 'title', e.target.value)} style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                <input type="text" placeholder="Subtitle" value={g.subtitle} onChange={e => handleUpdateGoal(index, 'subtitle', e.target.value)} style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                <input type="text" placeholder="Description" value={g.description} onChange={e => handleUpdateGoal(index, 'description', e.target.value)} style={{ gridColumn: '1 / -1', padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleAddGoal} style={{ padding: '0.5rem 1rem', border: '1px solid var(--text-dark)', borderRadius: '4px', background: 'transparent', cursor: 'pointer', marginBottom: '2rem' }}>
          + Add Goal
        </button>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{ padding: '0.5rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--text-dark)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save Planner</button>
        </div>
      </div>
    </div>
  );
};
