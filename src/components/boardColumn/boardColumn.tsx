// import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Column } from '../../types';
import { TaskCard } from '../taskCard';
// import { AddCardForm } from '../addCardForm';

interface ColumnProps {
  column: Column;
}

export const BoardColumn = ({ column }: ColumnProps) => {
  return (
    <div>
      <h3 className="text-[24px]">{column.title}</h3>
      {column &&
        column.cards.map((card) => {
          return <TaskCard key={card._id} card={card} />;
        })}
    </div>
    // <Droppable droppableId={column.id}>
    //   {(provided) => (
    //     <div
    //       ref={provided.innerRef}
    //       {...provided.droppableProps}
    //       className="column"
    //     >
    //       <h2>{column.title}</h2>

    //       {/* Виводимо існуючі картки */}
    //       {column.cards.map((task: Card, index: number) => (
    //         // <Draggable key={task.id} draggableId={task.id} index={index}>
    //         //   {(provided) => (
    //         //     <div
    //         //       ref={provided.innerRef}
    //         //       {...provided.draggableProps}
    //         //       {...provided.dragHandleProps}
    //         //     >
    //         //       <TaskCard task={task} />
    //         //     </div>
    //         //   )}
    //         // </Draggable>
    //       ))}

    //       {/* Додаємо форму для створення нової картки */}
    //       {/* <AddCardForm columnId={column.id} /> */}

    //       {provided.placeholder}
    //     </div>
    //   )}
    // </Droppable>
  );
};
