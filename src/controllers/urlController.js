const urlModel=require("../models/urlModel")
const validUrl=require('valid-url')
const shortId=require('shortid')

const createUrl=async function(req,res){
   
        try { 
            const data = req.body
            let longUrl = req.body.longUrl
    
            
    //     if (!isValidRequestBody(data))
    //         return res.status(400).send({status: false,message: "Data required in request body it cant be empty!"});
            
    checklongUrl=await urlModel.findone({longUrl:longUrl}).select({createdAt: 0, updatedAt: 0, __v: 0 ,_id:0})
    
    const createData = await urlModel.create(data);
    
    const newData = {
                longUrl: createData.longUrl,
                urlCode: createData.urlCode,
                shortUrl: createData.shortUrl,
              };
     return res.status(201).send({status: true,message: "data create ",data: newData,});
            
        } catch (error) {
            return res.status(500).send({ status: false, message: err.message });
         
        }
    
}

module.exports.createUrl=createUrl