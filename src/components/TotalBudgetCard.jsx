import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();

  const max = budgets.reduce((totalMax, budget) => (totalMax += budget.max), 0);
  if (max === 0) return null;

  const amount = expenses.reduce((totalExpense, expense) => (totalExpense += expense.amount), 0);

  return <BudgetCard name="Total" amount={amount} max={max} hideButtons />;
}
