import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import { useState } from "react";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const [selectedBudgetId, setSelectedBudgetId] = useState();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setSelectedBudgetId(budgetId);
  }
  function openViewExpensesModal(budgetId) {
    setShowViewExpensesModal(true);
    setSelectedBudgetId(budgetId);
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (totalAmount, expense) => (totalAmount += expense.amount),
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => openViewExpensesModal(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            key={UNCATEGORIZED_BUDGET_ID}
            onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
            onViewExpensesClick={() => openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} onClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        budgetId={selectedBudgetId}
      />
      <ViewExpensesModal
        show={showViewExpensesModal}
        budgetId={selectedBudgetId}
        onClose={() => setShowViewExpensesModal(false)}
      />
    </>
  );
}

export default App;
