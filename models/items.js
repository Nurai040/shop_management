import { DataTypes } from "sequelize";
import sequelize from '../config/database'

const Item = sequelize.define('Item', {
    plu: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Item;