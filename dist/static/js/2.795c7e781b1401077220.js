webpackJsonp([2],{"+cgv":function(t,e){},"3YMJ":function(t,e){},"3f40":function(t,e){},"4qOc":function(t,e){},DdHg:function(t,e){},aSLi:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Xxa5"),o=r.n(n),i=r("woOf"),s=r.n(i),l=r("exGp"),a=r.n(l),c=(r("3f40"),r("4qOc"),r("+cgv"),{render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("quill-editor",{ref:"myTextEditor",attrs:{options:t.editorOption},on:{change:t.onChange},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)},staticRenderFns:[]});var u={components:{customQuillEditor:r("VU/8")({props:["defaultContent"],data:function(){return{content:"",editorOption:{}}},methods:{onChange:function(t){t.quill;var e=t.html;t.text,this.content=e,this.$emit("passTextContent",{content:e})}},computed:{editor:function(){return this.$refs.myTextEditor.quill}},mounted:function(){this.content=this.defaultContent},watch:{content:function(t,e){this.editor&&t!==this.content&&(this.content=t)}}},c,!1,function(t){r("3YMJ")},null,null).exports},data:function(){return{id:this.$route.query.id||"",isShowRichTextEditor:!1,editorOption:{},ruleForm:{title:"",description:"",type:"技术",creative:!1,content:""},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],type:[{required:!0,message:"请选择博客类型",trigger:"change"}]}}},methods:{getRichTextGoodsInfo:function(t){this.ruleForm.content=t.content},save:function(){var t=this;return a()(o.a.mark(function e(){var r,n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=s()({id:t.id},t.ruleForm),e.next=3,t.$ajax.post("/api/save",r);case 3:0==(n=e.sent).error&&(t.$message.success(n.msg),t.$router.push({name:"我的博客"}));case 5:case"end":return e.stop()}},e,t)}))()},getInfo:function(t){var e=this;return a()(o.a.mark(function r(){var n,i;return o.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n=s()({},{id:t}),r.next=3,e.$ajax.get("/api/getInfo",n);case 3:0==(i=r.sent).error&&(e.isShowRichTextEditor=!0,e.ruleForm=i.data,1==e.ruleForm.creative?e.ruleForm.creative=!0:e.ruleForm.creative=!1);case 5:case"end":return r.stop()}},r,e)}))()},submitForm:function(t){var e=this;this.ruleForm.content?this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;e.save()}):this.$message.error("大爷，您还没写博客呢")},resetForm:function(){this.$router.push({name:"我的博客",params:{}})}},mounted:function(){this.id?this.getInfo(this.id):this.isShowRichTextEditor=!0}},m={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mod-block"},[r("el-form",{ref:"ruleForm",staticClass:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title",e)},expression:"ruleForm.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"描述"}},[r("el-input",{model:{value:t.ruleForm.description,callback:function(e){t.$set(t.ruleForm,"description",e)},expression:"ruleForm.description"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"文章类型",prop:"type"}},[r("el-select",{attrs:{placeholder:"请选择博客类型"},model:{value:t.ruleForm.type,callback:function(e){t.$set(t.ruleForm,"type",e)},expression:"ruleForm.type"}},[r("el-option",{attrs:{label:"技术",value:"技术"}}),t._v(" "),r("el-option",{attrs:{label:"文学",value:"文学"}})],1)],1),t._v(" "),r("el-form-item",{attrs:{label:"是否原创"}},[r("el-switch",{model:{value:t.ruleForm.creative,callback:function(e){t.$set(t.ruleForm,"creative",e)},expression:"ruleForm.creative"}})],1),t._v(" "),r("el-col",{attrs:{span:22,offset:1}},[t.isShowRichTextEditor?r("custom-quill-editor",{attrs:{defaultContent:t.ruleForm.content,id:"pcGoodsInfoId"},on:{passTextContent:t.getRichTextGoodsInfo}}):t._e()],1),t._v(" "),r("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:18}},[r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("提交")]),t._v(" "),r("el-button",{on:{click:function(e){t.resetForm()}}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var d=r("VU/8")(u,m,!1,function(t){r("DdHg")},"data-v-089469e1",null);e.default=d.exports}});
//# sourceMappingURL=2.795c7e781b1401077220.js.map