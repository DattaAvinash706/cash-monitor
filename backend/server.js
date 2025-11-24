import express from "express"; //express is used to create a server, send data and receive data from a api or a frontend
import cors from "cors"; // cross origin resource sharing (it is used for connecting backend and frontend ,which are running in two different ports and it also tell which port to access the server )
import dotenv from "dotenv"; // it is used to store environment variable in different .env file and use them in the current file after configuration
import db from "./db.js";
import bcrypt from "bcryptjs"; // it is used for password hashing ,which is one way and cannot be hashed back.Its helps in making the password more secure
import jwt from "jsonwebtoken"; //When the user logs in, a jwt token is being created and it helps in improving authentication (checks if the user is authenticated to accesss the data in the server )
import { verifyToken } from "./Middleware/verifyToken.js";

dotenv.config();
const app = express(); //creating a instance of express and it can be used to different routes in the server side
app.use(cors()); // allows request from different ports (we can also specify the ports which we can apply)
app.use(express.json()); // convert all the data which is coming from  request body into json format

//express route handler which handles post request which is coming from the client ,in our case frontend
app.post("/register", async (req, res) => {
  const { username, password } = req.body; // destructure the data which is comming from the request body
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hashing the password using bcrypt algorithm (which is also known for one way hashing)
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)"; //sql query for insert the username and hashed password in the users database
    db.query(sql, [username, hashedPassword], (err) => {
      if (err) return res.status(400).json({ message: "User already exists" });
      return res.status(200).json({ message: "Registered successfully" }); //if user is not there in the database then the data is stored in database we are sending status code 200 and also a message of Registered successfully
    });
  } catch (err) {
    return res.status(500).json({ message: "Error during password hashing" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  db.query(sql, [username], async (err, users) => {
    if (err) return res.status(500).json({ message: "Error" });
    if (users.length === 0)
      return res.status(401).json({ message: "User not found" });
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });
    const token = jwt.sign(
      { user_id: user.id, user_name: user.username },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login success",
      token,
      user_id: user.id,
      username: user.username,
    });
  });
});

app.post("/expenses", verifyToken, (req, res) => {
  const { user_id, amount, category, date, budget } = req.body;
  const sql =
    "INSERT INTO user_expenses (user_id, amount, category, date, budget) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [user_id, amount, category, date, budget ?? 0], (err) => {
    if (err) return res.status(500).json({ message: "Error adding expense" });
    return res.status(200).json({ message: "Expense added successfully" });
  });
});

app.get("/expenses", verifyToken, (req, res) => {
  const user_id = req.user.user_id;

  const sql = "SELECT * FROM user_expenses WHERE user_id = ?";
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json("DB Error");
    return res.status(200).json(results);
  });
});

app.delete("/expenses/:id", verifyToken, (req, res) => {
  const user_id = req.user.user_id;
  const { id } = req.params;

  const sql = "DELETE FROM user_expenses WHERE id = ? AND user_id = ?";
  db.query(sql, [id, user_id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting expense" });
    res.status(200).json({ message: "Deleted" });
  });
});

app.delete("/expenses", verifyToken, (req, res) => {
  const user_id = req.user.user_id;

  const sql = "DELETE FROM user_expenses WHERE user_id = ?";
  db.query(sql, [user_id], (err) => {
    if (err)
      return res.status(500).json({ message: "Error clearing expenses" });
    res.status(200).json({ message: "All Cleared" });
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on ${process.env.PORT || 4000}`);
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on ${process.env.PORT || 4000}`);
});
