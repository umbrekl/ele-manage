<template>
    <div class="login-wrap">
        <img :src="img" alt="">
        <el-form ref="form" :model="form"  class="form-wrap" :rules="rules" >
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" show-password placeholder="请输入密码" prefix-icon="el-icon-s-goods" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="reset" >重置</el-button>
                <el-button type="primary" @click="login" >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            img: require('@/assets/lovely.jpg'),
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        reset() {
            this.$nextTick(() => {
                this.$refs.form.resetFields()
            })
        },
        login() {
            this.$refs.form.validate(async field => {
                if (field) {
                    const { data: res } = await this.$http.post('http://127.0.0.1:8888/api/private/v1/login', this.form)
                    if (res.meta.status !== 200) {
                        this.$message.error({message: res.meta.msg})
                    }
                    sessionStorage.setItem('token', res.data.token)
                    this.$message.success({message: res.meta.msg})
                    this.$router.push({name: 'Home'})
                }
            })
        },
        getError () {
            // console.log(p)
        }
    },
    mounted () {
        // console.log(klk)
        this.getError()
    }
}
</script>

<style lang="less" scoped>
.login-wrap{
    width:500px;
    height:300px;
    border: 1px solid #000;
    margin: 200px auto 0;
    position: relative;
    box-shadow: 0 0 18px 1px #ccc;
    box-sizing: border-box;
    img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .form-wrap{
        width: 380px;
        margin:90px auto;
    }
}
</style>