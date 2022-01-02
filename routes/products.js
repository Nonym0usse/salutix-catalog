var express = require('express');
var router = express.Router();
var amazonScraper = require('amazon-buddy');
var db = require('../database/firebase');
const axios = require('axios');
var request = require('request');

router.get('/', function (req, res, next) {
    res.render('products/listProduct', { title: 'Products - SALUTIX' });
});

router.get('/add', function (req, res, next) {
    res.render('products/addProduct', { title: 'Add Products - SALUTIX' });
});

/* GET home page. */
router.post('/add-product-db', function(req, res, next) {
if(req.method == "POST"){
    (async () => {
        try {
            const product_by_asin = await amazonScraper.asin({ asin: req.body.asin, country: 'FR' });
            var price = product_by_asin.result[0].price.current_price / req.body.vat;
            var options = {
                headers: {'X-Naver-Client-Id': '7jl7G2QUorhbF6biht55', 'X-Naver-Client-Secret': 'PYvfT1WTem'}
            };
            axios.post('https://openapi.naver.com/v1/papago/n2mt', {'source':'fr', 'target':'ko', 'text': product_by_asin.result[0].description}, options)
                .then(function (response) {
                    const product  = {
                        'asin' : product_by_asin.result[0].asin,
                        'titleFR' : product_by_asin.result[0].title,
                        'img': product_by_asin.result[0].main_image,
                        'description': response.data.message.result.translatedText,
                        'price':  Math.round(price * 100) / 100,
                        'available': product_by_asin.result[0].item_available,
                        'url' : product_by_asin.result[0].url,
                        'VAT': req.body.vat,
                        'weight': 0.00
                    };
                    res.render('products/addProductConfirmation', { title: 'Add Products - SALUTIX', products: product });
                })
                .catch(function (error) {
                    const product  = {
                        'asin' : product_by_asin.result[0].asin,
                        'titleFR' : product_by_asin.result[0].title,
                        'img': product_by_asin.result[0].main_image,
                        'description': product_by_asin.result[0].description,
                        'price':  Math.round(price * 100) / 100,
                        'available': product_by_asin.result[0].item_available,
                        'url' : product_by_asin.result[0].url,
                        'VAT': req.body.vat,
                        'weight': 0.00,
                        'size': 'Write here...'
                    };
                    res.render('products/addProductConfirmation', { title: 'Add Products - SALUTIX', products: product });
                });
        } catch (error) {
            res.status(500).json({error : error});
        }
    })();
}
});

router.post('/sendfinal', async function (req, res, next) {
    const query = await db.collection('products').add(req.body);
    res.status(200).json("Added document DB: " + query.id);
})




module.exports = router;
