import { useRef } from "react";
import { useModal } from "../../../contexts/modal/useModal";
import { PeopleOptionsModal } from "../../modal_types/PeopleOptionsModal";
import { updateTaskColumnValue } from "../../../store/actions/board.actions.js";
import { useSelector } from "react-redux";
import SVGService from "../../../services/svg/svg.service.js";

export const People = ({ value, taskId, groupId, column }) => {
    const board = useSelector(state => state.boardModule.board);
    const users = useSelector(state => state.userModule.users);

    const ownersIds = value?.length ? value : [];

    const { openModal } = useModal();
    const peopleRef = useRef();

    // Helper functions similar to BoardNameModal
    const getUserById = (userId) => users.find(user => user._id === userId || user._id === userId.toString());

    const getUserDisplayInfo = (userId) => {
        const user = getUserById(userId);
        if (!user) return { initials: '??', name: 'Unknown User', imgUrl: null };
        const name = user.fullName || user.fullname || user.username || 'Unknown User';
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
        return { initials, name, imgUrl: user.imageUrl || user.imgUrl || null };
    };

    // Show all board members as options
    const people = (board?.members || []).map((id) => {
        const userInfo = getUserDisplayInfo(id);
        return { _id: id, name: userInfo.name };
    });

    // Handle bulk update from modal - receives the complete new selection
    const handleBulkUpdate = async (newSelectedIds) => {
        if (taskId && groupId && column && board) {
            await updateTaskColumnValue(board, groupId, taskId, column._id, newSelectedIds)
                .catch(err => console.error('Failed to update people', err));
        }
    }; const handleOpenModal = (e) => {
        e.stopPropagation();
        const rect = peopleRef.current.getBoundingClientRect();
        openModal(
            <PeopleOptionsModal
                people={people}
                onBulkUpdate={handleBulkUpdate}
                initialSelectedIds={ownersIds} // Pass currently selected users
            />, {
            targetRect: rect,
            isFromDynamicItem: true,
        }
        );
    };

    // Get user info for selected owners
    const selectedUsers = ownersIds.map(id => getUserDisplayInfo(id)).filter(user => user);
    const maxVisibleAvatars = 3;

    return (
        <div
            ref={peopleRef}
            className="people-item"
            style={{ cursor: "pointer" }}
            onClick={handleOpenModal}
        >
            {/* The + icon that shows on hover regardless of content */}
            <div className="people-icons-container">
                <div className="people-icon-wrapper add-icon">
                    <span>+</span>
                </div>
            </div>

            {selectedUsers.length > 0 ? (
                <div className="people-avatars">
                    {selectedUsers.slice(0, maxVisibleAvatars).map((userInfo, index) => (
                        <div key={ownersIds[index]} className="user-avatar">
                            {userInfo.imgUrl ? (
                                <img
                                    src={userInfo.imgUrl}
                                    alt={userInfo.name}
                                    className="avatar-image"
                                    onError={e => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <span
                                className="avatar-initials"
                                style={{ display: userInfo.imgUrl ? 'none' : 'flex' }}
                            >
                                {userInfo.initials}
                            </span>
                        </div>
                    ))}
                    {selectedUsers.length > maxVisibleAvatars && (
                        <div className="additional-count">
                            +{selectedUsers.length - maxVisibleAvatars}
                        </div>
                    )}
                </div>
            ) : (
                <div className="default-profile">
                    <SVGService.DefaultProfilePic className="default-profile-icon" />
                </div>
            )}
        </div>
    );
};