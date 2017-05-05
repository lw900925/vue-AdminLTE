<template>
  <div id="app">

    <!-- Vue多试图列表 -->
    <router-view name="header"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
    <router-view name="controlSidebar"></router-view>

    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted: function () {
      this.$nextTick(function () {
        if ($.AdminLTE.layout) {
            $.AdminLTE.layout.fix();
        }
      });
    }
  }
</script>

<style>

</style>
