<template>
    <div id="monaco"></div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
export default {
    data () {
        return {
            monacoInstance: ''
        }
    },
    mounted () {
        this.monacoInstance = monaco.editor.create(document.getElementById("monaco"),{
            value:`console.log("hello,world")`,
            language:"javascript"
        })
        
    },
    destroyed () {
        this.monacoInstance.dispose();//使用完成销毁实例
    }
}
</script>

<style lang="less" scoped>
#monaco{
    background-color: burlywood;
    height:500px;
}
</style>