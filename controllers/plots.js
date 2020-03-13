const db = require("../models");

const createPlot = (req, res) => {
    console.log(req.body)
	if (!req.body.plotName || !req.body.plotSize) {
	  return res.status(400).json({
		status: 400,
		message: 'Please enter your plot name and plot size'
	  });
	}
  db.Plots.create(req.body, (error, createdPlot) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error });

    db.User.findByIdAndUpdate(
      req.session.currentUser.id,
      { $push: { plots: createdPlot._id } },
      { new: true },
      (error, updatedUser) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Something went wrong", error: error });

        const responseObj = {
          status: 200,
          data: updatedUser,
          plots: createdPlot,
          requestedAt: new Date().toLocaleString()
        };

        res.status(200).json(responseObj);
      }
    );
    // const newPlot = {
    //     plotName: req.body.plotName,
    //     plotSize: req.body.plotSize,
    //     plants: []
    //   };

    //     db.Plots.create(newPlot, (err, savedPlot) => {
    //         if (err) return res.status(500).json({ status: 500, message: err });
    //     res.sendStatus(201);

    //     });
    })
}

const getPlots = (req, res) => {
  db.Plots.find((err, plots) => {
    console.log(plots);
    if (err) return res.status(400).json(err);
    const resObj = {
      message: "plots gotted",
      data: plots,
      requestedAt: new Date().toLocaleString
    }
    res.json(resObj);
  });
};

const editPlot = (req, res) => {
  db.Plots.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, editedPlot) => {
      console.log("edit route");
      if (err) {
        return res.json(err);
      }
      const resObj = {
        message: "plot updated!",
        data: editedPlot,
        requestedAt: new Date().toLocaleString
      };
      res.json(resObj);
    }
  );
};

const getPlantsInPlot = (req, res) => {
  db.Plots.findById(req.params.id, (err, plot) => {
    if (err) {
      return res.json(err);
    }
    plot.find(plot.Plants);
    const resObj = {
      message: "Plants found in Plot",
      data: plot.Plants,
      requestedAt: new Date().toLocaleString
    };
    res.json(resObj);
  })
}


const addPlantToPlot = (req, res) => {
  db.Plots.findById(req.params.id, (err, plot) => {
    if (err) {
      return res.json(err);
    }
    plot.Plants.push(req.params.plantId);
    plot.save();
    const resObj = {
      message: "plot added to and updated!",
      data: plot,
      requestedAt: new Date().toLocaleString
    };
    res.json(resObj);
  })
}


const removePlantFromPlot = (req, res) => {
  db.Plots.findByIdAndDelete(req.params.id, (err, plot) => {
    if (err) {
      return res.json(err);
    }
    plot.Plants.filter(req.params.plantId); // need a method that selects only one matching id
    plot.save();
    const resObj = {
      message: 'plot deleted from and updated',
      data: plot,
      requestedAt: new Date().toLocaleString
    };
    res.json(resObj);
  })
}
    

const destroyPlot = (req, res) => {
  db.Plots.findByIdAndDelete(req.params.id, (err, deletedPlot) => {
    if (err) {
      return res.json({ err });
    }
    const resObj = {
      data: deletedPlot,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};

const index = (req, res) => {
  db.Plots.find({}, (err, foundPlots) => {
    if (err) {
      console.log(err);
    }
    const resObj = {
      data: foundPlots,
      requestedAt: new Date().toLocaleString()
    };
    return res.json({ resObj });
  });
};

const showPlot = (req, res) => {
  db.Plots.findById(req.params.id, (err, foundPlot) => {
    if (err) {
      console.log(err);
    }
    const resObj = {
      data: foundPlot,
      requestedAt: new Date().toLocaleString()
    };
    return res.json(resObj);
  });
};

module.exports = {
  createPlot,
  editPlot,
  destroyPlot,
  index,
  showPlot,
  getPlots,
  addPlantToPlot,
  removePlantFromPlot,
  getPlantsInPlot
}
