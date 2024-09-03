import { Op } from "sequelize";
import History from "../models/history";

class HistoryService {
    async getHistoryByFilter(filter){
        try {
            const {plu, shop_id, action, start_date, end_date, limit =10, offset = 0} = filter;
            const query = {};
    
            if(plu){
                query.plu = plu;
            }
            if(shop_id){
                query.shop_id = shop_id;
            }
            if(action){
                query.action = action;
            }
            if(start_date && end_date){
                query.date = {
                    [Op.between] : [new Date(start_date) , new Date(end_date)]
                };
            }
    
            const history = await History.findAll({
                where: {query},
                limit: parseInt(limit),
                offset: parseInt(offset),
            });

            return {success: true, history: history};
        } catch (error) {
            console.log('Error with fetching History: ', error);
            return {success: false, message: 'Error on the server'};
        }
    }
}

export default HistoryService;