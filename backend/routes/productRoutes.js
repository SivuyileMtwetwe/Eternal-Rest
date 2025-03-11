import express from 'express';
import { getProducts, getProductById, upload, uploadImage } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
// router.post('/', addProduct);
router.post('/upload', upload.single('image'), uploadImage);

export default router;