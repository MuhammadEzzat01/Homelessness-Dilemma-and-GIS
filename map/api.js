require(["esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Locate",
    "esri/widgets/Track",
    "esri/Graphic",  
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"],
    (Map, MapView, BasemapToggle,Locate, Track, Graphic, FeatureLayer, Legend) => { 

    // (1) ESRI_Config (API Key)
    // esriConfig.apiKey = "";
    
    // ------------------------------ Map 1 ------------------------------- // 
    // -------------------- 1- Unemployment Hot Spot ---------------------- //
    // -------------------------------------------------------------------- // 

    // (6) POP UP
    var mypop = {
        title:"Unemployment Hot Spot",
        content: `
            <ul>
                <li> 2020 Unemployed Population is: {employment_unemp_cy}</li>
            </ul>`
    }
 
    // (5) Add Layer
    var mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Facility_Map/FeatureServer/6",
        popupTemplate: mypop         // (6)
    })
 
 
    // (2) Map
    var myMap= new Map({
        basemap:"streets-vector",
        layers:[mylayer]
    })
 
    // (3) MapView
    var MyView= new MapView({
        map:myMap,
        container:"map1",           // map1 div ID
        zoom:7,
        center:[32,30]
    }) 
 
    // (4) event on click
    MyView.on("click", function(event){
        MyView.goTo({
            center: event.mapPoint,
            zoom:10},{duration:2500})
    })
 
    mylayer.on("layerview-create", function () {
        mylayer.queryExtent().then(function (layerExtent) {
            MyView.goTo(
            layerExtent.extent,
            { duration: 2500 })
        })
    })
    
    // (7) Legend
    var myLegend =new Legend({
        view: MyView,
    })
    MyView.ui.add(myLegend,"bottom-right")

    // ----------------------------- Map 2 ------------------------------ // 
    // -------------------- 2- Purchasing Hot Spot ---------------------- //
    // ------------------------------------------------------------------ // 
    
    // (6) POP UP
    var mypop = {
        title:"2021 Purchasing Power",
        content: `
            <ul>
                <li> 2021 Purchasing Power is: {purchasingpower_pppc_cy}</li>
            </ul>`
    }
 
    // (5) Add Layer
    var mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Facility_Map/FeatureServer/4",
        popupTemplate: mypop         // (6)
    })
 
    // (2) Map
    var myMap= new Map({
        basemap:"streets-vector",
        layers:[mylayer]
    })
 
    // (3) MapView
    var MyView= new MapView({
        map:myMap,
        container:"map2",           // map2 div ID
        zoom:7,
        center:[32,30]
    }) 
 
    // (4) event on click
    MyView.on("click", function(event){
        MyView.goTo({
        center: event.mapPoint,
        zoom:10},{duration:2500})
    })
 
    // (7) Legend
    var myLegend =new Legend({
        view: MyView,
    })
    MyView.ui.add(myLegend,"bottom-right")
 
    // -------------------------- Map 3 ---------------------------- // 
    // -------------------- 3- Household Size ---------------------- //
    // ------------------------------------------------------------- // 

    // (6) POP UP
    var mypop = {
        title:"2021 Average Household Size",
        content: `
            <ul>
                <li> 2021 Average Household Size is: {keyfacts_avghhsz_cy }</li>
            </ul>`
    }

    // (5) Add Layer
    var mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Facility_Map/FeatureServer/3",
        popupTemplate: mypop         // (6)
    })

    // (2) Map
    var myMap= new Map({
        basemap:"streets-vector",
        layers:[mylayer]
    })
 
    // (3) MapView
    var MyView= new MapView({
        map:myMap,
        container:"map3",           // map3 div ID
        zoom:7,
        center:[32,30]
    }) 
 
    // (4) event on click
    MyView.on("click", function(event){
        MyView.goTo({
        center: event.mapPoint,
        zoom:10},{duration:2500}) 
    })
 
    // (7) Legend
    var myLegend =new Legend({
        view: MyView,
    })
    MyView.ui.add(myLegend,"bottom-right")
    

    // -------------------------- Map 4 --------------------------- // 
    // ------------------------ Risk Map -------------------------- //
    // ------------------------------------------------------------ // 
    
    // (9) POP UP
    var mypop = {
        title:"Risk Map",
        content:`<ul>
                <li> Area Name is: {SHYK_ENAME}</li>
                <li> 2021 Total Population is: {populationtotals_totpop_cy}</li>
                <li> 2020 Unemployed Population is: {employment_unemp_cy}</li>
                <li> 2021 Purchasing Power is: {purchasingpower_pp_cy}</li>
                <li> 2021 Pop 10+/Edu: Illiterate is: {educationalattainment_educ01a_c}</li>
                <li> 2021 Purchasing Power: Per Capita is: {purchasingpower_pppc_cy}</li>
            </ul>`
    }
 
    // (8) Add Layer
    var mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Egypt_Risk_Map/FeatureServer/37",
        popupTemplate: mypop    // (9)
    })
 
    // (2) Map
    var myMap= new Map({
        basemap:"streets-vector",
        layers:[mylayer]               // add feature layer to map
    })
    
    // (3) MapView
    var MyView= new MapView({
        map:myMap,
        container:"map4",                // map4 div ID
        zoom:7,
        center:[32,30]
    }) 

    // (4) event on click
    MyView.on("click", function(event){
        MyView.goTo({
            center: event.mapPoint,
            zoom:10
        },{duration:2500})     
    })

    // // (5) BasemapToggle
    // const basemapToggle = new BasemapToggle({
    //     view: MyView,
    //     nextBasemap: "arcgis-imagery"
    // });
    // MyView.ui.add(basemapToggle,"bottom-left");

    // (6) Locate  (Find your geolocation)
    // const locate = new Locate({
    //     view: MyView,
    //     useHeadingEnabled: false,
    //     goToOverride: function(MyView, options) {
    //         options.target.scale = 1500;
    //         return MyView.goTo(options.target);
    //     }
    // });
    // MyView.ui.add(locate, "top-left");
    
    // (7) Track & Graphic (Track your location)
    // const track = new Track({
    //     view: MyView,
    //     graphic: new Graphic({
    //         symbol: {
    //         type: "simple-marker",
    //         size: "12px",
    //         color: "green",
    //         outline: {
    //             color: "#efefef",
    //             width: "1.5px"
    //         }
    //         }
    //     }),
    //     useHeadingEnabled: false
    // });
    // MyView.ui.add(track, "top-left");

    // (10) Legend
    mylayer.on("layerview-create", function () {
        mylayer.queryExtent().then(function (layerExtent) {
            MyView.goTo(
                layerExtent.extent,
                { duration: 2500 })
            })
 
    })

    // (10) Legend
    var myLegend =new Legend({
        view: MyView,
    })
    // MyView.ui.add(myLegend,"bottom-right")
 
 
 
});
 
    
 
 
 
 
 
   