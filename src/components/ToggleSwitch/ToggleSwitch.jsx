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
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggleswitch__checkbox"
        checked={currentTemperatureUnit === "F"}
      />
      <span className="toggleswitch__circle"></span>
      <span className="toggleswitch__text toggleswitch__text_F">F</span>
      <span className="toggleswitch__text toggleswitch__text_C">C</span>
    </label>
  );
}

export default ToggleSwitch;
