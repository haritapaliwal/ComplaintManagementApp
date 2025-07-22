import connectDB from '../../../lib/db';
import Complaint from '../../../models/Complaint';
import { sendEmail } from '../../../lib/mail';

export default async function handler(req, res) {
  console.log('API /api/complaints called with method:', req.method);
  await connectDB();
  console.log('Connected to DB');
  if (req.method === 'POST') {
    try {
      console.log('POST body:', req.body);
      const complaint = await Complaint.create(req.body);
      console.log('Complaint created:', complaint);
      await sendEmail(
        'New Complaint Submitted',
        `<h3>New Complaint Submitted</h3>
        <p><b>Title:</b> ${complaint.title}</p>
        <p><b>Category:</b> ${complaint.category}</p>
        <p><b>Priority:</b> ${complaint.priority}</p>
        <p><b>Description:</b><br/>${complaint.description}</p>`
      );
      return res.status(201).json(complaint);
    } catch (error) {
      console.error('Error creating complaint:', error);
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === 'GET') {
    try {
      const complaints = await Complaint.find();
      return res.status(200).json(complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      return res.status(500).json({ error: error.message });
    }
  }
  res.status(405).end();
}