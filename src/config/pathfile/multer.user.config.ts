import * as multer from 'multer';

function randomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../../../images/user`)
        },
        filename: (req, file, cb) => {
            const newName = randomString();
            cb(null, newName + '-' + Date.now() + '.jpg')
        },
        
    }),
    limits: {fileSize: 2*1024*1024},
}

export default multerConfig