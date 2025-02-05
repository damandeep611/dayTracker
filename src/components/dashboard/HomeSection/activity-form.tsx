import { TimeSession } from "@/types/dashboard";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface ActivityFormProps {
  onSubmit: (session: Omit<TimeSession, "id">) => void;
  skills: { id: string; name: string }[];
}

export default function ActivityForm({ onSubmit, skills }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    skillId: "",
    duration: 30,
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
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    });
    setFormData({
      skillId: "",
      duration: 30,
      activityType: "coding" as TimeSession["activityType"],
      notes: "",
      resourceUrl: "",
      tags: "",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-600 p-6 shadow-sm"
    >
      <div className="space-y-4">
        {/* first row of input */}
        <div className="flex gap-4">
          {/* --choose skill input field of form  */}
          <div className="flex-1">
            <label htmlFor="skillId">Choose Skill</label>
            <select
              id="skillId"
              value={formData.skillId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, skillId: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
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
          {/* duration of skill input field  */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Duration (min)
            </label>
            <input
              type="number"
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  duration: Number(e.target.value),
                }))
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-violet-500"
              required
              min="5"
            />
          </div>
        </div>
        {/* Activity type input for skill */}
        <div>
          <label htmlFor="activityType">Activity Type</label>
          <select
            id="activityType"
            value={formData.activityType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                activityType: e.target.value as TimeSession["activityType"],
              }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="coding">Coding</option>
            <option value="reading">Reading</option>
            <option value="Watching">Watching</option>
            <option value="practicing">Practicing</option>
          </select>
        </div>
        {/* Resource Url input field */}
        <div>
          <label htmlFor="resourceUrl">Resource Url</label>
          <input
            type="url"
            id="resourceUrl"
            value={formData.resourceUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, resourceUrl: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
        {/* Note addition input Field */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any additional notes here.."
          />
        </div>
        {/* Tags to add to cards */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-blue-950 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:ring-offset-2 transition-colors duration-200"
        >
          <PlusIcon className="inline-block w-5 h-5 mr-2" />
          Log Activity
        </button>
      </div>
    </form>
  );
}
