import { useState, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Column } from '../../../types';
import { AppDispatch } from '../../../redux/store';
import {
  addCardToColumn,
  deleteCardFromColumn,
  updateCardInColumn,
} from '../../../redux';
import { generateUniqueId } from '../../../utils';

interface UseBoardColumnOperationsProps {
  column: Column;
  columns: Column[];
  setColumns: Dispatch<React.SetStateAction<Column[]>>;
  boardId: string;
}

export const useBoardColumnOperations = ({
  column,
  columns,
  setColumns,
  boardId,
}: UseBoardColumnOperationsProps) => {
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
      const updatedColumns = columns.map((col) => {
        if (col._id === column._id) {
          return {
            ...col,
            cards: col.cards.map((card) =>
              card._id === selectedCardId ? { ...card, ...newCard } : card
            ),
          };
        }
        return col;
      });
      setColumns(updatedColumns);
    } else {
      dispatch(
        addCardToColumn({
          boardId,
          columnId: column._id!,
          cardData: newCard,
        })
      );
      const updatedColumns = columns.map((col) => {
        if (col._id === column._id) {
          return {
            ...col,
            cards: [...col.cards, { ...newCard, _id: generateUniqueId() }],
          };
        }
        return col;
      });
      setColumns(updatedColumns);
    }

    handleCloseModal();
  };

  const handleEditCard = (card: Card) => {
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
    const updatedColumns = columns.map((col) => {
      if (col._id === column._id) {
        return {
          ...col,
          cards: col.cards.filter((card) => card._id !== cardId),
        };
      }
      return col;
    });

    setColumns(updatedColumns);
  };

  return {
    isModalOpen,
    newCard,
    isEditing,
    handleOpenModal,
    handleCloseModal,
    handleAddCard,
    handleEditCard,
    handleDeleteCard,
    setNewCard,
  };
};
