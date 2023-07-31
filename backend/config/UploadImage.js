import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadPath = `C:/Users/Abhishek/Desktop/MERN Projects/buy-now/backend/images`;




const storage = multer.diskStorage({
    destination : uploadPath,
    filename : (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const UploadImage = multer({storage});

export default UploadImage;