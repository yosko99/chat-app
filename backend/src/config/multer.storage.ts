import { randomUUID } from 'crypto';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${randomUUID()}-${originalname}`);
  },
});

export default storage;
