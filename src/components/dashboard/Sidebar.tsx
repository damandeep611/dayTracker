import {
  ArchiveBoxIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const sidebarNavigation = {
  favorites: [
    {
      id: "tech-docs",
      title: "Technical Docs",
      icon: DocumentTextIcon,
      path: "/docs",
    },
    {
      id: "campaign-guidelines",
      title: "Campaign Guidelines",
      icon: DocumentTextIcon,
      path: "/guidelines",
    },
    {
      id: "important-rules",
      title: "Important Rules",
      icon: DocumentTextIcon,
      path: "rules",
    },
    {
      id: "onboarding",
      title: "Onboarding",
      icon: DocumentTextIcon,
      path: "onboarding",
    },
  ],
  mainMenu: [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: ChartBarIcon,
      path: "/dashboard",
    },
    {
      id: "kanban",
      title: "Kanban Board",
      icon: BuildingOfficeIcon,
      path: "/dashboard/kanban",
    },
    { id: "chat", title: "Chat", icon: ChatBubbleLeftIcon, path: "/chat" },
    {
      id: "support",
      title: "Support Center",
      icon: UserGroupIcon,
      path: "/support",
    },
    { id: "leads", title: "Leads", icon: UserGroupIcon, path: "/lead" },
    { id: "archive", title: "Archive", icon: ArchiveBoxIcon, path: "archive" },
  ],
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={`relative h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg" />
          {!isCollapsed && (
            <span className="font-semibold ml-2">Dashboard</span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-7 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="px-4 py-2">
        <div className="mb-8">
          <div className="text-xs font-semibold text-gray-400 mb-2">
            {!isCollapsed && "Favorites"}
          </div>
          {sidebarNavigation.favorites.map((item) => (
            <a
              href={item.path}
              key={item.id}
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </a>
          ))}
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-400 mb-2">
            {!isCollapsed && "Main Menu"}
          </div>
          {sidebarNavigation.mainMenu.map((item) => (
            <a
              href={item.path}
              key={item.id}
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50"
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
