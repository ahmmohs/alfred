export type DayType =
  | "mo"
  | "tu"
  | "we"
  | "th"
  | "fr"
  | "sa"
  | "su";

export type TaskType = {
  name: string;
  completions: Array<number>;
  optional: boolean;
  repeat: boolean;
  specificDate?: number;
};

export type Block = {
  days: Array<string>;
  blockStart: number;
  blockEnd: number;
  name: string;
  reward: number;
  tasks: Array<TaskType>;
};

export const blocks: Array<Block> = [
  {
    days: ["mo", "tu", "we", "th", "fr"],
    blockStart: 7,
    blockEnd: 7.5,
    name: "Morning Routine",
    reward: 250,
    tasks: [
      {
        name: "Wake up",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Brush",
        completions: [],
        optional: false,
        repeat: true,
      },
    ],
  },
  {
    days: ["mo", "tu", "we", "th", "fr"],
    blockStart: 7.5,
    blockEnd: 9,
    name: "Physical Health",
    reward: 1500,
    tasks: [
      {
        name: "Posture Exercises",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Workout",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Quick Shower / Face Wash",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Breakfast",
        completions: [],
        optional: true,
        repeat: true,
      },
    ],
  },
  {
    days: ["mo", "tu", "we", "th", "fr"],
    blockStart: 9,
    blockEnd: 11,
    name: "Work Block 1",
    reward: 1000,
    tasks: [
      {
        name: "Figure out main task",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Comment on a diff",
        completions: [],
        optional: false,
        repeat: true,
      },
    ],
  },
  {
    days: ["mo", "tu", "we", "th", "fr"],
    blockStart: 11,
    blockEnd: 17,
    name: "Work Block 2",
    reward: 1000,
    tasks: [
      {
        name: "Complete main task",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Land a diff",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Eat & watch episode",
        completions: [],
        optional: true,
        repeat: true,
      },
    ],
  },
  {
    days: ["mo", "tu", "we", "th", "fr"],
    blockStart: 17,
    blockEnd: 20,
    name: "Entertainment Block",
    reward: 0,
    tasks: [],
  },
  {
    days: ["mo", "tu", "we", "th", "fr"],
    blockStart: 20,
    blockEnd: 22,
    name: "Winddown",
    reward: 500,
    tasks: [
      {
        name: "Journaling",
        completions: [],
        optional: true,
        repeat: true,
      },
      {
        name: "Planning tasks for tomorrow",
        completions: [],
        optional: true,
        repeat: true,
      },
      {
        name: "Face Routine",
        completions: [],
        optional: false,
        repeat: true,
      },
    ],
  },
  {
    days: ["sa", "su"],
    blockStart: 10,
    blockEnd: 10.5,
    name: "Morning Routine",
    reward: 250,
    tasks: [
      {
        name: "Wake up",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Brush",
        completions: [],
        optional: false,
        repeat: true,
      },
    ],
  },
  {
    days: ["su"],
    blockStart: 10.5,
    blockEnd: 13.5,
    name: "Cleaning Block",
    reward: 500,
    tasks: [
      {
        name: "Dishes",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Mop",
        completions: [],
        optional: false,
        repeat: true,
      },
      {
        name: "Bathroom",
        completions: [],
        optional: false,
        repeat: true,
      },
    ],
  },
  {
    days: ["sa"],
    blockStart: 10.5,
    blockEnd: 24,
    name: "Entertainment Block",
    reward: 0,
    tasks: [],
  },
  {
    days: ["su"],
    blockStart: 13.5,
    blockEnd: 24,
    name: "Entertainment Block",
    reward: 0,
    tasks: [],
  },
];
