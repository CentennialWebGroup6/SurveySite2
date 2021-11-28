let mongoose = require('mongoose');

// create a model class
let questionModel = mongoose.Schema({
    surveyId: mongoose.Schema.Types.ObjectId,
    question1:String
},
{
    collection: "questions"
});

module.exports = mongoose.model('Question', questionModel);