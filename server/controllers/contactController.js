const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Save message to database and send email
exports.submitMessage = async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();

        // Configure nodemailer (you'll need to set these env variables)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: req.body.email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: Message from ${req.body.name}`,
            text: `
                Name: ${req.body.name}
                Email: ${req.body.email}
                Message: ${req.body.message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all messages (for admin panel)
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};