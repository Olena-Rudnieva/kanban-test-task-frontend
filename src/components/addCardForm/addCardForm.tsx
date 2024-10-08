// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addCard } from '../../redux';

interface AddCardFormProps {
  columnId: string;
}

export const AddCardForm = ({ columnId }: AddCardFormProps) => {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Відправляємо action для додавання картки
    // dispatch(
    //   addCard({
    //     columnId,
    //     title,
    //     description,
    //   })
    // );

    // Очищуємо поля після додавання картки
    // setTitle('');
    // setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Card Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Card Description"
        required
      ></textarea>
      <button type="submit">Add Card</button> */}
    </form>
  );
};
