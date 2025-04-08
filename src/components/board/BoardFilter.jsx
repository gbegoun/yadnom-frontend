import { TaskAdd } from "../task/TaskAdd";
import { useModal } from '../../contexts/modal/useModal.jsx';


export const BoardFilter = (/* { board } */) => {
    const { openModal } = useModal();

    const handleSearchClick = () => {
        openModal(
            <div>
                <h2>Search</h2>
                <input type="text" placeholder="Search tasks..." />
                <button onClick={() => alert('Search initiated!')}>Search</button>
            </div>
        );
    };
    
    const handlePersonClick = () => {
        openModal(
            <div>
                <h2>Filter by Person</h2>
                <select>
                    <option value="person1">Person 1</option>
                    <option value="person2">Person 2</option>
                    <option value="person3">Person 3</option>
                </select>
                <button onClick={() => alert('Person filter applied!')}>Apply</button>
            </div>
        );
    };
    
    const handleFilterClick = () => {
        openModal(
            <div>
                <h2>Advanced Filters</h2>
                <label>
                    <input type="checkbox" />
                    Completed Tasks
                </label>
                <label>
                    <input type="checkbox" />
                    High Priority
                </label>
                <button onClick={() => alert('Filters applied!')}>Apply</button>
            </div>
        );
    };
    
    const handleSortClick = () => {
        openModal(
            <div>
                <h2>Sort Tasks</h2>
                <select>
                    <option value="date">By Date</option>
                    <option value="priority">By Priority</option>
                    <option value="status">By Status</option>
                </select>
                <button onClick={() => alert('Tasks sorted!')}>Sort</button>
            </div>
        );
    };
    
    const handleHideClick = () => {
        openModal(
            <div>
                <h2>Hide Columns</h2>
                <label>
                    <input type="checkbox" />
                    Due Date
                </label>
                <label>
                    <input type="checkbox" />
                    Assignee
                </label>
                <button onClick={() => alert('Columns hidden!')}>Apply</button>
            </div>
        );
    };
    
    const handleGroupByClick = () => {
        openModal(
            <div>
                <h2>Group Tasks By</h2>
                <select>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="assignee">Assignee</option>
                </select>
                <button onClick={() => alert('Tasks grouped!')}>Group</button>
            </div>
        );
    };
    
    const handleOptionsClick = () => {
        openModal(
            <div>
                <h2>Options</h2>
                <p>Additional settings and options can go here.</p>
                <button onClick={() => alert('Options applied!')}>Apply</button>
            </div>
        );
    };
    
    
    return (
        <div className="board-filter-container">
            <TaskAdd />
            <button className="filter-btn" onClick={handleSearchClick}>
                <img src="..\src\assets\icons\search_icon.svg" alt="search" />
                Search
            </button>
            <button className="filter-btn" onClick={handlePersonClick}>
                <img src="..\src\assets\icons\person_icon.svg" alt="person" />
                Person
            </button>
            <button className="filter-btn" onClick={handleFilterClick}>
                <img src="..\src\assets\icons\filter_icon.svg" alt="filter" />
                Filter
            </button>
            <button className="filter-btn" onClick={handleSortClick}>
                <img src="..\src\assets\icons\sort_icon.svg" alt="sort" />
                Sort
            </button>
            <button className="filter-btn" onClick={handleHideClick}>
                <img src="..\src\assets\icons\hide_icon.svg" alt="hide" />
                Hide
            </button>
            <button className="filter-btn" onClick={handleGroupByClick}>
                <img src="..\src\assets\icons\group_by_icon.svg" alt="group by" />
                Group by
            </button>
            <button className="filter-btn" onClick={handleOptionsClick}>
                <img src="..\src\assets\icons\options_icon.svg" alt="options" />
            </button>
        </div>
    );
};