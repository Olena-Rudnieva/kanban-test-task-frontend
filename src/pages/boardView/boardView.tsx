import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchBoardById, selectCurrentBoard, updateColumns } from '../../redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import { BoardColumn } from '../../components';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from '../../types';
import { reorderColumnList } from '../../utils';

export const BoardView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const board = useSelector(selectCurrentBoard);
  console.log('board', board);
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
      return;
    }
  };

  return (
    <div className="w-full px-[20px] my-0 mx-auto max-w-[1200px] flex flex-col justify-center items-center">
      <Link
        to="/boards"
        className="underline text-right w-full mb-10 mr-[30px]"
      >
        All boards
      </Link>
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2 className="text-[48px] font-medium mb-8">{board?.name}</h2>
        <div className="flex gap-[50px]">
          {columns?.map((column) => (
            <BoardColumn
              key={column._id}
              column={column}
              boardId={board?._id!}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
