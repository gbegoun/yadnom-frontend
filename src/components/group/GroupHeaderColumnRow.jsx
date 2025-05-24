import { GroupHeaderColumnTitle } from "./GroupHeaderColumnTitle.jsx"

export const GroupHeaderColumnRow = ({ columns, group }) => {
    return (
        <div className="group-header-column-row">
            <GroupHeaderColumnTitle color={group.color}/>
            <div className="group-header-columns-wrapper">
                {columns.map((column, index) => <div key={index} className="group-header-column-cell"  style={{width:column.width}}>{column.title}</div>)}
            </div>
            <div className="group-header-column-last-cell" />

        </div>
    )
}