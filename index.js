import express from 'express';
import 'dotenv/config';
import Item from './models/items';
import Leftovers from './models/leftovers';
import Shop from './models/shop';
import sequelize from './config/database';
import History from './models/history';
import { itemRoute } from './routes/items';
import { historyRoute } from './routes/history';

const app = express();

const port = proccess.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

Item.hasMany(Leftovers, {foreignKey: 'plu', sourceKey: 'plu'});
Shop.hasMany(Leftovers, {foreignKey: 'shop_id', sourceKey: 'id'});
Item.hasMany(History, {foreignKey: 'plu', sourceKey: 'plu'});
Shop.hasMany(History, {foreignKey: 'shop_id', sourceKey: 'id'});
Leftovers.belongsTo(Item, {foreignKey: 'plu', targetKey: 'plu'});
Leftovers.belongsTo(Shop, {foreignKey: 'shop_id', targetKey: 'id'});
History.belongsTo(Item, {foreignKey: 'plu', targetKey: 'plu'});
History.belongsTo(Shop, {foreignKey: 'shop_id', targetKey: 'id'});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

sequelize.sync({alter: true}).then(()=>{
    console.log('The tables created successfully');
});

app.use('/', itemRoute());
app.use('/', historyRoute());

app.listen(port, ()=>{
    console.log(`The application is listening on port ${port}`);
})
