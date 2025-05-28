import { useRef } from "react";
import { useModal } from "../../../contexts/modal/useModal";
import { PeopleOptionsModal } from "../../modal_types/PeopleOptionsModal";
import { updateTaskColumnValue } from "../../../store/actions/board.actions.js";
import { useSelector } from "react-redux";
import SVGService from "../../../services/svg/svg.service.js";
import { userService } from "../../../services/user/index.js";
import { UserAvatarFromInfo } from "../../shared/UserAvatar.jsx";

export const People = ({ value, taskId, groupId, column }) => {
    const board = useSelector(state => state.boardModule.board);
    const users = useSelector(state => state.userModule.users);

    const ownersIds = value?.length ? value : [];
    const { openModal } = useModal();
    const peopleRef = useRef();

    // Show all board members as options
    const people = (board?.members || []).map((id) => {
        const userInfo = userService.getUserDisplayInfo(id, users);
        return { _id: id, name: userInfo.name };
    });

    // Handle bulk update from modal - receives the complete new selection
    const handleBulkUpdate = async (newSelectedIds) => {
        if (taskId && groupId && column && board) {
            await updateTaskColumnValue(board, groupId, taskId, column._id, newSelectedIds)
                .catch(err => console.error('Failed to update people', err));
        }
    };

    const handleOpenModal = (e) => {
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
    const selectedUsers = ownersIds.map(id => userService.getUserDisplayInfo(id, users)).filter(user => user);
    const MAX_VISIBLE_AVATARS = 3;

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
                    {selectedUsers.slice(0, MAX_VISIBLE_AVATARS).map((userInfo, index) => (
                        <UserAvatarFromInfo
                            key={ownersIds[index]}
                            userInfo={userInfo}
                            size="small"
                            className="people-avatar-item"
                            showTooltip={true}
                        />
                    ))}
                    {selectedUsers.length > MAX_VISIBLE_AVATARS && (
                        <div className="additional-count">
                            +{selectedUsers.length - MAX_VISIBLE_AVATARS}
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