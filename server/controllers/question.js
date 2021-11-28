/*
 * Group no: 6
 * Group Name: Meta Web
 * Team members: Shafiya Heena, Najmun Nahar, Karanjot Singh
 * Date - 27/11/2021
 */

// connect to our Student Model
let Question = require('../models/questions');

module.exports.displayQuestionList = (req, res, next) => {
    const localSurveyId = req.params.id;

    Question.find({surveyId: localSurveyId}, (err, questionList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('question/list', {
                title: 'Question', 
                QuestionList : questionList,
                surveyId: localSurveyId,
                displayName: req.user?req.user.displayName:''
            });
        }
    });
};

module.exports.performDelete =  (req, res, next) => {
    let id = req.params.id;
    let surveyId = req.params.surveyId;

    Question.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            res.redirect('/survey-list/questions/' + surveyId);
        }
    });
}

module.exports.displayAddQuestionPage = (req, res, next) => {
    const localSurveyId = req.params.id;

    res.render('question/add', {title: 'Add New Question', surveyId: localSurveyId,displayName: req.user?req.user.displayName:''});
}

module.exports.processAddQuestionPage = (req, res, next) => {
    const localSurveyId = req.params.id;

    const newQuestion = Question({
        question1: req.body.question1,
        surveyId: localSurveyId
    })

    Question.create(newQuestion, (err, Question) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the question list for the selected survey
            res.redirect('/survey-list/questions/' + localSurveyId);
        }
    });

}
module.exports.displayEditQuestionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;

    Question.findById(localSurveyId,(err,questionToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('question/edit',{title:'Edit Question',question:questionToEdit,displayName: req.user?req.user.displayName:''});
        }
    });
}
module.exports.processEditQuestionPage=(req,res,next)=>{
    const localSurveyId = req.params.id;
    let surveyId=req.params.surveyId;
    
    const updateQuestion=Question({
        _id:localSurveyId,
        surveyId: req.body.surveyId,
        question1: req.body.question1
    });
    Question.updateOne({_id:localSurveyId},updateQuestion,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the list
            res.redirect('/survey-list');
          
        }
    });
}
