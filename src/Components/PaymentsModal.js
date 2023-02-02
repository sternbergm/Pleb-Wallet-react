import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./PaymentsModal.css";

const customStyles = {
    content: {
      top: "20%",
      left: "40%",
      right: "40%",
      bottom: "auto",
    },
   };
const PaymentsModal = ({modalState,setModalState}) => {

    const [formData, setFormData] = useState({
        amount: 0,
        invoiceToPay: "",
      });

    const [invoice, setInvoice] = useState("");

    const [paymentInfo, setPaymentInfo] = useState({
        paymentHash: '',
        checkingId:"",
    });

    const handleSend = (e) => {
                // Keep the page from refreshing when the form is submitted
        e.preventDefault();

        const headers = {
            "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
        };
        const data = {
            bolt11: formData.invoiceToPay,
            out: true,
        };
        axios
            .post("https://legend.lnbits.com/api/v1/payments", data, { headers })
            .then((res) =>
            setPaymentInfo({
                paymentHash: res.data.payment_hash,
                checkingId: res.data.checking_id,
            })
            )
            .catch((err) => console.log(err));

        return;
    };

    const handleReceive = (e) => {
           // Keep the page from refreshing when the form is submitted
        e.preventDefault();

        const headers = {
            "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
        };
        const data = {
            amount: formData.amount,
            out: false,
            // ToDo: Add additional form for user to be able to customize the memo
            memo: "LNBits",
        };
        axios
            .post("https://legend.lnbits.com/api/v1/payments", data, { headers })
            .then((res) => setInvoice(res.data.payment_request))
            .catch((err) => console.log(err));

        return;
    };

    const clearForms = () => {
        setModalState({
          type: "",
          open: false,
        });
        setInvoice("");
        setPaymentInfo({
          paymentHash: "",
          checkingId: "",
        });
        setFormData({
          amount: 0,
          invoiceToPay: "",
        });
      };

    return (
        <Modal 
            isOpen={modalState.open}
            style={customStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById("root")}
        >
            <p
                className="close-button"
                onClick={() => {
                   clearForms();
                }}
            >
                x
            </p>
            {modalState.type === "send" && (
                <form>
                    <label>paste an invoice</label>
                    <input
                        type="text"
                        value={FormData.invoiceToPay}
                        onChange= {(e) => 
                        setFormData({ ...FormData, invoiceToPay: e.target.value })
                    }
                    />
                    <button className="button" onClick= {(e) => handleSend(e)}>
                        Submit
                    </button>
                </form>
            )}

            {modalState.type === "receive" && (
                <form>
                    <label>enter amount</label>
                    <input
                        type="number"
                        min="0"
                        value={FormData.amount}
                        onChange={(e) =>
                        setFormData({ ...FormData, amount: e.target.value })
                    }
                    />
                    <button className="button" onClick={(e) => handleReceive(e)}>
                        Submit
                    </button>
                </form>
            )}

            {invoice && (
                <section>
                    <h3>Invoice created</h3>
                    <p>{invoice}</p>
                </section>
            )}
            {paymentInfo.paymentHash && (
                <section>
                    <h3>Payment sent</h3>
                    <p>Payent hash: {paymentInfo.paymentHash}</p>
                    <p>Checking Id: {paymentInfo.checkingId}</p>
                </section>
            )}
        </Modal>            
    );
};

export default PaymentsModal;