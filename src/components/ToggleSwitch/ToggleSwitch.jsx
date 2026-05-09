import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  const isFahrenheit = currentTemperatureUnit === "F";

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isFahrenheit}
        onChange={handleToggleSwitchChange}
      />

      <div className="toggle-switch__track">
        <div
          className={`toggle-switch__thumb ${
            isFahrenheit
              ? "toggle-switch__thumb_left"
              : "toggle-switch__thumb_right"
          }`}
        />

        <span
          className={`toggle-switch__label ${
            isFahrenheit ? "toggle-switch__label_active" : ""
          }`}
        >
          F
        </span>

        <span
          className={`toggle-switch__label ${
            !isFahrenheit ? "toggle-switch__label_active" : ""
          }`}
        >
          C
        </span>
      </div>
    </label>
  );
}

export default ToggleSwitch;
