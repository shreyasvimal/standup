var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var DB = require('./db');

var contextPath = '/standup';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../build')));

app.post(`${contextPath}/api/create`, function(req, res) {
    const name = encodeURIComponent((new Date()).getTime() + req.body.email);
    const request = {
        STANDUP_NAME: name,
        EMAIL: req.body.email,
        USER_SLACK: req.body.slackChannel,
        QUESTIONS: req.body.questions.join(';;'),
        SLACK_WEBHOOK: req.body.slackWebhookToken,
        TEAM_SLACK: req.body.slackHandles
    }
    DB.insert(request);
    const slackHandles = req.body.slackHandles.split(',');
    res.send({
        name,
        urls: slackHandles.map(value => (
            `http://localhost:4000/standup/view/${name}/${value}`
        ))
    });
});

app.get(`${contextPath}/api/member/view`, function(req, res){
    const { member, name } = req.query; 
    DB.fetch(encodeURIComponent(name),member).then(res => {
        console.log(res);
    })
    res.sendStatus(200);
});

app.get(`${contextPath}/**`, function(req, res){
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});