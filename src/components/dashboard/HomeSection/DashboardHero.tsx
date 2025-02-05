import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Skill, TimeSession } from "@/types/dashboard";
import { useEffect, useState } from "react";
import SkillCard from "./skill-card";
import ActivityForm from "./activity-form";
import AddSkillModal from "./add-skill-modal";

//function to load data from local storage
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
};

// function to save data to local storage
const saveToLocalStorage = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "Frontend",
    targetHours: 200,
    currentHours: 0,
    color: "#6366f1",
  },
  {
    id: "2",
    name: "Node.js",
    category: "Backend",
    targetHours: 10000,
    currentHours: 1800,
    color: "#10b981",
  },
  {
    id: "3",
    name: "DevOps",
    category: "Infrastructure",
    targetHours: 10000,
    currentHours: 900,
    color: "#f59e0b",
  },
];

export default function DashboardHero() {
  const [skills, setSkills] = useState<Skill[]>(() =>
    loadFromLocalStorage("skills", initialSkills)
  );
  const [sessions, setSessions] = useState<TimeSession[]>(() =>
    loadFromLocalStorage("sessions", [])
  );
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  // save data to localstorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("skills", skills);
  }, [skills]);

  useEffect(() => {
    saveToLocalStorage("sessions", sessions);
  }, [sessions]);

  const handleActivitySubmit = (session: Omit<TimeSession, "id">) => {
    const newSession: TimeSession = {
      ...session,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSessions((prev) => {
      const updatedSessions = [newSession, ...prev];
      saveToLocalStorage("sessions", updatedSessions);
      return updatedSessions;
    });

    // Update skill hours
    setSkills((prev) => {
      const updatedSkills = prev.map((skill) => {
        if (skill.id === session.skillId) {
          return {
            ...skill,
            currentHours: skill.currentHours + session.duration / 60,
          };
        }
        return skill;
      });
      saveToLocalStorage("skills", updatedSkills);
      return updatedSkills;
    });
  };

  const handleAddSkill = (newSkill: Omit<Skill, "id" | "currentHours">) => {
    const skill: Skill = {
      ...newSkill,
      id: Math.random().toString(36).substr(2, 9),
      currentHours: 0,
    };
    setSkills((prev) => {
      const updatedSkills = [...prev, skill];
      saveToLocalStorage("skills", updatedSkills);
      return updatedSkills;
    });
  };

  const handleEditSkill = (updatedSkill: Skill) => {
    setSkills((prev) => {
      const updatedSkills = prev.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      );
      saveToLocalStorage("skills", updatedSkills);
      return updatedSkills;
    });
  };

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => {
      const updatedSkills = prev.filter((skill) => skill.id !== id);
      saveToLocalStorage("skills", updatedSkills);
      return updatedSkills;
    });
  };

  const handleQuickAdd = (skillId: string) => {
    // Open activity form with pre-filled skill
    // For now, we'll just log it
    console.log("Quick add for skill:", skillId);
  };

  const totalHours =
    skills.length > 0
      ? skills.reduce((sum, skill) => sum + skill.currentHours, 0)
      : 0;
  const topSkill =
    skills.length > 0
      ? skills.reduce(
          (top, skill) => (skill.currentHours > top.currentHours ? skill : top),
          skills[0]
        )
      : null;
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills or activities"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
              View Analytics
            </button>
            <button
              onClick={() => setIsAddSkillModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors duration-200"
            >
              Add New Skill
            </button>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Quick Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Hours
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {totalHours.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Top Skill
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {topSkill ? topSkill.name : "No skill Added yet"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Skills
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {skills.length}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Your Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={handleEditSkill}
                onDelete={handleDeleteSkill}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        </div>

        {/* Activity Logging */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Log Activity
            </h2>
            <ActivityForm
              onSubmit={handleActivitySubmit}
              skills={skills.map(({ id, name }) => ({ id, name }))}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Recent Activities
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-0 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {skills.find((s) => s.id === session.skillId)?.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {session.activityType} • {session.duration} minutes
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      {new Date(session.date).toLocaleDateString()}
                    </span>
                  </div>
                  {session.notes && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {session.notes}
                    </p>
                  )}
                  {session.tags.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {session.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {sessions.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No activities logged yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAddSkill={handleAddSkill}
      />
    </div>
  );
}
