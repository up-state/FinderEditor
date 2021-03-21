<template>
  <el-menu
    id="sidebar-navigation-left"
    background-color="#021343"
    color="white"
    active-text-color="#fff400"
  >
    <img src="@/assets/logo.png" id="logo" />
    <el-menu-item class="nav-btn" index="1">
      <i class="el-icon-shopping-bag-2"></i>
    </el-menu-item>
    <el-menu-item class="nav-btn" index="2">
      <i class="el-icon-folder"></i>
    </el-menu-item>
    <el-menu-item class="nav-btn" index="3">
      <i class="el-icon-delete-solid"></i>
    </el-menu-item>
    <el-menu-item class="nav-btn" index="4">
      <i class="el-icon-setting"></i>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component()
export default class SidebarNavigation extends Vue {}
</script>

<style scoped type="scss">
#logo {
  width: 100%;
  margin-bottom: 3em;
}
#sidebar-navigation-left {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 2em;
  padding: 10px;
}

.nav-btn {
  color: #dfefff;
  padding: 0px !important;
}
</style>
