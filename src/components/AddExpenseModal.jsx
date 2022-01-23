import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { useRef } from "react";

export default function AddExpenseModal({ show, onClose, budgetId }) {
  const { budgets, addExpense } = useBudgets();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense(
      descriptionRef.current.value,
      parseFloat(amountRef.current.value),
      budgetIdRef.current.value
    );
    onClose();
  }
  return (
    <Modal onHide={onClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descriptionRef} required />
          </Form.Group>

          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" min={0} step={0.01} ref={amountRef} required />
          </Form.Group>

          <Form.Group controlId="budgetId" className="mb-3">
            <Form.Label>Budget Id</Form.Label>

            <Form.Select defaultValue={budgetId} ref={budgetIdRef}>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
              <option key={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>
                Uncategorized
              </option>
            </Form.Select>
          </Form.Group>

          <Stack direction="horizontal">
            <Button variant="primary" type="submit" className="ms-auto">
              Add
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
