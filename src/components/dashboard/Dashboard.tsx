import { DndProvider } from "react-dnd";
import { KanbanBoard } from "./KanbanBoard/KanbanBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main>
        <DndProvider backend={HTML5Backend}>
          <div>
            <KanbanBoard />
          </div>
        </DndProvider>
      </main>
    </div>
  );
}
