export const GroupHeaderSorting = ({ title, color }) => {

    return (
        <div className="group-header-sorting">
            <div className="group-header-sorting-title-row" style={{ color: color }}>
                <div className="group-header-sorting-menu" />
                <div className="group-header-sorting-left-indicator" style={{ backgroundColor: color }} />
                <div className="group-header-sorting-title">
                    <div className="collapse-group-icon-wrapper-sorting" onClick={() => setIsSorting(false)}>
                        <svg className="collapse-group-icon-sorting" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.5303 12.5303L10 13.0607L9.46967 12.5303L5.46967 8.53033C5.17678 8.23744 5.17678 7.76256 5.46967 7.46967C5.76256 7.17678 6.23744 7.17678 6.53033 7.46967L10 10.9393L13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967C14.8232 7.76256 14.8232 8.23744 14.5303 8.53033L10.5303 12.5303Z" />
                        </svg>
                    </div>
                    <div className="group-header-sorting-blank" />
                    <div className="group-header-sorting-title-text">{title}</div>
                    <div className="group-header-summary-text group-header-sorting-summary-text">5 items</div>
                </div>
            </div>
            <div className="group-column-sorting-last-cell" />
        </div>
    )
}