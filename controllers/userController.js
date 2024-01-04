// const users = require("../models/users");
const {User} = require("../models");
const bcrypt = require("bcrypt");
const moment = require('moment');

exports.getUsers = async (req, res) => {
    const user = await User.findByPk(req.userID);
    return res.send(user);
}

exports.updateUser = async (req,res) => {
    try{
        const user = await User.findByPk(req.userID);
        console.log(req.body);
        if(!user){
            return res.status(404).json({"message": "User not found!"});
        }
        user.name = req.body.name;
        let gender;
        if(user.gender == "Male"){
            gender = "L";
        }else{
            gender = "P";
        }
        const birthdate = moment(req.body.birthdate, "DD-MM-YYYY").format("YYYY-MM-DD");
        user.gender = gender;
        user.birthdate = birthdate;
        user.email = req.body.email;
        await user.save();
        return res.send({"message" : "Successfully update user!"});
    }catch(error){
        console.log(error);
        return res.status(500).json({"message": "Internal Server Error!"});
    }
}

exports.getUser = (req,res) => {
    
}

exports.changePassword = async (req,res) => {
    try{
        const current = req.body.current;
        const user = await User.findByPk(req.userID);
        if(user.password == null){
            const newPass = req.body.new;
            user.password = bcrypt.hashSync(newPass, 10);
            await user.save();
            return res.status(200).json({"message": "Your password never been created, Your password has been added"});
        }
        if(!user || !(await bcrypt.compare(current,user.password))){
            return res.status(400).json({"message": "Wrong Current Password!"});
        }
        const newPass = req.body.new;
        user.password = bcrypt.hashSync(newPass, 10);
        await user.save();
        return res.send({"message": "Successfully change password!"});
    }catch(error){
        return res.status(500).json({"message": "Internal Server Error!"});
    }
}