<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Page Header
        <small>Optional description</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
        <li class="active">Here</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">

      <!-- Your Page Content Here -->
      <router-view></router-view>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
  import Router from '@/router/index';

  export default {
    name: 'content',
    mounted: function () {
      // 默认跳转到dashboard
      Router.push({path: '/dashboard'});

      this.$nextTick(function () {
        $('body').removeClass('login-page').addClass('skin-blue sidebar-mini');
        if ($.AdminLTE.layout) {
            $.AdminLTE.layout.fix();
        }
      });
    }
  }
</script>
