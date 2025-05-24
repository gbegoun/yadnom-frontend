import { useRef } from "react";
import { useModal } from "../../../contexts/modal/useModal";
import { BoardContext } from "../../../contexts/board/BoardContext";
import { PeopleOptionsModal } from "../../modal_types/PeopleOptionsModal";
import { updateTaskColumnValue } from "../../../store/actions/board.actions.js";
import { useSelector } from "react-redux";

export const People = ({ value, taskId, groupId, column }) => {
    const board = useSelector(state => state.boardModule.board);

    const ownersIds = value?.length ? value : [];
    const label = ownersIds.length ? ownersIds.join(", ") : "No owners";

    const { openModal, closeModal } = useModal();    
    const peopleRef = useRef();

    // Show all board members as options
    const people = (board?.members || []).map((id) => ({ _id: id, name: `Owner ID: ${id}` }));

    const handleSelect = async (person) => {
        if (taskId && groupId && column && board) {
            // With optimistic updates, UI will update immediately
            await updateTaskColumnValue(board, groupId, taskId, column._id, [person._id])
                .catch(err => console.error('Failed to update people', err));
        }
        closeModal();
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        const rect = peopleRef.current.getBoundingClientRect();
        openModal(
            <PeopleOptionsModal
                people={people}
                onSelect={handleSelect}
                onClose={closeModal}
            />,{
                targetRect: rect,
            isFromDynamicItem: true,
        }
        );
    };

    return (
        <div
            ref={peopleRef}
            className="people-item"
            style={{ cursor: "pointer" }}
            onClick={handleOpenModal}
        >
            <span>{label}</span>
        </div>
    );
};