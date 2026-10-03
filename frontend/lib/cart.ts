export type CartItem={id:number;name:string;price:number;quantity:number;variant_id?:number;variant_name?:string;option_ids?:number[];options?:{name:string;price:number}[]};
const KEY='kimmere-cart';
export const getCart=():CartItem[]=>typeof window==='undefined'?[]:JSON.parse(localStorage.getItem(KEY)||'[]');
export const saveCart=(items:CartItem[])=>{localStorage.setItem(KEY,JSON.stringify(items));window.dispatchEvent(new Event('cart-change'))};
export const addCart=(item:CartItem)=>{const c=getCart();const found=c.find(x=>x.id===item.id&&x.variant_id===item.variant_id&&JSON.stringify(x.option_ids||[])===JSON.stringify(item.option_ids||[]));if(found)found.quantity+=item.quantity;else c.push(item);saveCart(c)};
export const cartTotal=(c:CartItem[])=>c.reduce((s,x)=>s+x.price*x.quantity,0);
