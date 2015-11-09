mainApp.constant('urlConstants', {

    ///Alpha
    //searchCtrl.js
    "SIMPLE_SEARCH_URL" :"http://localhost:9200/eng_chn_keyword/page/_search?explain",

    "ANALYSER_URL" :"http://localhost:9200/eng_chn_keyword/_analyze?analyzer=cjk",
    //homeCtrl.js
    "MAIN_URL" : "http://localhost:9200/_cat/indices/*?pretty",
    "HEALTH_URL" : "http://localhost:9200/_cat/health?v",
    "MAPPING_SIMPLE_URL" : "http://localhost:9200/eng_chn_keyword/_mapping",
    "MAPPING_ADV_URL" : "http://localhost:9200/hksearch/_mapping",
    //advsearchCtrl.js
    "ADV_SEARCH_URL" :"http://localhost:9200/hksearch/page/_search?size=30",
    "ADV_SEARCH_ANALYSER_CJK" :"http://localhost:9200/hksearch/_analyze?analyzer=cjk",
    "ADV_SEARCH_ANALYSER_HAN" :"http://localhost:9200/hksearch/_analyze?analyzer=han_bigrams",
    "ADV_MAIN_URL" :"http://localhost:9200/hksearch/page/_search?size=30",

    "SMARTCN_SIMPLE_SEARCH_URL" :"http://localhost:9200/eng_chn_keyword_smartcn/page/_search?explain",

    "SMARTCN_ANALYSER_URL" :"http://localhost:9200/eng_chn_keyword_smartcn/_analyze?analyzer=smartcn",

    ///Alpha
    //searchCtrl.js
   // "SIMPLE_SEARCH_URL" :"http://10.0.1.213:9200/eng_chn_keyword/page/_search?explain",
   // "ADV_SEARCH_URL" :"http://10.0.1.213:9200/hksearch/page/_search?size=30",
    //"ANALYSER_URL" :"http://localhost:9200/eng_chn_keyword/_analyze?analyzer=cjk",
    //homeCtrl.js
   // "MAIN_URL" : "http://10.0.1.213:9200/_cat/indices/*?pretty",
   // "HEALTH_URL" : "http://10.0.1.213:9200/_cat/health?v",
   // "MAPPING_SIMPLE_URL" : "http://10.0.1.213:9200/eng_chn_keyword/_mapping",
   // "MAPPING_ADV_URL" : "http://localhost:9200/hksearch/_mapping",
    //advsearchCtrl.js
    //"ADV_MAIN_URL" :"http://10.0.1.213:9200/hksearch/page/_search?size=30"

});
