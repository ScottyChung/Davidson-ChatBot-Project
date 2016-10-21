var builder = require('botbuilder');
var connector = new builder.ConsoleConnector().listen();
var dmlConsoleBot = new builder.UniversalBot(connector);
dmlConsoleBot.dialog('/', [
    function(session){
    builder.Prompts.text(session, 'Davidson Machine Learning Group Welcomes You\n\nYour Name?');
    },
    function(session, result, next){
        session.userData.name = result.response;
        builder.Prompts.text(session, 'Hey, ' + result.response + '. Are you joining us for the meeting on Tuesday?');
    },
    function(session, result, next){
        session.userData.rsvp = result.response;

        if((session.userData.rsvp.toLowerCase())=="yes"){
            session.send('Great! Lets meet at 2nd Floor Summit Coffee');
        } else {
            session.endDialog('Sorry ' + session.userData.name + 'my creators are working hard to make me understand your response <<' + session.userData.rsvp + '>>. Bye for now!')
        }
    }
])