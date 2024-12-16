import { RefObject } from "react";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight as searchArrow } from "@fortawesome/free-solid-svg-icons";

interface HeaderImageProps {
  inputRef: RefObject<HTMLInputElement>; // Type for inputRef
  handleSearch: () => void; // Type for handleSearch
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  inputRef,
  handleSearch,
}) => {
  return (
    <div className="w-full h-full">
      <div className="header-img h-[17rem] flex items-center justify-center">
        <div className="w-full px-5 max-w-[1440px] mx-auto">
          <div className="rounded-xl bg-white flex items-center w-full justify-between">
            <input
              type="text"
              placeholder="Search IP or domain e.g(google.com)"
              ref={inputRef}
              className="bg-transparent outline-none border-none px-5 w-full cursor-pointer"
            />
            <button
              onClick={handleSearch}
              className="bg-black text-white px-5 py-4 rounded-tr-xl rounded-br-xl hover:opacity-90 cursor-pointer"
            >
              <FontAwesomeIcon icon={searchArrow} size="lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderImage;
