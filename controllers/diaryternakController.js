const { Op } = require("sequelize");
const {DiaryTernak, DompetTernak, sequelize} = require("../models");
const moment = require('moment');

const diaryternak = DiaryTernak;
const dompetternak = DompetTernak;


exports.getDiaryTernak = async (req,res) => {
    try{
        const diaryTernak = await diaryternak.findAll(
            {
                where:{
                    user_id : req.userID,
                }
            }
        );
        const total_eggs = await diaryternak.sum('quantity', 
        {
            where:
            {
                user_id: req.userID   
            }
        });
        if(!diaryTernak){
            return res.status(404).json({message: "Data diary ternak tidak ditemukan!"});
        }
        const responseData = 
        {
            "data": diaryTernak,
            "total_eggs": total_eggs
        }
        return res.send(responseData);
    }catch(error){
        console.error(error);
        return res.status(500).body("Internal Server Error");
    }
    
    
}

exports.createDiaryTernak = async (req, res) => {
    try{
        const userID = req.userID;
        const harvestDate = req.body.harvest_date;
        const harvestDateFormat = moment(harvestDate, "DD-MM-YYYY").format("YYYY-MM-DD");
        const quantity = parseInt(req.body.quantity);

        const newDiaryTernak = await diaryternak.create({
            user_id: userID,
            harvest_date: harvestDateFormat,
            quantity: quantity
        });

        return res.send(newDiaryTernak);    
    }catch(error){
        console.error(error)
        return res.status(500).body("Internal Server Error");
    }
    
}

exports.getDompetTernak = (req,res) => {
    try{
        const userID = req.userID;
        const fromdate = req.params.fromdate;
        const todate = req.params.todate;
        let responseData;
        if(!fromdate && !todate){
            const dompetTernak = dompetternak.findAll(
                {
                    where: {
                        user_id: userID,
                        [Op.and] : 
                            [
                                sequelize.where(sequelize.fn('month', sequelize.col('date')), moment().month())
                            ]
                    },
                }
            );
            if(!dompetTernak){
                return res.status(404).body("Data not found!");
            }
            const totalIncome = dompetternak.sum('amount',{
                where: {
                    user_id: userID,
                    [Op.and]: [
                        sequelize.where(sequelize.fn('month', sequelize.col('date')), moment().month()),
                        {category: 'income'}
                    ]
                }
            });
            const totalExpense = dompetternak.sum('amount',{
                where: {
                    user_id: userID,
                    [Op.and]: [
                        sequelize.where(sequelize.fn('month', sequelize.col('date')), moment().month()),
                        {category: 'expense'}
                    ]
                }
            });
            responseData = {
                "data": dompetTernak,
                "total_income": totalIncome,
                "total_expense": totalExpense,
            }
        }else{
            const dompetTernak = dompetternak.findAll([
                {
                    where: {
                        user_id: userID,
                        date: {
                            [Op.and]: [
                                {[Op.gte]: fromdate},
                                {[Op.lte]: todate}
                            ]
                        }
                    }
                }
            ]);
            if(!dompetTernak){
                return res.status(404).body("Data not found!");
            }
            const totalIncome = dompetternak.sum('amount', {
                where: {
                    user_id: userID,
                    date: {
                        [Op.and]: [
                            {[Op.gte]: fromdate},
                            {[Op.lte]: todate}
                        ]
                    },
                    category: "income"
                }
            });
            const totalExpense = dompetternak.sum('amount', {
                where: {
                    user_id: userID,
                    date: {
                        [Op.and]: [
                            {[Op.gte]: fromdate},
                            {[Op.lte]: todate}
                        ]
                    },
                    category: "expense"
                }
            })
            responseData = {
                "data": dompetTernak,
                "total_income": totalIncome,
                "total_expense": totalExpense
            }
        }

        return res.send(responseData);
        
    }catch(error){
        console.error(error);
        return res.status(500).body("Internal Server Error");
    }
    
}

exports.createDompetTernak = async (req,res) => {
    try{
        const userID = req.userID;
        const title = req.body.title;
        const date = req.body.date;
        const amount = req.body.amount;
        const category = req.body.category;
        const description = req.body.description;
        const newDompetTernak = await dompetternak.create({
            user_id: userID,
            title: title,
            date: date,
            amount: amount,
            category: category,
            description: description,
        });
        return res.send(newDompetTernak);
    }catch(error){
        console.error(error);
        return res.status(500).body("Internal Server Error");
    }
}