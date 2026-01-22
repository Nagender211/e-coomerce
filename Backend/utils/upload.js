import multer from 'multer'

const upload=multer({dest: 'dist/uploads'})
export default upload