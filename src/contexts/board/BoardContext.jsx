import { createContext } from 'react';

export const BoardContext = createContext({
    onNewTaskClicked: (groupId, title = null) => {},
});