(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{"20R5":function(e,t,s){},O70Z:function(e,t,s){"use strict";s.r(t);s("ZV3c");var i=s("KHd+"),r=Object(i.a)({},(function(){var e=this._self._c;return e("div",{staticClass:"logo"},[e("g-link",{staticClass:"logo__link",attrs:{to:"/",title:"Back to home"}},[e("g-image",{staticClass:"logo__svg",attrs:{src:s("m/dX"),alt:"TestAutomation.Space"}})],1)],1)}),[],!1,null,"54faaab3",null).exports,a=s("vDqi"),l=s.n(a),n={created(){l()("/search.json").then(e=>{this.posts=e.data}).catch(e=>{console.log(e)})},data:()=>({query:"",results:[],posts:[],highlightedIndex:0,searchResultsVisible:!1,options:{shouldSort:!0,includeMatches:!0,matchAllTokens:!0,findAllMatches:!0,threshold:.1,location:0,distance:1e4,maxPatternLength:32,minMatchCharLength:1,keys:["title","content","category","description"]}}),methods:{blur(){this.query="",this.searchResultsVisible=!1},reset(){this.query="",this.highlightedIndex=0},softReset(){this.highlightedIndex=0,this.searchResultsVisible=!0},performSearch(){this.$search(this.query,this.posts,this.options).then(e=>{this.results=e})},highlightPrev(){this.highlightedIndex>0&&(this.highlightedIndex=this.highlightedIndex-1,this.scrollIntoView())},highlightNext(){this.highlightedIndex<this.results.length-1&&(this.highlightedIndex=this.highlightedIndex+1,this.scrollIntoView())},scrollIntoView(){this.$refs.results.children[this.highlightedIndex].scrollIntoView({block:"nearest"})},gotoLink(){this.results[this.highlightedIndex]&&(window.location=this.results[this.highlightedIndex].item.path)},focusSearch(e){"/"===e.key&&this.$refs.search.focus()}}},h=(s("YfXz"),{components:{Logo:r,Search:Object(i.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"header-search"},[t("form",{staticClass:"header-search"},[t("label",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],ref:"search",staticClass:"header-search__input",attrs:{type:"search",title:"Search",placeholder:"Search..."},domProps:{value:e.query},on:{blur:e.blur,focus:function(t){e.searchResultsVisible=!0},input:[function(t){t.target.composing||(e.query=t.target.value)},e.softReset],keydown:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?null:(t.preventDefault(),e.highlightNext.apply(null,arguments))},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?null:(t.preventDefault(),e.highlightPrev.apply(null,arguments))}],keyup:[e.performSearch,function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.gotoLink.apply(null,arguments)},function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;e.searchResultsVisible=!1}]}}),t("svg",{staticClass:"search-icon feather feather-search",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[t("circle",{attrs:{cx:"11",cy:"11",r:"8"}}),t("line",{attrs:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"}})])])]),t("transition",{attrs:{name:"fade"}},[e.query.length>0&&e.searchResultsVisible?t("div",{ref:"results",staticClass:"search-results"},[e._l(e.results,(function(s,i){return t("g-link",{key:i,staticClass:"search-result__link",attrs:{to:s.item.path},on:{click:e.reset}},[t("div",{staticClass:"search-result__box",class:{"search-highlighted":i===e.highlightedIndex}},[t("div",{staticClass:"search-category"},[e._v(e._s(s.item.category.toUpperCase()))]),t("div",{staticClass:"search-description"},[t("span",{staticClass:"search-result__title"},[t("b",[e._v(e._s(s.item.title))])]),t("br"),t("span",{staticClass:"search-result__description"},[e._v(e._s(s.item.description))])])])])})),0===e.results.length?t("div",{staticClass:"search-result__null"},[t("p",{staticClass:"my-0"},[e._v("\n          No results for '\n          "),t("strong",[e._v(e._s(e.query))]),e._v("'\n        ")])]):e._e()],2):e._e()])],1)}),[],!1,null,null,null).exports}}),c=(s("Yoq7"),Object(i.a)(h,(function(){var e=this._self._c;return e("header",[e("div",{staticClass:"header-inner container flex gap-30"},[e("Logo"),e("Search")],1)])}),[],!1,null,"199ccded",null));t.default=c.exports},YfXz:function(e,t,s){"use strict";s("20R5")},Yoq7:function(e,t,s){"use strict";s("kuwT")},ZV3c:function(e,t,s){"use strict";s("ijg/")},"ijg/":function(e,t,s){},kuwT:function(e,t,s){},"m/dX":function(e,t){e.exports={type:"image",mimeType:"image/svg+xml",src:"/assets/static/logo.8fc5ad1.33f46dbd00033c1e85c9ae941e597b3d.svg",size:{width:1453,height:236},sizes:"(max-width: 1453px) 100vw, 1453px",srcset:["/assets/static/logo.82a2fbd.33f46dbd00033c1e85c9ae941e597b3d.svg 480w","/assets/static/logo.cbab2cf.33f46dbd00033c1e85c9ae941e597b3d.svg 1024w","/assets/static/logo.8fc5ad1.33f46dbd00033c1e85c9ae941e597b3d.svg 1453w"],dataUri:"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 1453 236' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-f2fe6491097ca52384445d91da6ebaf2'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-f2fe6491097ca52384445d91da6ebaf2)' width='1453' height='236' xlink:href='data:image/svg%2bxml%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAEAAAAAKCAYAAAAEqljUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRUlEQVRIx52WaUtVURSGz71Nig02gWVBKmWzUhY20GBUUCmOlZmV2aSZNpGl2GRzFkpFCUFEEFH0C/rUx36SiNrzxnvkcLi3tAMPa9%2b91157TWefGwwPDwfhMzo6Om9sbCwfFsNUzSGTzEv%2bIRxH5ybCZPUnin0cPyMknU6q/cHQ0FDWyMhIIROn2HwF%2bQLOQVG4Of6kmos7E8pU%2b6yXSOtUmkd7UgUYrsX1oj7FdcYfgm9A%2bTWLtcg6ZCtsh5ewwRsz1BVmlufmQJYdmi7SOR1dR2b%2bK0iYEdsjZqTRl958j%2bXftFR6%2bJlhnSkwU1KTKxhsgmrGhxzUfKiBTubakQ3wDTr4/Ripub3wEJ7ARfgO5XAAPthGHfo5Tugbxk%2bRZzWGJn6fdWJ3QxnshI%2bwiLVB5CNkv7vxGvTbrzPMr0Hud0C3XawTcAe0dy1UoPdeCYEb8Irfmuv1nnXafICJF1AVy2q2AzoCpXBLDqL3QB2APO7AdsBKJUMZRl5yoApIr9MGB30MKp08zd2En7BVjsF1n6VOXAZHYZ%2b6Ei4raNimpMAvaLH%2bbM5T8ErIeSdhq4vSDM9hl/xHr8CJlH8azw1cpUYod5skdfG55Vp9YBG0QQnrn5AnYaOCBWVzqQ3PY10HPkVeQMruclAHVSggxk3IXNtWVw3AD9vqcgL2ucOU3D1wWpV3APehB77KvovVzNpdBz/gO6zelX7mDmqxri74Lz5vVeBDqnQIG/IiHbCZ3zVWXOpDS%2b1ANmv74bBbSdW%2b6qS8c3X7vNboSkj3oLviiKvQCZ/d9hr3YfOez6x18HK%2bWx3CWr3vKkkF2mVf223/LdxlLRfWR3x55gRVuWC97oDswNVWW7ehVOn3sNotp7as9iE7fDGpnTtgtdtdbZeJVPD5yELrK1m6U3qYU0vrK7MEipUY5na6s3Lc8qp6vveWqDpO/FEnrtL%2bFLvdF7qryuxvp9fWupPzIva26N13Igtsq5u5VUGkLdpdmUFfZF2uVjDZR69R8J%2bPCjIJXZ214G82/mkvVHAV9%2boy9E1bFPu2h9/spMcJj5Ox9ahMRPSjdsZtcF4iohvfG8TWorai3/xk1GYkOeF/Bsmk77dE9J77DVG%2bVr2tGYBlAAAAAElFTkSuQmCC' /%3e%3c/svg%3e"}}}]);