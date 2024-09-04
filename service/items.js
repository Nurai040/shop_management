import Item from "../models/items.js";
import Leftovers from "../models/leftovers.js";
import Shop from "../models/shop.js";
import History from "../models/history.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";

class ItemService {

    async createItem(data){
        try {
            const checkItem = await Item.findOne({where: {item_name: data}});
            if(checkItem){
                throw new Error(`Item with this name-> ${data} already exists!`);
            }
            const item = await Item.create({item_name: data});

            await History.create({
                plu: item.plu,
                action: 'Create Item',
            });
            return {success: true, message: item};
        } catch (error) {
            console.log('Error with creation of Item: ', error);
            return {success: false, message: 'Error on the server'};
        }
    }

    async createLeftover(data){
        const {shop_name, item_name, number_on_shelf, number_in_order} = data;
        try {
            let shop = await Shop.findOne({where: {shop_name}});
            if(!shop){
                shop = await Shop.create({shop_name});
            }

            const item = await Item.findOne({where: {item_name}});

            if(!item){
                throw new Error('Item was not found!');
            }

            const leftover = await Leftovers.create({
                shop_id: shop.id,
                plu: item.plu,
                number_on_shelf: parseInt(number_on_shelf),
                number_in_order: parseInt(number_in_order),
            });

            await History.create({
                shop_id: leftover.shop_id,
                plu: leftover.plu,
                action: 'Create Leftover and Shop',
            });

            return {success: true, message: leftover};
        } catch (error) {
            console.log('Error with creation of Leftover: ', error);
            return {success: false, message: 'Error on the server'}; 
        }
    }

    async increaseLeftoverOnShelf(id, num){
        try {
            const leftover = await Leftovers.findOne({where:{id}});
            if(!leftover){
                throw new Error('There is no leftover with thid id')
            }
            const newNum = num + leftover.number_on_shelf;

            const updatedLeftover = await Leftovers.update({number_on_shelf: newNum}, {where: {id: leftover.id}});

            await History.create({
                shop_id: updatedLeftover.shop_id,
                plu: updatedLeftover.plu,
                action: 'Update Leftover Increase Shelf',
            });

            return {success: true, message: updatedLeftover};
        } catch (error) {
            console.log('Error with increasing of Leftover on shelf: ', error);
            return {success: false, message: 'Error on the server'}; 
        }
    }

    async increaseLeftoverInOrder(id, num){
        try {
            const leftover = await Leftovers.findOne({where:{id}});
            if(!leftover){
                throw new Error('There is no leftover with thid id')
            }
            const newNum = num + leftover.number_in_order;

            const updatedLeftover = await Leftovers.update({number_in_order: newNum}, {where: {id: leftover.id}});

            await History.create({
                shop_id: updatedLeftover.shop_id,
                plu: updatedLeftover.plu,
                action: 'Update Leftover Increase Order',
            });

            return {success: true, message: updatedLeftover};
        } catch (error) {
            console.log('Error with increasing of Leftover in order: ', error);
            return {success: false, message: 'Error on the server'}; 
        }
    }

    async decreaseLeftoverOnShelf(id, num){
        try {
            const leftover = await Leftovers.findOne({where:{id}});
            if(!leftover){
                throw new Error('There is no leftover with thid id')
            }
            let newNum = leftover.number_on_shelf - num;

            if(newNum<0){
                newNum = 0;
            }

            const updatedLeftover = await Leftovers.update({number_on_shelf: newNum}, {where: {id: leftover.id}});

            await History.create({
                shop_id: updatedLeftover.shop_id,
                plu: updatedLeftover.plu,
                action: 'Update Leftover Decrease Shelf',
            });

            return {success: true, message: updatedLeftover};
        } catch (error) {
            console.log('Error with decreasing of Leftover on shelf: ', error);
            return {success: false, message: 'Error on the server'}; 
        }
    }

    async decreaseLeftoverInOrder(id, num){
        try {
            const leftover = await Leftovers.findOne({where:{id}});
            if(!leftover){
                throw new Error('There is no leftover with thid id')
            }
            let newNum = leftover.number_in_order - num;

            if(newNum < 0){
                newNum = 0;
            }

            const updatedLeftover = await Leftovers.update({number_in_order: newNum}, {where: {id: leftover.id}});

            await History.create({
                shop_id: updatedLeftover.shop_id,
                plu: updatedLeftover.plu,
                action: 'Update Leftover Decrease Order',
            });

            return {success: true, message: updatedLeftover};
        } catch (error) {
            console.log('Error with decreasing of Leftover in order: ', error);
            return {success: false, message: 'Error on the server'}; 
        }
    }

    async filterItemBy(filter){
        try {
            const { plu, name } = filter;
            const query = {};
    
            if(plu){
                query.plu = plu;
            }
            if(name){
                query.name = name;
            }
    
            const items = await Item.findAll({where: query});

            return {success: true, message: items};
        } catch (error) {
            console.log('Error with getting items by filter: ', error);
            return {success: false, message: 'Error on the server'};  
        }
    }

    async filterLeftoverBy(filter){
        try {
            const { plu, shop_id, shelfRange, orderRange } = filter;
            const query = {};
    
            if(plu){
                query.plu = plu;
            }
            if(shop_id){
                query.shop_id = shop_id;
            }
            if(shelfRange && shelfRange.length === 2){
                query.number_on_shelf = {
                    [Op.between]: shelfRange,
                }
            }
            if(orderRange && orderRange.length === 2){
                query.number_in_order = {
                    [Op.between]: orderRange,
                }
            }
    
            const leftovers = await Leftovers.findAll({where: query});

            return {success: true, message: leftovers};
        } catch (error) {
            console.log('Error with getting leftovers by filter: ', error);
            return {success: false, message: 'Error on the server'};  
        }
    }

    async getAllItems(){
        try {
            const items = await Item.findAll();
            return {success: true, message: items};
        } catch (error) {
            console.log('Error with fetching all Items: ', error);
            return {success: false, message: 'Error on the server'};  
        }
    }

    async getAllShops(){
        try {
            const shops = await Shop.findAll();
            return {success: true, message: shops};
        } catch (error) {
            console.log('Error with fetching all Shops: ', error);
            return {success: false, message: 'Error on the server'};  
        } 
    }

    async getAllLeftovers(){
        try {
            const leftovers = await Leftovers.findAll();
            return {success: true, message: leftovers};
        } catch (error) {
            console.log('Error with fetching all Leftovers: ', error);
            return {success: false, message: 'Error on the server'};  
        }
    }
}

export default ItemService;
