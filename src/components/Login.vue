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
                    <input type="text" class="form-control" v-model="username" placeholder="用户名 / 电子邮箱">
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
                        <button type="submit" class="btn btn-primary btn-block btn-flat" @click="login()">登录</button>
                    </div>
                    <!-- /.col -->
                </div>
            </form>

            <div class="social-auth-links text-center">
                <a href="javascript: void(0)" class="btn btn-block btn-social btn-linkedin btn-flat"><i
                    class="fa fa-linkedin"></i> 使用LinkedIn登陆</a>
                <a href="javascript: void(0)" class="btn btn-block btn-social btn-github btn-flat"><i
                    class="fa fa-github"></i>
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
    import Constants from '@/utils/constants'

    export default {
        name: 'login',
        data: function () {
            return {username: "", password: ""}
        },
        mounted: function () {
            this.$nextTick(function () {
                // iCheck plugin
                var icheck = $('input[type="checkbox"]').iCheck({
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
                const params = {
                    scope: Constants.api.oauth2.scope,
                    grant_type: "password",
                    username: this.username,
                    password: this.password
                };

                this.$http.post(Constants.api.oauth2.tokenURI, params, {
                    auth: {
                        username: Constants.api.oauth2.clientId,
                        password: Constants.api.oauth2.clientSecret
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    transformRequest: function (data, headers) {
                        return Object.keys(data).map(function (key) {
                            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
                        }).join("&");
                    }
                }).then(response => {
                    // 将登录信息存储到cookie中
                    const access_token = response.data[Constants.api.tokenKey];
                    this.$cookies.set(Constants.api.tokenKey, access_token, 0)

                    // 登录完成后跳转
                    let redirect = '/dashboard';
                    if (this.$route.query.redirect) {
                        redirect = this.$route.query.redirect;
                    }
                    this.$router.push(redirect);
                });
            }
        }
    }
</script>
