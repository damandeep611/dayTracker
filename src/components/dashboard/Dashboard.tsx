import { DndProvider } from "react-dnd";
import { KanbanBoard } from "./KanbanBoard";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Dashboard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <KanbanBoard />
      </div>
    </DndProvider>
  );
}
