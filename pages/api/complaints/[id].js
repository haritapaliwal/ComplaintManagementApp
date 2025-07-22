import connectDB from '../../../lib/db';
import Complaint from '../../../models/Complaint';
import { sendEmail } from '../../../lib/mail';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;
  if (req.method === 'PUT') {
    const complaint = await Complaint.findByIdAndUpdate(id, req.body, { new: true });
    const updateDate = new Date().toLocaleString();
    await sendEmail(
      'Complaint Status Updated',
      `<h3>${complaint.title}</h3>
      <p>Status updated to <b>${complaint.status}</b></p>
      <p>Date updated: ${updateDate}</p>`
    );
    return res.status(200).json(complaint);
  }
  if (req.method === 'DELETE') {
    await Complaint.findByIdAndDelete(id);
    return res.status(204).end();
  }
  res.status(405).end();
}