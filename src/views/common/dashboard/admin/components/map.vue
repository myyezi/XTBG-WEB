
<template>
    <div class="map_count">
        <div class="map_title"><span>湖北省</span></div>
        <div class="map">
            <div id="container"></div>
        </div>
        <div class="echarts">
            <div id="map" style="height:400px"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        components: {},
        props:['vMapData'],
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
                if(this.mapJson.features) {
                    this.loadMap(this.cityName, this.mapJson);
                }
            }
        },
        methods: {
            initMap() {
                this.$nextTick(()=> {
                    this.map = new AMap.Map('container', {
                        resizeEnable: true,
                        center: [116.30946, 39.937629],
                        zoom: 3
                    });
                    this.opts = {
                        subdistrict: 1,   //返回下一级行政区
                        showbiz: false  //最后一级返回街道信息
                    };
                    this.district = new AMap.DistrictSearch(this.opts);//注意：需要使用插件同步下发功能才能这样直接使用
                    /*this.district.search('中国', (status, result) => {
                        if (status == 'complete') {
                            console.log("#################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
                            console.log(result)
                            this.getData(result.districtList[0], '', 100000);
                        }
                    });*/
                    this.district.search('湖北省', (status, result) => {
                        if (status == 'complete') {
                            this.getData(result.districtList[0], '', 420000);
                        }
                    });
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
            loadMap(mapName, data) {
                echarts.init(document.getElementById('map')).dispose()
                this.echartsMap = echarts.init(document.getElementById('map'));
                this.echartsMap.clear();
                this.echartsMap.on('click', this.echartsMapClick);
                let that = this
                if (data) {
                    echarts.registerMap(mapName, data);
                    var option = {
                        tooltip : {
                            trigger: 'item', 
                            formatter:function(params, ticket, callback){
                                if(params.seriesType=="effectScatter") {
                                    return params.data.name;
                                }
                            } 
                        },
                        geo: {
                            show: true,
                            map: mapName,
                            roam:true,
                            zoom:1.3,
                            aspectScale:1,
                            label: {
                                normal: {
                                    show: true
                                },
                                emphasis: {
                                    show: true,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: '#ebebeb',
                                    borderColor: '#fff',
                                },
                                emphasis: {
                                    areaColor: '#caf1ef',
                                }
                            }
                        },
                        series: [
                            {
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                data: that.convertData(that.mapData),
                                symbolSize: function(val) {
                                    return val[2] / 10;
                                },
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: false
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#05C3F9'
                                    }
                                }
                            },
                            {
                                type: 'map',
                                mapType: mapName,
                                geoIndex: 0,
                                zoom:1,
                                // roam:true,
                                
                                data: this.mapData,
                            },
                            {
                                name: '',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: this.convertData(this.mapData.slice().sort(function(a, b) {
                                    return b.value - a.value;
                                })),
                                symbolSize: function(val) {
                                    return 8;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: false
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#246a73',
                                        shadowBlur: 10,
                                        shadowColor: '#246a73'
                                    }
                                },
                                zlevel: 1
                            },
                        ]
                    };
                    this.optionMap = option
                    this.echartsMap.setOption(option);
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
