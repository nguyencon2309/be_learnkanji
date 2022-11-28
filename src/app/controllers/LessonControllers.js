const Lesson=require("../models/lesson")
class LessonControllers{
    //[get] new
    listlesson(req,res,next){
        Lesson.find({
            
        },function(err,lesson){
            if (!err){
                res.json({
                    lesson
                });
            }
            else{
                res.status(400).json({error:'ERROR'});
                return ;
            }
        })
    }
    
}
module.exports = new LessonControllers;