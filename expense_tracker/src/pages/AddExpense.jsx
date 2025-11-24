import ExpenseForm from "../components/ExpenseForm";




export default function AddExpense({ onAdd, user }) {
    return (
        <div className="expense-page">
            <h2 className="page-title">Add Expense</h2>
            <ExpenseForm onAdd={onAdd} user={user} />
        </div>
    );
}
