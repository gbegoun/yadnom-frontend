import SVGService from '../../services/svg/svg.service';
import { GroupTitle } from './GroupTitle';

export const GroupHeaderTitleRow = ({ title, color, setIsCollapsed, group }) => {
    // If a complete group object is provided, use it; otherwise create a simple one from title
    const groupData = group || { title, _id: title, color };

    return (
        <div className="group-header-title-row" style={{ '--color-indicator': color }}>
            <div className="group-header-title-menu" />
            <div className="collapse-group-icon-wrapper" onClick={() => setIsCollapsed(true)}>
                <SVGService.CollapseGroupIcon className="collapse-group-icon" />
            </div>
            <div className="group-header-title-text">
                <GroupTitle group={groupData} color={color} />
            </div>
            <div className="group-header-summary-text">5 items</div>
        </div>
    )
}