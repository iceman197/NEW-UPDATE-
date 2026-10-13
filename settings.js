const fs=require('node:fs/promises');const path=require('node:path');const crypto=require('node:crypto');
const DATA_DIR=process.env.DATA_DIR||path.join(__dirname,'..','data');const FILE=path.join(DATA_DIR,'settings.enc.json');
function key(){const k=process.env.SETTINGS_ENCRYPTION_KEY||'';if(!/^[a-fA-F0-9]{64}$/.test(k))throw Error('SETTINGS_ENCRYPTION_KEY is invalid.');return Buffer.from(k,'hex');}
function encrypt(obj){const iv=crypto.randomBytes(12),c=crypto.createCipheriv('aes-256-gcm',key(),iv),data=Buffer.concat([c.update(JSON.stringify(obj)),c.final()]);return {v:1,iv:iv.toString('base64'),tag:c.getAuthTag().toString('base64'),data:data.toString('base64')};}
function decrypt(e){const d=crypto.createDecipheriv('aes-256-gcm',key(),Buffer.from(e.iv,'base64'));d.setAuthTag(Buffer.from(e.tag,'base64'));return JSON.parse(Buffer.concat([d.update(Buffer.from(e.data,'base64')),d.final()]).toString());}
async function ensureDataDir(){await fs.mkdir(DATA_DIR,{recursive:true,mode:0o700});}
const defaults=()=>({ai:{provider:'gemini',model:'gemini-2.5-flash',endpoint:'https://generativelanguage.googleapis.com',apiKey:''},preferences:{theme:'dark'},offlineAI:{status:'not-downloaded'}});
async function readSettings(){await ensureDataDir();try{return {...defaults(),...decrypt(JSON.parse(await fs.readFile(FILE,'utf8')))};}catch(e){if(e.code==='ENOENT')return defaults();throw Error('Settings cannot be decrypted. Verify SETTINGS_ENCRYPTION_KEY or restore a valid backup.');}}
async function writeSettings(s){await ensureDataDir();const tmp=FILE+'.tmp';await fs.writeFile(tmp,JSON.stringify(encrypt(s)),{mode:0o600});await fs.rename(tmp,FILE);}
function publicSettings(s){return {ai:{provider:s.ai.provider,model:s.ai.model,endpoint:s.ai.endpoint,apiKeyConfigured:Boolean(s.ai.apiKey||(s.ai.provider==='gemini'&&process.env.GEMINI_API_KEY))},preferences:s.preferences,offlineAI:s.offlineAI};}
module.exports={DATA_DIR,ensureDataDir,readSettings,writeSettings,publicSettings};
