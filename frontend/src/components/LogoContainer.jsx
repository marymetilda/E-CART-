import { Link } from "react-router-dom";

const LogoContainer = ({ className }) => {
  return (
    <div className={className}>
      <Link to="/">
        <p className="text-[32px] font-bold tracking-wider text-center lg:text-left">
          INFINITY
        </p>
      </Link>
      <p className="text-center lg:text-left text-sm">
        Give you infinite meanings in a limited amount of time!
      </p>
    </div>
  );
};

export default LogoContainer;
