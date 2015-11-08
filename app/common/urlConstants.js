mainApp.constant('urlConstants', {
    //searchCtrl.js
    "SIMPLE_SEARCH_URL" :"http://10.0.1.213:9200/eng_chn_keyword/page/_search?explain",
    "ADV_SEARCH_URL" :"http://10.0.1.213:9200/hksearch/page/_search?size=30",
    "ANALYSER_URL" :"http://localhost:9200/eng_chn_keyword/_analyze?analyzer=cjk",
    //homeCtrl.js
    "MAIN_URL" : "http://10.0.1.213:9200/_cat/indices/*?pretty",
    "HEALTH_URL" : "http://10.0.1.213:9200/_cat/health?v",
    "MAPPING_SIMPLE_URL" : "http://10.0.1.213:9200/eng_chn_keyword/_mapping",
    "MAPPING_ADV_URL" : "http://localhost:9200/hksearch/_mapping",
    //advsearchCtrl.js
    "ADV_MAIN_URL" :"http://10.0.1.213:9200/hksearch/page/_search?size=30"

});
