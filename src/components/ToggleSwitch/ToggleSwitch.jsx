import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const isF = currentTemperatureUnit === "F";

  return (
    <div className="toggle" onClick={handleToggleSwitchChange}>
      <div className="toggle__track">
        <div
          className={`toggle__thumb ${
            isF ? "toggle__thumb_left" : "toggle__thumb_right"
          }`}
        />

        <span className={`toggle__label ${isF ? "active" : ""}`}>F</span>
        <span className={`toggle__label ${!isF ? "active" : ""}`}>C</span>
      </div>
    </div>
  );
}

export default ToggleSwitch;