import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";

import "./App.css";

function App() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div>
      {/* when PopUp is opened landing page dissapears due to following logic */}

      {!isPopupOpen && (
        <div className="btn">
          <button onClick={handleOpenPopup} className="dummy">
            <div className="box-icon">
              <FontAwesomeIcon
                className="fcon"
                icon={faMagnifyingGlass}
                size="xl"
              />
              <h3>Search</h3>
            </div>

            <div className="shortcut">
              <kbd>Ctrl</kbd>
              <kbd>K</kbd>
            </div>
          </button>
        </div>
      )}
      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </div>
  );
}

export default App;
