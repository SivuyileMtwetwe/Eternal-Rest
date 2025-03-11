import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import db from '../config/db.js';

// Configure Multer Storage to Upload Directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Folder in Cloudinary
    format: async (req, file) => 'jpg', // Convert all uploads to JPG
    public_id: (req, file) => file.originalname.split('.')[0] // Use file name as public ID
  }
});

const upload = multer({ storage: storage });

// API Route for Uploading Images to Cloudinary
export const uploadImage = async (req, res) => {
  try {
    const imageUrl = req.file.path; // Cloudinary returns image URL

    // Save Image URL in MySQL Database
    const { product_id } = req.body;
    await db.query(
      'INSERT INTO product_images (product_id, image_url) VALUES (?, ?)',
      [product_id, imageUrl]
    );

    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
};


// Get all products with their images
export const getProducts = async (req, res) => {
  try {
      const [products] = await db.query(`
          SELECT p.*, pi.image_url
          FROM products p
          LEFT JOIN product_images pi ON p.product_id = pi.product_id
      `);

      // Group images by product and convert to absolute URLs
      const groupedProducts = products.reduce((acc, row) => {
          if (!acc[row.product_id]) {
              acc[row.product_id] = {
                  product_id: row.product_id,
                  title: row.title,
                  description: row.description,
                  price: row.price,
                  color: row.color,
                  wood_type: row.wood_type,
                  category: row.category,
                  images: []
              };
          }
          if (row.image_url) {
              // Convert relative path to absolute URL
              const absoluteUrl = `${req.protocol}://${req.get('host')}${row.image_url}`;
              acc[row.product_id].images.push(absoluteUrl);
            }
          return acc;
        }, {});

      res.status(200).json(Object.values(groupedProducts));
  } catch (err) {
      res.status(500).send(err);
    }
};

// Get a single product by ID with its images
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const [product] = await db.query(
            'SELECT p.*, pi.image_url FROM products p LEFT JOIN product_images pi ON p.product_id = pi.product_id WHERE p.product_id = ?',
            [id]
        );

        if (product.length === 0) {
            return res.status(404).send('Product not found');
        }
        
        const productData = {
            product_id: product[0].product_id,
            title: product[0].title,
            description: product[0].description,
            price: product[0].price,
            color: product[0].color,
            wood_type: product[0].wood_type,
            category: product[0].category,
            images: product.map(row => `${req.protocol}://${req.get('host')}${row.image_url}`).filter(url => url !== null)
          };
          
          
          res.status(200).json(productData);
    } catch (err) {
        res.status(500).send(err);
    }
};
export { upload };