<template>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Dashboard
                <small>Control panel</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Dashboard</li>
            </ol>
        </section>

        <section class="content">
            <router-view></router-view>
        </section>
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

            if (this.$route.path === '/') {
                this.$router.push('/dashboard');
            }
        }
    }
</script>
