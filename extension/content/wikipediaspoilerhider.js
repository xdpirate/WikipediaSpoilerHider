// ==UserScript==
// @id             dc09f455-deee-4eec-9660-9da7394b1b71
// @name           Wikipedia Spoiler Hider
// @version        1.2.2
// @author         xpdite
// @description    Hides potential spoilers on Wikipedia
// @include        http*://en.wikipedia.org/wiki/*
// @run-at         document-end
// ==/UserScript==
(function() {
    var wshGlobalCounter = 0;
    var wshKeywords = new Array("plot","plots","story","stories","storyline","storylines","synopsis","synopses",
                                "plot_summary","plot_summaries","plot_synopsis","plot_synopses","characters",
                                "main_characters","gameplay_and_story","gameplay_and_stories","gameplay_and_storyline",
                                "gameplay_and_storylines","gameplay_and_story_line","gameplay_and_story_lines",
                                "plot_and_setting","plots_and_setting","plot_and_settings","plots_and_settings",
                                "series_synopsis","series_synopses","story_and_characters","stories_and_characters",
                                "setting_and_characters","settings_and_characters","plot_and_characters",
                                "plots_and_characters","playable_characters","enemy_characters","setting","settings",
                                "plot_overview","characters_and_organizations");

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

    var headers = document.querySelectorAll("h2 > span");
    if (headers.length > 0) {
        var k;
        for (k=0; k<headers.length; k++) {
            var id = headers[k].getAttribute("id");
			if(id !== null) {
				if (wshKeywords.indexOf(id.toLowerCase()) != -1) {
					spoilerize(headers[k].parentNode.parentNode,0);
				}
			}
        }
    }

    var smallheaders = document.querySelectorAll("h3 > span");
    if (smallheaders.length > 0) {
        var l;
        for (l=0; l<smallheaders.length; l++) {
            var id = smallheaders[l].getAttribute("id");
			if(id !== null) {
				if (wshKeywords.indexOf(id.toLowerCase()) != -1) {
					spoilerize(smallheaders[l].parentNode.parentNode,1);
				}
			}
        }
    }

    function spoilerize(element,isSmall) {
        var outer = element;
        var inner;
        
        if (isSmall == 0) {
            inner = element.querySelector("div.content_inner")
            inner.setAttribute("style","display: none !important;");
            inner.setAttribute("id","wphPlot" + wshGlobalCounter++);
        } else {
            inner = element.querySelector("div.content_sub_inner")
            inner.setAttribute("style","display: none !important;");
            inner.setAttribute("id","wphPlot"+ wshGlobalCounter++);
        }
        
        
        var link;
        link = document.createElement("span");
        link.id = "togglePlotLink" + wshGlobalCounter++;
        link.innerHTML = "<b>Toggle potential spoilers <sup>[WSH]</sup></b>";
        link.setAttribute("style","display:inline-block;margin-bottom:10px;color:#00F;padding:5px;border:1px solid black;border-radius:5px;cursor:pointer;");
        
        link.addEventListener("click", function(){setToggle(inner.getAttribute("id"))}, true);
        outer.insertBefore(link, inner);
    }

    function setToggle(divId) {
        var elem=document.getElementById(divId);
        
        if(elem.style.display=='none') {
            elem.style.display='block';
        } else {
            elem.style.display='none';
        }
    }
}());
