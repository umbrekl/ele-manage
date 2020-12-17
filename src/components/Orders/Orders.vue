<template>
    <div class="page-wrap">
        <el-input placeholder="请输入内容" v-model="formData" class="input-with-select" >
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-table
            :data="ordersList"
            border
            style="width: 100%">
            <el-table-column type="index" >
            </el-table-column>
            <el-table-column
            prop="order_number"
            label="订单编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="order_price"
            label="订单价格"
            width="180">
            </el-table-column>
            <el-table-column
            prop="order_pay"
            label="是否付款">
            </el-table-column>
            <el-table-column
            prop="is_send"
            label="是否发货">
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="下单时间">
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formData: '',
            ordersList: [],
            pageInfo: {
                total: 0,
                pagenum: 1,
                pagesize: 10
            }
        }
    },
    methods: {
        async getOrdersList () {
            const {data: res} =await this.$http.get('http://127.0.0.1:8888/api/private/v1/orders?pagenum=' + this.pageInfo.pagenum + '&pagesize=' + this.pageInfo.pagesize)
            if( res.meta.status !== 200) {
                this.$message.error({message: res.meta.msg})
            }
            this.ordersList = res.data.goods
            this.pageInfo.total = res.data.total
        }
    },
    created () {
        this.getOrdersList()
    }
}
</script>

<style lang="less" scoped>
.page-wrap {
    background-color: #fff;
}
.input-with-select {
    width: 320px;
}
</style>