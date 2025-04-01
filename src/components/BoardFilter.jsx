import { TaskAdd } from "./TaskAdd";

export const BoardFilter = ({ board }) => {

    return (
            <div className="board-filter-container">
                <TaskAdd/>
                <span>Search</span> <span>Person</span>
            </div>
    );
};