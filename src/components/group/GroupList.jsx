import { useEffect, useState, useCallback } from "react";
import { GroupPreview } from "./GroupPreview";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { TaskPreview } from "../task/TaskPreview";
import { useSelector } from "react-redux";

export const GroupList = ({ board, onBoardSave }) => {
    
    // const [groups, setGroups] = useState(board.groups || []);
    // const [columns, setColumns] = useState(board.columns || []);
    // const [tasks, setTasks] = useState(board.tasks || []);

    // Can use useSelector to get board from Redux store if needed
    // const groups = useSelector(state => state.boardModule.board.groups)
    // const columns = useSelector(state => state.boardModule.board.columns)
    // const tasks = useSelector(state => state.boardModule.board.tasks)

    // Effect to update state when board changes
    // useEffect(() => {
    //     setGroups(board.groups || []);
    //     setColumns(board.columns || []);
    //     setTasks(board.tasks || []);
    // }, [board]);

    const [dragState, setDragState] = useState({
        isSorting: false,
        draggingId: null,
        draggingType: null,
        draggingTaskId: null,
        sourceGroupId: null,
        draggingTask: null,
        activeGroupId: null,
        dropIndices: {}
    })

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        }),
        useSensor(KeyboardSensor)
    )

    const handleDragStart = useCallback((event) => {
        const { active } = event
        const dragType = active.data.current?.type || 'group'

        if (dragType === 'task') {
            setDragState({
                ...dragState,
                draggingType: dragType,
                draggingTaskId: active.id,
                sourceGroupId: active.data.current.groupId,
                draggingTask: active.data.current.task
            })
        } else {
            setDragState({
                ...dragState,
                draggingType: dragType,
                draggingId: active.id,
                isSorting: true
            })
        }
    }, [dragState])

    const handleDragOver = useCallback((event) => {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        console.log('dragRender')
        const isActiveATask = active.data.current?.type === 'task'
        const isOverATask = over.data.current?.type === 'task'

        if (isActiveATask && isOverATask) {
            const activeIndex = board.tasks.findIndex(task => task._id === active.id)
            const overIndex = board.tasks.findIndex(task => task._id === over.id)
            if (board.tasks[activeIndex].groupid !== board.tasks[overIndex].groupid) {
                board.tasks[activeIndex].groupid = board.tasks[overIndex].groupid
            }
            // setTasks(arrayMove(tasks, activeIndex, overIndex))
        }

    }, [])

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event

        if (!over) {
            setDragState({
                isSorting: false,
                draggingId: null,
                draggingType: null,
                draggingTaskId: null,
                sourceGroupId: null,
                draggingTask: null,
                activeGroupId: null,
                dropIndices: {}
            })
            return
        }

        let updatedGroups = [...board.groups];

        if (dragState.draggingType === 'group' && active.id !== over.id) {
            const oldIndex = updatedGroups.findIndex(group => group._id === active.id);
            const newIndex = updatedGroups.findIndex(group => group._id === over.id);
            updatedGroups = arrayMove(updatedGroups, oldIndex, newIndex);
            
            board.groups = updatedGroups;
            updatedBoard(board)
            // setGroups(updatedGroups);
        }

        setDragState({
            isSorting: false,
            draggingId: null,
            draggingType: null,
            draggingTaskId: null,
            sourceGroupId: null,
            draggingTask: null,
            activeGroupId: null,
            dropIndices: {}
        })

        const updatedBoard = {
            ...board,
            groups: updatedGroups,
            tasks: board.tasks
        };

        onBoardSave(updatedBoard);
    }, [dragState.draggingType, dragState.sourceGroupId, dragState.activeGroupId, onBoardSave, board, board.groups, board.tasks])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="group-list">
                <SortableContext
                    items={board.groups.map(group => group._id)}
                    strategy={verticalListSortingStrategy}
                >
                    {board.groups.map(group => {
                        const groupDropIndex = dragState.dropIndices[group._id];

                        return (
                            <GroupPreview
                                key={group._id}
                                id={group._id}
                                columns={board.columns}
                                group={group}
                                tasks={board.tasks.filter(task => task.groupid === group._id)}
                                isSorting={dragState.isSorting}
                                isDragging={group._id === dragState.draggingId}
                                isActiveDropArea={group._id === dragState.activeGroupId}
                                dropIndex={groupDropIndex}
                                draggingTaskId={dragState.draggingTaskId}
                            />
                        );
                    })}
                </SortableContext>
            </div>
            <DragOverlay>
                {dragState.draggingId && dragState.draggingType === 'group' && (
                    <div className="drag-overlay">
                        <GroupPreview
                            id={dragState.draggingId}
                            columns={board.columns}
                            tasks={board.tasks.filter(task => task.groupid === dragState.draggingId)}
                            group={board.groups.find(group => group._id === dragState.draggingId)}
                            isSorting={dragState.isSorting}
                        />
                    </div>
                )}
                {dragState.draggingTaskId && dragState.draggingType === 'task' && (
                    <div className="drag-overlay task-overlay">
                        <TaskPreview
                            key={dragState.draggingTask._id}
                            id={dragState.draggingTask._id}
                            task={dragState.draggingTask}
                            columns={board.columns}
                            color={board.groups[0].color}
                            groupId={board.groups[0]._id}
                            isDragging={true}
                        />
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    )
}