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
      console.error('Error while retrieving  ->', error);
      res.status(500).send({ error: 'Failed to retrieve students' });
    });
});

router.post('/', async (req, res) => {
  const newStudent = { ...req.body };
  Student.create(newStudent)
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((error) => res.status(500).send({ error: error.message }));
});

router.get('/cohort/:cohortId', async (req, res) => {
  const { cohortId } = req.params;
  try {
    const students = await Student.find({ cohort: cohortId }).populate(
      'cohort'
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const oneStudent = await Student.findById(studentId).populate('cohort');
    res.status(200).json(oneStudent);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    await Student.findByIdAndDelete(studentId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
