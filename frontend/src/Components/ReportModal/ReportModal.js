import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import alertSignedIn from "../../Helpers/CheckSignedIn";

function ReportModal(props) {
  function submit_report() {
    alertSignedIn("report a restroom");
    let today = new Date();
    console.log(props.data);
    fetch("http://localhost:4000/submit-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId: Cookies.get("userId"),
        bathroomId: props.data.bathroom_id,
        reported: today.getUTCDay(),
      }),
      credentials: "include",
    })
      .catch((error) => {
        console.error(error);
        return;
      })
      .then((response) => {
        props.onHide();
      });
    window.location.reload();
  }

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
        <Button onClick={submit_report}>Report bathroom</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;
