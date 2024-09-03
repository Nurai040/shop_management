import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const History = sequelize.define('History', {
    shop_id: {
        type: DataTypes.INTEGER,
        references:{
            model: 'Shop',
            key: 'id',
        },
        allowNull: true,
    },
    plu: {
        type: DataTypes.UUID,
        references: {
            model: 'Item',
            key: 'plu',
        },
        allowNull: true,
    },
    action:{
        type: DataTypes.ENUM('Create Item', 'Create Leftover and Shop', 'Update Leftover Increase Shelf', 'Update Leftover Increase Order', 'Update Leftover Decrease Shelf', 'Update Leftover Decrease Order'),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});

export default History;
