<template>
    <el-container class="home-container">
        <el-header>
            <p>卖伞的</p>
            <div>
                <el-button @click="loginOut" type="primary">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside  class="menu-wrap" >
                <el-menu
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b" router >
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="'/' + key.path"  v-for="key in item.children" :key="key.id">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{key.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            menuList: []
        }
    },
    methods: {
        loginOut () {
            sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenuList () {
            const {data: res} =await this.$http.get('http://127.0.0.1:8888/api/private/v1/menus')
            if(res.meta.status !== 200){
                this.$message.error({message: res.meta.msg})
            }
            this.menuList = res.data
        }
    },
    created () {
        this.getMenuList()
    }
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
}
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #373d41;
    color: #fff;
    text-align: center;
    font-size: 20px;
    padding: 0 100px;
}
  
.el-aside {
    background-color: #333744;
    color: #333;
    text-align: center;
}
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>