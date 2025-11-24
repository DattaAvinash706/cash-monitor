import ExpenseSummary from "../components/ExpenseSummary";
import ChartComponent from "../components/ChartComponent";
import MonthlyOverview from "../components/MontlyExpenses";


export default function Dashboard({ expenses }) {
    return (
        <div className="dashboard-container">
            <h2 className="page-title">Dashboard</h2>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <ExpenseSummary expenses={expenses} />
                </div>

                <div className="dashboard-card">
                    <div className="dashboard-chart">
                        <ChartComponent expenses={expenses} />
                    </div>
                </div>


                <div className="dashboard-card">
                    <MonthlyOverview expenses={expenses} />
                </div>

                <div className="dashboard-card">
                </div>
            </div>
        </div>
    );
}
