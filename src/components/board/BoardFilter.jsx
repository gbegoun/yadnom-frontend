import { TaskAdd } from "../task/TaskAdd";

export const BoardFilter = ({ board }) => {

    return (
        <div className="board-filter-container">
            <TaskAdd />
            <button className="filter-btn">
                <img src="..\src\assets\icons\search_icon.svg" alt="search" />
                Search
            </button>
            <button className="filter-btn">
                <img src="..\src\assets\icons\person_icon.svg" alt="person" />
                Person
            </button>
            <button className="filter-btn">
                <img src="..\src\assets\icons\filter_icon.svg" alt="filter" />
                Filter
            </button>
            <button className="filter-btn">
                <img src="..\src\assets\icons\sort_icon.svg" alt="sort" />
                Sort
            </button>
            <button className="filter-btn">
                <img src="..\src\assets\icons\hide_icon.svg" alt="hide" />
                Hide
            </button>
            <button className="filter-btn">
                <img src="..\src\assets\icons\group_by_icon.svg" alt="group by" />
                Group by
            </button>
            <button className="filter-btn">
                <img src="..\src\assets\icons\options_icon.svg" alt="options" />
            </button>
        </div>
    );
};