import api from "../utils/axios";
import axios from "axios";
const API_URL = "http://localhost:4000";

// we are using axios ,we can also use fetch statement  but axios gives us little advantage in syntax and handling http request

/**
 * sends the login details for verification
 * @param {username,password }
 * @returns {object}
 */
export async function sendLoginData(username, password) {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      return {
        success: true,
        token: res.data.token,
        user_id: res.data.user_id,
        username: res.data.username,
      };
    }
  } catch (err) {
    return { success: false, message: "Login failed" };
  }
}

/**
 * sends the registration details for storing the data in the users database
 * @param {username,password }
 * @returns {object}
 */
export async function sendRegisterData(username, password) {
  try {
    const res = await axios.post(`${API_URL}/register`, { username, password });
    if (res.status === 200) {
      return { success: true };
    }
  } catch (err) {
    return { success: false, message: "Registration failed" };
  }
}

/**
 * loads the expenses data for a user when user is logged in
 * @param {}
 * @returns {object} expenses data will be returned
 */
export async function loadExpenses() {
  try {
    const res = await api.get("/expenses");
    if (res.status === 200) {
      return { success: true, data: res.data };
    }
  } catch (err) {
    return { success: false, message: "Data not loaded" };
  }
}

/**
 * adds the new expense to the database by sending a request to the backend
 * @param {}
 * @returns {object} status of the request is returned
 */
export async function addExpenseToDb(expense) {
  try {
    const res = await api.post(`/expenses`, expense);
    if (res.status === 200) {
      return { success: true };
    }
  } catch (err) {
    return { success: false, message: "Failed to add expense" };
  }
}

/**
 * deleteExpense  the expenses data for a user with specific id is given
 * @param {expense id }
 * @returns {boolean} status of the request is shared
 */
export async function deleteExpenseFromDb(id) {
  try {
    const res = await api.delete(`/expenses/${id}`);
    return res.status === 200;
  } catch {
    return false;
  }
}

/**
 * clear all   the expenses data for a user
 * @param {}
 * @returns {boolean} status of the request is shared
 */
export async function clearExpensesFromDb() {
  try {
    const res = await api.delete(`/expenses`);
    return res.status === 200;
  } catch {
    return false;
  }
}
