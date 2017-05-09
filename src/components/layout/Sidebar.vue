<template>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">

            <!-- Sidebar user panel (optional) -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="../../assets/avatar.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>Alexander Pierce</p>
                    <!-- Status -->
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <!-- search form (Optional) -->
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>
            <!-- /.search form -->

            <!-- Sidebar Menu -->
            <ul class="sidebar-menu">
                <li class="header">HEADER</li>
                <!-- Optionally, you can add icons to the links -->
                <router-link tag="li" active-class="active" to="/dashboard">
                    <a><i class="fa fa-dashboard"></i> <span>仪表盘</span></a>
                </router-link>

                <li class="treeview" :class="{ 'active' : treeview == 'base' }">
                    <a href="#"><i class="fa fa-database"></i> <span>基础信息管理</span>
                        <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
                    </a>

                    <ul class="treeview-menu">
                        <router-link tag="li" active-class="active" to="/base/enterprise">
                            <a><i class="fa fa-building-o"></i> <span>企业基本信息</span></a>
                        </router-link>
                        <router-link tag="li" active-class="active" to="/base/factory">
                            <a><i class="fa fa-cubes"></i> <span>工厂管理</span></a>
                        </router-link>
                    </ul>
                </li>

                <li class="treeview" :class="{'active': treeview == 'promotion'}">
                    <a href="#"><i class="fa fa-ticket"></i> <span>营销活动</span>
                        <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
                    </a>
                    <ul class="treeview-menu">
                        <router-link tag="li" active-class="active" to="/promotion/prize">
                            <a><i class="fa fa-gift"></i> <span>企业奖品</span></a>
                        </router-link>
                        <router-link tag="li" active-class="active" to="/promotion/weixin">
                            <a><i class="fa fa-weixin"></i> <span>微信公众号</span></a>
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

            return {treeview: treeview}
        }
    }
</script>

