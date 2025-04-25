const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error: ', err));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Download Route
app.get('/api/download/resume', (req, res) => {
    // Look for the file directly in the 'public' directory
    const filePath = path.join(__dirname, 'public', 'chovatiya isha resume.pdf');
    // Set the filename for the download prompt
    const fileName = 'chovatiya isha resume.pdf'; // You can customize the downloaded file name here

    res.download(filePath, fileName, (err) => {
        if (err) {
            // Handle errors, such as file not found
            console.error("Error downloading file:", err);
            if (!res.headersSent) {
              if (err.code === 'ENOENT') {
                  res.status(404).send('File not found.');
              } else {
                  res.status(500).send('Could not download the file.');
              }
            }
        }
    });
});

// Health check route
app.get('/', (req, res) => {
    res.send('Portfolio API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});