import { SuggestionCategory } from '../types';

export const TASK_SUGGESTIONS: SuggestionCategory[] = [
  {
    category: "Health & Nutrition",
    iconName: "Apple",
    items: [
      "Cook healthy food",
      "Drink 2 liters of water",
      "No junk food or soda",
      "Take daily vitamins",
      "No eating after 8:00 PM",
      "Eat 2 servings of fruits/veggies"
    ]
  },
  {
    category: "Fitness & Activity",
    iconName: "Activity",
    items: [
      "Workout 15 min",
      "5,000 steps",
      "10,000 steps",
      "Morning stretch & mobility",
      "30-min cardio or run",
      "Core & strength training",
      "Evening posture exercises"
    ]
  },
  {
    category: "Learning & Growth",
    iconName: "BookOpen",
    items: [
      "Study 15 min",
      "Read 10 pages of a book",
      "Practice coding / build project",
      "Learn a new language lesson",
      "Watch an educational lecture",
      "Review study flashcards"
    ]
  },
  {
    category: "Rest & Well-being",
    iconName: "Moon",
    items: [
      "8 hours sleep",
      "In bed before 11:00 PM",
      "Meditate for 10 min",
      "15 min screen-free before sleep",
      "Morning sunlight exposure",
      "Gratitude journaling"
    ]
  },
  {
    category: "Focus & Productivity",
    iconName: "CheckCircle",
    items: [
      "Deep work block (45 min)",
      "Zero inbox / organize files",
      "Clean & declutter desk",
      "Plan top 3 priorities",
      "Track daily expenses"
    ]
  }
];

export const DEFAULT_DAILY_TASKS = [
  "Cook healthy",
  "Workout 15 min",
  "Study 15 min",
  "5,000 steps",
  "8 hours sleep"
];
