import fs from 'fs';
import path from 'path';

export const getUploadPage = (req, res) => {
  const uploadedFiles = fs.readdirSync('uploads');
  res.render('index', { files: uploadedFiles, user: req.session.user });
};

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.redirect('/upload');
};

export const deleteFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('uploads', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.redirect('/upload');
};

// Add a default export that aggregates the functions:
export default {
  getUploadPage,
  uploadFile,
  deleteFile,
};
