<template>
    <div class="map">
        <div class="search">
            <div id="r-result">
                <!--<p>搜索定位:</p>-->
                <el-input type="text" v-model="location.address" id="suggestId" placeholder="请输入位置搜索" maxlength="200"/>
            </div>
            <div class="lng-lat">
                <div class="item">
                    <!--<p>当前经度:</p>-->
                    <el-input v-model="location.lng" />
                </div>
                <div class="item">
                    <!--<p>当前纬度:</p>-->
                    <el-input v-model="location.lat" />
                </div>
                <div class="item btn">
                    <button @click="selectLocation">确定</button>
                </div>
            </div>
        </div>
        <div id="map-core" style="height: 600px"></div>
    </div>
</template>

<script>
    /* eslint-disable */
    import BMap from 'BMap'

    export default {
        props:['addressDetail'],
        data() {
            return {
                location: {
                    lng: '',
                    lat: '',
                    address: '',
                    province:'',
                    city:'',
                    district:''
                },
                map: {},
                ac: {}
            }
        },
        mounted() {
            this.setMap()
        },
        methods: {
            // 初始化地图
            setMap() {
                this.map = new AMap.Map('map-core', {
                    zoom: 10,
                    center: [114.417708, 30.462667]
                })
                // 注入插件（定位插件，地理编码插件）
                this.map.plugin(['AMap.Geolocation', 'AMap.Geocoder'])

                // 绑定地图单击事件
                this.map.on('click', this.mapOnClick)
                this.setSearch()
                if(this.addressDetail.address) {
                    this.getInitialization(this.addressDetail)
                }
            },
            // 地图点击事件
            mapOnClick (ev) {
                let position = [ev.lnglat.lng, ev.lnglat.lat] // 鼠标点击的坐标
                this.location.lng = parseFloat(ev.lnglat.lng).toFixed(6);
                this.location.lat = parseFloat(ev.lnglat.lat).toFixed(6);
                this.updataMap()
            },
            // 根据经纬度绘制地图中的坐标点
            drawLocation() {
                if (this.location.lng !== "" && this.location.lat !== "") {
                    this.updataMap()
                }
            },
            // 搜索位置功能实现
            setSearch() {
                const _this = this
                //建立一个自动完成的对象
                this.map.plugin('AMap.Autocomplete', () => {
                    // 实例化Autocomplete
                    let autoOptions = {
                        input: "suggestId"
                    };
                    let autoComplete = new AMap.Autocomplete(autoOptions);
                    // 开始搜索
                    autoComplete.search(this.location.address, (status, result) => {
                        // 搜索成功时，result即是对应的匹配数据
                        if(result.info === 'OK') {
                            
                        }
                    })
                    AMap.event.addListener(autoComplete, 'select', function(e){
                        console.log(e.poi)
                        let _value = e.poi
                        // let myValue = _value.district + _value.address
                        // _this.location.address = myValue
                        _this.location.lng = _value.location.lng
                        _this.location.lat = _value.location.lat
                        // _this.map.setZoomAndCenter(13,[_this.location.lng,_this.location.lat]);
                        // _this.addMark(_this.map, [_this.location.lng,_this.location.lat])
                    })
                })
            },
            // 添加标记
            addMark (map, points) {
                map.clearMap();
                let marker = new AMap.Marker({
                    map: map,
                    position: points,
                    // draggable: true, // 允许拖动
                    // cursor: 'move',
                    // raiseOnDrag: true
                })
                marker.on('dragend', (e) => {
                    let position = marker.getPosition()
                    // 存下坐标与地址
                    // this.getAddress([position.lng, position.lat])
                })
            },
            // 根据坐标返回地址(逆地理编码)
            getAddress (points) {
                let geocoder = new AMap.Geocoder({ radius: 1000 })
                geocoder.getAddress(points, (status, result) => {
                    if (status === 'complete' && result.regeocode) {
                        console.log(result.regeocode)
                        this.location.address = result.regeocode.formattedAddress
                        this.location.province = result.regeocode.addressComponent.province
                        this.location.city = result.regeocode.addressComponent.city
                        this.location.district = result.regeocode.addressComponent.district
                        this.setSearch()
                    }
                })
            },
            updataMap() {
                this.getAddress([this.location.lng, this.location.lat])
                this.map.setZoomAndCenter(13,[this.location.lng,this.location.lat]);
                this.addMark(this.map, [this.location.lng,this.location.lat])
            },
            getInitialization(val) {
                this.location.address = val.address
                this.location.lng = val.longitude
                this.location.lat = val.latitude
                this.map.setZoomAndCenter(13,[this.location.lng,this.location.lat]);
                this.addMark(this.map, [this.location.lng,this.location.lat])
            },
            // 向父组件传递经纬度
            selectLocation() {
                this.$emit('selectLocation', this.location)
            }
        },
        watch: {
            'location.lng': {
                handler() {
                    this.drawLocation()
                },
                deep: true
            },
            'location.lat': {
                handler() {
                    this.drawLocation()
                },
                deep: true
            },
            addressDetail(val) {
                this.getInitialization(val)
            }
        }
    }
</script>

<style>
    .map {
        width: 100%;
        height: 100%;
        font-size: 14px;
    }

    .map #map-core {
        width: 100%;
        height: 90%;
    }

    .map .search {
        display: flex;
        margin-top: 10px;
        height: 40px;
    }

    .map .search #r-result {
        display: flex;
        width: 60%;
        height: 28px;
        line-height: 28px;
    }

    .map .search #r-result p {
        height: 28px;
        padding-right: 10px;
    }

    .map .search #r-result input {
        width: 100%;
        height: 28px;
    }

    .map .search .lng-lat {
        width: 40%;
        display: flex;
    }

    .map .search .lng-lat .item {
        display: flex;
        padding-left: 10px;
        height: 28px;
        line-height: 28px;
    }

    .map .search .lng-lat .item p {
        height: 28px;
        padding-right: 10px;
    }

    .map .search .lng-lat .item input {
        width: 100%;
        height: 28px;
    }

    .map .search .lng-lat .item button {
        color: #fff;
        height: 28px;
        width: 60px;
        background: #40B0FF;
        border: 1px solid #40B0FF;
        border-radius: 2px;
    }

    .map .search .lng-lat .item button:hover {
        background: #10B0FF;
        border: 1px solid #10B0FF;
        cursor: pointer;
    }

    .amap-sug-result {
        z-index: 9999999999;
    }
</style>
