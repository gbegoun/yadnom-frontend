export const GroupHeaderCollapsed = ({ title, color, columns, setIsCollapsed }) => {

    return (
        <div className="group-header-collapsed">
            <div className="group-header-collapsed-title-row" style={{ color: color }}>
                <div className="group-header-collapsed-menu" />
                <div className="group-header-collapsed-left-indicator" style={{ backgroundColor: color }} />
                <div className="collapse-group-icon-wrapper-collapsed" onClick={() => setIsCollapsed(false)}>
                    <svg className="collapse-group-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.5303 12.5303L10 13.0607L9.46967 12.5303L5.46967 8.53033C5.17678 8.23744 5.17678 7.76256 5.46967 7.46967C5.76256 7.17678 6.23744 7.17678 6.53033 7.46967L10 10.9393L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L10.5303 12.5303Z" />
                    </svg>
                </div>
                <div className="group-header-collapsed-blank" />
                <div className="group-header-title-text group-header-collapsed-title-text">{title}</div>
                <div className="group-header-summary-text group-header-collapsed-summary-text">5 items</div>
            </div>
            
            <div className="group-columns-collapsed-wrapper">
                {columns.map((column) => {
                    return (
                        <div className="group-column-collapsed" key={column._id} style={{width: column.width}}>
                            <div className="group-column-collapsed-title">{column.title}</div>
                            <div className="group-column-collapsed-summary">{column.title}</div>
                        </div>
                    )                
                })}  
            </div>
            <div className="group-column-collapsed-last-cell" />             
        </div>

    )
}