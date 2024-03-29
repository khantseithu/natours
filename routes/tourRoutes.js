const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
});

// router.param("id", tourController.checkID);

router
  .get(tourController.aliasTopTours, tourController.getAllTours)

router
  .route("/")
  .get(tourController.getAllTours)
  .get(tourController.getTour)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
