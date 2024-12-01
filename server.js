const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const PORT = 3000;

mongoose.connect('mongodb://db:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('MongoDB connection error:', err));

const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.get('/', (req, res) => res.send('Welcome to the FeedbackFlow Management System!'));

app.post('/feedback', async (req, res) => {
  const newFeedback = new Feedback(req.body);
  await newFeedback.save();
  res.send('Feedback submitted successfully');
});

app.get('/feedback', async (req, res) => {
  const feedback = await Feedback.find();
  res.json(feedback);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

