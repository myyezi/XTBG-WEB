<template>
    <div class="block">
        <el-cascader
            :options="options"
            v-model="cityId"
            :props="{checkStrictly: true }"
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
                    value: "id",
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
                ajax.get("upms/dict/cityTreeNodeNow").then(res => {
                    var newResult = [];
                    res.data.forEach(function (bean) {
                        if (bean.id) {
                            var data = {
                                value: bean.id,
                                label: bean.label,
                                children: bean.children
                            }
                            newResult.push(data);
                        }
                    });
                    this.options = newResult;
                })
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
