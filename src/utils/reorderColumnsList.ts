import { Column } from '../types';

export const reorderColumnList = (
  sourceColumn: Column,
  sourceIndex: number,
  destinationIndex: number
) => {
  const newCards = Array.from(sourceColumn.cards);
  const [removed] = newCards.splice(sourceIndex, 1);
  newCards.splice(destinationIndex, 0, removed);

  const newColumn = {
    ...sourceColumn,
    cards: newCards,
  };

  return newColumn;
};
