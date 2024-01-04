// const users = require("../models/users");
const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwtutil = require("../utils/jwt");
const moment = require('moment');
const users = User;

exports.login = async (req,res) => {
    try{
        const isSocmed = req.body.is_socmed;
        if(isSocmed){
            let user = await users.findOne({
                where:
                {
                    name: req.body.name,
                    email: req.body.email,
                    isSocmed: isSocmed,
                }
            })
            if(user == null){
                user = await users.create({
                    email: req.body.email,
                    name: req.body.name,
                    isSocmed: 1
                });
            }
            const jwtToken = jwtutil.generateToken(user.id);
            return res.status(200).json({"jwtToken":jwtToken});
        }
        const {username, password} = req.body;
        const user = await users.findOne({
            where:{
                username: username
            }
        });
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: "Invalid username or password!"});
        }else{
            const jwtToken = jwtutil.generateToken(user.id);
            return res.status(200).json({message: "Login successful!", user:user.toJSON(), jwtToken});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error!"});
    }
    

}

exports.logout = (req,res) => {

}

exports.register = async (req,res) => {
    try{
        const format = "MM/DD/YYYY";
        const isSocmed = req.body.is_socmed;
        const name = req.body.name;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const birthdate = req.body.birthdate;
        if(name == "" || username == "" || email == "" || password == "" || birthdate == ""){
            return res.status(400).json({message: "Make sure the entire form is filled in!"});
        }
        const birthDateFormat = moment(birthdate,format).format("YYYY-MM-DD");
        let gender = req.body.gender;
        if(gender == "Laki-laki"){
            gender = "L";
        }else if (gender == "Perempuan"){
            gender = "P";
        }
        const address = req.body.address;
        const encodedPassword = bcrypt.hashSync(password,10);
        const newUser = await users.create({
            name: name,
            username: username,
            email: email,
            password: encodedPassword,
            birthdate: birthDateFormat,
            gender: gender,
            address: address,
            isSocmed: isSocmed
        });
        return res.send(newUser);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Internal server error!"});
    }    
}