import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Timer from "./timer";
import { Skill, TimeSession } from "@/types/dashboard";
import { useState } from "react";
import SkillCard from "./skill-card";
import ActivityForm from "./activity-form";

const initialSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    category: "Frontend",
    targetHours: 10000,
    currentHours: 2500,
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
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [sessions, setSessions] = useState<TimeSession[]>([]);

  const handleTimeUpdate = (seconds: number) => {
    //handle ongoing timer update
    console.log("Timer update:", seconds);
  };

  const handleTimerStop = (totalSeconds: number) => {
    //handle timer stop  - could open form to log activity
    console.log("Timer stopped at: ", totalSeconds);
  };

  const handleActivitySubmit = (session: Omit<TimeSession, "id">) => {
    const newSession: TimeSession = {
      ...session,
      id: Math.random().toString(36).substring(2, 9),
    };
    setSessions((prev) => [...prev, newSession]);

    //update skill hours
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === session.skillId) {
          return {
            ...skill,
            currentHours: skill.currentHours + session.duration / 60,
          };
        }
        return skill;
      })
    );
  };
  return (
    <div className="flex-1 overflow-y-auto">
      <div className=" px-8 py-6">
        {/* header */}
        <div className="flex flex-col justify-between mb-8">
          <div className="flex items-center">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills or activites"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </div>
          {/* header buttons */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              View Analytics
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-gray-200 rounded-lg hover:bg-violet-700">
              Add New Skill
            </button>
          </div>

          {/* timer section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Active Sessions
            </h2>
            <Timer onTimeUpdate={handleTimeUpdate} onStop={handleTimerStop} />
          </div>
          {/* skills grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Your Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </div>
          {/* activity logging */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Log Activity
              </h2>
              <ActivityForm
                onSubmit={handleActivitySubmit}
                skills={skills.map(({ id, name }) => ({ id, name }))}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Activites
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="border-b border-gray-100 last:border-0 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {skills.find((s) => s.id === session.skillId)?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {session.activityType} . {session.duration} minutes
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                    </div>
                    {session.notes && (
                      <p className="mt-2 text-sm text-gray-600">
                        {session.notes}
                      </p>
                    )}
                    {session.tags.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {session.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {sessions.length === 0 && (
                  <p className="text-gray-500 text-center">
                    No activites logged yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
