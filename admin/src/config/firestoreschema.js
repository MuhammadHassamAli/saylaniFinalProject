import * as firebase from 'firebase';
require("firebase/firestore");

var collectionMeta={
	
	"posts":{
		"fields":{
			"name":"",
			"fvt":"",
			"category":"",
			"description":"",
			"image":"",
			"postedAt":"",
			"active":false,
			"tags":["Popular"]
		},
		"collections":["tabs"],
	},
    "tabs":{
        "fields":{
            "title":"",
			"content":"",
        },
        "collections":[],
    },
    "categories":{
        "fields":{
            "name":"",
        },
        "collections":[],
    },
    "slides":{
        "fields":{
			"id":"",
			"title":"",
			"description":"",
			"image":"",
			"link":"",
			"active":false,
        },
        "collections":[],
    },
    "tags":{
        "fields":{
            "tag":"",
        },
        "collections":[],
	}
	,
    "users":{
        "fields":{
			"active":false,
			"name":"",
			"email":"",
			"phone":"",
			"age":"",
			"uid":"",

        },
        "collections":[],
    }

}

module.exports=collectionMeta;