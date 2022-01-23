import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ show, onClose, budgetId }) {
  const { budgets, deleteBudget, getBudgetExpenses, deleteExpense } = useBudgets();
  const budget =
    budgetId === UNCATEGORIZED_BUDGET_ID
      ? { id: UNCATEGORIZED_BUDGET_ID, name: "Uncategorized" }
      : budgets.find(budget => budget.id === budgetId);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            Expenses - {budget?.name}
            {budgetId === UNCATEGORIZED_BUDGET_ID ? null : (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budgetId);
                  onClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {getBudgetExpenses(budgetId).map(expense => {
            return (
              <Stack direction="horizontal" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5 me-2">{currencyFormatter.format(expense.amount)}</div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => {
                    deleteExpense(expense.id);
                  }}
                >
                  &times;
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
