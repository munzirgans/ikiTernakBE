const express = require("express")
const app = express()
const port = 3000
const {sequelize} = require("./models");

async function main(){
    await sequelize.sync({force:false});
    const userRoutes = require("./routes/user");
    const authRoutes = require("./routes/auth");
    const diaryternakRoutes = require("./routes/diaryternak");
    const forumternakRoutes = require("./routes/forumternak");

    app.use(express.json())
    
    app.get("/test", (req,res) => {
        return res.sendStatus(200);
    });

    app.use("/users", userRoutes);
    app.use("/auth", authRoutes);
    app.use("/diaryternak", diaryternakRoutes);
    app.use("/forumternak", forumternakRoutes);

    app.listen(port, () => {
        console.log(`APP is listening on port ${port}`)
    })
}

main()