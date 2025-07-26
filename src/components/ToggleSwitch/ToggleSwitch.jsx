import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTempartureUnitContext from "../../contexts/CurrentTemeratureContext";

function ToggleSwitch() {
  const { handleToggleSwitchChange, CurrentTempartureUnit } = useContext(
    CurrentTempartureUnitContext
  );

  return (
    <label className="toggleswitch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggleswitch__checkbox"
      />
      <span className="toggleswitch__circle"></span>
      <span className="toggleswitch__text toggleswitch__text_F">F</span>
      <span className="toggleswitch__text toggleswitch__text_C">C</span>
    </label>
  );
}

export default ToggleSwitch;
