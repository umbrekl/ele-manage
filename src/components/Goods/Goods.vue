<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入搜索内容" v-model="pageInfo.query" clearable>
                    <el-button @click="queryBtn" slot="append" icon="el-icon-search" ></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="addUsers" type="primary">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="goodsList"
            border
            style="width: 100%">
            <el-table-column
            prop="goods_name"
            label="商品名称"
            width="480">
            </el-table-column>
            <el-table-column
            prop="goods_price"
            label="商品价格（元）"
            width="180">
            </el-table-column>
            <el-table-column
            prop="goods_weight"
            label="商品重量">
            </el-table-column>
            <el-table-column
            prop="add_time"
            label="创建时间">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" @click="deleteRow(scope.row.id)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-wrap" >
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfo.pagenum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!--添加用户-->
        <el-dialog :title="type === 'add' ? '添加用户' : '编辑用户'" :visible.sync="dialogFormVisible" @close="addDialogClosed" >
            <el-form :model="addForm" ref="addFormRef" >
                <el-form-item label="用户名称" label-width="80px" prop="username" >
                    <el-input v-model="addForm.username" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item v-show="type === 'add'" label="用户密码" label-width="80px" prop="password" >
                    <el-input v-model="addForm.password" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px" prop="email" >
                    <el-input v-model="addForm.email" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="80px" prop="mobile" >
                    <el-input v-model="addForm.mobile" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogBtnOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            goodsList: [],
            pageInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10,
            },
            total: 0,
            dialogFormVisible: false,
            addForm: {},
            type: ''// add 增加 edit 编辑
        }
    },
    methods: {
        async getGoodsList () {
            const {data: res} = await this.$http.get('http://127.0.0.1:8888/api/private/v1/goods', {params: this.pageInfo})
            if(res.meta.status !== 200) return this.$message.error({message: res.meta.msg})
            this.goodsList = res.data.goods
            this.total = res.data.total
        },
        deleteRow (id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.deleteUsers(id)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })      
            })
        },
        async deleteUsers (id) {
            const {data: res} =await this.$http.delete('http://127.0.0.1:8888/api/private/v1/users/' + id)
            if (res.meta.status !== 200) {
                this.$message.error(res.meta.msg)
            }
            this.$message.success(res.meta.msg)
            this.getusersList()
        },
        addUsers () {
            // 添加数据
            this.type = 'add'
            this.dialogFormVisible = true
        },
        editClick (row) {
            // 编辑数据
            this.type = 'edit'
            this.addForm = row
            this.dialogFormVisible = true
        },
        dialogBtnOk () {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                if (this.type === 'add') {
                    const {data: res} =await this.$http.post('http://127.0.0.1:8888/api/private/v1/users', this.addForm)
                    if (res.meta.status !== 201) {
                        this.$message.error('添加用户失败！')
                    }
                    this.$message.success('添加用户成功！')
                }else{
                    const {data: res} =await this.$http.put('http://127.0.0.1:8888/api/private/v1/users/' + this.addForm.id, {
                        email: this.addForm.email,
                        mobile: this.addForm.mobile
                    })
                    if (res.meta.status !== 200) {
                        this.$message.error('编辑用户失败！')
                    }
                    this.$message.success('编辑用户成功！')
                }
                this.dialogFormVisible = false
                this.getusersList()
            })
        },
        addDialogClosed () {
            this.$refs.addFormRef.resetFields()
        },
        handleCurrentChange (val) {
            console.log('20201130 16:00 111', val)
        },
        handleSizeChange (val) {
            console.log('20201130 16:00 222', val)
        },
        queryBtn () {
            // 搜索
            this.$http
        }
    },
    created () {
        this.getGoodsList()
    }
}
</script>

<style lang="less" scoped>
.page-wrap{
    background-color: #fff;
    width: 100%;
    margin: 5px auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>