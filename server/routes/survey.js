let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');

let passport=require('passport');

let surveyController=require('../controllers/survey');
let questionController=require('../controllers/question');

//helper function for guard purposes
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
/*GET Route for the Book List page - READ operation*/
router.get('/',surveyController.displaySurveyList);

/*GET Route for displaying Add page - CREATE operation*/
router.get('/add',requireAuth, surveyController.displayAddPage);

/*GET Route for processing the Add page - CREATE operation*/
router.post('/add',requireAuth, surveyController.processAddPage);

/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/edit/:id',requireAuth,surveyController.displayEditPage);

/*GET Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id',requireAuth,surveyController.processEditPage);

/*GET to perform Deletion - DELETE operation*/
router.get('/delete/:id',requireAuth,surveyController.performDelete);

/* GET Route for displaying the question page */
router.get('/questions/:id',requireAuth,questionController.displayQuestionList);

/* GET Route to perform Deletion of question */
router.get('/delete-question/:id/:surveyId',requireAuth,questionController.performDelete);

/* POST Route for processing the Add question page - CREATE operation within the questions model. */
router.get('/add-question/:id',requireAuth,questionController.displayAddQuestionPage);

/* POST Route for processing the Add question page - CREATE operation within the questions model. */
router.post('/add-question/:id',requireAuth, questionController.processAddQuestionPage);

/*GET Route for displaying the Edit Question page - UPDATE operation*/
router.get('/edit-question/:id',requireAuth,questionController.displayEditQuestionPage);

/*GET Route for processing the Edit Question page - UPDATE operation*/
router.post('/edit-question/:id',requireAuth,questionController.processEditQuestionPage);

module.exports=router;