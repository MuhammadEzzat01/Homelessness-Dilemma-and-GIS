require(["esri/Map",
   "esri/views/MapView",
   "esri/widgets/BasemapGallery",
   "esri/layers/FeatureLayer",
   "esri/widgets/Legend"], 
   (Map, MapView, BasemapGallery, FeatureLayer, Legend) => { 

    // (1) ESRI_Config (API Key)
    // esriConfig.apiKey = "AAPKd61eed21625e4329bd4fc2fe92f451785kzb8AnxPpzPF3AFJif7gh4SV5XwNQB54Z12BSvAcq630DCXcBpo2sUYv-xd-FIL";


    var mypop = {
        title: "",
        content: ` <ul>
                    <li> The FacilityType is: {FacilityType}</li>
                    <li> Distance To Network In Meters  is: {DistanceToNetworkInMeters}</li>
                    <li>  Weight: {Weight} </li>
                    <li>  Side Of Edge: {SideOfEdge} </li>
             
                </ul>`
    }


      ////////////////////////---------------------> facility

    const mylayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Location_Allocation_of_Shelters/FeatureServer/14",
        popupTemplate: mypop
    })


    // (2) Map
    var myMap= new Map({
        basemap:"streets-vector",
        layers:[mylayer],
        // layers:[saralayer]
    })

    
    // (3) MapView
    var MyView= new MapView({
        map:myMap,
        container:"map1",
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


       ////////////////////////---------------------> lines

    const saralayer = new FeatureLayer({
        url:"https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Location_Allocation_of_Shelters/FeatureServer/15",
    });
    myMap.add(saralayer, 0);
        

});