const projectsService = require("./projects.service");
const { catchAsync, sendSuccess } = require("../../core/http");

const list = catchAsync(async (req, res) => {
  const projects = await projectsService.listProjects(req.user);
  sendSuccess(res, { projects, count: projects.length });
});

const flag = catchAsync(async (req, res) => {
  const result = await projectsService.flagProject(req.params.id, req.user, req.body.note);
  sendSuccess(res, { data: result });
});

const request = catchAsync(async (req, res) => {
  const project = await projectsService.requestProject(req.user, req.body);
  sendSuccess(res, { statusCode: 201, data: { project } });
});

module.exports = { list, flag, request };
