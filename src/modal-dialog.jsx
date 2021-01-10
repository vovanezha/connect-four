import React from "react";
import ReactDOM from "react-dom";
import "./modal-dialog.css";

function ModalDialog({ open, children }) {
  return ReactDOM.createPortal(
    open && (
      <div className="dialog-backdrop">
        <div role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    ),
    document.getElementById("modal-dialog")
  );
}

export default ModalDialog;
