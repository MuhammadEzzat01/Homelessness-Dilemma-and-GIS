require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/rest/serviceArea",
    "esri/rest/support/ServiceAreaParameters",
    "esri/rest/support/ServiceAreaSolveResult",
    "esri/rest/support/FeatureSet",
    "esri/Graphic",
    "esri/layers/FeatureLayer"
    ], function(esriConfig,Map, MapView, serviceArea, ServiceAreaParams,  ServiceAreaSolveResult, FeatureSet, Graphic,FeatureLayer) {

    // esriConfig.apiKey = "AAPK8541687343f34b5dbb858716e65b5dd74drR7ZEConU7-3fJq37ZgzWkRRswBXb78yGGyLDGTIAjgG36W4OXS_VJShGmvcH3";


    // -------------------------- Map 7 --------------------------- // 
    // --------------------- Service Area Map --------------------- //
    // ------------------------------------------------------------ // 

    var myLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Homeless_Data/FeatureServer/10",
        // popupTemplate: mypop
    })

    const map = new Map({
        basemap: "streets-vector",
        layers:[myLayer]
    });

    const view = new MapView({
        container: "map7",          // map7 div ID
        map: map,
        center: [31,30],
        zoom: 7
    });

    const serviceAreaUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea";

    view.on("click", function(event){

        const locationGraphic = createGraphic(event.mapPoint);
        const driveTimeCutoffs = [5,10,15]; 
        const serviceAreaParams = createServiceAreaParams(locationGraphic, driveTimeCutoffs, view.spatialReference);

        solveServiceArea(serviceAreaUrl, serviceAreaParams);

    });

    // Create the location graphic
    function createGraphic(point) {
        view.graphics.removeAll();
        const graphic = new Graphic({
            geometry: point,
            symbol: {
                type: "simple-marker",
                color: "white",
                size: 10
            }
        });

    view.graphics.add(graphic);
    return graphic;
    }

    function createServiceAreaParams(locationGraphic, driveTimeCutoffs, outSpatialReference) {

        // Create one or more locations (facilities) to solve for
        const featureSet = new FeatureSet({
        features: [locationGraphic]
        });

        // Set all of the input parameters for the service
        const taskParameters = new ServiceAreaParams({
            facilities: featureSet,
            defaultBreaks: driveTimeCutoffs,
            trimOuterPolygon: true,
            outSpatialReference: outSpatialReference
        });
        return taskParameters;
    }


    function solveServiceArea(url, serviceAreaParams) {

      return serviceArea.solve(url, serviceAreaParams)
        .then(function(result){
            if (result.serviceAreaPolygons.length) {
                // Draw each service area polygon
                result.serviceAreaPolygons.forEach(function(graphic){
                    graphic.symbol = {
                        type: "simple-fill",
                        color: "rgba(255,50,50,.25)"
                    }
                view.graphics.add(graphic,0);
                });
            }
        }, function(error){
            console.log(error);
        });

    }

});