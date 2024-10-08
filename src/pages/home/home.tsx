import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full pt-[50px] flex flex-col justify-center items-center mx-auto max-w-[1200px] text-[30px]">
      <h1 className="text-[44px] font-bold mb-10">Wellcome to Kanban board</h1>
      <Link to="/boards">
        <p className="underline text-[28px] fond-medium">See all boards </p>
      </Link>
    </div>
  );
};

export default Home;
