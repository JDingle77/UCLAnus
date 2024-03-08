import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReportModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Report bathroom
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.bathroom}</h4>
        <p>Confirm you want to submit a report</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Report bathroom</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;
