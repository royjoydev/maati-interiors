const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/inquiry', (req, res) => {
  const { fullName, email, phone, location, projectType, budget } = req.body;

  if (!fullName || !email || !phone || !location || !projectType || !budget) {
    return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
  }

  const submission = {
    id: Date.now().toString(),
    ...req.body,
    submittedAt: new Date().toISOString()
  };

  const filePath = path.join(__dirname, '..', 'data', 'submissions.json');
  let submissions = [];

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      submissions = JSON.parse(raw);
    }
  } catch (err) {
    submissions = [];
  }

  submissions.push(submission);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

  res.json({ success: true });
});

module.exports = router;
