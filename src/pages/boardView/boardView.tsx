import { useDispatch } from 'react-redux';
// import { DragDropContext } from 'react-beautiful-dnd';
// import { Board } from '../../types';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchBoardById, selectCurrentBoard } from '../../redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { BoardColumn } from '../../components';
// import { onDragEnd } from '../../redux';

export const BoardView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const board = useSelector(selectCurrentBoard);

  useEffect(() => {
    if (id) {
      dispatch(fetchBoardById(id));
    }
  }, [dispatch, id]);

  // const handleDragEnd = (result: any) => {
  //   // dispatch(onDragEnd(result));
  // };

  // if (!board) {
  //   return <Loader />;
  // }

  return (
    <div className="w-full px-[20px] my-0 mx-auto max-w-[1200px] flex flex-col justify-center items-center">
      <Link
        to="/boards"
        className="underline text-right w-full mb-10 mr-[30px]"
      >
        All boards
      </Link>
      <h2 className="text-[40px] mb-8">{board?.name}</h2>
      <div className="flex gap-[50px]">
        {board &&
          board.columns.map((column) => (
            <BoardColumn key={column._id} column={column} />
          ))}
      </div>
    </div>
  );
};
