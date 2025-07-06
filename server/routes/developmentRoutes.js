const express = require('express');
const projectController = require('../controllers/projectController');

const developmentRouter = express.Router();

developmentRouter.get('/search', projectController.searchProjects);

developmentRouter
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

developmentRouter
  .route('/:id')
  .get(projectController.getProject)
  .delete(projectController.deleteProject);

module.exports = developmentRouter;