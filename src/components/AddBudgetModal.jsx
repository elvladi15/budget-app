import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, onClose }) {
  const { addBudget } = useBudgets();
  const nameRef = useRef();
  const maxRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget(nameRef.current.value, parseFloat(maxRef.current.value));
    onClose();
  }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group controlId="max" className="mb-3">
            <Form.Label>Max Spending</Form.Label>
            <Form.Control type="number" step={0.01} min={0} ref={maxRef} required />
          </Form.Group>

          <Stack direction="horizontal">
            <Button variant="primary" type="submit" className="ms-auto">
              Add
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
      <Form></Form>
    </Modal>
  );
}
