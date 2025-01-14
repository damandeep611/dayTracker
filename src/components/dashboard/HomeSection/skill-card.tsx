import { Skill } from "@/types/dashboard";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

export default function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  const percentage = (skill.currentHours / skill.targetHours) * 100;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{skill.name}</h3>
          <span className="text-sm text-gray-500">{skill.category}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(skill)}
            className="text-gray-400 hover:text-violet-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(skill.id)}
            className="text-gray-400 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{skill.currentHours} hours</span>
          <span>{skill.targetHours} hours</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full rounded-full bg-violet-600"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: skill.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
