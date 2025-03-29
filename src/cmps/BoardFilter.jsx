import { TaskAdd } from "./TaskAdd";

export const BoardFilter = ({ board }) => {
    return (
        <div>
            <h1>BoardFilter</h1>
            <div>
                <TaskAdd />
                <span>Search</span> <span>Person</span> <span>...</span>
            </div>
            <span>---------------------------</span>
        </div>
    );
};