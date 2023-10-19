import { useState, useEffect, useRef, useContext } from "react";
import { FaLocationArrow, FaCalendarAlt, FaUser } from "react-icons/fa";
import When from "./When";
import Where from "./Where";
import Who from "./Who";
import SearchContext from "../../../context/SearchContext";
import { Link } from "react-router-dom";
import Toast from "../../Toast/Toast";

export default function Search() {
  const [modal, setModal] = useState(null);
  const [error, setError] = useState(false);
  const modalRef = useRef(null);
  const { search } = useContext(SearchContext);
  const { totalAdults, totalChildren, totalPets } = getTotalGuests();

  // Closes modal on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sets modal to clicked component
  function handleClick(button) {
    switch (button) {
      case "where":
        setModal(<Where handleClick={() => setModal(null)} />);
        break;
      case "when":
        setModal(<When handleClick={() => setModal(null)} />);
        break;
      case "who":
        setModal(<Who handleClick={() => setModal(null)} />);
        break;
      default:
        setModal(null);
    }
  }

  // calculates total guests from all added rooms in search context
  function getTotalGuests() {
    let totalAdults = 0;
    let totalChildren = 0;
    let totalPets = 0;

    search.rooms.forEach((room) => {
      totalAdults += parseInt(room.adults) || 0;
      totalChildren += parseInt(room.children) || 0;
      totalPets += parseInt(room.pets) || 0;
    });

    return {
      totalAdults,
      totalChildren,
      totalPets,
    };
  }

  // Opens Where component in modal and shows toast error message if users clicks search without entering where
  function handleSearchClick() {
    if (search.where < 1) {
      setError(true);
      handleClick("where");
    }
  }

  return (
    <>
      <div className="search-container">
        <div className="search-options">
          <button className="button" onClick={() => handleClick("where")}>
            <FaLocationArrow />
            <strong>{search.where.length ? search.where : "Where"}</strong>
          </button>
          <button className="button" onClick={() => handleClick("when")}>
            <FaCalendarAlt />
            <strong>{search.when ? search.when : "When"}</strong>
          </button>
          <button className="button" onClick={() => handleClick("who")}>
            <FaUser />
            <strong>
              {totalAdults || totalChildren || totalPets >= 1
                ? `${totalAdults + totalChildren + totalPets}`
                : "Who"}
            </strong>
          </button>
        </div>
        <Link
          to={search.where ? `search/?q=${search.where}` : "#"}
          className="button"
          onClick={handleSearchClick}
        >
          Search
        </Link>
        <div className="modal-container" ref={modalRef}>
          {modal}
        </div>
        {error && (
          <Toast message="You must enter where first!" type="warning" />
        )}
      </div>
    </>
  );
}