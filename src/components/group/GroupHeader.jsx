export const GroupHeader = ({ title, color }) => {
    
    return (
        <div className="group-header" style={{ '--color-indicator': color }}>
            <span>↓ {title}</span>
        </div>
    );
};