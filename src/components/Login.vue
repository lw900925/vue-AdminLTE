<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="javascript: void(0)"><b>Admin</b>LTE</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">登录后开始会话</p>

      <form action="javascript: void(0)" method="post">
        <div class="form-group has-feedback">
          <input type="email" class="form-control" v-model="email" placeholder="电子邮箱">
          <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" v-model="password" placeholder="密码">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <label>
              <input type="checkbox"> 记住我
            </label>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat" v-on:click="login()">登录</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <div class="social-auth-links text-center">
        <a href="javascript: void(0)" class="btn btn-block btn-social btn-linkedin btn-flat"><i
          class="fa fa-linkedin"></i> 使用LinkedIn登陆</a>
        <a href="javascript: void(0)" class="btn btn-block btn-social btn-github btn-flat"><i class="fa fa-github"></i>
          使用GitHub登陆</a>
      </div>
      <!-- /.social-auth-links -->

      <a href="javascript: void(0)">忘记密码</a><br>
      <a href="javascript: void(0)" class="text-center">注册新用户</a>

    </div>
    <!-- /.login-box-body -->
  </div>
</template>

<script>
  import Router from '@/router/index';

  export default {
    name: 'login',
    data: function () {
      return { email: 'lw900925@163.com', password: '123456' }
    },
    mounted: function () {
      this.$nextTick(function () {
        // iCheck plugin
        $('input[type="checkbox"]').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });

        // 修改body样式
        $('body').removeClass('skin-blue sidebar-mini').addClass('login-page');
      });
    },
    methods: {
      login: function () {
        console.log('--- Login info ---');
        console.log('Email: ' + this.email);
        console.log('Password: ' + this.password);

        sessionStorage.setItem('TOKEN', new Date().getTime());

        Router.push({path: '/dashboard'});
      }
    }
  }
</script>
