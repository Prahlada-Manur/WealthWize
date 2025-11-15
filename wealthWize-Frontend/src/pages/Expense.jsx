import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
export default function Expense() {
  return (
    <div>
      <h2>Expense Container</h2>
      <ExpenseForm />
      <ExpenseTable />
    </div>
  );
}
