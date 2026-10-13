const fs=require('node:fs/promises'),path=require('node:path');const {DATA_DIR,ensureDataDir}=require('./settings');const FILE=path.join(DATA_DIR,'state.json');let queue=Promise.resolve();const fresh=()=>({projects:[],progress:{},conversations:[],backupHistory:[],updatedAt:new Date().toISOString()});
async function readState(){await ensureDataDir();try{return{...fresh(),...JSON.parse(await fs.readFile(FILE,'utf8'))};}catch(e){if(e.code==='ENOENT'){const s=fresh();await writeState(s);return s;}throw Error('Saved state cannot be read. Check persistent storage.');}}
async function writeState(s){await ensureDataDir();const tmp=FILE+'.tmp';queue=queue.then(async()=>{await fs.writeFile(tmp,JSON.stringify({...s,updatedAt:new Date().toISOString()},null,2),{mode:0o600});await fs.rename(tmp,FILE);});await queue;return s;}
async function updateState(fn){const s=await readState();return writeState((await fn(s))||s);}
module.exports={readState,writeState,updateState};
