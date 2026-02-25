const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};