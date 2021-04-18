const db = require("../models");
const Athlet = db.athlets;
IndividualEvent = db.individual_events;
Nationality = db.nationalities;

const Op = db.sequelize.Op;

// Create Event
exports.create = async(req, res) => {
    console.log("-----------------------------------------" + req.body.under_investigation);
    // Checking if name, sport type and beg date are not empty. We are not checking winner because winner can be added lately
    if(!req.body.name|| !req.body.surname || !req.body.sport_type || !req.body.nationalityId || (req.body.under_investigation === Object)){ // TODO: check passing boolean
        res.send({
            status: "fail"
        });
    }
    else
    {
        // create event
        const tempAthlet = {
        name: req.body.name,
        surname: req.body.surname,
        sport_type: req.body.sport_type,
        under_investigation: req.body.under_investigation,
        nationalityId: req.body.nationalityId
        }

        await Athlet.create(tempAthlet)
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

// Get event by id - returns empty response if not found
exports.getById = async(req, res) =>{
    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await Athlet.findByPk(req.body.id)
            .then(data => {

                if(data instanceof Athlet)
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
};

// Update event
exports.update = async (req, res) => {
    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await Athlet.update(req.body, {
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
};

// Delete event
exports.delete = async (req, res) =>{
    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await Athlet.destroy({
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
};

// Get all avents
exports.getAll = async (req, res) => {
    await Athlet.findAll({
        include: Nationality
       })
       .then(data => {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            status: "fail"
        });
    });
};

exports.getAllUnderInvestigation = async(req, res) =>{
    await Athlet.findAll(
        {
            where: {under_investigation: true},
            include: Nationality
        }).then(data => {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            status: "fail"
        });
    });
}

exports.setUnderInvestigation = async(req, res) =>{

    if((req.body.under_investigation === Object) && (req.body.id === Object))

    if(!req.body.id)
    {
        res.send({status: "fail"});
    }
    else
    {
        await Athlet.update(req.body, {
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

exports.getAllEventsWithParticipatingAthlets = async (req, res) =>{
    await Athlet.findAll(
        {
            include: {
                model: db.individual_events,
                as: 'individual_events',
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