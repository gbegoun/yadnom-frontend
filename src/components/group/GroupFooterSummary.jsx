import { LabelSummary } from "../item/LabelSummary"

export const GroupFooterSummary = ({ columns, tasks }) => {
    return (
        <div className="group-footer-summary">
            <div className="group-footer-summary-blank" />
            <div className="group-footer-summary-item-wrapper">
                {columns.map(column => <div key={column._id} className="group-footer-summary-item"  style={{width:column.width}}><LabelSummary column={columns[0]} tasks={tasks}/></div>)}
            </div>
            <div className="group-footer-last-cell" />
        </div>
    )
}
