<template>
    <div v-if="!item.hidden" class="menu-wrapper">
        <router-link v-if="(!item.children || item.children.length === 0)&& item.path"
                     :to="resolvePath(item.path)">
            <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
                <i class="x-icon" v-if="item&&item.icon"
                   :style="getUrl(item.icon)"></i>
                <span v-if="item&&item.title" slot="title">{{item.title}}</span>
            </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.id||item.path">
            <template slot="title">
                <i class="x-icon" v-if="item&&item.icon" :style="getUrl(item.icon)"></i>
                <!-- <i class="x-icon" v-if="child&&child.icon" :style="getUrl(child.icon)"></i> -->
                <span v-if="item&&item.title" slot="title">{{item.title}}</span>
            </template>

            <template v-for="(child,index) in item.children" v-if="child.path">
                <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0"
                              :item="child" :key="index" :base-path="resolvePath(child.path)"></sidebar-item>

                <router-link v-else :to="resolvePath(child.path)" :key="index">
                    <el-menu-item :index="resolvePath(child.path)">
                        <!--<svg-icon v-if="child&&child.icon" :icon-class="child.icon"></svg-icon>-->
                        <!-- <span v-if="child&&child.title" slot="title" :title="child.title"><a style="width: 5px; height: 5px; background-color: #ffffff; border-radius: 50%;margin-right:3px;"></a> {{child.title}}</span> -->
                        <span v-if="child&&child.title" slot="title" :title="child.title">{{child.title}}</span>
                    </el-menu-item>
                </router-link>
            </template>
        </el-submenu>

    </div>
</template>

<script>
    import path from 'path'

    export default {
        name: 'SidebarItem',
        props: {
            // route配置json
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                onlyOneChild: null
            }
        },
        created() {
        },
        methods: {
            hasOneShowingChild(children) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // temp set(will be used if only has one showing child )
                        this.onlyOneChild = item
                        return true
                    }
                })
                return true
            },
            resolvePath(...paths) {
                return path.resolve(this.basePath, ...paths)
            },
            getUrl(img) {
                const url = "static/icon/" + img + ".png";
                const style = {
                    backgroundImage: `url(${url})`
                }
                return style;
            },
        }
    }
</script>

