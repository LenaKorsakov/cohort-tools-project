const router = require('express').Router();
const Student = require('../models/Student.model');

router.get('/', async (req, res) => {
  Student.find({})
    .populate('cohort')
    .then((students) => {
      console.log('Retrieved students ->', students);
      res.json(students);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', async (req, res) => {
  const newStudent = { ...req.body };
  Student.create(newStudent)
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/cohort/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const students = await Student.find({ cohort: cohortId }).populate(
      'cohort'
    );
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const oneStudent = await Student.findById(studentId).populate('cohort');
    res.status(200).json(oneStudent);
  } catch (error) {
    next(error);
  }
});

router.put('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    await Student.findByIdAndDelete(studentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
