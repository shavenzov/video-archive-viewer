!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}e.exports=function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(2);var i=n(0),r=n.n(i),a=n(1),o=n.n(a),s=function(){function e(t){var n=this;r()(this,e),this.RIGHT_GET_DATA_GAP=250,this.LEFT_GET_DATA_GAP=10,this.MAX_FRAMES=60,this.container=document.getElementById(t),this.container.addEventListener("scroll",function(e){return n.onScroll(e)}),this.container.addEventListener("wheel",function(e){return n.onMouseWheel(e)}),this.onleftlimitreached=null,this.onrightlimitreached=null}return o()(e,[{key:"onMouseWheel",value:function(e){var t=e.deltaY/Math.abs(e.deltaY);e.currentTarget.scrollLeft+=72*t}},{key:"onScroll",value:function(e){e.currentTarget.scrollLeft<=this.LEFT_GET_DATA_GAP&&this.onleftlimitreached&&this.onleftlimitreached(this.getIdByFrame(this.firstFrame)),e.currentTarget.scrollLeft+e.currentTarget.offsetWidth+this.RIGHT_GET_DATA_GAP>=e.currentTarget.scrollWidth&&this.onrightlimitreached&&this.onrightlimitreached(this.getIdByFrame(this.lastFrame))}},{key:"frameFactory",value:function(e){var t=document.createElement("div");t.className="frame",t.setAttribute("data-frame-id",e.id);var n=document.createElement("time"),i=document.createTextNode(e.label);n.appendChild(i);var r=document.createElement("img");r.width=250,r.height=188,r.src="assets/loader.gif",r.className="loading";var a=document.createElement("footer");return t.appendChild(n),t.appendChild(r),t.appendChild(a),t}},{key:"addFrames",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.clearExcessFrames(n),e.forEach(function(e){var i=t.frameFactory(e);if(n){var r=t.container.firstChild;if(r)return void t.container.insertBefore(i,r)}t.container.appendChild(i)})}},{key:"setFrameAsNotFound",value:function(e){this.setFrameSrc(e,"assets/no-image-icon.png"),this.getFrameById(e).className="frame-not-found"}},{key:"setFrameSrc",value:function(e,t){var n=this.getFrameById(e);if(n){var i=n.getElementsByTagName("img");i&&(i[0].src=t,i[0].className="")}}},{key:"getFrameById",value:function(e){for(var t=this.container.getElementsByTagName("div"),n=0;n<t.length;n++){var i=t[n];if(i.getAttribute("data-frame-id")===e)return i}return null}},{key:"getIdByFrame",value:function(e){return e.getAttribute("data-frame-id")}},{key:"scrollToEnd",value:function(){var e=this;setTimeout(function(){e.container.scrollLeft=e.container.scrollWidth})}},{key:"scrollToFrameById",value:function(e){var t=this,n=this.getFrameById(e);setTimeout(function(){t.container.scrollLeft=n.offsetLeft})}},{key:"clearExcessFrames",value:function(){for(var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=this.container.getElementsByTagName("div");t.length>=this.MAX_FRAMES;){var n=e?t[t.length-1]:t[0];this.container.removeChild(n)}}},{key:"clear",value:function(){for(;this.container.lastChild;)this.container.removeChild(this.container.lastChild)}},{key:"firstFrame",get:function(){return this.container.getElementsByTagName("div")[0]}},{key:"lastFrame",get:function(){var e=this.container.getElementsByTagName("div");return e[e.length-1]}}]),e}(),c=function(){function e(t){var n=this;r()(this,e),this._videoOrigins=[],this.camerachanged=null,this.selectUI=document.getElementById(t),this.selectUI.addEventListener("change",function(){return n.onCameraChanged()})}return o()(e,[{key:"populateOptions",value:function(){for(;this.selectUI.firstChild;)this.selectUI.removeChild(this.selectUI.firstChild);for(var e=0;e<this.videoOrigins.length;e++){var t=this.videoOrigins[e],n=document.createElement("option");n.textContent=t.friendlyNameShort,n.value=t.origin,n.selected=0===e,this.selectUI.appendChild(n)}}},{key:"onCameraChanged",value:function(){var e=this.selectUI.options[this.selectUI.selectedIndex].value;this.camerachanged&&this.camerachanged(e)}},{key:"videoOrigins",get:function(){return this._videoOrigins},set:function(e){this._videoOrigins=e.slice(),this.populateOptions()}}]),e}(),l=function(){function e(){r()(this,e)}return o()(e,null,[{key:"deserialize",value:function(e){var t=parseInt(e.substr(0,4)),n=parseInt(e.substr(4,2))-1,i=parseInt(e.substr(6,2)),r=parseInt(e.substr(9,2)),a=parseInt(e.substr(11,2)),o=parseInt(e.substr(13,2)),s=e.length>16?parseInt(e.substr(16,3)):0;return new Date(t,n,i,r,a,o,s)}},{key:"serialize",value:function(e){var t=e.getFullYear(),n=e.getMonth()+1,i=e.getDate(),r=e.getHours(),a=e.getMinutes(),o=e.getSeconds(),s=e.getMilliseconds();n<10&&(n="0".concat(n)),i<10&&(i="0".concat(i)),r<10&&(r="0".concat(r)),a<10&&(a="0".concat(a)),o<10&&(o="0".concat(o)),s<10?s="00".concat(s):s<100&&(s="0".concat(s));var c="".concat(t).concat(n).concat(i,"T").concat(r).concat(a).concat(o);return"000"!==s&&(c+=".".concat(s,"000")),c}}]),e}(),u=function(){function e(){r()(this,e),this.API_ROOT="http://shavenzov.com:8000/asip-api"}return o()(e,[{key:"getVideoOrigins",value:function(){return fetch("".concat(this.API_ROOT,"/video-origins/")).then(function(e){return e.json()}).then(function(e){var t=[];for(var n in e)t.push(e[n]);return t})}},{key:"getMedia",value:function(e,t){return fetch("".concat(this.API_ROOT,"/archive/media/").concat(e,"/").concat(l.serialize(t))).then(function(e){return e.blob()})}}]),e}();new(function(){function e(){var t=this;r()(this,e),this.FRAME_INTERVAL=6e4,this.NUM_REQUESTED_FRAMES=30,this.chooser=new c("camera-chooser"),this.chooser.camerachanged=function(e){return t.onCameraChanged(e)},this.viewer=new s("video-archive-viewer"),this.viewer.onleftlimitreached=function(e){return t.onLeftLimitReached(e)},this.viewer.onrightlimitreached=function(e){return t.onRightLimitReached(e)},this.videoOrigins=[],this.selectedOrigin=null,this.pending=!1,this.api=new u,this.api.getVideoOrigins().then(function(e){t.videoOrigins=e.slice(),t.chooser.videoOrigins=t.videoOrigins,t.selectedOrigin=t.videoOrigins[0],t.loadFrames(t.currentDate,!0,!0),t.viewer.scrollToEnd()})}return o()(e,[{key:"onCameraChanged",value:function(e){this.viewer.clear(),this.selectedOrigin=this.videoOrigins.filter(function(t){return t.origin===e})[0],this.loadFrames(this.currentDate,!0,!0),this.viewer.scrollToEnd()}},{key:"formatDate",value:function(e){var t=e.getHours(),n=e.getMinutes();return t<10&&(t="0".concat(t)),n<10&&(n="0".concat(n)),"".concat(t,":").concat(n)}},{key:"createFrames",value:function(e){for(var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=[],r=t?-1:1,a=n?0:1,o=a;o<this.NUM_REQUESTED_FRAMES+a;o++){var s=new Date(e.getTime()+o*this.FRAME_INTERVAL*r);if(!t&&s.getTime()+this.FRAME_INTERVAL>this.currentDate.getTime())break;var c={date:s,id:l.serialize(s),label:this.formatDate(s)};i.push(c)}return this.viewer.addFrames(i,t),i}},{key:"loadFrames",value:function(e){var t=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.createFrames(e,n,i);if(0===r.length)return null;var a=[];return this.pending=!0,r.forEach(function(e){var n=t.api.getMedia(t.selectedOrigin.origin,e.date).then(function(n){t.viewer.setFrameSrc(e.id,URL.createObjectURL(n))}).catch(function(){t.viewer.setFrameAsNotFound(e.id)});a.push(n)}),Promise.all(a).then(function(){t.pending=!1}).catch(function(){t.pending=!1})}},{key:"onLeftLimitReached",value:function(e){if(!this.pending){var t=l.deserialize(e);this.loadFrames(t,!0)&&(this.viewer.scrollToFrameById(e),console.log("left limit reached",e))}}},{key:"onRightLimitReached",value:function(e){if(!this.pending){var t=l.deserialize(e);this.loadFrames(t,!1)&&(this.viewer.scrollToFrameById(e),console.log("right limit reached",e))}}},{key:"currentDate",get:function(){return new Date}}]),e}())}]);