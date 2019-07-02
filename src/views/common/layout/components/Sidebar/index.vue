<template>
    <div>
        <div class="logo" :style="{'background-color':logColor}"></div>
        <el-scrollbar wrapClass="scrollbar-wrapper">
            <el-menu
                :router="true"
                mode="vertical"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
                :background-color="sidebarColor"
                text-color="rgb(191, 203, 217)"
                active-text-color="#fff">
                <sidebar-item v-for="(route,index) in menu" :key="index" :item="route"
                              :base-path="route.path"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import SidebarItem from './SidebarItem'

    export default {
        props: ['sidebarColor','logColor'],
        components: {SidebarItem},
        computed: {
            ...mapGetters([
                'menu',
                'sidebar'
            ]),

            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>
