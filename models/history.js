import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const History = sequelize.define('History', {
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
