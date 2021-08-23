
const CrollService = require('../services/croll_service');


exports.getHtml = async(req, res, next) => {
    let param = req.params;
        console.log(param);
    try {
        console.log("크롤 컨트롤러");
        let resultData = await CrollService.getHtml(param);
        // console.log("data : ");
        // console.log(resultData);
        // return res.status(200).json(resultData);
        return res.status(200) .contentType('text/xml')
        .send(JSON.stringify(resultData));
    }catch(err){
        return res.status(500).json(err);
    }
}