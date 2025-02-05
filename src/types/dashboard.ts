export interface Skill {
  id: string;
  name: string;
  category: string;
  targetHours: number;
  currentHours: number;
  color: string;
}

export interface TimeSession {
  id: string;
  skillId: string;
  date: string;
  duration: number;
  activityType: "reading" | "watching" | "coding" | "practicing";
  notes: string;
  resourceUrl?: string;
  tags: string[];
}




export interface Resource {
  id: string;
  title: string;
  url: string;
  type: "article" | "video" | "course" | "documentation";
  status: "completed" | "in-progress" | "not-started";
  rating?: number;
  skillId: string;
  tags: string[];
}

export interface DailyProgress {
  date: string;
  totalHours: number;
  sessions: TimeSession[];
}

export interface SkillProgress {
  skill: Skill;
  dailyProgress: DailyProgress[];
  totalHours: number;
  percentageComplete: number;
}
