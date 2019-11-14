<template>
    <div class="block">
        <el-cascader
            :options="options"
            v-model="cityId"
            clearable
            @change="handleChange">
        </el-cascader>
    </div>
</template>

<script>
    import ajax from '@/utils/request'

    export default {
        name: 'city-select',
        props: {
            disabled: Boolean,
            value: null,
        },
        watch: {
            value: {
                handler(curVal=[], oldVal) {
                    if (JSON.stringify(curVal) === JSON.stringify(oldVal)) {
                        return
                    }
                    this.cityId = curVal;
                },
                immediate: true,
                deep: true
            }
        },
        data() {
            return {
                options: [],
                cityId: [],
                props: {
                    value: "value",
                    label: "label"
                }
            };
        },
        mounted() {
            this.loadCitySelect();
        },
        methods: {
            handleChange(value) {
                this.$emit("update:value", this.cityId);
                this.$emit("input", this.cityId);
                this.$emit("change", this.cityId);
            },
            loadCitySelect() {
                ajax.get("upms/amapdistrict/getAmapDistrictTree").then(res => {
                    var newResult = [];
                    // res.data.forEach(function (bean) {
                    //     if (bean.id) {
                    //         var data = {
                    //             value: bean.id,
                    //             label: bean.label,
                    //             children: bean.children
                    //         }
                    //         newResult.push(data);
                    //     }
                    // });
                    this.options = this.getTreeData(res.data);
                })
            },
            // 递归判断列表，把最后的children设为undefined
            getTreeData(data){
                for(var i=0;i<data.length;i++){
                    if(data[i].children.length<1){
                        // children若为空数组，则将children设为undefined
                        data[i].children=undefined;
                    }else {
                        // children若不为空数组，则继续 递归调用 本方法
                        this.getTreeData(data[i].children);
                    }
                }
                return data;
            }
        },
    }
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
