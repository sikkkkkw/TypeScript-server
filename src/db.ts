import mysql from 'mysql2';
import 'dotenv/config'

interface DbConfig{
    host: string | undefined;
    port: number | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
};

const config : DbConfig ={
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const db = mysql.createPool(config) as mysql.Pool;

export default db;