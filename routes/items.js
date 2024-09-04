import express from 'express';
import ItemService from '../service/items.js';

const route = express.Router();
const itemsService = new ItemService();

export const itemRoute = ()=>{
    route.get('/items', async(req,res)=>{
        const result = await itemsService.getAllItems();
        if(result.success){
            return res.status(200).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.post('/items', async(req,res)=>{
        const {item_name} = req.body;
        const result = await itemsService.createItem(item_name);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.get('/leftovers', async(req,res)=>{
        const result = await itemsService.getAllLeftovers();
        if(result.success){
            return res.status(200).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.post('/leftovers', async(req,res)=>{
        const result = await itemsService.createLeftover(req.body);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.get('/shop', async(req,res)=>{
        const result = await itemsService.getAllShops();
        if(result.success){
            return res.status(200).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.put('/leftovers/increase-on-shelf/:id', async(req,res)=>{
        const id = parseInt(req.params.id);
        const num = req.body.increaseShelfBy;
        const result = await itemsService.increaseLeftoverOnShelf(id, num);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.put('/leftovers/increase-in-order/:id', async(req,res)=>{
        const id = parseInt(req.params.id);
        const num = req.body.increaseOrderBy;
        const result = await itemsService.increaseLeftoverInOrder(id, num);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.put('/leftovers/decrease-on-shelf/:id', async(req,res)=>{
        const id = parseInt(req.params.id);
        const num = req.body.decreaseShelfBy;
        const result = await itemsService.decreaseLeftoverOnShelf(id, num);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.put('/leftovers/decrease-in-order/:id', async(req,res)=>{
        const id = parseInt(req.params.id);
        const num = req.body.decreaseOrderBy;
        const result = await itemsService.decreaseLeftoverInOrder(id, num);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    route.get('/items/filtered', async(req,res)=>{
        const result = await itemsService.filterItemBy(req.query);
        if(result.success){
            return res.status(201).json(result.message);
        } else{
            return res.status(500).json(result.message);
        } 
    });

    route.get('/leftovers/filtered', async(req,res)=>{
        const result = await itemsService.filterLeftoverBy(req.query);
        if(result.success){
            return res.status(200).json(result.message);
        } else{
            return res.status(500).json(result.message);
        }
    });

    return route;
}