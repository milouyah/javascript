let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');
var iconv = require('iconv-lite');



let url = "https://news.naver.com";
axios.get(url)
    .then((response) => {
        if (response.status === 200) {

            //iconv.extendNodeEncodings();

            const html = response.data;
            const $ = cheerio.load(html.toString('utf-8'));
            let devtoList = [];

            $('div[class="hdline_article_tit"]').each(function (i, elem) {
                //console.log($(this));

                devtoList[i] = {
                    title: $(this).find('a').text().trim(),
                    url: $(this).find('a').attr('href'),
                    //tags: $(this).find('.tags').text().split('#').map(tag => tag.trim()).filter(function (n) { return n != "" })
                }
            });

            const devtoListTrimmed = devtoList.filter(n => n != undefined)
            fs.writeFile('devtoList.json',
                JSON.stringify(devtoListTrimmed, null, 4),
                (err) => console.log('File successfully written!'))
        }
    }, (error) => console.log(err));