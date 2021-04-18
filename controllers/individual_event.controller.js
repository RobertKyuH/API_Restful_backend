const db = require("../models");
const IndividualEvent = db.individual_events;

const Op = db.sequelize.Op;

const request_id_empty = "Event id cannot be empty!";

// winner athlet_id: -1 not chosen


// Create Event
exports.create = async (req, res) => {
    // Checking if name, sport type and beg date are not empty
    if(!req.body.name || !req.body.sport_type || !req.body.beginning_date || !req.body.ending_date){
        res.send({
            status: "fail"
        });
    }
    else
    {
        // create event
        const tempIndividualEvent = {
            name: req.body.name,
            sport_type: req.body.sport_type,
            beginning_date: req.body.beginning_date,
            ending_date: req.body.ending_date,
            winner_athlet_id: -1
            //winner_athlet_id: req.body.winner_athlet_id ? req.body.winner_athlet_id : null
        };

        // TODO: check if winner is added to request

        await IndividualEvent.create(tempIndividualEvent)
            .then(data=>
                res.send({status: "success"})
            )
            .catch(err=>{
                res.status(500).send(
                    {
                        status: "fail",
                        error_message: err.message || "Some error occured while creating event"
                    }
                );

            });
    }
}

// Get event by id
exports.getById = async (req, res) =>{
    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await IndividualEvent.findByPk(req.body.id)
            .then(data => {

                if(data instanceof IndividualEvent)
                    res.send(data);
                else
                    res.send({status: "fail"});
            })
            .catch(err=> {
                res.status(500).send(
                {
                    status: "fail",
                    error_message: err.message || "Some error occured while creating athlet"
                }
            );
        });
    }
}

// Update event
exports.update = async (req, res) => {
    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await IndividualEvent.update(req.body, {
            where: { id: req.body.id}
        })
        .then(num=>
            {
            if(num==1){
                res.send(
                    {
                        status: "success"
                    }
                );
            }
            else
            {
                res.send(
                    {
                        status: "success/fail"
                    }
                );
            }

            })
        .catch(err=>
            {
                res.status(500).send(
                    {
                        status: "fail",
                        error_message: err.message || "Some error occured while creating athlet"
                    }
                );
        });
    }
}

// Delete event - todo: delete athlets_ind_events with deleteing
exports.delete = async (req, res) =>{
    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await IndividualEvent.destroy({
            where: { id: req.body.id }
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
                status: "fail"
              });
            });
    }
}

// Get all avents
exports.getAll = async (req, res) => {
    await IndividualEvent.findAll().then(data => {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            status: "fail"
        });
    });
}

exports.getAllEventsWithParticipatingAthlets = async (req, res) =>{
    await IndividualEvent.findAll(
        {
            include: {
                model: db.athlets,
                as: 'athlets',
                through: { attributes: [] }
            }
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

exports.setEventWinner = async(req, res) =>{
    if(!req.body.athlet_id || !req.body.individual_event_id)
    {
        res.send({status: "fail"});
    }
    else
    {
        tempEvent = await IndividualEvent.findByPk(req.body.individual_event_id);
        console.log("***********************************ADDIN*****************")
        tempEvent.winner_athlet_id = req.body.athlet_id;
        await tempEvent.save();
    }
}

