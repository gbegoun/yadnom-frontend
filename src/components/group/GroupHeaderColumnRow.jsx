import { GroupHeaderColumnTitle } from "./GroupHeaderColumnTitle.jsx"

export const GroupHeaderColumnRow = ({ columns, color }) => {
    return (
        <div className="group-header-column-row">
            <GroupHeaderColumnTitle color={color} />
            <div className = "group-header-columns-wrapper">
                {columns.map((column, index) => <div key={index} className="group-header-column-cell">{column.title}</div>)}
            </div>
            <div className="group-header-column-last-cell" />
            
        </div>
    )
}