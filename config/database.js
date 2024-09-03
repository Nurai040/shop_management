import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({path: '.env.db'});

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

export default sequelize;