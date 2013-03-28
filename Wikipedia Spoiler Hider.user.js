// ==UserScript==
// @id             en.wikipedia.org-dc09f455-deee-4eec-9660-9da7394b1b71@scriptish
// @name           Wikipedia Spoiler Hider
// @version        1.1
// @namespace      
// @author         xpdite
// @description    Hides spoilers on Wikipedia
// @include        http://en.wikipedia.org/wiki/*
// @run-at         document-end
// ==/UserScript==
var h2s = document.querySelectorAll("#mw-content-text > h2");
if (h2s.length > 0){
  var i, dOuter, dInner;
  for (i=0; i<h2s.length-1; i++){
    dOuter = document.createElement("div");
    dOuter.id = "content_outer_" + i;
    dOuter.className = "content_outer";
    dInner = document.createElement("div");
    dInner.id = "content_inner_" + i;
    dInner.className = "content_inner";
    h2s[i].parentNode.insertBefore(dOuter, h2s[i]);
    dOuter.appendChild(h2s[i]);
    dOuter.appendChild(dInner);
    while (dOuter.nextSibling && dOuter.nextSibling.nodeName != "H2"){
      dInner.appendChild(dOuter.nextSibling);
    }
  } 
}

var h3s = document.querySelectorAll(".content_inner > h3");
if (h3s.length > 0){
  var j;
  for (i=0; i<h3s.length; i++){
    j = h3s[i].parentNode.id.substr(h3s[i].parentNode.id.lastIndexOf("_")+1);
    dOuter = document.createElement("div");
    dOuter.id = "content_sub_outer_" + j + "_" + i;
    dOuter.className = "content_sub_outer";
    dInner = document.createElement("div");
    dInner.id = "content_sub_inner_" + j + "_" + i;
    dInner.className = "content_sub_inner";
    h3s[i].parentNode.insertBefore(dOuter, h3s[i]);
    dOuter.appendChild(h3s[i]);
    dOuter.appendChild(dInner);
    while (dOuter.nextSibling && dOuter.nextSibling.nodeName != "H3"){
      dInner.appendChild(dOuter.nextSibling);
    }
  } 
}

var keywords = new Array();
keywords[0] = "Plot";
keywords[1] = "Story";
keywords[2] = "Storyline";
keywords[3] = "Synopsis";
keywords[4] = "Plot_summary";
keywords[5] = "Plot_synopsis";
keywords[6] = "Characters";
keywords[7] = "Main_characters";
keywords[8] = "Gameplay_and_story";
keywords[9] = "Plots";
keywords[10] = "Plot_and_setting";
keywords[11] = "Series_synopsis";

var headers = document.querySelectorAll("h2 > span");
if (headers.length > 0) {
    var k;
    for (k=0; k<headers.length; k++) {
        var id = headers[k].getAttribute("id");
        if (keywords.indexOf(id) != -1) {
            spoilerize(headers[k].parentNode.parentNode,0);
        }
    }
}

var smallheaders = document.querySelectorAll("h3 > span");
if (smallheaders.length > 0) {
    var l;
    for (l=0; l<smallheaders.length; l++) {
        var id = smallheaders[l].getAttribute("id");
        if (keywords.indexOf(id) != -1) {
            spoilerize(smallheaders[l].parentNode.parentNode,1);
        }
    }
}

function spoilerize(element,isSmall) {
    var outer = element;
    var inner;
    
    if (isSmall == 0) {
        inner = element.querySelector("div.content_inner")
        inner.setAttribute("style","display: none !important;");
        inner.setAttribute("id","wphPlot"+Math.floor(Math.random()*101));
    } else {
        inner = element.querySelector("div.content_sub_inner")
        inner.setAttribute("style","display: none !important;");
        inner.setAttribute("id","wphPlot"+Math.floor(Math.random()*101));
    }
    
    
    var link;
    link = document.createElement("span");
    link.id = "togglePlotLink"+Math.floor(Math.random()*101);
    link.innerHTML = "<b>Click here to show/hide plot information</b>";
    link.setAttribute("style","display:inline-block;margin-bottom:10px;color:#00F;padding:5px;border:1px solid black;border-radius:5px;cursor:pointer;");
    
    link.setAttribute("OnClick","var elem=document.getElementById('"+inner.getAttribute("id")+"');if(elem.style.display=='none'){elem.style.display='block'}else{elem.style.display='none'}");
    outer.insertBefore(link, inner);
}