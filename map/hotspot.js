require(["esri/Map","esri/views/MapView","esri/widgets/BasemapGallery", "esri/layers/FeatureLayer","esri/widgets/Legend"], 
   (Map, MapView, BasemapGallery, FeatureLayer, Legend) => { 

      
        // esriConfig.apiKey = "AAPKd61eed21625e4329bd4fc2fe92f451785kzb8AnxPpzPF3AFJif7gh4SV5XwNQB54Z12BSvAcq630DCXcBpo2sUYv-xd-FIL";


    // -------------------------- Map 5 --------------------------- // 
    // ------------------------ Hot Spot -------------------------- //
    // ------------------------------------------------------------ // 

        var mypop = {
            title: "Hot Spot Of Homelessness People",
            content: ` <ul>
        <li> FID : {FID }</li>
        <li> SOURCE_ID: {SOURCE_ID}</li>
        <li>  JOIN_COUNT: {JOIN_COUNT} </li>
        <li>  GiZScore: {GiZScore} </li>
        <li>  GiPValue : {GiPValue } </li>
        <li>  NNeighbors : {NNeighbors } </li>
        <li>  Gi_Bin: {Gi_Bin} </li>
             
    </ul>`
        }



      ////////////////////////--------------------->  Hot Spot

    var mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Homelessness_Hotspot/FeatureServer",
        popupTemplate: mypop
    })


 
var myMap= new Map({
    basemap:"streets-vector",
    layers:[mylayer]
})

var MyView= new MapView({
    map:myMap,
    container:"map5",           // map5 div ID
    zoom:7,
    center:[32,30]
}) 

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
        var myLegend =new Legend({
        view: MyView,
    })
    MyView.ui.add(myLegend,"bottom-right")



    // -------------------------- Map 6 --------------------------- // 
    // ------------------------ Aggregation ----------------------- //
    // ------------------------------------------------------------ // 
      


    
      var mypop = {
            title: " Homeless in every polygon ",
            content: ` <ul>
        <li> Join_Count : {Join_Count}</li>
        <li>  TARGET_FID : {TARGET_FID }</li>
        <li>  GRID_ID : {GRID_ID } </li>
    </ul>`
        }


    var mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Homeless_in_every_polygon/FeatureServer",
        popupTemplate: mypop
    })


 
var myMap= new Map({
    basemap:"streets-vector",
    layers:[mylayer]
})

var MyView= new MapView({
    map:myMap,
    container:"map6",               // map6 div ID
    zoom:7,
    center:[32,30]
}) 

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
        var myLegend =new Legend({
        view: MyView,
    })
    MyView.ui.add(myLegend,"bottom-right")

    

    });