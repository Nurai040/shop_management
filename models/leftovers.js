import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Item from "./items";
import Shop from "./shop";

const Leftovers = sequelize.define('Leftovers', {
    item_id: {
        number_on_shelf: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        number_in_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
});

export default Leftovers;