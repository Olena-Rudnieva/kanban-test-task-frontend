import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  addCardToColumn,
  deleteCardFromColumn,
  fetchBoardById,
  selectCurrentBoard,
} from '../../redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { BoardColumn } from '../../components';
import { DragDropContext } from 'react-beautiful-dnd';

export const BoardView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const board = useSelector(selectCurrentBoard);

  useEffect(() => {
    if (id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id]);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const selectedColumn = board?.columns.find(
      (column) => column._id === source.droppableId
    );

    const card = selectedColumn?.cards.find((c) => c._id === draggableId);

    if (card) {
      dispatch(
        deleteCardFromColumn({
          boardId: board?._id!,
          columnId: source.droppableId,
          cardId: draggableId,
        })
      );

      dispatch(
        addCardToColumn({
          boardId: board?._id!,
          columnId: destination.droppableId,
          cardData: {
            title: card.title,
            description: card.description,
          },
        })
      );
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
          {board &&
            board.columns.map((column) => (
              <BoardColumn
                key={column._id}
                column={column}
                boardId={board._id!}
              />
            ))}
        </div>
      </DragDropContext>
    </div>
  );
};
