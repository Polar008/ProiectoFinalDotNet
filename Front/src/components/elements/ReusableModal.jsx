import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ReusableModal = ({
  triggerButtonText = "Open Modal",
  title = "Modal Title",
  bodyContent = "This is the modal body content.",
  footerActions = [],
  triggerButtonVariant = "primary",
  modalProps = {},
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={triggerButtonVariant} onClick={handleShow}>
        {triggerButtonText}
      </Button>

      <Modal show={show} onHide={handleClose} {...modalProps}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyContent}</Modal.Body>
        <Modal.Footer>
          {footerActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "primary"}
              onClick={action.onClick || handleClose}
            >
              {action.label}
            </Button>
          ))}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReusableModal;
