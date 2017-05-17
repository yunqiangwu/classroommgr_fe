<template>
<div class="wrapper">
    <v-head v-on:full-screen-toggle="toggleFullScreen"></v-head>
    <v-sidebar></v-sidebar>
    <div class="content" :class="{'full-screen':fullScreen}">
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    data() {
        return {
            fullScreen: false,
        }
    },
    components: {
        vHead,
        vSidebar
    },
    methods: {
        toggleFullScreen: function(e) {
            this.fullScreen = !this.fullScreen;
        }
    }
}
</script>
