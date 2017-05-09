<template>
  <section class="content-header">
    <h1>
      {{ header }}
      <small>{{ description }}</small>
    </h1>
    <!--<ol class="breadcrumb">
      <li v-for="(item, index) in breadcrumb.parents">
        <a href="javascript: void(0)" v-if="index == 0"><i :class="breadcrumb.icon"></i>{{ item }}</a>
        <a href="javascript: void(0)" v-else>{{ item }}</a>
      </li>
      <li class="active">{{ header }}</li>
    </ol>-->
  </section>
</template>

<script>
  export default {
    name: 'content-header',
    props: {
      header: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {};
    }
  }
</script>
