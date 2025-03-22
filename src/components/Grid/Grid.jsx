import React, { useState, useEffect, useCallback } from 'react';
import { Row } from './Row.jsx';
import '../../styles/components/Grid/grid.css';

import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const useColumnResize = (initialColumns) => {
  const [columns, setColumns] = useState(initialColumns);
  const [resizeState, setResizeState] = useState({ 
    active: false, 
    columnId: null, 
    startX: 0, 
    startWidth: 0 
  });

  const handleResizeMouseDown = useCallback((e, columnId) => {
    e.preventDefault();
    const column = columns.find(col => col.id === columnId);
    
    setResizeState({
      active: true,
      columnId,
      startX: e.clientX,
      startWidth: column.width
    });
  }, [columns]);

  const handleResizeMouseMove = useCallback((e) => {
    if (!resizeState.active) return;

    const diff = e.clientX - resizeState.startX;
    setColumns(prevColumns => prevColumns.map(col => {
      if (col.id === resizeState.columnId) {
        return { ...col, width: Math.max(50, resizeState.startWidth + diff) };
      }
      return col;
    }));
  }, [resizeState]);

  const handleResizeMouseUp = useCallback(() => {
    setResizeState(prev => ({
      ...prev,
      active: false,
      columnId: null
    }));
  }, []);

  useEffect(() => {
    if (resizeState.active) {
      window.addEventListener('mousemove', handleResizeMouseMove);
      window.addEventListener('mouseup', handleResizeMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleResizeMouseMove);
      window.removeEventListener('mouseup', handleResizeMouseUp);
    };
  }, [resizeState.active, handleResizeMouseMove, handleResizeMouseUp]);

  return { columns, setColumns, resizeState, handleResizeMouseDown };
};

const TableHeader = ({ columns, onResizeStart }) => (
  <div className="headerRow">
    {columns.map((column) => (
      <div
        key={column.id}
        className="headerCell"
        style={{ width: `${column.width}px` }}
      >
        <div className="cellContent">
          <span>{column.label}</span>
        </div>
        <div
          className="resizeIndicator"
          onMouseDown={(e) => onResizeStart(e, column.id)}
        />
      </div>
    ))}
  </div>
);

export const Grid = () => {
  // Sample data
  const initialData = [
    { id: 1, name: 'John Doe', age: 28, occupation: 'Developer', location: 'New York' },
    { id: 2, name: 'Jane Smith', age: 32, occupation: 'Designer', location: 'San Francisco' },
    { id: 3, name: 'Robert Johnson', age: 45, occupation: 'Manager', location: 'Chicago' },
    { id: 4, name: 'Emily Wilson', age: 26, occupation: 'Marketing', location: 'Boston' },
  ];

  const initialColumns = [
    { id: 'name', label: 'Name', width: 150 },
    { id: 'age', label: 'Age', width: 150 },
    { id: 'occupation', label: 'Occupation', width: 150 },
    { id: 'location', label: 'Location', width: 150 },
  ];

  const [data, setData] = useState(initialData);
  
  const { 
    columns, 
    resizeState, 
    handleResizeMouseDown 
  } = useColumnResize(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="tableContainer">
      <TableHeader 
        columns={columns} 
        onResizeStart={handleResizeMouseDown} 
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="tableBody">
            {data.map((row) => (
              <Row
                key={row.id}
                id={row.id}
                columns={columns}
                row={row}
                resizeState={resizeState}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};