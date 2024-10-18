import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../../redux/store';
import { Column } from '../../../types';
import {
  fetchBoardById,
  selectCurrentBoard,
  updateColumns,
} from '../../../redux';
import { reorderColumnList } from '../../../utils';

export const useBoardOperations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const board = useSelector(selectCurrentBoard);
  const [columns, setColumns] = useState<Column[]>(board?.columns || []);

  useEffect(() => {
    if (id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setColumns(board?.columns || []);
  }, [board?.columns]);

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const sourceColumn = columns.find(
      (column) => column._id === source.droppableId
    );
    const destinationColumn = columns.find(
      (column) => column._id === destination.droppableId
    );

    if (source.droppableId !== destination.droppableId) {
      if (!sourceColumn || !destinationColumn) return;

      const sourceCards = [...sourceColumn.cards];
      const [movedCard] = sourceCards.splice(sourceIndex, 1);

      const newSourceColumn = {
        ...sourceColumn,
        cards: sourceCards,
      };

      const destinationCards = [...destinationColumn.cards];
      destinationCards.splice(destinationIndex, 0, movedCard);
      const newDestinationColumn = {
        ...destinationColumn,
        cards: destinationCards,
      };

      const updatedColumns = columns.map((column) => {
        if (column._id === newSourceColumn._id) {
          return newSourceColumn;
        }
        if (column._id === newDestinationColumn._id) {
          return newDestinationColumn;
        }
        return column;
      });

      setColumns(updatedColumns);

      if (board?._id) {
        dispatch(updateColumns({ id: board?._id, updatedColumns }));
      }
    } else {
      if (!sourceColumn) {
        return;
      }

      const newColumn = reorderColumnList(
        sourceColumn,
        sourceIndex,
        destinationIndex
      );
      const updatedColumns = columns.map((column) =>
        column._id === newColumn._id ? newColumn : column
      );

      setColumns(updatedColumns);

      if (board?._id) {
        dispatch(updateColumns({ id: board?._id, updatedColumns }));
      }
    }
  };

  return {
    board,
    columns,
    setColumns,
    handleDragEnd,
  };
};
