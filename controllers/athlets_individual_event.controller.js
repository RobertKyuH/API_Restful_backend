const db = require("../models");
const Athlets_IndividualEvents = db.athlets_individual_events;
Athlet = db.Athlets;
IndividualEvent = db.IndividualEvents;

const Op = db.sequelize.Op;

test = require("../models/athlet.model");
test2 = test.Athlet;

// Create Event
exports.create = async(req, res) => {
    // Checking if name, sport type and beg date are not empty. We are not checking winner because winner can be added lately
    if(!req.body.athlet_id || !req.body.individual_event_id){ // TODO: check passing boolean
        res.send({
            status: "fail"
        });
    }
    else
    {
        // TODO! not foreign kyes creating
        // create event
        const tempAthlets_IndividualEvents = {
            athlet_id: req.body.athlet_id,
            individual_event_id: req.body.individual_event_id
        }

        await Athlets_IndividualEvents .create(tempAthlets_IndividualEvents)
        .then(data=>
            res.send({status: "success"})
        )
        .catch(err=>{
            res.status(500).send(
                {
                    status: "fail",
                    error_message: err.message || "Some error occured while creating athlet"
                }
            );

        }); 
    }

};


// Delete event 
exports.deleteAthletFromEvent = async (req, res) =>{
    if(!req.body.athlet_id || !req.body.individual_event_id)
    {
        console.log("Body empty");
        res.send({status: "fail"});
    }
    else
    {
        await Athlets_IndividualEvents.destroy({
            where: 
            { 
                athlet_id: req.body.athlet_id,
                individual_event_id: req.body.individual_event_id
            }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                    status: "success"
                });
              } else {
                res.send({
                    status: "success/fail"
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                status: "fail",
                error_message: err.message
              });
            });
    }
};

exports.getAllEventsWithParticipatingAthlets = async (req, res) =>{
    await Athlets_IndividualEvents.findAll(
        {
            include: [test2]
        }
    )
    .then(data => {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            status: "fail",
            error_message: err.message
        });
    });
    
}

// TODO: add athlet to event
