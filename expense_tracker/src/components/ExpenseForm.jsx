
import { useState } from "react";


/**
 * @param {onAdd,user } onAdd will add the data in the expenses ,by 1st adding it to the database and loading the expenses again ,user details for which user we are adding the details 
 * @returns {Jsx element} - form 
 */

export default function ExpenseForm({ onAdd, user }) {
    //state values for all the inputs in form ,which are updated by onChnage event 
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [budget, setBudget] = useState("");


    /**
     * sends form data to the function which later sent to backend server (updates the expenses after sending)
 * @param {event} 
 * @returns {} - 
 */

    const handleSubmit = (e) => {
        e.preventDefault();//prevent the form to reload after submitting 
        onAdd({
            user_id: user.user_id,
            amount: parseFloat(amount),
            category,
            date,
            budget: parseFloat(budget)
        });//send all the collected form data 

        //after sending the data ,reset the form to empty 
        setAmount("");
        setCategory("");
        setDate("");
        setBudget("");
        alert("Expense added successfully");
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <label className="form-label">Amount</label>
            <input className="form-input" type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label className="form-label">Category</label>
            <select className="form-input" required value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Savings">Savings</option>
                <option value="budget">Budget</option>
                <option value="Other">Other</option>
            </select>
            <label className="form-label">Date</label>
            <input className="form-input" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            <label className="form-label">Budget</label>
            <input className="form-input" type="number" required value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Add money to your wallet or just add zero" />
            <button className="form-button" type="submit">Add Expense</button>
        </form>
    );
}
