import SVGService from '../../../services/svg/svg.service.js';

export const Files = () => {
    return (
        <div className="files-item files-item-empty">
            <div className="files-icons-container">
                <div className="files-icon-wrapper add-icon">
                    <span>+</span>
                </div>
                <div className="files-icon-wrapper paper-icon">
                    <SVGService.PapperIcon className="paper-svg-icon" />
                </div>
            </div>
        </div>
    );
};