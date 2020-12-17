<template>
    <div>
        <el-button type="primary" >添加角色</el-button>
        <div>
            <el-table
                :data="rolesData"
                border
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope" v-if="scope.row.children.length > 0" >
                        <el-row  v-for="item in scope.row.children" :key="item.id" >
                            <el-col closable :span="5">
                                <el-tag class="mt20" >{{item.authName}}</el-tag>
                            </el-col>
                            <el-col :span="19" v-if="item.children.length > 0"  >
                                <el-row v-for="item2 in item.children" :key="item2.id" >
                                    <el-col :span="6" >
                                        <el-tag class="mt20" closable type="success" >{{item2.authName}}</el-tag>
                                    </el-col>
                                    <el-col :span="18" v-if="item2.children.length > 0">
                                        <el-tag class="mt20" closable type="warning" v-for="itemthree in item2.children" :key="itemthree.id" >{{itemthree.authName}}</el-tag>                                         
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column
                prop="roleName"
                label="角色名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="roleDesc"
                label="角色描述"
                width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope" >
                        <el-button size="mini" @click="editClick(scope.row)" >编辑</el-button>
                        <el-button size="mini" @click="editClick(scope.row)" >删除</el-button>
                        <el-button size="mini" @click="editClick(scope.row)" >分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
export default {
    data () {
        return {
            rolesData: [],
            pageInfo: {
                pagenum: 1,
                pagesize: 10
            },
            total: 0
        }
    },
    methods: {
        editClick () {

        },
        deleteRow () {

        },
        handleSizeChange () {

        },
        handleCurrentChange () {

        },
        async getRolesList () {
            const {data: res} =await this.$http.get('http://127.0.0.1:8888/api/private/v1/roles')
            if (res && res.meta.status !== 200) {
                this.$message.error({message: res.meta.msg})
            }
            this.rolesData = res.data
        }
    },
    mounted () {
        this.getRolesList()
    }
}
</script>

<style lang="less" scoped>
.mt20{
    margin-top: 20px;
}
</style>