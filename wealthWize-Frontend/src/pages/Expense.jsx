import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";

export default function Expense() {
  return (
    <div className="min-h-screen px-4 py-6">
      <h3 className="text-center font-semibold text-2xl mb-6">
        Expense Container
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex justify-center md:col-span-1">
          <ExpenseForm />
        </div>
        <div className="md:col-span-2 w-full">
          <ExpenseTable />
        </div>

      </div>

    </div>
  );
}
