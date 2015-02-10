# jiraCards
nodeJS powered jiraCard printer using JIRA's REST API


### Step1 ( initial requirement )
#### edit config.json
 ```json
    {
        host: 'jira.mycompany.com',
        username: 'myAwesomeUserName',
        password: 'myAwesomePassword',
        ticketKeys: [
            "COP-7896",
            "COP-7899"
        ]
    }
```
### Step2 ( initial requirement )
#### open terminal and type
 ```bash
    npm install
```

### Step3
#### open terminal and type
 ```bash
    node index
```

### Step4
#### JIRA cards are hopefully successfully generated into public/index.html. Open public/index.html in your browser and print your cards.
