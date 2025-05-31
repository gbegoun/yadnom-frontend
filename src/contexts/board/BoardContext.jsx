import { createContext, useState } from 'react';

export const BoardContext = createContext({
    onNewTaskClicked: (groupId, title = null) => {},
});

export const BoardProvider = ({ children }) => {
  // ...other state...
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskSelect = (taskId) => {
    setSelectedTaskId(prevId => prevId === taskId ? null : taskId); // Toggle selection
  };

  return (
    <BoardContext.Provider value={{
      // ...other context values...
      selectedTaskId,
      onTaskSelect: handleTaskSelect
    }}>
      {children}
    </BoardContext.Provider>
  );
};