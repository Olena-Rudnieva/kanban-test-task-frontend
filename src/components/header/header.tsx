import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard, fetchBoards, selectBoards } from '../../redux';
import { Input } from '../input';
import { Button } from '../button';

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector(selectBoards);
  const navigate = useNavigate();
  console.log('boards', boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const [newBoardName, setNewBoardName] = useState('');
  const [boardIdInput, setBoardIdInput] = useState('');
  console.log('boardIdInput', boardIdInput);

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      const newBoard = {
        name: newBoardName,
        columns: [
          { title: 'To Do', cards: [] },
          { title: 'In Progress', cards: [] },
          { title: 'Done', cards: [] },
        ],
      };
      dispatch(createBoard(newBoard));
      setNewBoardName('');
      navigate(`/boards`);
    }
  };

  const handleLoadBoard = () => {
    console.log('here', boardIdInput);

    if (boardIdInput.trim()) {
      navigate(`/boards/${boardIdInput}`);
      setBoardIdInput('');
    }
  };

  return (
    <header className="w-full p-[30px] mx-auto flex justify-between max-w-[1200px]">
      <div className="flex gap-[20px] text-[18px]">
        <Input
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="New board name"
          className="w-[300px]"
        />
        <Button onClick={handleCreateBoard} className="px-5 py-2">
          Create Board
        </Button>
      </div>

      <div className="flex gap-[20px] text-[18px]">
        <Input
          value={boardIdInput}
          onChange={(e) => setBoardIdInput(e.target.value)}
          placeholder="Enter a board ID here"
          className="w-[300px]"
        />
        <Button onClick={handleLoadBoard} className="px-10 py-2">
          Load
        </Button>
      </div>
    </header>
  );
};
