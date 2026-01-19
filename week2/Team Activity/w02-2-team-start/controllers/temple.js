const db = require('../models');
const Temple = db.temples;

exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.name) {
    return next({ status: 400, message: 'Content can not be empty!' });
  }

  // Create a Temple
  const temple = new Temple({
    temple_id: req.body.temple_id,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  });
  // Save Temple in the database
  temple
    .save(temple)
    .then((data) => res.send(data))
    .catch((err) => next(err));
};

exports.findAll = (req, res, next) => {
  Temple.find(
    {},
    {
      temple_id: 1,
      name: 1,
      location: 1,
      dedicated: 1,
      additionalInfo: 1,
      _id: 0,
    }
  )
    .then((data) => res.send(data))
    .catch((err) => next(err));
};

// Find a single Temple with an id
exports.findOne = (req, res, next) => {
  const temple_id = req.params.temple_id;
  Temple.find({ temple_id: temple_id })
    .then((data) => {
      if (!data || data.length === 0) {
        return res
          .status(404)
          .send({ message: 'Not found Temple with id ' + temple_id });
      }
      return res.send(data[0]);
    })
    .catch((err) => next(err));
};

// // Update a Temple by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: 'Data to update can not be empty!',
//     });
//   }

//   const id = req.params.id;

//   Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else res.send({ message: 'Temple was updated successfully.' });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating Temple with id=' + id,
//       });
//     });
// };

// // Delete a Temple with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Temple.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
//         });
//       } else {
//         res.send({
//           message: 'Temple was deleted successfully!',
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete Temple with id=' + id,
//       });
//     });
// };

// // Delete all Temples from the database.
// exports.deleteAll = (req, res) => {
//   Temple.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Temples were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all temple.',
//       });
//     });
// };

// // Find all published Temples
// exports.findAllPublished = (req, res) => {
//   Temple.find({ published: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving temple.',
//       });
//     });
// };
