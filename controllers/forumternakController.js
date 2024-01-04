// const {ForumTernak} = require('../models/forumternak');
// const users = require("../models/users");
const {User, ForumTernak} = require("../models");
const forumternak = ForumTernak;
const users = User;


exports.getForum = async (req,res) => {
    try{
        const forumTernak = await forumternak.findAll({
            include: [{
                model:users,
                as: "user"
            }]
        }
        );
        return res.send(forumTernak);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

exports.createForum = async (req,res) => {
    try{
        const description = req.body.description;
        await forumternak.create({
            user_id: req.userID,
            description: description,
            like: 0
        });
        return res.status(200);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}