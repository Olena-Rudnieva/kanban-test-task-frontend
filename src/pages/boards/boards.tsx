import { useSelector } from 'react-redux';
import { selectBoards } from '../../redux';

import { Link } from 'react-router-dom';
import { BoardCard } from '../../components';

const Boards = () => {
  const boards = useSelector(selectBoards);

  return (
    <div className="w-full px-[20px] my-0 mx-auto max-w-[1200px] flex flex-col justify-center items-center">
      <Link to="/" className="underline text-right w-full mb-10 mr-[30px]">
        Home
      </Link>
      <h2 className="text-[40px] text-center mb-[50px] font-medium">
        Kanban Boards
      </h2>
      <ul className="flex gap-[50px] flex-wrap justify-center items-start">
        {boards && boards.length > 0 ? (
          boards.map((board) => <BoardCard key={board._id} board={board} />)
        ) : (
          <p className="text-gray-500 text-[24px]">No boards yet</p>
        )}
      </ul>
    </div>
  );
};

export default Boards;
