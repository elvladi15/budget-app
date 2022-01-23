import { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../custom_hooks/useLocalStorage";

const BudgetsContext = createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId);
  }
  function addExpense(description, amount, budgetId) {
    setExpenses(prevExpenses => {
      return [
        ...prevExpenses,
        {
          id: uuidV4(),
          description,
          amount,
          budgetId,
        },
      ];
    });
  }
  function addBudget(name, max) {
    setBudgets(prevBudges => {
      if (budgets.find(budget => budget.name === name)) return prevBudges;
      return [
        ...prevBudges,
        {
          id: uuidV4(),
          name,
          max,
        },
      ];
    });
  }
  function deleteBudget(id) {
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.budgetId === id) {
          return {
            ...expense,
            budgetId: UNCATEGORIZED_BUDGET_ID,
          };
        }
        return expense;
      });
    });
    setBudgets(prevBudges => {
      return prevBudges.filter(budget => budget.id !== id);
    });
  }
  function deleteExpense(id) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    });
  }
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
