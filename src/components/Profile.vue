<template>
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#preferences" data-toggle="tab">外观</a></li>
            <li><a href="#timeline" data-toggle="tab">Timeline</a></li>
            <li><a href="#settings" data-toggle="tab">Settings</a></li>
        </ul>
        <div class="tab-content">
            <div class="active tab-pane" id="preferences">
                外观
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="timeline">
                TimeLine
            </div>
            <!-- /.tab-pane -->

            <div class="tab-pane" id="settings">
                Setting
            </div>
            <!-- /.tab-pane -->
        </div>
        <!-- /.tab-content -->
    </div>
    <!-- /.nav-tabs-custom -->
</template>

<script>
    export default {
        name: "Profile",
        mounted: function () {
            this.$nextTick(function () {
                console.log(this.$route.params);
            });
        }
    }
</script>

<style scoped>

</style>
