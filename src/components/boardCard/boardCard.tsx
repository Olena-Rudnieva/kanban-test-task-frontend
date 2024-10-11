import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RxPencil2 } from 'react-icons/rx';
import { FiTrash2 } from 'react-icons/fi';
import { Board } from '../../types';
import { deleteBoard, updateBoard } from '../../redux';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Input } from '../input';
import { Button } from '../button';

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleBoardClick = (boardId: string) => {
    navigate(`/boards/${boardId}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleDeleteBoard = (boardId: string) => {
    dispatch(deleteBoard(boardId));
  };

  const handleSave = () => {
    if (board._id) {
      dispatch(updateBoard({ id: board._id, name: newName }));
    }
    setIsEditing(false);
  };

  return (
    <li className="border border-gray-200 p-[40px] shadow-lg rounded-md bg-slate-50">
      {isEditing ? (
        <div className="flex items-baseline">
          <Input
            value={newName}
            onChange={handleNameChange}
            placeholder="Enter a board name"
            className="w-[170px] p-[5px] mb-4"
          />
          <Button
            onClick={handleSave}
            className="px-2 py-1 ml-2"
            disabled={!newName.trim()}
          >
            Save
          </Button>
        </div>
      ) : (
        <h3 className="text-[24px] font-bold mb-4"> {board.name}</h3>
      )}
      <p className="mb-5">ID: {board._id}</p>

      <div className="flex justify-between items-baseline">
        <p
          className="cursor-pointer underline"
          onClick={() => handleBoardClick(board._id!)}
        >
          More details
        </p>
        <div className="flex gap-4">
          <RxPencil2 onClick={handleEditClick} className="cursor-pointer" />
          <FiTrash2
            onClick={() => handleDeleteBoard(board._id!)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </li>
  );
};
