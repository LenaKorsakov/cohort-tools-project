const router = require('express').Router();
const Cohort = require('../models/Cohorts.model');

router.get('/', (req, res) => {
  Cohort.find(req.query)
    .then((cohorts) => {
      console.log('Retrieved cohorts ->', cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', async (req, res, next) => {
  try {
    const cohortToCreate = { ...req.body };
    const createdCohort = await Cohort.create(cohortToCreate);
    res.status(201).json(createdCohort);
  } catch (error) {
    next(error);
  }
});

router.get('/:cohortId', async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const oneCohort = await Cohort.findById(cohortId);
    res.json(oneCohort);
  } catch (error) {
    next(error);
  }
});

router.put('/:cohortId', async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const cohortToUpdate = await Cohort.findByIdAndUpdate(cohortId, req.body, {
      new: true,
    });
    console.log('Updated cohort ->', cohortToUpdate);
    res.status(204).json(cohortToUpdate);
  } catch (error) {
    next(error);
  }
});

router.delete('/:cohortId', (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndDelete(cohortId)
    .then(() => {
      console.log('Cohort deleted');
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
