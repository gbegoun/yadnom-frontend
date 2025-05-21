import { useRef, useContext } from "react";
import { useModal } from "../../../contexts/modal/useModal";
import { BoardContext } from "../../../contexts/board/BoardContext";
import { PeopleOptionsModal } from "../../modal_types/PeopleOptionsModal";
import { updateTaskColumnValue } from "../../../store/actions/board.actions.js";

export const People = ({ value, taskId, groupId, column }) => {
    const ownersIds = value?.length ? value : [];
    const label = ownersIds.length ? ownersIds.join(", ") : "No owners";

    const { openModal, closeModal } = useModal();
    const { board, loadBoard } = useContext(BoardContext);
    const peopleRef = useRef();

    // Show all board members as options
    const people = (board?.members || []).map((id) => ({ _id: id, name: `Owner ID: ${id}` }));

    const handleSelect = async (person) => {
        if (taskId && groupId && column && board) {
            await updateTaskColumnValue(board, groupId, taskId, column._id, [person._id]);
            loadBoard && loadBoard();
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
            />,
            rect
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