(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"BA+P":function(t,s,e){"use strict";e.r(s);var i={components:{Card:()=>Promise.all([e.e(0),e.e(145)]).then(e.bind(null,"ro2s"))},props:{post:{type:Object,required:!0}}},a=(e("bXJv"),e("KHd+")),o=Object(a.a)(i,(function(){var t=this,s=t._self._c;return s("Card",{staticClass:"blog-posts__post",attrs:{link:t.post.path,image:t.post.image}},[!t.post.image|"null"==t.post.image?s("div",{staticClass:"icon"},[t.post.emoji?s("p",[t._v(t._s(t.post.emoji))]):s("i",{class:t.post.icon})]):t._e(),s("h3",{directives:[{name:"g-image",rawName:"v-g-image"}],domProps:{innerHTML:t._s(t.post.title)}}),t.post.headings.length?s("ul",t._l(t.post.headings,(function(e){return s("li",{key:e.id},[s("g-link",{attrs:{to:t.post.path.slice(0,-1)+e.anchor}},[t._v(t._s(e.value))])],1)})),0):s("div",[t._v(t._s(t.post.description))]),s("div",{staticClass:"tags"},t._l(t.post.tags,(function(e){return s("g-link",{key:e.id,staticClass:"tag",attrs:{to:e.path}},[t._v(t._s(e.title))])})),1),s("div",{staticClass:"date"},[t._v("\n    "+t._s(new Date(t.post.date).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"}))+"\n  ")])])}),[],!1,null,"d9c8591e",null);s.default=o.exports},JuV1:function(t,s,e){},bXJv:function(t,s,e){"use strict";e("JuV1")}}]);