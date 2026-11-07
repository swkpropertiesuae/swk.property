import { spawn } from 'node:child_process';
const args = process.argv.slice(2), value = (flags,fallback) => { const i=args.findIndex(a=>flags.includes(a));return i>=0?args[i+1]:fallback; };
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname',value(['--host','--hostname'],'127.0.0.1'),'--port',value(['--port','-p'],'3000')],{stdio:'inherit',env:process.env});
for (const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
