import { DayRecord, TaskItem } from '../types';

export const createDefaultTasks = (): TaskItem[] => [
  { id: 'task-1', title: 'Cook healthy', completed: false },
  { id: 'task-2', title: 'Workout 15 min', completed: false },
  { id: 'task-3', title: 'Study 15 min', completed: false },
  { id: 'task-4', title: '5,000 steps', completed: false },
  { id: 'task-5', title: '8 hours sleep', completed: false },
];

export const INITIAL_SEED_RECORDS: Record<string, DayRecord> = {
  '2026-10-01': {
    dateString: '2026-10-01',
    tasks: [
      { id: 't-1-1', title: 'Cook healthy', completed: true },
      { id: 't-1-2', title: 'Workout 15 min', completed: true },
      { id: 't-1-3', title: 'Study 15 min', completed: false, missed: true },
      { id: 't-1-4', title: '5,000 steps', completed: true },
      { id: 't-1-5', title: '8 hours sleep', completed: false, missed: true },
    ],
    reflection: 'Good start to the month. Managed to meal prep and exercise, but stayed up too late browsing my phone.',
    finalized: true,
  },
  '2026-10-02': {
    dateString: '2026-10-02',
    tasks: [
      { id: 't-2-1', title: 'Cook healthy', completed: false, missed: true },
      { id: 't-2-2', title: 'Workout 15 min', completed: false, missed: true },
      { id: 't-2-3', title: 'Study 15 min', completed: false, missed: true },
      { id: 't-2-4', title: '5,000 steps', completed: false, missed: true },
      { id: 't-2-5', title: '8 hours sleep', completed: false, missed: true },
    ],
    reflection: 'Exhausted from work, ordered takeout and collapsed. Tomorrow is a reset day to bounce right back.',
    finalized: true,
  },
  '2026-10-03': {
    dateString: '2026-10-03',
    tasks: [
      { id: 't-3-1', title: 'Cook healthy', completed: true },
      { id: 't-3-2', title: 'Workout 15 min', completed: true },
      { id: 't-3-3', title: 'Study 15 min', completed: true },
      { id: 't-3-4', title: '5,000 steps', completed: true },
      { id: 't-3-5', title: '8 hours sleep', completed: true },
    ],
    reflection: '100% completion! Woke up early, got all my daily targets done before 6 PM. Felt focused and energized.',
    finalized: true,
  },
  '2026-10-04': {
    dateString: '2026-10-04',
    tasks: [
      { id: 't-4-1', title: 'Cook healthy', completed: true },
      { id: 't-4-2', title: 'Workout 15 min', completed: true },
      { id: 't-4-3', title: 'Study 15 min', completed: false, missed: true },
      { id: 't-4-4', title: '5,000 steps', completed: true },
      { id: 't-4-5', title: '8 hours sleep', completed: true },
    ],
    reflection: 'Sunday went really well overall. Fell short on study time because family visited. Need to carve out morning study sessions.',
    finalized: true,
  },
  '2026-10-05': {
    dateString: '2026-10-05',
    tasks: [
      { id: 't-5-1', title: 'Cook healthy', completed: true },
      { id: 't-5-2', title: 'Workout 15 min', completed: true },
      { id: 't-5-3', title: 'Study 15 min', completed: true },
      { id: 't-5-4', title: '5,000 steps', completed: true },
      { id: 't-5-5', title: '8 hours sleep', completed: true },
    ],
    reflection: 'Started the week with momentum. Pushed through study block right after work. 5/5 streak maintained!',
    finalized: true,
  },
  '2026-10-06': {
    dateString: '2026-10-06',
    tasks: [
      { id: 't-6-1', title: 'Cook healthy', completed: true },
      { id: 't-6-2', title: 'Workout 15 min', completed: true },
      { id: 't-6-3', title: 'Study 15 min', completed: false },
      { id: 't-6-4', title: '5,000 steps', completed: false },
      { id: 't-6-5', title: '8 hours sleep', completed: false },
    ],
    reflection: '',
    finalized: false,
  }
};
