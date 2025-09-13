import React from "react";



const Modal = ({isOpen, onClose, children}) => {


  if(!isOpen) return null;

  // alert(isOpen);
  return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, .95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #dddddd",
                overflow: "scroll",
            }}
        >
            <div onClick={(e)=>{e.stopPropagation()}}
          /*      style={{

                    background: "white",
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}*/
            >
                {children}

            </div>
        </div>
    );
};

export default Modal;
