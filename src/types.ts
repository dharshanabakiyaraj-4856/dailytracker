export type TrackerState = 0 | 1 | 2; // 0: Not Done, 1: Done, 2: Partial

export interface Goal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colorClass: string; // e.g. goal-bg-aptitude, goal-bg-custom-1
}

export interface AppState {
  title1: string;
  title2: string;
  duration: number;
  startDate: string;
  endDate: string;
  goals: Goal[];
  tracker: Record<string, TrackerState[]>; // key is goal id
  notes: string;
}

export const DEFAULT_GOALS: Goal[] = [
  {
    id: 'aptitude',
    title: '01. APTITUDE',
    subtitle: 'Practice · Improve · Succeed',
    description: 'Be placement-test ready with good speed and accuracy.',
    colorClass: 'goal-bg-aptitude'
  },
  {
    id: 'communication',
    title: '02. COMMUNICATION',
    subtitle: 'Speak · Express · Grow',
    description: 'Speak confidently in placement situations\n(JAM, HR, technical, etc.).',
    colorClass: 'goal-bg-communication'
  },
  {
    id: 'frontendApi',
    title: '03. FRONTEND + API',
    subtitle: 'Learn · Build · Integrate',
    description: 'Build a complete frontend application\nconnected to an API.',
    colorClass: 'goal-bg-frontendApi'
  },
  {
    id: 'healthyFood',
    title: '04. HEALTHY FOOD',
    subtitle: 'Eat Well · Feel Good',
    description: 'Have a sustainable eating routine\nand stay consistent.',
    colorClass: 'goal-bg-healthyFood'
  },
  {
    id: 'hairMaintenance',
    title: '05. HAIR MAINTENANCE',
    subtitle: 'Care · Maintain · Shine',
    description: 'Follow a simple, consistent hair-care routine\nthat works for you.',
    colorClass: 'goal-bg-hairMaintenance'
  }
];

export const AVAILABLE_COLORS = [
  'goal-bg-aptitude',
  'goal-bg-communication',
  'goal-bg-frontendApi',
  'goal-bg-healthyFood',
  'goal-bg-hairMaintenance',
];
