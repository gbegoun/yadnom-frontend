import SVGService from '../../services/svg/svg.service';
import { GroupTitle } from './GroupTitle';

export const GroupHeaderTitleRow = ({ tasks,  setIsCollapsed, group }) => {
    // If a complete group object is provided, use it; otherwise create a simple one from title

    console.log('group', group)
    return (
        <div className="group-header-title-row" style={{ '--color-indicator': group.color }}>
            <div className="group-header-title-menu" />
            <div className="collapse-group-icon-wrapper" onClick={() => setIsCollapsed(true)}>
                <SVGService.CollapseGroupIcon className="collapse-group-icon" />
            </div>
            <div className="group-header-title-text">
                <GroupTitle group={group} />
            </div>
            <div className="group-header-summary-text">{tasks.length} items</div>
        </div>
    )
}