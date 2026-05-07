import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onAddItem }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">
  Your Items
</h2>
        <button className="clothes-section__add-btn" onClick={onAddItem}>+ Add Item</button>
      </div>

      <ul className="cards">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;