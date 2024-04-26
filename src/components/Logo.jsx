import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className="px-4 md:px-6">
      <Link
        to="/"
        className={`text-2xl text-orange-600  font-semibold ${
          type && "text-orange  text-4xl"
        }`}
      >
        Explore
        <span
          className={`text-3xl text-rose-500 ${type && " text-5xl font-bold"}`}
        >
          Odisha
        </span>
      </Link>
    </div>
  );
};

export default Logo;
