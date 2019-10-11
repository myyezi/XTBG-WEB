<template>
    <div class="app-wrapper" :class="classObj">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container" :sidebarColor="sidebarColor" :logColor="logColor"></sidebar>
        <div class="main-container">
            <navbar @childByValue="childByValue"></navbar>
            <tags-view></tags-view>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
    import {Navbar, Sidebar, AppMain, TagsView} from './components'
    import ResizeMixin from './mixin/ResizeHandler'

    export default {
        name: 'layout',
        data(){
            return {
                sidebarColor:'#1d9389',
                logColor:'#24bbae '
            }
        },
        components: {
            Navbar,
            Sidebar,
            TagsView,
            AppMain
        },
        mixins: [ResizeMixin],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('CloseSideBar', {withoutAnimation: false})
            },
            // 得到子组件回调事件
            childByValue(data) {
                console.log(data)
                this.sidebarColor = data.sidebarColor
                this.logColor = data.logColor
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
