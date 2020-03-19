const Router = require('koa-router');
const Home = new Router();
const IssueController = require('../controller/issueController');


Home.get('/getIssues', IssueController.issues_get);

Home.get('/getIssueById', IssueController.issue_get_by_id);

Home.get('/getIssueByKey', IssueController.issues_get_search);

Home.post('/addIssue', IssueController.issue_post);

Home.post('/deleteIssue', IssueController.issue_delete_by_id);

module.exports = Home;
