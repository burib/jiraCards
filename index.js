var request = require('request'),
    fs = require('fs'),
    swig = require('swig'),
    config = require('config.json'),
    host = config.host,
    restPath = config.restPath || "/rest/api/latest/issue/",
    userName = config.username,
    password = config.password,
    url = "https://" + userName + ":" + password + "@" + host + restPath,
    tickets = config.ticketKeys,
    cards = [],
    numberOfRequests = 0;


tickets.forEach(function (value) {
    request({
        url: url + value,
        strictSSL: false,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cards.push({
                key: body.key,
                issueType: body.fields.issuetype.name,
                title: body.fields.summary,
                estimation: toDaysAndHours(body.fields.timetracking.originalEstimateSeconds),
                description: body.fields.description,
                assignee: {
                    name: body.fields.assignee.displayName,
                    avatar: body.fields.assignee.avatarUrls["48x48"]
                }
            });
        } else {
            console.log(error);
        }

        if (tickets.length - 1 <= numberOfRequests++) {
            createCards(cards);
            console.log("\n");
            console.log(cards.length + '/' + tickets.length + ' JIRA tickets has been successfully requested through JIRA REST API.');
        }
    });
});

function createCards(cards) {
    function renderTemplate() {
        return swig.renderFile('jiracard_template.html', {
            cards: cards
        });
    }

    function createCardsHtml() {
        fs.writeFile("public/index.html", renderTemplate(), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(cards.length + " JIRA cards generated.");
            }
            console.log("\n");
        });
    }

    createCardsHtml();
}

function toDaysAndHours(seconds) {
    var _seconds = seconds ? seconds : 0;

    var numdays = Math.floor(_seconds / 28800),
        numhours = Math.floor((_seconds % 28800) / 3600),
        time = numhours !== 0 ? (numdays + " d " + numhours + " h") : numdays + " d";

    return _seconds != 0 ? time : '';
}

