import React, {useState} from "react";
import "./Buttons.css";
import PaymentsModal from "./PaymentsModal";

export const Buttons = () => {

    const [modalState, setModalState] = useState({
        type: "",
        open: false,
      });


    return (
        <div>
            <div className="buttons">
                <button
                    className="button"
                    onClick={ () => 
                        setModalState({
                            type:"send",
                            open:"true",
                        })
                    }
                >
                    Send
                </button>
                <button
                    className="button"
                    onClick={ () => 
                        setModalState({
                            type:"receive",
                            open:"true",
                        })
                    }
                >
                    Receive
                </button>
            </div>
            {
                <PaymentsModal modalState={modalState} setModalState={setModalState}/>
            }
        </div>
    )
};

export default Buttons;