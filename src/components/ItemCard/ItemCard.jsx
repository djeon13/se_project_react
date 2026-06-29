import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser._id) || false;

  const itemLikeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button_active" : ""
  }`;

  function handleLike(e) {
    e.stopPropagation();

    onCardLike({
      id: item._id,
      isLiked,
    });
  }

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <img
        src={item.link || item.imageUrl}
        alt={item.name}
        className="item-card__image"
      />

      <div className="item-card__header">
        <p className="item-card__name">{item.name}</p>

        {isLoggedIn && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
