import { Link } from 'react-router-dom';
import { BoardColumn } from '../../components';
import { DragDropContext } from 'react-beautiful-dnd';
import { useBoardOperations } from './hooks';

export const BoardView = () => {
  const { board, columns, setColumns, handleDragEnd } = useBoardOperations();

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
              columns={columns}
              setColumns={setColumns}
              boardId={board?._id!}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
