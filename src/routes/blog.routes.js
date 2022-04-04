const router =  require('express').Router();

const BlogController = require('../controllers/blog.controller');
const multer = require('multer');
const BlogStorage = multer.diskStorage(
    {
        destination: './assets/blog_files',
        filename: (res, file, cb) => {
            filen = Date.now() + '.' + file.mimetype.split('/')[1];
            cb(null, filen);
        }
    })

const upload = multer({ storage: BlogStorage });
router.post('/',upload.any('image'), BlogController.create);
router.get('/',BlogController.findAll);
router.get('/:id',BlogController.findBlogById);
router.put('/:id',upload.any('image'),BlogController.updateBlog);
router.delete('/:id',BlogController.deleteBlog);





module.exports = router;
