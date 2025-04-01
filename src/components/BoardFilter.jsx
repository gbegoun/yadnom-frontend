import { TaskAdd } from "./TaskAdd";

export const BoardFilter = ({ board }) => {
    return (
        <div>
            <div>
                <TaskAdd/>
                <span>Search</span> <span>Person</span>
            </div>
        </div>
    );
};