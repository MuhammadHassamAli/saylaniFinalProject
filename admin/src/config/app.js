import firebaseConfig from './firebase_config'

//FireBase - //Since version 6.0.0 , config is fetched from firebase_config.js - for easier setup
exports.firebaseConfig = firebaseConfig.config;

//App setup
exports.adminConfig={
  "appName": "FireAdmin",
  "slogan":"made with love for a better firebase.",
  "design":{
    "sidebarBg":"sidebar-1.jpg", //sidebar-1, sidebar-2, sidebar-3
    "dataActiveColor":"rose", //"purple | blue | green | orange | red | rose"
    "dataBackgroundColor":"black", // "white | black"
  },
  "showItemIDs":false,
  "allowedUsers":['luis.trevino@gmail.com','erika.lozano@gmail.com'], //If null, allow all users, else it should be array of allowd users
  "allowGoogleAuth":false, //Allowed users must contain list of allowed users in order to use google auth
  "allowRegistration":false, //Should there be register page
  "fieldBoxName": "Fields",
  "maxNumberOfTableHeaders":5,
  "prefixForJoin":[""],
  "showSearchInTables":true,
  "methodOfInsertingNewObjects":"push", //timestamp (key+time) | push - use firebase keys
  "goDirectlyInTheInsertedNode":true,
  "urlSeparator":"+",
  "urlSeparatorFirestoreSubArray":"~",
  "googleMapsAPIKey":"YOUR_KEY",
  "fieldsTypes":{
    "photo":["photo","image"],
    "dateTime":["end","start","postedAt"],
    "map":["map","latlng","location"],
    "textarea":["description","Description"],
    "html":["content"],
    "radio":["radio","radiotf","featured"],
    "checkbox":["checkbox"],
    "dropdowns":["status","dropdowns","active","Fvt"],
    "file":["video"],
    "rgbaColor":['rgba'],
    "hexColor":['color'],
    "relation":['collection_news','type','creator','group'],
    "iconmd":['icon'],
    "iconfa":['iconfa'],
    "iconti":['iconti'],
    "iconio":['iconio'],
  },
  "optionsForDateTime":[
    {"key":"end", "dateFormat":"YYYY-MM-DD" ,"timeFormat":true, "saveAs":"x","locale":"es"},
    {"key":"start", "dateFormat":"X" ,"timeFormat":"HH:mm", "saveAs":"x"},
  ],
  "optionsForSelect":[
      {"key":"dropdowns","options":["new","processing","rejected","completed"]},
      {"key":"checkbox","options":["Skopje","Belgrade","New York"]},
      {"key":"status","options":["just_created","confirmed","canceled"]},
      {"key":"radio","options":["no","maybe","yes"]},
      {"key":"radiotf","options":["true","false"]},
      {"key":"active","options":["true","false"]},
      {"key":"Fvt","options":["true","false"]}
      
  ],
  "optionsForRelation":[
      {
        //Firestore - Native
        "display": "name",
        "isValuePath": true,
        "key": "creator",
        "path": "/users",
        "produceRelationKey": false,
        "relationJoiner": "-",
        "relationKey": "type_eventid",
        "value": "name"
      },
      {
        //Firestore - Native
        "display": "group",
        "isValuePath": true,
        "key": "group",
        "path": "/groups",
        "produceRelationKey": false,
        "relationJoiner": "-",
        "relationKey": "group_eventid",
        "value": "name"
      },
      {
        //Firebase - Mimic function
        "display":"name",
        "key":"eventtype",
        "path":"",
        "isValuePath":false,
        "value":"name",
        "produceRelationKey":true,
        "relationJoiner":"-",
        "relationKey":"type_eventid"
      }
  ],
  "paging":{
    "pageSize": 20,
    "finite": true,
    "retainLastPage": false
  },
  "hiddenKeys":["keyToHide","anotherKeyToHide"],
  "previewOnlyKeys":["previewOnlyKey","anotherPreviewOnlyKye"],
}

//Navigation
exports.navigation=[
    {
      "link": "/",
      "name": "Dashboard",
      "schema":null,
      "icon":"home",
      "path": "",
       isIndex:true,
    },
    {
      "link": "firestoreadmin",
      "path": "posts",
      "name": "Database",
      "icon":"event",
      "tableFields":[],
      "subMenus":[
        {
          "link": "firestoreadmin",
          "path": "posts",
          "name": "Posts",
          "icon":"event",
          "tableFields":["name","category","image","active"],
        },
        {
          "link": "firestoreadmin",
          "path": "categories",
          "name": "Categories",
          "icon":"event",
          "tableFields":[],
        },
        {
          "link": "firestoreadmin",
          "path": "tags",
          "name": "Tags",
          "icon":"event",
          "tableFields":[],
        },
        {
          "link": "firestoreadmin",
          "path": "slides",
          "name": "Slides",
          "icon":"event",
          "tableFields":["title","description","image","active"],
        },
        {
          "link": "firestoreadmin",
          "path": "users",
          "name": "User",
          "icon":"event",
          "tableFields":["name","email","phone","active"],
        }
      ]
    }
  ];

  //From v 5.1.0 we suggest remoteSetup due to security
  //
exports.pushSettings={
  "remoteSetup":false,
  "remotePath":"pushSettings",
  "pushType":"expo", //firebase -  onesignal - expo
  "Firebase_AuthorizationPushKey":"AIzaSyCFUf7fspu61J9YsWE-2A-vI9of1ihtSiE", //Firebase push authorization ket
  "pushTopic":"news", //Only for firebase push
  "oneSignal_REST_API_KEY":"",
  "oneSignal_APP_KEY":"",
  "included_segments":"Active Users", //Only for onesignal push
  "firebasePathToTokens":"/expoPushTokens", //we save expo push tokens in firebase db
  "saveNotificationInFireStore":true, //Should we store the notification in firestore
}

exports.userDetails={

}

exports.remoteSetup=false;
exports.remotePath="admins/mobidonia";
exports.allowSubDomainControl=false;
exports.subDomainControlHolder="admins/";
exports.isAppCreator=false;
exports.appEditPath=undefined;