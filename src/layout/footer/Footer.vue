<template>
  <div class="footer-inf clearfix">
    <p class="system-inf">
      <span>上次登录时间: 2018-12-18 11:28:11</span>
      <span>内存:<span class="ram-use">517.1MB</span> / <span>3531MB</span></span>
    </p>
    <p class="copyright-inf">
      <span>Copyright © 2018</span>
      <a href="http://www.whcxbd.com/" target="_blank">信息技术有限公司</a>
      <span>. All rights reserved.</span>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'Footer',
    data() {
      return {
        numberValidateForm: {
          age: ''
        }
      };
    },
    methods: {
      hideChat() {
        this.$refs.mychild.hideChat();
      }
    }
  }
</script>


<style scoped>
  .footer-inf {
    font-size: 14px;
    color: #999;
  }

  .system-inf {
    float: left;
    margin: 0;
    text-align: left;
  }

  .ram-use {
    color: inherit;
  }

  .system-inf>span {
    margin-right: 20px;
  }

  .copyright-inf {
    float: right;
    margin: 0;
    text-align: right;
  }

  .copyright-inf a {
    color: inherit;
    text-decoration: none;
  }
</style>