import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Leftovers = sequelize.define('Leftovers', {
    number_on_shelf: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    number_in_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Leftovers;