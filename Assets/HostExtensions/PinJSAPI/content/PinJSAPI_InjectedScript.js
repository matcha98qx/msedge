﻿(function(){class t{constructor(n,t){this._info=n;this._pinApiHandler=t;this.subscriptionManager=new r(this,this._pinApiHandler)}setBadge(t){return this._pinApiHandler.createHostCommand(n.SetBadge,{tileUri:this._info.tileUri,badgeNumber:t})}get url(){return this._info.tileUri}get isPinnedToStart(){return this._info.isPinnedToStart}get isPinnedToTaskbar(){return this._info.isPinnedToTaskbar}}class r{constructor(n,t){this._tile=n;this._pinApiHandler=t}subscribe(t){if(t===undefined||!t.hasOwnProperty("applicationServerKey"))return new Promise((n,t)=>{t("Invalid arguments.")});let i="";if(typeof t.applicationServerKey!="string"){const n=new Uint8Array(t.applicationServerKey.buffer);for(let t=0;t<n.length;t++)i+=String.fromCharCode(n[t]);i=window.btoa(i)}else i=t.applicationServerKey;let r={tileUri:this._tile.url,badgeServerKey:i};return this._pinApiHandler.createHostCommand(n.CreateBadgePushChannel,r)}getSubscription(){return new Promise(n=>{n(null)})}}class u{constructor(n,t,i,r){this._pinApiHandler=n;this._url=t;this._info=i;this._askString=r;const u=window.atob(r);this.options={applicationServerKey:new Uint8Array(u.length)};for(let n=0;n<u.length;++n)this.options.applicationServerKey[n]=u.charCodeAt(n)}unsubscribe(){let t={tileUri:this._url,badgeServerKey:this._askString};return this._pinApiHandler.createHostCommand(n.RemoveBadgePushChannel,t)}toJSON(){return{endpoint:this.endpoint,expirationTime:this.expirationTime}}get endpoint(){return this._info.channelUri}get expirationTime(){return this._info.channelExpiration}}var n;(function(n){n.NotifyPin="NotifyPin";n.PinWebpage="PinWebpage";n.GetTilesForOrigin="GetTilesForOrigin";n.SetBadge="SetBadge";n.CreateBadgePushChannel="CreateBadgePushChannel";n.RemoveBadgePushChannel="RemoveBadgePushChannel";n.NotifyPinningPromotionShowing="NotifyPinningPromotionShowing";n.SetSitePinningUserGroupId="SetSitePinningUserGroupId";n.GetMSPinningUserGroupId="GetMSPinningUserGroupId";n.ExposeAllowlistApis="ExposeAllowlistApis"})(n||(n={}));class f{constructor(){this._extensionUri="ms-browser-extension://PinJSAPI_EC01B57063BE468FAB6DB7EBFC3BF368";this._nextid=0;this._pendingCommands={};browser.webruntime.onMessageFromHost.addListener((n,t)=>this.handleMessageFromHost(n,t));window.navigator.getTiles=()=>this._getTiles()}handleMessageFromHost(t,i){if(t===this._extensionUri&&i[0]==="HostResponse"){let r=JSON.parse(i[1]);const t={};t[n.NotifyPin]=n=>this._handleNotifyPin(n);t[n.PinWebpage]=n=>this._handlePinWebpage(n);t[n.GetTilesForOrigin]=n=>this._handleGetTilesForOrigin(n);t[n.SetBadge]=n=>this._handleSetBadge(n);t[n.CreateBadgePushChannel]=n=>this._handleCreateBadgePushChannel(n);t[n.RemoveBadgePushChannel]=n=>this._handleRemoveBadgePushChannel(n);t[n.GetMSPinningUserGroupId]=n=>this._handleGetMSPinningUserGroupId(n);t[n.ExposeAllowlistApis]=n=>this._handleExposeAllowlistApis(n);t[n.NotifyPinningPromotionShowing]=n=>this._deleteCommand(n);t[n.SetSitePinningUserGroupId]=n=>this._deleteCommand(n);t[r.command](r)}}createHostCommand(n,t){const i=(this._nextid++).toString(),r={id:i,command:n,data:t};return new Promise((u,f)=>{this._pendingCommands[i]={command:n,messageData:t,onSuccess:u,onFailure:f},this._postMessageToExtension(r)})}_pinPage(t,i){t||(t="");let r=i&&i.url?i.url:"",u=i&&i.title?i.title:"";r=this._relativeUrlToAbsolute(r);const f={tileUri:r,title:u,attestation:t};return this.createHostCommand(n.PinWebpage,f)}_getTiles(){return this.createHostCommand(n.GetTilesForOrigin)}_notifyPinningPromotionShowing(t){let i="";t&&(i=t);i=this._relativeUrlToAbsolute(i);this.createHostCommand(n.NotifyPinningPromotionShowing,i)}_setSitePinningUserGroupId(t){this.createHostCommand(n.SetSitePinningUserGroupId,t)}_getMSPinningUserGroupId(){return this.createHostCommand(n.GetMSPinningUserGroupId)}_handleNotifyPin(n){const i=n.data,r=new t(i,this);window.dispatchEvent(new e(r))}_handlePinWebpage(n){const t=this._pendingCommands[n.id];if(t!==undefined){let i=n.data;if(i.result)t.onSuccess(null);else t.onFailure(i.details);delete this._pendingCommands[n.id]}}_handleGetTilesForOrigin(n){const i=this._pendingCommands[n.id];if(i!==undefined){let r=n.data;if(r.result){const n=JSON.parse(r.details);let u=n.map(n=>new t(n,this));i.onSuccess(Object.freeze(u))}else i.onFailure(r.details);delete this._pendingCommands[n.id]}}_deleteCommand(n){delete this._pendingCommands[n.id]}_handleCreateBadgePushChannel(n){const t=this._pendingCommands[n.id];if(t!==undefined){let i=n.data;if(i.result){let n=i.details,r=new u(this,t.messageData.tileUri,n,t.messageData.badgeServerKey);t.onSuccess(r)}else t.onFailure(i.details);delete this._pendingCommands[n.id]}}_handleRemoveBadgePushChannel(n){const t=this._pendingCommands[n.id];if(t!==undefined){let i=n.data;if(i.result)t.onSuccess(null);else t.onFailure(i.details);delete this._pendingCommands[n.id]}}_handleGetMSPinningUserGroupId(n){const t=this._pendingCommands[n.id];if(t!==undefined){let i=n.data;if(i.result){let n=i.details;t.onSuccess(n)}else t.onFailure(i.details);delete this._pendingCommands[n.id]}}_handleSetBadge(n){const t=this._pendingCommands[n.id];if(t!==undefined){let i=n.data;if(i.result)t.onSuccess(null);else t.onFailure(i.details);delete this._pendingCommands[n.id]}}_handleExposeAllowlistApis(){window.external.pinPage=(n,t)=>this._pinPage(n,t);window.external.notifyPinningPromotionShowing=n=>this._notifyPinningPromotionShowing(n);window.external.setSitePinningUserGroupId=n=>this._setSitePinningUserGroupId(n);window.external.getMSPinningUserGroupId=()=>this._getMSPinningUserGroupId()}_postMessageToExtension(n){browser.webruntime.postMessageToHost(this._extensionUri,["HostRequest",JSON.stringify(n)])}_relativeUrlToAbsolute(n){return new URL(n,window.location.href).href}}class e extends Event{constructor(n){super("onpagepinned");this.data=n}}let o,i=!1;i||(o=new f,i=!0)})()