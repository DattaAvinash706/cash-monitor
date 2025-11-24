
/**
 * @param {Object,function} expenses,deleteexpenses
 * @returns {Jsx element} - list all the expenses based on the filter if applied
 */
export default function ExpenseList({ expenses, deleteExpense }) {
    return (
        <div className="expense-list-page">
            <ul className="expense-list">
                {expenses && expenses.length > 0 ? expenses.map((exp) => (
                    <li key={exp.id} className="expense-item">
                        <div className="expense-left">
                            <div className="expense-category">{exp.category}</div>
                            <div className="expense-date">{exp.date}</div>
                        </div>
                        <div className="expense-right">
                            <div className="expense-amount">₹{exp.amount}</div>
                            <button className="btn-small" onClick={() => deleteExpense(exp.id)}>Delete</button>
                        </div>
                    </li>
                )) : (
                    <div className="no-data">No expenses yet</div>
                )}
            </ul>
        </div>
    );
}
