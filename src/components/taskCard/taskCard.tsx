import { Card } from '../../types';

interface TaskCardProps {
  card: Card;
}

export const TaskCard = ({ card }: TaskCardProps) => {
  return (
    <div className="card">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </div>
  );
};
