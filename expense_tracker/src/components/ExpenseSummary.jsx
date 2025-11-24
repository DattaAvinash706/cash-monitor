
export default function ExpenseSummary({ expenses }) {
    const total = expenses.reduce((s, e) => s + Number(e.amount), 0);//calculate total expenses 
    const avg = expenses.length ? (total / expenses.length).toFixed(2) : 0;//calculate the average 
    const top = expenses.length ? expenses.reduce((acc, e) => (e.amount > acc.amount ? e : acc), expenses[0]) : null;//category which have top expenses 
    const remaining = 0;
    return (
        <div className="summary-card">
            <div className="summary-row">
                <div className="summary-item">
                    <div className="summary-title">Total</div>
                    <div className="summary-value">₹{total}</div>
                </div>
                <div className="summary-item">
                    <div className="summary-title">Average</div>
                    <div className="summary-value">₹{avg}</div>
                </div>
                <div className="summary-item">
                    <div className="summary-title">Top</div>
                    <div className="summary-value">{top ? `${top.category} (₹${top.amount})` : "—"}</div>
                </div>
                <div className="summary-item">
                    <div className="summary-title">Remaining</div>
                    <div className="summary-value">₹{remaining}</div>
                </div>
            </div>
        </div>
    );
}

