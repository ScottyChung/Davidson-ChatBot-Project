//NLC
var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
var natural_language_classifier = new NaturalLanguageClassifierV1({
  username: '50027e3a-6bfd-4504-9f74-db0fd760fb36',
  password: '7uAhOMZlUIsF'
});
var classifier_id = 'f48968x109-nlc-3787';

//Chatbot
var builder = require('botbuilder');
var connector = new builder.ConsoleConnector().listen();
var dmlConsoleBot = new builder.UniversalBot(connector);

function classy(input_text,callback) {
	// Perform classification
	natural_language_classifier.classify({
		text: input_text,
		classifier_id: classifier_id},
		function(err, response) {
			if (err)
				console.log('error:', err);
			else
				callback(response);
	});
};

dmlConsoleBot.dialog('/', [
    function(session){
    builder.Prompts.text(session, 'Davidson Machine Learning Group Welcomes You\n\nAsk a question?');
    },
    function(session, result, next){
 			classy(result.response, function(classi) {
				if (classi.top_class=='schedule') {
        	builder.Prompts.text(session,'I am ' + Number((classi.classes[0].confidence).toFixed(4)) + ' confident you are asking about our schedule. We typically meet every Tuesday at 2nd Floor Summit Coffee at 7:30pm');
				}
 				else {
        	builder.Prompts.text(session, 'I am ' + 
						Number((classi.classes[0].confidence).toFixed(4)) + 
						' confident that you want a contact. Come join our Meetup to talk to humans!');
				}
				session.endDialog('Press enter to start again!');
			});			
    },
])

