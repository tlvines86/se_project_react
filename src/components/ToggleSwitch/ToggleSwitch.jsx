import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggleswitch">
      <input
        type="checkbox"
        className="toggleswitch__checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <span
        className={`toggleswitch__circle ${
          currentTemperatureUnit === "F"
            ? "toggleswitch__circle_F"
            : "toggleswitch__circle_C"
        }`}
      ></span>

      <span className="toggleswitch__text toggleswitch__text_F">F</span>
      <span className="toggleswitch__text toggleswitch__text_C">C</span>
    </label>
  );
}

export default ToggleSwitch;
