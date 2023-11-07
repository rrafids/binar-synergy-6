import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, './storages'); // Set the destination path for file uploads
  },
  filename: (req: Request, file, cb) => {
    const [prefix] = file.mimetype.split('/');
    const filename = file.originalname.split('.');
    const extension = filename.pop();
    const fileName = `${prefix}-${Date.now()}.${extension}`;

    // Do not call cb() before the logic for setting properties in the request object
    (req as any)[`uploaded_${file.fieldname}`] = fileName;

    console.log((req as any)[`uploaded_${file.fieldname}`]);

    cb(null, fileName); // Call cb() after your logic
  },
});

export default multer({ storage });
