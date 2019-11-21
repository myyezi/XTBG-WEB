
<template>
    <div class="map_count">
        <div class="map">
            <div :id="mapId" :style="mapStyle"></div>
        </div>
        
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        components: {},
        props:{
            vMapData:{
                type: Array,
                required: true
            }, 
            mapId:{
                type: String,
                default: 'mapId'
            }, 
            echartsId:{
                type: String,
                default: 'echartsId'
            },
            mapStyle:{
                type: String,
                default: 'width:800px; height:450px;resize:both;'
            }
        },
        data() {
            return {
                cityName: '',
                areaCode: 10000,
                geoJsonData: '',
                echartsMap: null,
                map: null,
                uimap: null,
                district: null,
                polygons: [],
                cityCode: 100000,
                citySelect: null,
                districtSelect: null,
                opts: {},
                areaData: {},
                handleEvents:{},
                mapData: [],
                mapData1:{},
                mapData2:[],
                codeList: [],
                optionMap:'',
                mapJson:{}
            }
        },
        mounted() {
            this.initMap()

        },
        watch: {
            'vMapData':function(newValue,oldValue) {
                this.mapData = newValue
                this.loadMap();
            }
        },
        methods: {
            initMap() {
                this.$nextTick(()=> {
                    this.map = new AMap.Map(this.mapId, {
                        resizeEnable: true,
                        rotateEnable:true,
                        pitchEnable:true,
                        zoom: 10,
                        pitch:50,
                        rotation:-15,
                        viewMode:'3D',//开启3D视图,默认为关闭
                        buildingAnimation:true,//楼块出现是否带动画
                        expandZoomRange:true,
                        zooms:[3,20],
                        center: [114.298572,30.584355],
                        layers: [
                            // 卫星
                            new AMap.TileLayer.Satellite(),
                            // 路网
                            new AMap.TileLayer.RoadNet()
                        ],
                    });
                    this.map.addControl(new AMap.ControlBar({
                        showZoomBar:true,
                        showControlButton:true,
                        position:{
                        right:'1px',
                        top:'100px'
                        }
                    }));
                    this.map.addControl(new AMap.Geolocation());

                    let mapType = new AMap.MapType({
                        defaultType:1, //使用2D地图
                        showRoad:true
                        });
                    this.map.addControl(mapType);
                    this.opts = {
                        subdistrict: 1,   //返回下一级行政区
                        showbiz: false  //最后一级返回街道信息
                    };
                    this.map.clearMap();  // 清除地图覆盖物
                    
                    this.mapData.forEach(marker => {
                        if(marker.longitude && marker.latitude){
                            new AMap.Marker({
                                map: this.map,
                                icon: new AMap.Icon({            
                                        image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                                        size: new AMap.Size(52, 52),  //图标大小
                                        imageSize: new AMap.Size(26,26)
                                    }),
                                position: [marker.longitude, marker.latitude],
                                offset: new AMap.Pixel(-13, -30)
                            });
                        }
                        
                    });
                    
                    this.district = new AMap.DistrictSearch(this.opts);//注意：需要使用插件同步下发功能才能这样直接使用
                    this.district.search('湖北省', (status, result) => {
                        if (status == 'complete') {
                           this.getData(result.districtList[0], '', 420000);
                        }
                    });
                    this.map.setFitView();
                });
            },
            echartsMapClick(params) {//地图点击事件
                var _self = this;
                if (params.seriesType == 'effectScatter') {
                    this.$router.push({
                        path: '/power/powerprojecttask/detail/'+ params.data.id,
                        // query: {id:params.data.id}
                    })
                    console.log(params)
                } else {
                    return
                }
            },
            loadMapData(areaCode) {
                AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {

                    //创建一个实例
                    var districtExplorer = window.districtExplorer = new DistrictExplorer({
                        eventSupport: true, //打开事件支持
                        map: this.map
                    });

                    districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {

                        if (error) {
                            console.error(error);
                            return;
                        }
                        this.mapJson.features = areaNode.getSubFeatures();
                        this.loadMap(this.cityName, this.mapJson);
                    });
                });
            },
            loadMap() {
                if(this.map){
                    this.map.clearMap();  // 清除地图覆盖物
                    
                    this.mapData.forEach(marker => {
                        if(marker.longitude && marker.latitude){
                        console.log(marker)
                        new AMap.Marker({
                            map: this.map,
                            icon: new AMap.Icon({            
                                    image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                                    size: new AMap.Size(52, 52),  //图标大小
                                    imageSize: new AMap.Size(26,26)
                                }),
                            position: [marker.longitude, marker.latitude],
                            offset: new AMap.Pixel(-13, -30)
                        });
                        }
                    });
                    this.map.setFitView();
                }
            },
            convertData(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    // var geoCoord = this.mapData1[data[i].name];
                    // if(geoCoord) {
                    //     res.push({
                    //         name: data[i].name,
                    //         value: geoCoord.concat(data[i].value),
                    //     });
                    // }
                    res.push({
                        name: data[i].name,
                        value: [data[i].longitude, data[i].latitude],
                        id:data[i].id
                    });
                }
                return res;
            },
            getData(data, level, adcode) {
                var subList = data.districtList;
                if (subList) {
                    var curlevel = subList[0].level;
                    // this.mapData = [];
                    for (var i = 0, l = subList.length; i < l; i++) {
                        var lat_lng = subList[i].center;
                        var name = subList[i].name;
                        var cityCode = subList[i].adcode;
                        this.mapData1[name] = [lat_lng.lng,lat_lng.lat]
                        // this.mapData.push({
                        //     name: name,
                        //     // value: Math.round(Math.random()*100),
                        //     level:curlevel,
                        //     cityCode: cityCode,
                        // });
                    }
                    this.loadMapData(adcode);
                }

            }
        }
    }
</script>

<style lang="css" scoped>
    .map_count {
        position: relative;
    }
    .map_title {
        position: absolute;
        left: 0;
        top:0;
        z-index:999;
    }
    .map_title span{
        display: inline-block;
    }
</style>
