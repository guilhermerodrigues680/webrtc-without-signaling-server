(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9a8b"],{"59a2":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Iniciador")]),n("button",{on:{click:e.initiatorCreateOffer}},[e._v("Criar oferta")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.outputOffer,expression:"outputOffer"}],attrs:{cols:"60",rows:"5"},domProps:{value:e.outputOffer},on:{input:function(t){t.target.composing||(e.outputOffer=t.target.value)}}}),n("h3",[e._v("Iniciador - Aceitar Resposta")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.inputAnswer,expression:"inputAnswer"}],attrs:{cols:"30",rows:"10"},domProps:{value:e.inputAnswer},on:{input:function(t){t.target.composing||(e.inputAnswer=t.target.value)}}}),n("button",{on:{click:e.acceptAnswer}},[e._v("Aceita Resposta")]),n("h2",[e._v("chat")]),n("Chat",{attrs:{messageHistory:e.messageHistory},on:{"send-msg":e.sendMessage}})],1)},s=[],a=n("1da1"),i=(n("96cf"),n("e6b0")),o=n("1bb7"),u={name:"Initiator",components:{Chat:i["a"]},data:function(){return{outputOffer:"",inputAnswer:"",messageHistory:[]}},created:function(){var e=this;o["b"].addEventListener(o["a"].message,(function(t){return e.messageReceived(t.detail.data)}))},methods:{initiatorCreateOffer:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["d"])();case 2:t=e.sent,this.outputOffer=JSON.stringify(t);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),acceptAnswer:function(){Object(o["g"])(JSON.parse(this.inputAnswer))},sendMessage:function(e){Object(o["c"])(e),this.messageHistory.push(e)},messageReceived:function(e){this.messageHistory.push(e),console.log("Mensagem recebida:",e)}}},c=u,p=n("2877"),f=Object(p["a"])(c,r,s,!1,null,null,null);t["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2d0c9a8b.dcf3e0e3.js.map