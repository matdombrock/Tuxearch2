window.onload = function () {
    var app = new Vue({
        el: '#app',
        data: {
            database:[],
            state:{
                searchText: "",
                results: [],
            },
            config:{
                // Do not set config here. Use 'config.js' these are just fallbacks.
                databaseName: "db.json",
                displayAllResultsOnEmptySearch: true,
                displayItemPoints: false,
                displayItemTags:false,
                hideCredits:false,
            },
            clearTimeout: null,
        },
        async mounted(){
            this.init();
        },
        methods:
        {
            init: async function(){
                this.config.url = config.url;
                this.config.displayAllResultsOnEmptySearch = config.displayAllResultsOnEmptySearch;
                this.config.displayItemPoints = config.displayItemPoints;
                this.config.displayItemTags = config.displayItemTags;
                this.config.hideCredits = config.hideCredits;
    
                const self = this;
                await this.loadJSON(function(json){
                    console.log(json);
                    self.database = json;
                    if(self.config.displayAllResultsOnEmptySearch==true){
                        self.state.results = json;
                    }
                });
                document.getElementById("search-bar").focus();
            },
            loadJSON: function(callback){
                var xobj = new XMLHttpRequest();
                xobj.overrideMimeType("application/json");
                xobj.open('GET', this.config.url+'/db/'+this.config.databaseName, true);
                xobj.onreadystatechange = function () {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(JSON.parse(xobj.responseText));
                    }
                };
                xobj.send(null);  
            },
            search: function(){
                this.tuxAnimation();
                var results = [];
                console.log("SEARCH: "+this.state.searchText);
                if(this.state.searchText==""){// no search text, show all results 
                    if(this.config.displayAllResultsOnEmptySearch==true){
                        this.state.results = this.database;
                    }else{
                        this.state.results = []; 
                    }
                    return;
                }
                var threshold = 1;
                var terms = this.state.searchText.split(" ");
                this.database.forEach(function(item){
                    var points = 0;
                    terms.forEach(function(term){
                        if(item.COMMAND.includes(term)){
                            points += 1;
                        }
                        if(item.INFO.includes(term)){
                            points += 1;
                        }
                        if(item.TAGS.includes(term)){
                            points += 1;
                        }
                    });
                    if(points >= threshold){
                        results.push(
                            {
                                "INFO": item.INFO,
                                "COMMAND": item.COMMAND,
                                "TAGS": item.TAGS,
                                "POINTS":points
                            }
                        );
                    }
                });
                results.sort(function (a, b) {
                    return b.POINTS - a.POINTS;
                });
                this.state.results = results;
                console.log(results.length + " results.")
            },
            tuxAnimation: function(){
                document.getElementById("tux-img").src = "assets/img/tux2.png";
                clearTimeout(this.clearTimeout);
                this.clearTimeout = setTimeout(function(){ document.getElementById("tux-img").src="assets/img/tux.png"; }, 350);
            }
        }
    })
}