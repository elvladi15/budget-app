import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import { Button } from "react-bootstrap";

import { currencyFormatter } from "../utils";

export default function BudgetCard({
  isGray,
  name,
  amount,
  max,
  onAddExpenseClick,
  hideButtons,
  onViewExpensesClick,
}) {
  return (
    <Card className={getCardClassNames(isGray, amount, max).join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>}
          </div>
        </Card.Title>
        {max == null ? null : (
          <ProgressBar
            className="rounded-pill mb-4"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {hideButtons ? null : (
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
function getCardClassNames(isGray, amount, max) {
  if (amount > max) return ["bg-danger", "bg-opacity-10"];
  if (isGray) return ["bg-light"];

  return [];
}
