const Router = require('koa-router');
const Issue = new Router();
const IssueController = require('../controller/issueController');


Issue.get('/', IssueController.issues_get);

Issue.get('/get', IssueController.issue_by_key);

Issue.post('/add', IssueController.issue_post);

Issue.put('/:id', IssueController.issue_update_by_id);

Issue.delete('/:id', IssueController.issue_delete_by_id);

module.exports = Issue;
