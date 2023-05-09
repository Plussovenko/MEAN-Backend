const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function(req, res) {
  try {
    const positions = Position.find({
      category: req.params.categoryId,
      user: req.user.id
    })
    res.status(200).json(positions)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.createPosition = async function(req, res) {
  try {
    const positions = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      categoty: req.body.category,
      user: req.body.user.id
    }).save();
    res.status(201).json(position);
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.removePosition = async function(req, res) {
  try {
    await Position.remove({_id: req.params.id});
    res.status(200).json({
      message: "Позиция была удалена"
    });
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.updatePosition = async function(req, res) {
  try {
    const position = await Position.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
      )
    res.status(200).json(position);
  } catch (error) {
    errorHandler(res, error)
  }
}
