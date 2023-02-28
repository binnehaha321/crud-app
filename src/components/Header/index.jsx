import { COLLAPSE, SEARCH, BELL } from "~/assets/images/Header";
import "./index.scss";

function Header({ className }) {
  return (
    <div className={`wrapper ${className}`}>
      <div className="left">
        {/* <img src={COLLAPSE} alt="collapse-menu" id="collapse-menu" /> */}
      </div>
      <div className="right">
        <div className="search">
          <input type="search" placeholder="Search..." />
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
