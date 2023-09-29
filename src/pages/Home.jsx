import { Link } from "react-router-dom";
import { renderHotels } from "../../utils";
import database from "../../database.json";
export default function Home() {
  return (
    <>
      <h2>Popular destinations</h2>
      <ul>
        {database.popularDestinations.map((destination) => (
          <li key={destination}>
            <Link to={`search/?q=${destination}`}>{destination}</Link>
          </li>
        ))}
      </ul>
      {renderHotels("Europe", "carousel")}
      {renderHotels("Africa", "carousel")}
      {renderHotels("USA", "carousel")}
      {renderHotels("South America", "carousel")}
      {renderHotels("Asia", "carousel")}
      {renderHotels("Australia", "carousel")}
    </>
  );
}