export const API=process.env.NEXT_PUBLIC_API_BASE_URL||'http://127.0.0.1:8000/api/v1';
export async function api(path:string,init?:RequestInit){const r=await fetch(`${API}${path}`,{...init,headers:{'Content-Type':'application/json',...(init?.headers||{})},cache:'no-store'});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Request failed');return d}
