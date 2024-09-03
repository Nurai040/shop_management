import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const LeftoversHistory = sequelize.define('LeftoversHistory', {
    leftovers_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Leftovers',
            key: 'id',
        },
        allowNull: false,
    },
    number_on_shelf: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    number_in_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});

export default LeftoversHistory;
