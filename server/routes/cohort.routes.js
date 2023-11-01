const router = require("express").Router();
const Cohort = require("../models/Cohorts.model");

router.get("/", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving  ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

router.post("/", async (req, res, next) => {
  try {
    const cohortToCreate = { ...req.body };
    const createdCohort = await Cohort.create(cohortToCreate);
    res.status(201).json(createdCohort);
  } catch (error) {
    console.error("Error while creating  ->", error);
    res.status(500).send({ error: "Failed to create a cohort" });
  }
});

router.get("/:cohortId", async (req, res, next) => {
  try {
    // const { id } = req.params;
    const oneCohort = await Cohort.findById(req.params.id);
    res.json(oneCohort);
  } catch (error) {
    console.error("Error while retrieving  ->", error);
    res.status(500).send({ error: "Failed to get the cohort" });
  }
});

router.put("/:cohortId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cohortToUpdate = await Cohort.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("Updated cohort ->", cohortToUpdate);
    res.status(204).json(cohortToUpdate);
  } catch (error) {
    console.error("Error while updating  ->", error);
    res.status(500).send({ error: "Failed to update the cohort" });
  }
});

router.delete("/:cohortId", (req, res, next) => {
  const cohortId = req.params.id;
  Cohort.findByIdAndDelete(cohortId)
    .then((result) => {
      console.log("Cohort deleted");
      res.status(204).send();
    })
    .catch((e) => {
      console.log("Error while deleting the cohort ->", error);
      res.status(500).send({ error: "Deleting cohort failed" });
    });
});

module.exports = router;
