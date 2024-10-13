import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Card, Column } from '../../types';
import { TaskCard } from '../taskCard';
import { Modal } from '../modal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  addCardToColumn,
  deleteCardFromColumn,
  updateCardInColumn,
} from '../../redux';
import { AddCard } from '../addCard';

interface ColumnProps {
  column: Column;
  boardId: string;
}

export const BoardColumn = ({ column, boardId }: ColumnProps) => {
  console.log('test column', column);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCard({ title: '', description: '' });
    setIsEditing(false);
    setSelectedCardId(null);
  };

  const handleAddCard = () => {
    if (newCard.title.trim() === '') return;

    if (isEditing && selectedCardId) {
      dispatch(
        updateCardInColumn({
          boardId,
          columnId: column._id!,
          cardId: selectedCardId,
          cardData: newCard,
        })
      );
    } else {
      dispatch(
        addCardToColumn({
          boardId,
          columnId: column._id!,
          cardData: newCard,
        })
      );
    }

    handleCloseModal();
  };

  const handleEditCard = (card: Card) => {
    console.log('here');

    if (card._id) {
      setSelectedCardId(card._id);
      setNewCard({ title: card.title, description: card.description });
      setIsEditing(true);
      setIsModalOpen(true);
    } else {
      console.error('Card ID is undefined');
    }
  };

  const handleDeleteCard = (cardId: string) => {
    dispatch(
      deleteCardFromColumn({
        boardId,
        columnId: column._id!,
        cardId,
      })
    );
  };

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
