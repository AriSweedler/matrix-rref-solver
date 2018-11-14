(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(24)},20:function(e,t,a){},22:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),s=a.n(o),l=a(1),c=a(2),i=a(4),p=a(3),u=a(5),h=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).changeMatrix=function(e,t,n){a.props.alterCell(e,t,n)},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){for(var e=this.props.values,t=[],a=0;a<e.length;a++)t.push(r.a.createElement(v,{key:a,index:a,displayOnly:this.props.displayOnly,values:e[a],alterMatrix:this.changeMatrix,changed:this.props.changed===a}));return r.a.createElement("div",{className:"Matrix"},r.a.createElement("div",null,this.props.message),r.a.createElement("div",null,t))}}]),t}(r.a.Component),v=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).changeRow=function(e,t){a.props.alterMatrix(e,a.props.index,t)},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){for(var e=this.props.values,t=[],a=0;a<e.length;a++)t.push(r.a.createElement(d,{key:a,index:a,displayOnly:this.props.displayOnly,value:e[a],alterRow:this.changeRow,changed:this.props.changed}));var n="Row";return this.props.changed&&(n+=" changed"),r.a.createElement("div",{className:n},t)}}]),t}(r.a.Component),d=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).changeSquare=function(e){a.props.alterRow(e.target.value,a.props.index)},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e="Cell";return isNaN(this.props.value)&&(e+=" NaN"),this.props.changed&&(e+=" changed"),r.a.createElement("input",{className:e,type:"text",value:this.props.value,disabled:this.props.displayOnly,onChange:this.changeSquare})}}]),t}(r.a.Component),m=h,f=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).decrementRow=function(){a.props.controlsUsed(a.props.rows-1,a.props.cols)},a.incrementRow=function(){a.props.controlsUsed(a.props.rows+1,a.props.cols)},a.changeRow=function(e){var t=e.target.value;a.props.controlsUsed(t,a.props.cols)},a.decrementCol=function(){a.props.controlsUsed(a.props.rows,a.props.cols-1)},a.incrementCol=function(){a.props.controlsUsed(a.props.rows,a.props.cols+1)},a.changeCol=function(e){var t=e.target.value;a.props.controlsUsed(a.props.rows,t)},a.zeroAll=function(){a.props.zeroAll()},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"InputControls"},r.a.createElement("div",null,r.a.createElement("button",{onClick:this.decrementRow},"Row-1"),r.a.createElement("input",{onChange:this.changeRow,value:this.props.rows}),r.a.createElement("button",{onClick:this.incrementRow},"Row+1")),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.decrementCol},"Col-1"),r.a.createElement("input",{onChange:this.changeCol,value:this.props.cols}),r.a.createElement("button",{onClick:this.incrementCol},"Col+1")),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.zeroAll},"Reset values")))}}]),t}(r.a.Component);a(20);function w(e){var t=[],a=!0,n=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var l=o.value;t.push(l.slice())}}catch(c){n=!0,r=c}finally{try{a||null==s.return||s.return()}finally{if(n)throw r}}return t}var y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={allValues:[[2,6,4],[1,4,5],[3,7,5]],rows:3,cols:3},a.matrixSizeChange=function(e,t){for(var n=w(a.state.allValues);e>n.length;)n.push(Array(t).fill(0));for(var r=0;r<e;r++)for(;t>n[r].length;)n[r].push(0);a.setState({rows:e,cols:t,allValues:n})},a.changeCellValue=function(e,t,n){var r=a.state.allValues.slice();r[t][n]=e,a.setState({allValues:r})},a.addWork=function(e,t){a.shownWork.push(r.a.createElement(m,{message:"Step ".concat(a.workStep,": ").concat(e),key:a.workStep++,displayOnly:!0,values:w(a.nextStep),changed:t}))},a.rref=function(e){var t=0,n=0;a.workStep=0,a.shownWork=[],a.nextStep=w(e),a.addWork("Here is our original matrix.");var r=function(){for(var e=a.nextStep[n][t];0===e&&(t++,e=a.nextStep[n][t],t!==a.state.cols););1!==e&&e&&(a.nextStep[n]=a.nextStep[n].map(function(t){return t/e}),a.addWork("Divide row ".concat(n," by ").concat(e,"."),n));for(var r=function(e){var r=a.nextStep[e][t];r&&(a.nextStep[e]=a.nextStep[e].map(function(e,t){return e-a.nextStep[n][t]*r}),a.addWork("Subtract ".concat(r,"*(row ").concat(n,") from row ").concat(e," in order to zero out (").concat(e,", ").concat(t,")."),e))},o=n+1;o<a.state.rows;o++)r(o)};for(n=0;n<a.state.rows;t++,n++)r();return a.nextStep},a.zeroAll=function(){for(var e=Array(a.state.cols).fill(0),t=[],n=0;n<a.state.rows;n++)t.push(e.slice());a.setState({allValues:t})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){for(var e=[],t=0;t<this.state.rows;t++)e.push(this.state.allValues[t].slice(0,this.state.cols));var a=this.rref(e);return r.a.createElement("div",{className:"myApp"},"myApp",r.a.createElement("div",{className:"ioPanel"},"ioPanel",r.a.createElement("div",{className:"userInput"},"userInput",r.a.createElement(f,{className:"inputControls",controlsUsed:this.matrixSizeChange,zeroAll:this.zeroAll,rows:this.state.rows,cols:this.state.cols}),r.a.createElement(m,{alterCell:this.changeCellValue,message:"Place your input here:",values:e})),r.a.createElement("div",{className:"answer"},"answer",r.a.createElement(m,{displayOnly:!0,message:"Your answer:",values:a}))),r.a.createElement("div",{className:"shownWork"},"Shown Work:",this.shownWork))}}]),t}(r.a.Component);a(22);s.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[11,2,1]]]);
//# sourceMappingURL=main.ca57fd63.chunk.js.map