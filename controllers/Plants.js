const db = require("../models");



const addPlant = (req, res) => {
  console.log(req.body)
if (!req.body.plantName) {
  return res.status(400).json({
  status: 400,
  message: 'need a plant name'
  });
}
db.Plants.create(req.body, (error, createdPlant) => {
  if (error)
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });

  db.Plots.findByIdAndUpdate(
    req.session.currentUser.plots._id,
    { $push: { Plants: createdPlant } },
    { new: true },
    (error, updatedPlot) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Something went wrong", error: error });

      const responseObj = {
        status: 200,
        data: updatedPlot,
        plants: createdPlant,
        requestedAt: new Date().toLocaleString()
      };

      response.status(200).json(responseObj);
    }
  );

  // const newPlant = {
  //     ph: req.body.ph,
  //     temp: req.body.temp,
  //     spacing: req.body.spacing,
  //     growthTime: req.body.growthTime,
  //     flags: req.body.flags
  //   };

  //     db.Plants.create(newPlant, (err, savedPlant) => {
  //         if (err) return res.status(500).json({ status: 500, message: err });
  //         res.sendStatus(201);

  //     });
   }
  )
}







// get all plants
const getPlants = (req, res) => {
  db.Plants.find((err, plants) => {
    console.log(plants);
    if (err) return res.status(400).json(err);
    const resObj = {
      message: "plants gotted",
      data: plants,
      requestedAt: new Date().toLocaleString
    }
    res.json(resObj);
  });
}
  // get one plant
const getPlant = (req, res) => {
  db.Plants.findById(req.params.id, (err, foundPlant) => {
    if (err) {
      console.log(err);
    };
    const resObj = {
      data: foundPlant,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};
  
  // update plant
const editPlant = (req, res) => {
  db.Plant.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true },  
  (err, editedPlant) => {
    console.log('edit route');
    if (err) {
      return res.json(err);
    }
    const resObj = {
      message: 'plant updated! Better be right. Science aint got time for your bull',
      data: editedPlant,
      requestedAt: new Date().toLocaleString
    };
    res.json(resObj);
  });
};
  
  // delete plant
const removePlant = (req, res) => {
  db.Plants.findByIdAndDelete(req.params.id, (err, deletedPlant) => {
    if (err) {
      return res.json({ err });
    }
    const resObj = {
      data: deletedPlant,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};

module.exports = {
  addPlant,
  getPlants,
  getPlant,
  editPlant,
  removePlant
}