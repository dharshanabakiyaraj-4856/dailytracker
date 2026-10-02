import { useState, useEffect } from 'react';
import type { AppState, Goal, TrackerState } from '../types';
import { DEFAULT_GOALS } from '../types';

const getInitialTracker = (goals: Goal[], duration: number) => {
  const t: Record<string, TrackerState[]> = {};
  goals.forEach(g => {
    t[g.id] = Array(duration).fill(0);
  });
  return t;
};

const INITIAL_STATE: AppState = {
  title1: 'GOAL',
  title2: 'TRACKER',
  duration: 90,
  startDate: '',
  endDate: '',
  goals: DEFAULT_GOALS,
  tracker: getInitialTracker(DEFAULT_GOALS, 90),
  notes: ''
};

const STORAGE_KEY = 'winter_arc_tracker_v2';

export function useWinterArc() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.goals && Array.isArray(parsed.goals)) {
          if (parsed.title1 === 'WINTER ARC' || parsed.title1 === 'DAILY PLAN') {
            parsed.title1 = 'GOAL';
          }
          if (parsed.title2 === '90 DAY TRACKER' || parsed.title2 === 'DAILY TRACKER') {
            parsed.title2 = 'TRACKER';
          }
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse state', e);
      }
    }
    // Fallback to v1 migration
    const v1 = localStorage.getItem('winter_arc_tracker_v1');
    if (v1) {
      try {
        const parsed = JSON.parse(v1);
        return {
          ...INITIAL_STATE,
          startDate: parsed.startDate || '',
          endDate: parsed.endDate || '',
          tracker: parsed.tracker || INITIAL_STATE.tracker,
          notes: parsed.notes || ''
        };
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleCell = (goalId: string, dayIndex: number) => {
    setState(prev => {
      const current = prev.tracker[goalId]?.[dayIndex] || 0;
      const next = ((current + 1) % 3) as TrackerState; 
      const newTracker = { ...prev.tracker };
      newTracker[goalId] = [...newTracker[goalId]];
      newTracker[goalId][dayIndex] = next;
      return { ...prev, tracker: newTracker };
    });
  };

  const updateDates = (startDateStr: string) => {
    setState(prev => {
      if (!startDateStr) {
        return { ...prev, startDate: '', endDate: '' };
      }
      const d = new Date(startDateStr);
      d.setDate(d.getDate() + prev.duration - 1);
      const endStr = d.toISOString().split('T')[0];
      return { ...prev, startDate: startDateStr, endDate: endStr };
    });
  };

  const updateNotes = (notes: string) => {
    setState(prev => ({ ...prev, notes }));
  };

  const resetTracker = () => {
    if (window.confirm("Are you sure you want to reset your tracker data?")) {
      setState(prev => ({
        ...prev,
        startDate: '',
        endDate: '',
        tracker: getInitialTracker(prev.goals, prev.duration),
        notes: ''
      }));
    }
  };

  const updateSettings = (newSettings: Omit<AppState, 'tracker' | 'notes'>) => {
    setState(prev => {
      const newTracker = { ...prev.tracker };
      
      // Initialize any missing tracking arrays for new goals
      newSettings.goals.forEach(g => {
        if (!newTracker[g.id]) {
          newTracker[g.id] = Array(newSettings.duration).fill(0);
        } else if (newTracker[g.id].length !== newSettings.duration) {
          // Adjust length
          const arr = [...newTracker[g.id]];
          if (arr.length < newSettings.duration) {
            newTracker[g.id] = arr.concat(Array(newSettings.duration - arr.length).fill(0));
          } else {
            newTracker[g.id] = arr.slice(0, newSettings.duration);
          }
        }
      });
      
      // calculate new end date if start date exists
      let newEndDate = prev.endDate;
      if (newSettings.startDate) {
        const d = new Date(newSettings.startDate);
        d.setDate(d.getDate() + newSettings.duration - 1);
        newEndDate = d.toISOString().split('T')[0];
      }

      return {
        ...prev,
        ...newSettings,
        endDate: newEndDate,
        tracker: newTracker
      };
    });
  };

  return {
    state,
    toggleCell,
    updateDates,
    updateNotes,
    resetTracker,
    updateSettings
  };
}
