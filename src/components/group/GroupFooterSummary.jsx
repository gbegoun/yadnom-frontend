export const GroupFooterSummary = ({ group, columns }) => {
    return (
        <div className="group-footer-summary">
            <div className="group-footer-summary-blank"/>
            <div className="group-footer-summary-item-wrapper">
                {columns.map(column => <div key={column._id} className="group-footer-summary-item">{column.title}</div>)}
                <div className="group-footer-last-cell"/>
            </div>
        </div>
    )
}
