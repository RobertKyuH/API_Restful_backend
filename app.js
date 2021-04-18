const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

const nationality_controller = require("./controllers/nationalities.controller");
const athlets_controller = require("./controllers/athlets.controller");
//const userRoute = require("./routes/User");
//app.use("/user", userRoute);
app.use(cors());
app.use(bodyParser.json());

const db = require("./models");
const { athlets } = require('./models');

db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true}).then (function () {
    db.sequelize.sync({
//        force:true
    }).then(()=>{
         
        console.log("Drop and re-sync db.");
        // fetch nationalities
        const request = require('request');
        let url = 'https://gist.githubusercontent.com/tiveor/5444753e9919ffe74b41/raw/47e48c7575189ef7ee228e40153a1fa57b5864b1/nationalities.json';
        let options = {json: true};
        request(url, options, (error, res, body) => {
            if (error) {
                return  console.log(error)
            };
        
            if (!error && res.statusCode == 200) {
                //body = JSON.parse(body);
                body.forEach(function(nationality){
                    nationality_controller.create(nationality);
                    console.log(nationality);
                });
                
            };
        });



    });
    
});



//require("./routes/user.routes")(app);
require("./routes/individual_events.routes")(app);
require("./routes/athlet.routes")(app);
require("./routes/athlets_individual_event.routes")(app);
require("./routes/nationalities_routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to athlets api." });
  });

app.listen(3005, () => {
    console.log("Server running on 3005");
});