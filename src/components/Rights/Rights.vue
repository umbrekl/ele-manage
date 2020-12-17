<template>
    <div>
        <el-table
            :data="RightsData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="权限名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="路径"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="权限等级">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            RightsData: []
        }
    },
    methods: {
        getRightsData () {
            // this.$http.get('rights/')
        }
    },
    mounted () {
        this.getRightsData()
    }
}
</script>