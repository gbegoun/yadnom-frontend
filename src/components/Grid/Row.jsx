import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Row = ({ id, columns, row, resizeState }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`dataRow ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      {columns.map(column => (
        <div 
          key={column.id} 
          className={`dataCell ${resizeState.columnId==column.id ? 'resize' : ''}`}
          style={{ width: `${column.width}px` }}
        >
          {row[column.id]}
        </div>
      ))}
    </div>
  );
};