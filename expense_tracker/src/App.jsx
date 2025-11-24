
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseListPage from "./pages/ExpenseListPage";
import Auth from "./pages/Auth";
import { loadExpenses, addExpenseToDb, clearExpensesFromDb, deleteExpenseFromDb } from "./services/api";  // all the functions which makes the api calls 



/**
 * @param {} App  - component
 * @returns {Jsx element} -
 */


export default function App() {
  const [user, setUser] = useState({
    user_id: null,
    username: ""
  });//initially when the user is not logged in then the username and userid will be empty and null

  const [expenses, setExpenses] = useState([]);  // empty expenses when the expenses are not yet loaded from the server (when the user is not logged in)

  const [theme, setTheme] = useState("light"); //theme of the webpage which we will be using to toggle  between light and dark


  /**
   * changes the state variable theme when the button is clicked 
   * @param {event} click event 
   * @returns {} - 
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };


  //useEffect with a dependency array(theme ) the useEffect is called everytime the theme is being changed 
  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark-mode");//adding a class to the body element which is usefull for changing the theme of the website (helpfull for applying css)
    else document.body.classList.remove("dark-mode");
  }, [theme]);



  /** add new expense to the database by making a api call to the backend 
   * @param {state} expense - it contains the state variable expenses of all the 
   * @returns {Promise<Object>} - 
   */
  const addExpense = async (expense) => {
    const res = await addExpenseToDb(expense); //a function to make a api call to add expense to the database (sends new expense to the backend)
    if (res && res.success) {
      const result = await loadExpenses(user.user_id); // api call to load the data again after the update in expenses 
      if (result.success) setExpenses(result.data); //updating the state variable of the expenses 
    }
  };


  /** (clearing all the entries )clear all the expenses in the  database by making a api call to the backend
 * @param {}
 * @returns {Promise<Object>} - 
 */
  const clearExpenses = async () => {
    const ok = await clearExpensesFromDb();// function which makes a api call to the backend to clear all the expenses 
    if (ok) setExpenses([]);// setting the expenses to empty to make the ui change immediately 
  };


  /** (clearing a specific  entry )clear a specific  expense   in the  database by making a api call to the backend
* @param {}
* @returns {Promise<Object>} - 
*/
  const deleteExpense = async (id) => {
    const ok = await deleteExpenseFromDb(id);// function which makes a api call to the backend to clear a specific  expense 
    if (ok) setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  /** making the user do not enter into any other pages until the user is logged in which is very important 
* @param {user,children}-state value of the user variable and childern the component which is present inside the protectedRouter 
* @returns {page} - a page which has be to be soon based on the user value 
*/
  function ProtectedRoute({ user, children }) {
    if (!user || !user.user_id) return <Navigate to="/" replace />; //if the user is empty then we should only see login page 
    return children;// otherwise we can see the wanted routes 
  }

  return (
    <BrowserRouter>
      <Navbar toggleTheme={toggleTheme} theme={theme} user={user} />
      <Routes>
        <Route path="/" element={<Auth setUser={setUser} setExpenses={setExpenses} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard expenses={expenses} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute user={user}>
              <AddExpense onAdd={addExpense} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute user={user}>
              <ExpenseListPage
                expenses={expenses}
                deleteExpense={deleteExpense}
                clearExpenses={clearExpenses}
                user={user}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={user.user_id ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
