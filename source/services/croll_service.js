const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

exports.getHtml = (param) => {
    try {
        console.log("크롤링중....\n");
      
        console.log("param" + JSON.stringify(param));

        let month = param.month;
        let day   = param.day;


        let searchUrl =  "http://www.secretgardenescape.com/reservation.html?k_shopno=9&rdate=2021-" +month +"-" + day+"&prdno=";
        console.log("searchUrl" + searchUrl);

        const getContent = async () => {
            try{

                const html = await axios({
                    url: searchUrl,
                    mehthod :"GET",
                    responseType : "arraybuffer"
                });
                const contents = iconv.decode(html.data,"UTF-8");
               return contents; 
            }
            catch(error){
                console.error(error);
            }
        }
        
        const crollResult = async () => {
            return getContent()
                .then(html =>{
                    let ulList = [];
                    const $ = cheerio.load(html);
                    const $bodyList = $(".theme_box");
                    // console.log($bodyList);

                    // console.log("===========  첫번째 돔 ======================");
                    $bodyList.each(function(i, elem) {
                        ulList[i] = {
                            title: $(this).find('h3.h3_theme').first().text(),
                            summary: $(this).find('p.tag_txt').text(),
                            reservableTime:  
                                $(this).find('ul.reserve_Time li a').not(".end").find(".time").text()
                            
                        };
                    });
                    const data = ulList.filter(n => n.title);
                console.log("==============마지막 필터링 데이터 =================");
                console.log(JSON.stringify(data));
                
                return data;
                })
        }
        
        return  crollResult();

    } catch (error) {
      console.error(error);
    }
};
  