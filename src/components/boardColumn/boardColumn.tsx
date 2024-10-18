import { Droppable } from 'react-beautiful-dnd';
import { Dispatch } from 'react';
import { Column } from '../../types';
import { TaskCard } from '../taskCard';
import { Modal } from '../modal';
import { AddCard } from '../addCard';
import { useBoardColumnOperations } from './hooks';

interface ColumnProps {
  column: Column;
  columns: Column[];
  setColumns: Dispatch<React.SetStateAction<Column[]>>;
  boardId: string;
}

export const BoardColumn = ({
  column,
  columns,
  setColumns,
  boardId,
}: ColumnProps) => {
  const {
    isModalOpen,
    newCard,
    isEditing,
    handleOpenModal,
    handleCloseModal,
    handleAddCard,
    handleEditCard,
    handleDeleteCard,
    setNewCard,
  } = useBoardColumnOperations({ column, columns, setColumns, boardId });

  return (
    <div>
      <h3 className="text-[24px] text-center mb-[20px]">{column.title}</h3>
      <Droppable droppableId={column._id!}>
        {(provided) => (
          <div
            className="border border-gray-300 p-[40px] shadow-md bg-gray-50 flex flex-col items-center gap-[40px] rounded-sm w-[400px] h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.isArray(column.cards) &&
              column.cards.map((card, index) => (
                <TaskCard
                  card={card}
                  onEdit={() => handleEditCard(card)}
                  onDelete={() => card._id && handleDeleteCard(card._id)}
                  index={index}
                  key={card._id}
                />
              ))}
            {provided.placeholder}
            {column.title === 'To Do' && (
              <div
                className="w-[300px] h-[200px] bg-white border border-gray-300 shadow-md flex justify-center items-center text-[30px] rounded-md cursor-pointer"
                onClick={handleOpenModal}
              >
                +
              </div>
            )}
          </div>
        )}
      </Droppable>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <AddCard
            isEditing={isEditing}
            newCard={newCard}
            setNewCard={setNewCard}
            handleAddCard={handleAddCard}
          />
        </Modal>
      )}
    </div>
  );
};
