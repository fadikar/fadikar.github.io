(this["webpackJsonppersonal-site"]=this["webpackJsonppersonal-site"]||[]).push([[12],{174:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a(1),r=a(5),l=a(21),i=function(e){var t=e.label,a=e.link,n=e.value,r=e.format;return Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{width:"70%",children:t}),Object(s.jsx)("td",{children:a?Object(s.jsx)("a",{href:a,children:r(n)}):r(n)})]})};i.defaultProps={format:function(e){return e},link:null,value:null};var c=i,o=function(e){var t=e.data;return Object(s.jsx)("table",{children:Object(s.jsx)("tbody",{children:t.map((function(e){return Object(s.jsx)(c,{format:e.format,label:e.label,link:e.link,value:e.value},e.label)}))})})},u=a(22),b=function(){var e=Object(n.useState)(),t=Object(u.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){var e=setInterval((function(){return function(){var e=new Date("1989-01-08T13:24:00");r(((Date.now()-e)/31556925190.079998).toFixed(11))}()}),25);return function(){clearInterval(e)}}),[]),Object(s.jsx)(s.Fragment,{children:a})},j=[{key:"age",label:"Current age",value:Object(s.jsx)(b,{})},{key:"countries",label:"Countries visited",value:3,link:"https://www.google.com/maps/d/embed?mid=1iBBTscqateQ93pWFVfHCUZXoDu8&z=2"},{key:"location",label:"Current city",value:"Charlottesville, VA"}],d=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h3",{children:"Some stats about me"}),Object(s.jsx)(o,{data:j})]})},h=a(161),p=a.n(h),m=a(57),f=a(163),O=a(73),k=a.n(O),g=[{label:"Stars this repository has on github",key:"stargazers_count",link:"https://github.com/mldangelo/personal-site/stargazers"},{label:"Number of people watching this repository",key:"subscribers_count",link:"https://github.com/mldangelo/personal-site/stargazers"},{label:"Number of forks",key:"forks",link:"https://github.com/mldangelo/personal-site/network"},{label:"Number of spoons",value:"0"},{label:"Number of linter warnings",value:"0"},{label:"Open github issues",key:"open_issues_count",link:"https://github.com/mldangelo/personal-site/issues"},{label:"Last updated at",key:"pushed_at",link:"https://github.com/mldangelo/personal-site/commits",format:function(e){return k()(e).format("MMMM DD, YYYY")}},{label:"Lines of Javascript powering this website",value:"2115",link:"https://github.com/mldangelo/personal-site/graphs/contributors"}],v=function(){var e=Object(n.useState)(g),t=Object(u.a)(e,2),a=t[0],r=t[1],l=Object(n.useCallback)(Object(f.a)(p.a.mark((function e(){var t,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.github.com/repos/mldangelo/personal-site");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,r(g.map((function(e){return Object(m.a)(Object(m.a)({},e),{},{value:Object.keys(a).includes(e.key)?a[e.key]:e.value})})));case 7:case"end":return e.stop()}}),e)}))),[]);return Object(n.useEffect)((function(){l()}),[l]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"Some stats about this site"}),Object(s.jsx)(o,{data:a})]})};t.default=function(){return Object(s.jsx)(l.a,{title:"Stats",description:"Some statistics about Arindam Fadikar and fadikar.com",children:Object(s.jsxs)("article",{className:"post",id:"stats",children:[Object(s.jsx)("header",{children:Object(s.jsx)("div",{className:"title",children:Object(s.jsx)("h2",{"data-testid":"heading",children:Object(s.jsx)(r.b,{to:"/stats",children:"Stats"})})})}),Object(s.jsx)(d,{}),Object(s.jsx)(v,{})]})})}}}]);
//# sourceMappingURL=12.63733019.chunk.js.map