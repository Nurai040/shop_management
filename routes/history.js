import express from 'express';
import HistoryService from '../service/history';

const route = express.Router();
const historyService = new HistoryService;

export const historyRoute = ()=>{
    route.get('/history', async(req,res)=>{
        const result = await historyService.getHistoryByFilter(req.query);
        if(result.success){
            return res.status(201).json(result.history);
        } else{
            return res.status(500).json(result.message);
        }
    });

    return route;
}