import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/components/Grid/grid.css';

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
  const [columns, setColumns] = useState(initialColumns);
  const [dragState, setDragState] = useState({ type: null, index: null, targetIndex: null });
  const [resizeState, setResizeState] = useState({ active: false, columnId: null, startX: 0, startWidth: 0 });
  
  const resizeStateRef = useRef(resizeState);

  const handleResizeMouseDown = useCallback((e, columnId) => {
    e.preventDefault();
    const column = columns.find(col => col.id === columnId);
    const newState = { 
      active: true, 
      columnId, 
      startX: e.clientX, 
      startWidth: column.width 
    };
    
    setResizeState(newState);
    resizeStateRef.current = newState; 
    
    window.addEventListener('mousemove', handleResizeMouseMove);
    window.addEventListener('mouseup', handleResizeMouseUp);
  }, [columns]);

  const handleResizeMouseMove = useCallback((e) => {
    const currentState = resizeStateRef.current;
    if (!currentState.active) return;
    
    const diff = e.clientX - currentState.startX;
    setColumns(prevColumns => prevColumns.map(col => {
      if (col.id === currentState.columnId) {
        return { ...col, width: Math.max(50, currentState.startWidth + diff) };
      }
      return col;
    }));
  }, []);

  const handleResizeMouseUp = useCallback(() => {
    setResizeState(prev => ({
      ...prev,
      active: false,
      columnId: null
    }));
    
    resizeStateRef.current = {
      ...resizeStateRef.current,
      active: false,
      columnId: null
    };
    
    window.removeEventListener('mousemove', handleResizeMouseMove);
    window.removeEventListener('mouseup', handleResizeMouseUp);
  }, [handleResizeMouseMove]);

  const handleDragStart = (e, index, type) => {
    setDragState({ type, index, targetIndex: null });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index, type) => {
    e.preventDefault();
    if (dragState.type !== type || dragState.index === index) return;
    setDragState(prev => ({ ...prev, targetIndex: index }));
  };

  const handleDrop = () => {
    const { type, index, targetIndex } = dragState;
    if (!type || targetIndex === null) return;
    
    if (type === 'row') {
      const newData = [...data];
      const draggedItem = newData[index];
      newData.splice(index, 1);
      newData.splice(targetIndex, 0, draggedItem);
      setData(newData);
    } else if (type === 'column') {
      const newColumns = [...columns];
      const draggedItem = newColumns[index];
      newColumns.splice(index, 1);
      newColumns.splice(targetIndex, 0, draggedItem);
      setColumns(newColumns);
    }
    
    setDragState({ type: null, index: null, targetIndex: null });
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleResizeMouseMove);
      window.removeEventListener('mouseup', handleResizeMouseUp);
    };
  }, [handleResizeMouseMove, handleResizeMouseUp]);

  useEffect(() => {
    console.log('Resize state changed:', resizeState);
  }, [resizeState]);
  

  return (
    <div className="tableContainer">
      <div className="headerRow">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="headerCell"
            style={{ width: `${column.width}px` }}
            draggable
            onDragStart={(e) => handleDragStart(e, index, 'column')}
            onDragOver={(e) => handleDragOver(e, index, 'column')}
            onDragEnd={handleDrop}
          >
            <div className="cellContent">
              <span>{column.label}</span>
            </div>
            <div
              className="resizeIndicator"
              onMouseDown={(e) => handleResizeMouseDown(e, column.id)}
            />
          </div>
        ))}
      </div>

      <div className="tableBody">
        {data.map((row, rowIndex) => (
          <div
            key={row.id}
            className="dataRow"
            draggable
            onDragStart={(e) => handleDragStart(e, rowIndex, 'row')}
            onDragOver={(e) => handleDragOver(e, rowIndex, 'row')}
            onDragEnd={handleDrop}
          >
            {columns.map((column) => (
              <div
                key={`${row.id}-${column.id}`}
                className={`dataCell ${resizeState.columnId === column.id ? "resize" : ""}`}
                style={{ width: `${column.width}px` }}
              >
                <span>{row[column.id]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};