
/**
 * shows the montly overview of the expenses 
 * @param {Object} expenses - stores data of all the expenses of a particular user
 * @returns {Jsx element} - 
 */


export default function MonthlyOverview({ expenses }) {
    const now = new Date();//get the current date
    const currentMonth = now.getMonth(); // get the current month from the date 
    const currentYear = now.getFullYear();//get thhe current year from the now instance



    const monthlyExpenses = expenses.filter(exp => { // filter the data from the expenses object which are made in this month 
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    });


    const total = monthlyExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0); //calculate the total expense made in this month 
    const monthlyBudget = monthlyExpenses.reduce((sum, exp) => sum + Number(exp.budget || 0), 0);// calculate the budget of this month 

    const daysPassed = now.getDate();
    const avg = (total / daysPassed).toFixed(2); // calculate the avg by dividing the total with the number of days spent (and we are  rounding of  the decimal part with two numbers )

    const categoryTotals = {};
    monthlyExpenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount);
    });// calculate the total expenses per each category which are made in this month 

    let topCategory = "No data";
    let maxAmount = 0;
    //for loop is used to loop through the categoryTotals and find the category with the max total
    for (let category in categoryTotals) {
        if (categoryTotals[category] > maxAmount) {
            maxAmount = categoryTotals[category];
            topCategory = category;
        }
    }

    const top = `${topCategory} (₹${maxAmount})`;
    const remaining = monthlyBudget - total; // calculate the money remaining in the purse 

    let percent = 0;
    if (monthlyBudget > 0) {
        percent = Math.min(((total / monthlyBudget) * 100).toFixed(1), 100); // percent to show it in the dashboard
    }

    const filled = Math.round((percent / 100) * 10);

    return (
        <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "260px"
        }}>
            <h3 style={{ marginBottom: "10px" }}>📅 Monthly Overview</h3>

            <p><b>Total Spent:</b> ₹{total}</p>
            <p><b>Total Budget:</b> ₹{monthlyBudget}</p>
            <p><b>Daily Avg:</b> ₹{avg}</p>
            <p><b>Top Category:</b> {top}</p>
            <p><b>Remaining Budget:</b> ₹{remaining}</p>

            <p style={{ marginTop: "10px", fontFamily: "monospace" }}>
                {"█".repeat(filled)}{"░".repeat(10 - filled)} {percent}% used
            </p>
        </div>
    );
}
