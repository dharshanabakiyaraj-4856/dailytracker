import type { AppState, Goal } from '../types';

export const calculateGoalProgress = (tracker: AppState['tracker'], goalId: string) => {
  return tracker[goalId]?.filter(state => state === 1).length || 0;
};

export const calculateTotalProgress = (tracker: AppState['tracker']) => {
  let total = 0;
  for (const goal in tracker) {
    total += calculateGoalProgress(tracker, goal);
  }
  return total;
};

export const calculateWeeklyProgress = (tracker: AppState['tracker'], duration: number, goals: Goal[]) => {
  const weeks = [];
  const totalWeeks = Math.ceil(duration / 7);

  for (let w = 0; w < totalWeeks; w++) {
    const startDay = w * 7;
    let endDay = startDay + 7;
    if (endDay > duration) endDay = duration;

    let weekTotalDone = 0;
    let weekTotalPossible = 0;
    
    const weekData: Record<string, number> = {};
    goals.forEach(g => { weekData[g.id] = 0; });

    if (startDay < duration) {
      const daysInWeek = endDay - startDay;
      weekTotalPossible = daysInWeek * goals.length;
      
      for (const g of goals) {
        if (tracker[g.id]) {
          const slice = tracker[g.id].slice(startDay, endDay);
          const done = slice.filter(s => s === 1).length;
          weekData[g.id] = done;
          weekTotalDone += done;
        }
      }
    }

    weeks.push({
      weekNumber: w + 1,
      goalData: weekData,
      percentage: weekTotalPossible > 0 ? Math.round((weekTotalDone / weekTotalPossible) * 100) : 0
    });
  }
  return weeks;
};
