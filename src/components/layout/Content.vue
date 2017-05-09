<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <router-view></router-view>
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
  export default {
    name: 'content',
    mounted: function () {
      this.$nextTick(function () {
        $('body').removeClass('login-page').addClass('skin-blue sidebar-mini');
        if ($.AdminLTE.layout) {
            $.AdminLTE.layout.fix();
        }
      });

      if (this.$route.path == '/') {
        this.$router.push('/dashboard');
      }
    }
  }
</script>
