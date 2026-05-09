import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCardClick, onAddItem }) {
  return (
    <div className="profile">
      <SideBar name="John Doe" />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
      />
    </div>
  );
}

export default Profile;
