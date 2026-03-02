// Use 'import' instead of 'require'
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Mock authentication logic
  if (email === "user@example.com" && password === "password123") {
    res.status(200).json({ 
        message: "Login successful", 
        user: { email: email },
        token: "sample-jwt-token" 
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});