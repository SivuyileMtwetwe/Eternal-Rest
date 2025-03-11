import mysql from 'mysql2/promise';
import { v2 as cloudinary } from 'cloudinary';
import {config} from 'dotenv';
config();

const pool = mysql.createPool({
  host: process.env.HOST ,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export {cloudinary};


export default pool;