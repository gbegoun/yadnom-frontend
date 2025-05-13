import SVGService from '../../services/svg/svg.service';

export const GroupHeaderTitleRow = ({ title, color, setIsCollapsed }) => {

    return (
        <div className="group-header-title-row" style={{ '--color-indicator': color }}>
            <div className="group-header-title-menu" />
            <div className="collapse-group-icon-wrapper" onClick={() => setIsCollapsed(true)}>
                <SVGService.CollapseGroupIcon className="collapse-group-icon" />
            </div>
            <div className="group-header-title-text">{title}</div>
            <div className="group-header-summary-text">5 items</div>
        </div>
    )
}