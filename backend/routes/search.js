var express = require('express');
var router = express.Router();
const elasticsearch = require('elasticsearch');
const fs = require('fs');

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'trace'
    // keepAlive: false
});

const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
    data.forEach(item => {
        bulkBody.push({
        index: {
            _index: index,
            _type: type,
            _id: item.id
        }
    });
    bulkBody.push(item);
});
    console.log('start index')
    client.bulk({body: bulkBody},
        function(err, response) {
            if (err) { console.err(err); return; }
            let errorCount = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                console.log(++errorCount, item.index.error);
            }
        });
            console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
        })
};

// only for testing purposes
// all calls should be initiated through the module
const test = function test() {
    const articlesRaw = fs.readFileSync('data.json');
    const articles = JSON.parse(articlesRaw);
    console.log(`${articles.length} items parsed from data file`);
    bulkIndex('library', 'article', articles);
};


module.exports = function (router) {

    var route = router.route('/');

    route.get(function (req, res){
        test()
        res.send("parse finished");

    })
    route.post(function (req, res){
        console.log('dddd', req.body.query);
        let body = {
            size: 200,
            from: 0,
            query: {
                match: {
                    'title': req.query
                }
            }
        }
        // console.log(req.config.data.query);
        client.search({
            index: 'library',
            type: 'article',
            body:{
                        query : {
                                match: {
                                    'journal':'veniam labore minim'//req.body.query
                                }
                        },
                        size: 20

            }


        })
            .then(results => {
                console.log('result =======',results.hits.hits);
            res.send(results.hits.hits);
            })
            .catch(err=>{
                    console.log(err)
                res.send([]);
            });




    });
    return router;
}
