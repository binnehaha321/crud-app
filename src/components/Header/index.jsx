import { SEARCH, BELL } from "~/assets/images/Header";
import "./index.scss";

function Header({ className }) {
  return (
    <div className={`wrapper ${className}`}>
      <div className="left"></div>
      <div className="right">
        <div className="search">
          <input placeholder="Search..." />
          <span>
            <img src={SEARCH} alt="search" />
          </span>
        </div>
        <img src={BELL} alt="notification" />
      </div>
    </div>
  );
}

export default Header;
