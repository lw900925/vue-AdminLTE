<template>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar Menu -->
            <ul class="sidebar-menu">
                <li class="header">HEADER</li>
                <!-- Optionally, you can add icons to the links -->
                <router-link tag="li" active-class="active" to="/dashboard">
                    <a><i class="fa fa-dashboard"></i> <span>仪表盘</span></a>
                </router-link>

                <li class="treeview" :class="{'active': treeview === 'system'}">
                    <a href="#">
                        <i class="fa fa-cogs"></i> <span>系统管理</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <router-link tag="li" active-class="active" to="/system/user">
                            <a><i class="fa fa-user"></i> <span>用户</span></a>
                        </router-link>
                        <router-link tag="li" active-class="active" to="/system/role">
                            <a><i class="fa fa-user-secret"></i> <span>角色</span></a>
                        </router-link>
                        <router-link tag="li" active-class="active" to="/system/resource">
                            <a><i class="fa fa-database"></i> <span>资源</span></a>
                        </router-link>
                    </ul>
                </li>
            </ul>
            <!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
    export default {
        data: function () {
            var treeview = null;

            // 从路由中获取当前路径
            var path = this.$route.path;

            if (path.startsWith('/')) {
                path = path.substring(1, path.length);
                treeview = path.split('/')[0];
            }

            return { treeview: treeview }
        }
    }
</script>

