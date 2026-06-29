import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCardClick, onAddItem, onCardLike, isLoggedIn, onEditProfile, onSignOut,}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddItem={onAddItem}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
