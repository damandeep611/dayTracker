import { Skill } from "@/types/dashboard";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
  onQuickAdd: (skillId: string) => void;
}

export default function SkillCard({
  skill,
  onEdit,
  onDelete,
  onQuickAdd,
}: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const percentage = (skill.currentHours / skill.targetHours) * 100;
  const trend = skill.trend || 0; //assuming we add a 'trend' property to skill type

  const formatTime = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (wholeHours === 0) {
      return `${minutes} minute ${minutes !== 1 ? "s" : ""}`;
    }
    return `${wholeHours} hour ${
      wholeHours !== 1 ? "s" : ""
    } ${minutes} minute ${minutes !== 1 ? "s" : ""}`;
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{skill.name}</h3>
          <span className="text-sm text-gray-500">{skill.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuickAdd(skill.id)}
            className="text-violet-600 hover:text-violet-700"
            title="Quick add activity"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{formatTime(skill.currentHours)}</span>
          <span>{formatTime(skill.targetHours)}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: skill.color,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500">{percentage.toFixed(1)}% complete</div>
        <div
          className={`flex items-center ${
            trend > 0
              ? "text-green-600"
              : trend < 0
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {trend > 0 ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : trend < 0 ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : null}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(skill)}
              className="text-sm text-violet-600 hover:text-violet-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(skill.id)}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
