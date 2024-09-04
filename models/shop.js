import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Shop = sequelize.define('Shop', {
    shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Shop;
