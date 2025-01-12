import { Column } from "@/types/types";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface ColumnContainerProps {
  column: Column;
  children: React.ReactNode;
}

export const ColumnContainer: React.FC<ColumnContainerProps> = ({
  column,
  children,
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div ref={setNodeRef} className="bg-white p-4 rounded-lg  shadow-md flex-1">
      <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
      {children}
    </div>
  );
};
