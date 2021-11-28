let mongoose=require('mongoose');

//create a model class
let surveyModel=mongoose.Schema({
    title: String,
    type:String,
},
{
    collection:"surveys"
});
module.exports=mongoose.model('Survey',surveyModel);