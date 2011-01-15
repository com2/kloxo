InternetExplorer._pluginInfo={name:"Internet Explorer",origin:"Xinha Core",version:"$LastChangedRevision:980 $".replace(/^[^:]*:\s*(.*)\s*\$$/,"$1"),developer:"The Xinha Core Developer Team",developer_url:"$HeadURL:http://svn.xinha.webfactional.com/trunk/modules/InternetExplorer/InternetExplorer.js $".replace(/^[^:]*:\s*(.*)\s*\$$/,"$1"),sponsor:"",sponsor_url:"",license:"htmlArea"};function InternetExplorer(A){this.editor=A;A.InternetExplorer=this}InternetExplorer.prototype.onKeyPress=function(A){if(this.editor.isShortCut(A)){switch(this.editor.getKey(A).toLowerCase()){case"n":this.editor.execCommand("formatblock",false,"<p>");Xinha._stopEvent(A);return true;break;case"1":case"2":case"3":case"4":case"5":case"6":this.editor.execCommand("formatblock",false,"<h"+this.editor.getKey(A).toLowerCase()+">");Xinha._stopEvent(A);return true;break}}switch(A.keyCode){case 8:case 46:if(this.handleBackspace()){Xinha._stopEvent(A);return true}break}return false};InternetExplorer.prototype.handleBackspace=function(){var F=this.editor;var E=F.getSelection();if(E.type=="Control"){var D=F.activeElement(E);Xinha.removeFromParent(D);return true}var C=F.createRange(E);var B=C.duplicate();B.moveStart("character",-1);var A=B.parentElement();if(A!=C.parentElement()&&(/^a$/i.test(A.tagName))){B.collapse(true);B.moveEnd("character",1);B.pasteHTML("");B.select();return true}};InternetExplorer.prototype.inwardHtml=function(A){A=A.replace(/<(\/?)del(\s|>|\/)/ig,"<$1strike$2");A=A.replace(/(<script|<!--)/i,"&nbsp;$1");return A};InternetExplorer.prototype.outwardHtml=function(A){A=A.replace(/&nbsp;(\s*)(<script|<!--)/i,"$1$2");return A};InternetExplorer.prototype.onExecCommand=function(O,C,L){switch(O){case"saveas":var K=null;var I=this.editor;var J=document.createElement("iframe");J.src="about:blank";J.style.display="none";document.body.appendChild(J);try{if(J.contentDocument){K=J.contentDocument}else{K=J.contentWindow.document}}catch(N){}K.open("text/html","replace");var H="";if(I.config.browserQuirksMode===false){var G='<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'}else{if(I.config.browserQuirksMode===true){var G=""}else{var G=Xinha.getDoctype(document)}}if(!I.config.fullPage){H+=G+"\n";H+="<html>\n";H+="<head>\n";H+='<meta http-equiv="Content-Type" content="text/html; charset='+I.config.charSet+'">\n';if(typeof I.config.baseHref!="undefined"&&I.config.baseHref!==null){H+='<base href="'+I.config.baseHref+'"/>\n'}if(typeof I.config.pageStyleSheets!=="undefined"){for(var F=0;F<I.config.pageStyleSheets.length;F++){if(I.config.pageStyleSheets[F].length>0){H+='<link rel="stylesheet" type="text/css" href="'+I.config.pageStyleSheets[F]+'">'}}}if(I.config.pageStyle){H+='<style type="text/css">\n'+I.config.pageStyle+"\n</style>"}H+="</head>\n";H+="<body>\n";H+=I.getEditorContent();H+="</body>\n";H+="</html>"}else{H=I.getEditorContent();if(H.match(Xinha.RE_doctype)){I.setDoctype(RegExp.$1)}}K.write(H);K.close();K.execCommand(O,C,L);document.body.removeChild(J);return true;break;case"removeformat":var I=this.editor;var B=I.getSelection();var D=I.saveSelection(B);var F,A,E;function M(Q){if(Q.nodeType!=1){return}Q.removeAttribute("style");for(var P=0;P<Q.childNodes.length;P++){M(Q.childNodes[P])}if((Q.tagName.toLowerCase()=="span"&&!Q.attributes.length)||Q.tagName.toLowerCase()=="font"){Q.outerHTML=Q.innerHTML}}if(I.selectionEmpty(B)){E=I._doc.body.childNodes;for(F=0;F<E.length;F++){A=E[F];if(A.nodeType!=1){continue}if(A.tagName.toLowerCase()=="span"){newNode=I.convertNode(A,"div");A.parentNode.replaceChild(newNode,A);A=newNode}M(A)}}I._doc.execCommand(O,C,L);I.restoreSelection(D);return true;break}return false};Xinha.prototype.insertNodeAtSelection=function(A){this.insertHTML(A.outerHTML)};Xinha.prototype.getParentElement=function(D){if(typeof D=="undefined"){D=this.getSelection()}var C=this.createRange(D);switch(D.type){case"Text":var B=C.parentElement();while(true){var A=C.duplicate();A.moveToElementText(B);if(A.inRange(C)){break}if((B.nodeType!=1)||(B.tagName.toLowerCase()=="body")){break}B=B.parentElement}return B;case"None":return C.parentElement();case"Control":return C.item(0);default:return this._doc.body}};Xinha.prototype.activeElement=function(C){if((C===null)||this.selectionEmpty(C)){return null}if(C.type.toLowerCase()=="control"){return C.createRange().item(0)}else{var B=C.createRange();var A=this.getParentElement(C);if(A.innerHTML==B.htmlText){return A}return null}};Xinha.prototype.selectionEmpty=function(A){if(!A){return true}return this.createRange(A).htmlText===""};Xinha.prototype.saveSelection=function(){return this.createRange(this.getSelection())};Xinha.prototype.restoreSelection=function(A){try{A.select()}catch(B){}};Xinha.prototype.selectNodeContents=function(D,C){this.focusEditor();this.forceRedraw();var B;var A=typeof C=="undefined"?true:false;if(A&&D.tagName&&D.tagName.toLowerCase().match(/table|img|input|select|textarea/)){B=this._doc.body.createControlRange();B.add(D)}else{B=this._doc.body.createTextRange();B.moveToElementText(D)}B.select()};Xinha.prototype.insertHTML=function(B){this.focusEditor();var C=this.getSelection();var A=this.createRange(C);A.pasteHTML(B)};Xinha.prototype.getSelectedHTML=function(){var B=this.getSelection();if(this.selectionEmpty(B)){return""}var A=this.createRange(B);if(A.htmlText){return A.htmlText}else{if(A.length>=1){return A.item(0).outerHTML}}return""};Xinha.prototype.getSelection=function(){return this._doc.selection};Xinha.prototype.createRange=function(A){if(!A){A=this.getSelection()}return A.createRange()};Xinha.prototype.isKeyEvent=function(A){return A.type=="keydown"};Xinha.prototype.getKey=function(A){return String.fromCharCode(A.keyCode)};Xinha.getOuterHTML=function(A){return A.outerHTML};Xinha.prototype.cc=String.fromCharCode(8201);Xinha.prototype.setCC=function(K){var C=this.cc;if(K=="textarea"){var E=this._textArea;var J=document.selection.createRange();J.collapse();J.text=C;var I=E.value.indexOf(C);var H=E.value.substring(0,I);var G=E.value.substring(I+C.length,E.value.length);if(G.match(/^[^<]*>/)){var F=G.indexOf(">")+1;E.value=H+G.substring(0,F)+C+G.substring(F,G.length)}else{E.value=H+C+G}E.value=E.value.replace(new RegExp("(&[^"+C+"]*?)("+C+")([^"+C+"]*?;)"),"$1$3$2");E.value=E.value.replace(new RegExp("(<script[^>]*>[^"+C+"]*?)("+C+")([^"+C+"]*?<\/script>)"),"$1$3$2");E.value=E.value.replace(new RegExp("^([^"+C+"]*)("+C+")([^"+C+"]*<body[^>]*>)(.*?)"),"$1$3$2$4")}else{var B=this.getSelection();var A=B.createRange();if(B.type=="Control"){var D=A.item(0);D.outerHTML+=C}else{A.collapse();A.text=C}}};Xinha.prototype.findCC=function(B){var A=(B=="textarea")?this._textArea:this._doc.body;range=A.createTextRange();if(range.findText(escape(this.cc))){range.select();range.text=""}if(range.findText(this.cc)){range.select();range.text=""}if(B=="textarea"){this._textArea.focus()}};Xinha.getDoctype=function(A){return(A.compatMode=="CSS1Compat"&&Xinha.ie_version<8)?'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">':""};