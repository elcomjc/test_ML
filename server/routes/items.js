var express = require('express');
var Q = require('q');
var router = express.Router();
var constants =  { 
    API_ML_URL: "https://api.mercadolibre.com/"
};
var requestify = require('requestify'); 

function processJSON (json) {
    var response = {
        author: {
            name: "Juan Carlos",
            lastname: "Espinoza",
        },
        categories: [],
        items: [],
    };
    var results = json.results.slice(0,4);
    json.filters.map(function (filter) {
        if(filter.id === 'category') {
            filter.values.map(function (category) {
                response.categories.push(category.name);
            });
        }
    });
    results.map(function (obj){
        var item = {};
        item.id = obj.id;
        item.title = obj.title;
        item.price = {
            currency: obj.currency_id,
            amount: parseInt((obj.price+"").split(".")[0]), 
            decimals: parseInt((obj.price+"").split(".")[1]),
        };
        item.picture = obj.thumbnail;
        item.condition = obj.condition;
        item.free_shipping = obj.shipping.free_shipping;
        response.items.push(item);
    });
    return response;
}

function getItems (query) {
    return new Promise(function (resolve, reject){
        requestify.get(constants.API_ML_URL+'sites/MLA/search?q='+query)
            .then(function(response) {
                resolve(processJSON(response.getBody()));
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    let query = req.query.q;
    getItems(query).then(function (result) {
        if (Object.keys(result).length === 0) {
            res.status(404);
            res.send('Not found Element');
        } else {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result));
        }
    }).catch(function (error) {
        console.log(error);
        res.status(404);
        res.send("Error");
    });

    
});

function processDetailJSON (item, description) {
    var response = {
        author: {
            name: "Juan Carlos",
            lastname: "Espinoza",
        },
        item: {},
    };
    response.item = {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: parseInt((item.price+"").split(".")[0]), 
            decimals: parseInt((item.price+"").split(".")[1]),
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.text,
    }
    return response;
}

function getItemDetail (itemId) {
    var defered = Q.defer();
    let itemDescription = requestify.get(constants.API_ML_URL+'items/'+itemId+'/description');
    let itemPromise = requestify.get(constants.API_ML_URL+'items/'+itemId);
    Q.all([itemPromise, itemDescription])
        .spread(function (item, description) {
            defered.resolve(processDetailJSON(item.getBody(), description.getBody()));
        })
        .catch(function (error) {
            defered.reject(error);
        });
    return defered.promise;
}

router.get('/:id', function(req, res, next) {
    let itemId = req.params.id;
    getItemDetail(itemId)
        .then(function (itemJSON) {
            if (!itemJSON.item.id) {
                res.status(404);
                res.send('Not found Element');
            } else {
                res.status(200);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(itemJSON));
            }
        })
        .catch(function (error) {
            console.log(error);
            res.status(404);
            res.send("Error");
        });
});

module.exports = router;
