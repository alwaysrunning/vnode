<template>
    <div>
        <quill-editor v-model="content"
                     ref="myTextEditor"
                     :options="editorOption"
                     @change="onChange"
                     >
        </quill-editor>
    </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    props:['defaultContent'],
    data() {
        return {
            content:'',
            editorOption: {

            },
        }
    },
    methods: {

        onChange({ quill, html, text }){
            this.content = html
            this.$emit('passTextContent', {content:html});
        },


    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quill;
        }
    },
    mounted(){
        this.content = this.defaultContent;
    },
    watch: {
        'content'(newVal, oldVal) {
            if (this.editor) {
                if (newVal !== this.content) {
                    this.content = newVal
                }
            }
        },
    }
}
</script>
<style>
.ql-editor{
    height:400px
}
.ql-container{
    height: 300px;
}
</style>
