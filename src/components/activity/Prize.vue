<template>
  <div class="box">
    <div class="box-header">
      <h3 class="box-title">企业奖品</h3>
    </div>
    <div class="box-body table-responsive">
      <table id="prize" class="table table-bordered table-striped">
        <thead>
        <tr>
          <th>#</th>
          <th>奖品名称</th>
          <th>类型</th>
          <th>状态</th>
          <th>奖品名称</th>
          <th>过期时间</th>
          <th>最大面值</th>
          <th>操作</th>
        </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'prize',
    mounted: function () {
      this.$nextTick(function () {
        $('#prize').DataTable({

        });
      });
    }
  }
</script>

