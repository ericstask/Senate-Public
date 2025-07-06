const factory = require('../controllers/handlerFactory');
const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/APIFeatures");

exports.createProject = factory.createOne(Project);
exports.deleteProject = factory.deleteOne(Project);
exports.getProject = factory.getOne(Project);

exports.getAllProjects = catchAsync(async(req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  if (req.query.search) {
    // const projects = await searchProjects(req.query.search, skip, limit);

    const exactMatches = await Project.find({ title: req.query.search }).sort({ title: 1 }).select('title description createdAt _id');
    const exactMatchesDesc = await Project.find({ description: req.query.search }).sort({ description: 1 }).select('title description createdAt _id');
    const partialMatches = await Project.find({
      $or: [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ]
    }).sort([
      [{ $cond: { if: { $eq: ['$title', req.query.search] }, then: 0, else: 1 } }],
      [{ $cond: { if: { $eq: ['$description', req.query.search] }, then: 0, else: 1 } }],
      [{ $cond: { if: { $regexMatch: { input: '$title', regex: req.query.search } }, then: 0, else: 1 } }],
      [{ $cond: { if: { $regexMatch: { input: '$description', regex: req.query.search } }, then: 0, else: 1 } }],
    ]).select('title description createdAt _id').skip(skip).limit(limit);

    const projects = [...exactMatches, ...exactMatchesDesc, ...partialMatches];

    const totalProjects = projects.length;
    const totalPages = Math.ceil(totalProjects / limit);

    res.status(200).json({
      status: 'success',
      data: {
        projects,
        totalPages: totalPages,
        currentPage: page,
      },
    });
  } else {
    const totalProjects = await Project.countDocuments();
    const totalPages = Math.ceil(totalProjects / limit);

    const projects = await Project.find()
      .select('title description createdAt _id')
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      data: {
        projects,
        totalPages: totalPages,
        currentPage: page,
      },
    });
  }
});

exports.searchProjects = catchAsync(async (req, res, next) => {
  const query = req.query.query;
  const exactMatches = await Project.find({ title: query }).sort({ title: 1 }).select('title description createdAt _id');
  const exactMatchesDesc = await Project.find({ description: query }).sort({ description: 1 }).select('title description createdAt _id');
  const partialMatches = await Project.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ]
  }).sort([
    [{ $cond: { if: { $eq: ['$title', query] }, then: 0, else: 1 } }],
    [{ $cond: { if: { $eq: ['$description', query] }, then: 0, else: 1 } }],
    [{ $cond: { if: { $regexMatch: { input: '$title', regex: query } }, then: 0, else: 1 } }],
    [{ $cond: { if: { $regexMatch: { input: '$description', regex: query } }, then: 0, else: 1 } }],
  ]).select('title description createdAt _id');

  const searchResults = [...exactMatches, ...exactMatchesDesc, ...partialMatches];

  res.status(200).json({
    status: 'success',
    data: {
      searchResults,
    }
  });
});
