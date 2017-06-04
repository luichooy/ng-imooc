var app=angular.module("app",["ui.router","ngCookies"]);app.value("dict",{}),app.run(["$http","dict",function(t,e){t.get("data/city.json").then(function(t){e.city=t.data},function(t){console.log(t)}),t.get("data/salary.json").then(function(t){e.salary=t.data},function(t){console.log(t)}),t.get("data/scale.json").then(function(t){e.scale=t.data},function(t){console.log(t)})}]),app.config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("home",{url:"/home",templateUrl:"view/home.html",controller:"homeCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("my",{url:"/my",templateUrl:"view/my.html",controller:"myCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}),e.otherwise("home")}]),app.controller("companyCtrl",["$scope","$http","$state",function(t,e,o){e.get("data/company.json?id="+o.params.id).success(function(e){t.company=e}).error(function(t){console.log(t)})}]),app.controller("homeCtrl",["$scope","$http",function(t,e){e.get("/data/positionList.json").success(function(e){t.list=e}).error(function(t){console.log(t)})}]),app.controller("myCtrl",["$scope",function(t){}]),app.controller("positionCtrl",["$scope","$q","$http","$state",function(t,e,o,n){t.isLogin=!0,o.get("/data/position.json?id="+n.params.id).then(function(e){t.position=e.data,o.get("data/company.json?id="+t.position.companyID).then(function(e){t.company=e.data},function(t){console.log(t)})},function(t){console.log(t)})}]),app.controller("searchCtrl",["$scope","$http","dict",function(t,e,o){e.get("data/positionList.json").then(function(e){t.list=e.data},function(t){console.log(t)}),t.search=function(){var o=t.searchKey;e.get("data/positionList.json?name="+o).then(function(e){t.list=e.data},function(t){console.log(t)})},t.cancel=function(){t.searchKey="",t.search()},t.searchList=[{id:"city",name:"城市"},{id:"salary",name:"薪资"},{id:"scale",name:"公司规模"}],t.sheet={},t.showSheet=function(e,n){t.sheet.data=o[e],t.sheet.visible=!0},t.sselect=function(t,e){console.log(t+e)}}]),app.directive("appFooter",function(){return{restrict:"E",replace:!0,templateUrl:"view/template/footer.html"}}),app.directive("appHeader",function(){return{restrict:"E",replace:!0,templateUrl:"view/template/header.html"}}),app.directive("mainList",function(){return{restrict:"E",replace:!0,templateUrl:"view/template/mainList.html",scope:{data:"="}}}),app.directive("posClass",[function(){return{restrict:"E",replace:!0,templateUrl:"view/template/posClass.html",link:function(t){t.showPositionList=function(e){t.isActive=e,t.positionList=t.company.positionClass[e].positionList},t.$watch("company",function(e,o){console.log(e),e&&t.showPositionList(0)})}}}]),app.directive("posCompany",[function(){return{restrict:"E",replace:!0,templateUrl:"view/template/posCompany.html",scope:{company:"="}}}]),app.directive("posHeader",[function(){return{restrict:"E",replace:!0,templateUrl:"view/template/posHeader.html",scope:{title:"@"},link:function(t,e,o){t.back=function(){window.history.back()}}}}]),app.directive("posInfo",[function(){return{restrict:"E",replace:!0,templateUrl:"view/template/posInfo.html",scope:{isActive:"=",isLogin:"=",position:"="},link:function(t){t.imagePath=t.isActive?"image/star-active.png":"image/star.png"}}}]),app.directive("searchTab",[function(){return{restrict:"E",replace:!0,templateUrl:"view/template/searchTab.html",scope:{list:"=",tabClick:"&"},link:function(t){t.activeId=t.list[0].id,t.clickTab=function(e){t.activeId=e.id,t.tabClick(e)}}}}]),app.directive("sheet",[function(){return{restrict:"E",replace:!0,templateUrl:"view/template/sheet.html",scope:{data:"=",visible:"=",select:"&"},link:function(t){t.hideSheet=function(){t.visible=!1}}}}]),app.factory("cache",["$cookies",function(t){return{put:function(e,o){t.put(e,o)},get:function(e){return t.get(e)},remove:function(e){t.remove(e)}}}]);