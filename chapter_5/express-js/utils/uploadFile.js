const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storages/');
  },
  filename: (req, file, cb) => {
    const [prefix] = file.mimetype.split('/');
    const filename = file.originalname.split('.');
    const extension = filename.pop();
    const fileName = `${filename}.${extension}`;

    cb(null, fileName);

    if (!req[`uploaded_${file.fieldname}`])
      req[`uploaded_${file.fieldname}`] = '';
    req[`uploaded_${file.fieldname}`] = fileName;
  },
});

module.exports = multer({ storage });
