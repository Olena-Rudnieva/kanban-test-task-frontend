import { Card } from '../../types';
import { Button } from '../button';
import { Input } from '../input';

interface AddCardProps {
  isEditing: boolean;
  newCard: Card;
  setNewCard: (card: Card) => void;
  handleAddCard: () => void;
}

export const AddCard = ({
  isEditing,
  newCard,
  setNewCard,
  handleAddCard,
}: AddCardProps) => {
  return (
    <div className="p-5">
      {isEditing ? (
        <h3 className="text-[24px] mb-[20px]">Edit Card</h3>
      ) : (
        <h3 className="text-[24px] mb-[20px]">Add New Card</h3>
      )}
      <Input
        value={newCard.title}
        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        placeholder="Card Title"
        className="w-full mb-[20px]"
      />
      <textarea
        placeholder="Card Description"
        value={newCard.description}
        onChange={(e) =>
          setNewCard({ ...newCard, description: e.target.value })
        }
        className="border mb-[20px] border-gray-600 p-[10px] shadow-sm rounded-md w-full resize-none"
      />
      <Button onClick={handleAddCard} className="px-5 py-2">
        {isEditing ? ' Edit Card' : ' Create Card'}
      </Button>
    </div>
  );
};
