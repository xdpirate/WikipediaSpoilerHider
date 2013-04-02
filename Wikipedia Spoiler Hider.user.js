// ==UserScript==
// @id             en.wikipedia.org-dc09f455-deee-4eec-9660-9da7394b1b71@scriptish
// @name           Wikipedia Spoiler Hider
// @version        1.1
// @namespace      
// @author         xpdite
// @description    Hides spoilers on Wikipedia
// @include        http://en.wikipedia.org/wiki/*
// @include        https://en.wikipedia.org/wiki/*
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
keywords[1] = "Plots";
keywords[2] = "Story";
keywords[3] = "Stories";
keywords[4] = "Storyline";
keywords[5] = "Storylines";
keywords[6] = "Synopsis";
keywords[7] = "Synopses"
keywords[8] = "Plot_summary";
keywords[9] = "Plot_summaries";
keywords[10] = "Plot_synopsis";
keywords[11] = "Plot_synopses";
keywords[12] = "Characters";
keywords[13] = "Main_characters";
keywords[14] = "Gameplay_and_story";
keywords[15] = "Gameplay_and_stories";
keywords[16] = "Gameplay_and_storyline";
keywords[17] = "Gameplay_and_storylines";
keywords[18] = "Gameplay_and_story_line";
keywords[19] = "Plot_and_setting";
keywords[20] = "Plots_and_setting";
keywords[21] = "Plot_and_settings";
keywords[22] = "Plots_and_settings";
keywords[23] = "Series_synopsis";
keywords[24] = "Series_synopses";

var globalCounter = 0;

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
        inner.setAttribute("id","wphPlot" + globalCounter++);
    } else {
        inner = element.querySelector("div.content_sub_inner")
        inner.setAttribute("style","display: none !important;");
        inner.setAttribute("id","wphPlot"+ globalCounter++);
    }
    
    
    var link;
    link = document.createElement("span");
    link.id = "togglePlotLink" + globalCounter++;
    link.innerHTML = "<b>Toggle potential spoilers <sup>[WSH]</sup></b>";
    link.setAttribute("style","display:inline-block;margin-bottom:10px;color:#00F;padding:5px;border:1px solid black;border-radius:5px;cursor:pointer;");
    
    link.setAttribute("OnClick","var elem=document.getElementById('"+inner.getAttribute("id")+"');if(elem.style.display=='none'){elem.style.display='block'}else{elem.style.display='none'}");
    outer.insertBefore(link, inner);
}