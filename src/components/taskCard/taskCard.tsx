import { RxPencil2 } from 'react-icons/rx';
import { Card } from '../../types';
import { FiTrash2 } from 'react-icons/fi';
import { Draggable } from 'react-beautiful-dnd';

interface TaskCardProps {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}

export const TaskCard = ({ card, onEdit, onDelete, index }: TaskCardProps) => {
  return (
    <Draggable draggableId={`${card._id}`} key={card._id} index={index}>
      {(provided) => (
        <div
          className="w-[300px] min-h-[200px] bg-white border border-gray-300 shadow-md flex flex-col justify-center= items-start text-[30px] rounded-md cursor-pointer p-[30px]"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3 className="text-[30px] mb-[20px]">{card.title}</h3>
          <p className="text-[20px] mb-[20px] w-full">{card.description}</p>
          <div className="flex gap-4 justify-end w-full">
            {' '}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="cursor-pointer relative z-10"
            >
              <RxPencil2 className="w-[20px] h-[20px]" />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="cursor-pointer relative z-10"
            >
              <FiTrash2 className="w-[20px] h-[20px]" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
