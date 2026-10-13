const crypto = require('node:crypto');
const COOKIE = process.env.NODE_ENV === 'production' ? '__Host-iceman_session' : 'iceman_session';
const TTL = 8 * 60 * 60;
function safeEqual(a,b){const x=Buffer.from(String(a??'')),y=Buffer.from(String(b??''));if(x.length!==y.length){const z=Buffer.alloc(Math.max(x.length,y.length,1));crypto.timingSafeEqual(z,z);return false;}return crypto.timingSafeEqual(x,y);}
function requireSecrets(){if(!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD.length<12)throw Error('ADMIN_PASSWORD must be at least 12 characters.');if(!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<32)throw Error('SESSION_SECRET must be at least 32 characters.');if(!/^[a-fA-F0-9]{64}$/.test(process.env.SETTINGS_ENCRYPTION_KEY||''))throw Error('SETTINGS_ENCRYPTION_KEY must be 64 hexadecimal characters.');}
function sign(s){return crypto.createHmac('sha256',process.env.SESSION_SECRET).update(s).digest('base64url');}
function createSession(){const payload=`${Math.floor(Date.now()/1000)+TTL}.${crypto.randomBytes(24).toString('base64url')}`;return `${payload}.${sign(payload)}`;}
function verifySession(t){if(typeof t!=='string'||t.length>512)return false;const p=t.split('.');if(p.length!==3||!/^[0-9]+$/.test(p[0]))return false;return safeEqual(p[2],sign(`${p[0]}.${p[1]}`))&&Number(p[0])>Math.floor(Date.now()/1000);}
function setCookie(res,t){res.cookie(COOKIE,t,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:TTL*1000});}
function clearCookie(res){res.clearCookie(COOKIE,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/'});}
function requireAdmin(req,res,next){if(!verifySession(req.cookies?.[COOKIE]))return res.status(401).json({error:'Please sign in again.',code:'AUTH_REQUIRED'});next();}
function requireSameOrigin(req,res,next){if(!['GET','HEAD','OPTIONS'].includes(req.method)&&req.get('x-iceman-request')!=='1')return res.status(403).json({error:'Request verification failed.'});next();}
function normalizeNumber(n){const d=String(n??'').replace(/\D/g,'');if(!/^[1-9]\d{7,14}$/.test(d))throw Error('Enter a valid international number using 8–15 digits including the country code.');return d;}
module.exports={safeEqual,requireSecrets,createSession,verifySession,setCookie,clearCookie,requireAdmin,requireSameOrigin,normalizeNumber};
