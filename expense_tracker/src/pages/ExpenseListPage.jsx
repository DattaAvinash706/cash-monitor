

import { useState } from "react";
import ExpenseList from "../components/ExpenseList";


/**
 * @param {Object,function,function} expenses,deleteexpenses,clearExpenses  
 * @returns {Jsx element} - list all the expenses based on the filter if applied
 */

export default function ExpenseListPage({
    expenses,
    deleteExpense,
    clearExpenses,
}) {
    const [filterCategory, setFilterCategory] = useState("");//initial value which holds category when filter is applied 
    const [fromDate, setFromDate] = useState("");//initial value which holds fromDate when filter is applied 
    const [toDate, setToDate] = useState("");//initial value which holds toDate when filter is applied 

    const [results, setResults] = useState([]); // final results which matches the filter 
    const [error, setError] = useState("");//if there is any error while getting the filtered data



    /**
     * after getting all the filter details this function will do the actuall filter from the expenses data which is passed to the component
     * @param {} 
     * @returns {}
     */
    const handleFilter = () => {
        //atleast one filter has to be applied 
        if (!filterCategory && !fromDate && !toDate) {
            setError("Please select at least one filter.");
            setResults([]);
            return;
        }

        setError("");

        //filtering the expenses and storing it results state variable 
        const filtered = expenses.filter((exp) => {
            const categoryMatch = !filterCategory || exp.category === filterCategory;
            const expDate = new Date(exp.date + "T00:00:00");
            const fromMatch = !fromDate || expDate >= new Date(fromDate + "T00:00:00");
            const toMatch = !toDate || expDate <= new Date(toDate + "T23:59:59");
            return categoryMatch && fromMatch && toMatch;
        });

        setResults(filtered);
    };

    return (
        <div className="app-container">

            <h2 className="page-title">Expenses</h2>


            <div className="filter-wrapper">

                <div className="filter-group">
                    <label>Category:</label>
                    <select
                        className="filter-input filter-input-select"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="">Any</option>
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Shopping</option>
                        <option>Bills</option>
                        <option>Entertainment</option>
                        <option>Groceries</option>
                        <option>Rent</option>
                        <option>Health</option>
                        <option>Travel</option>
                        <option>Education</option>
                        <option>Savings</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>From:</label>
                    <input
                        type="date"
                        className="filter-input"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label>To:</label>
                    <input
                        type="date"
                        className="filter-input"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                <button className="filter-btn" onClick={handleFilter}>
                    Show Results
                </button>

                <button
                    className="filter-btn filter-btn-danger"
                    onClick={() => {
                        clearExpenses();
                        setResults([]);
                    }}
                >
                    Clear All Expenses
                </button>
            </div>


            {error && <p style={{ color: "yellow", marginTop: "10px" }}>{error}</p>}

            {!filterCategory && !fromDate && !toDate && (
                <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
            )}


            {(filterCategory || fromDate || toDate) && results.length > 0 && (
                <>
                    <ExpenseList
                        expenses={results}
                        deleteExpense={(id) => {
                            deleteExpense(id);
                            setTimeout(() => handleFilter(), 0);
                        }}
                    />

                    <div className="total-box">
                        Total Amount: ₹
                        {results.reduce((sum, exp) => sum + Number(exp.amount), 0)}
                    </div>
                </>
            )}


            {(filterCategory || fromDate || toDate) && results.length === 0 && (
                <p style={{ marginTop: "15px", color: "#666" }}>No matching expenses found.</p>
            )}
        </div>
    );
}


