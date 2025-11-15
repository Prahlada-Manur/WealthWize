const moongoose=require('mongoose');
async function configureDB(){
    try{
        await moongoose.connect(process.env.DB_URL);
        console.log('Connected to database')
    }catch(err){
        console.log("Error connectiong to databasse",err.message)
    }
}
module.exports=configureDB