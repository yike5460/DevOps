"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.external=void 0;const tls=require("tls"),url=require("url"),aws=require("aws-sdk");let client;function iam(){return client||(client=new aws.IAM),client}function defaultLogger(fmt,...args){console.log(fmt,...args)}async function downloadThumbprint(issuerUrl){return exports.external.log(`downloading certificate authority thumbprint for ${issuerUrl}`),new Promise((ok,ko)=>{const purl=url.parse(issuerUrl),port=purl.port?parseInt(purl.port,10):443;if(!purl.host)return ko(new Error(`unable to determine host from issuer url ${issuerUrl}`));const socket=tls.connect(port,purl.host,{rejectUnauthorized:!1,servername:purl.host});socket.once("error",ko),socket.once("secureConnect",()=>{const cert=socket.getPeerCertificate();socket.end();const thumbprint=cert.fingerprint.split(":").join("");exports.external.log(`certificate authority thumbprint for ${issuerUrl} is ${thumbprint}`),ok(thumbprint)})})}exports.external={downloadThumbprint,log:defaultLogger,createOpenIDConnectProvider:req=>iam().createOpenIDConnectProvider(req).promise(),deleteOpenIDConnectProvider:req=>iam().deleteOpenIDConnectProvider(req).promise(),updateOpenIDConnectProviderThumbprint:req=>iam().updateOpenIDConnectProviderThumbprint(req).promise(),addClientIDToOpenIDConnectProvider:req=>iam().addClientIDToOpenIDConnectProvider(req).promise(),removeClientIDFromOpenIDConnectProvider:req=>iam().removeClientIDFromOpenIDConnectProvider(req).promise()};
//# sourceMappingURL=external.js.map