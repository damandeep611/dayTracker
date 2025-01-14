import { TimeSession } from "@/types/dashboard";
import React, { useState } from "react";

interface ActivityFormProps {
  onSubmit: (session: Omit<TimeSession, "id">) => void;
  skills: { id: string; name: string }[];
}

export default function ActivityForm({ onSubmit, skills }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    skillId: "",
    duration: 0,
    activityType: "coding" as TimeSession["activityType"],
    notes: "",
    resourceUrl: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toISOString(),
      tags: formData.tags.split(".").map((tag) => tag.trim()),
    });
    setFormData({
      skillId: "",
      duration: 0,
      activityType: "coding",
      notes: "",
      resourceUrl: "",
      tags: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6 "
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skill
          </label>
          <select
            value={formData.skillId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, skillId: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Activity Type
          </label>

          <select
            value={formData.activityType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                activityType: e.target.value as TimeSession["activityType"],
              }))
            }
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="coding">Coding</option>
            <option value="reading">Reading</option>
            <option value="watching">Watching</option>
            <option value="practicing">Practicing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                duration: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resource Url
          </label>
          <input
            type="url"
            value={formData.resourceUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, resourceUrl: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma- separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 text-white rounded-md px-4 py-2 hover:bg-violet-700"
        >
          Log Activity
        </button>
      </div>
    </form>
  );
}
