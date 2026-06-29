import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onAddItem, onCardLike, isLoggedIn, }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your Items</h2>
        <button className="clothes-section__add-btn" onClick={onAddItem}>
          + Add Item
        </button>
      </div>

      <ul className="cards">
        {clothingItems
  .filter((item) => item.owner === currentUser._id)
  .map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} onCardLike={onCardLike} isLoggedIn={isLoggedIn} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
