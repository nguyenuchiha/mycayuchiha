/* ============================================================
   mykay - script.js
   ============================================================ */

/* ---------- DATA ---------- */
const ING={kimchi:{nm:'Kim chi',ic:'🥘',price:6000,exp:1,grp:'soup'},mi:{nm:'Mì',ic:'🍜',price:3000,exp:5,grp:'noodle'},to:{nm:'Tô',ic:'🥣',price:1500,exp:null,grp:'noodle'},bomy:{nm:'Bò Mỹ',ic:'🥩',price:8200,exp:1,grp:'topping'},xucxich:{nm:'Xúc xích',ic:'🌭',price:2700,exp:3,grp:'topping'},raucai:{nm:'Rau cải',ic:'🥬',price:1400,exp:1,grp:'topping'}};
const GRPS=[{id:'soup',lbl:'Nước dùng'},{id:'noodle',lbl:'Mì & tô'},{id:'topping',lbl:'Topping'}];
const BPI=[{id:'base',nm:'Mì cay Kim chi',sub:'Gợi ý 35k · vốn 10,5k',min:20000,max:60000,step:1000},{id:'bomy',nm:'Bò Mỹ',sub:'Gợi ý 15k · vốn 8,2k',min:8000,max:25000,step:1000},{id:'xucxich',nm:'Xúc xích',sub:'Gợi ý 8k · vốn 2,7k',min:4000,max:15000,step:1000},{id:'raucai',nm:'Rau cải',sub:'Gợi ý 5k · vốn 1,4k',min:3000,max:12000,step:1000}];
const DP={base:35000,bomy:15000,xucxich:8000,raucai:5000};
const SHIP=15000;
const ET={kimchiT:{nm:'Kim chi',ic:'🌶️',price:5000,exp:5,lvl:2,cost:80000,sell:5000,grp:'topping'},dauhu:{nm:'Đậu hũ',ic:'🧈',price:6000,exp:2,lvl:2,cost:90000,sell:6000,grp:'topping'},trungT:{nm:'Trứng lòng đào',ic:'🥚',price:6000,exp:2,lvl:2,cost:100000,sell:6000,grp:'topping'},nam:{nm:'Nấm kim châm',ic:'🍄',price:6000,exp:2,lvl:3,cost:100000,sell:6000,grp:'topping'},bap:{nm:'Bắp ngọt',ic:'🌽',price:5000,exp:3,lvl:3,cost:110000,sell:5000,grp:'topping'},thanhcua:{nm:'Thanh cua',ic:'🦀',price:7000,exp:3,lvl:3,cost:130000,sell:7000,grp:'topping'},cavien:{nm:'Cá viên',ic:'🍢',price:7000,exp:3,lvl:4,cost:120000,sell:7000,grp:'topping'},rongbien:{nm:'Rong biển',ic:'🌿',price:5000,exp:5,lvl:4,cost:120000,sell:5000,grp:'topping'},bovien:{nm:'Bò viên',ic:'🍡',price:8000,exp:3,lvl:4,cost:140000,sell:8000,grp:'topping'},phomai:{nm:'Phô mai lát',ic:'🧀',price:8000,exp:5,lvl:5,cost:150000,sell:8000,grp:'topping'},chacaha:{nm:'Chả cá Hàn',ic:'🐟',price:7000,exp:3,lvl:5,cost:150000,sell:7000,grp:'topping'},trungcut:{nm:'Trứng cút',ic:'🥚',price:7000,exp:3,lvl:5,cost:160000,sell:7000,grp:'topping'},suicao:{nm:'Sủi cảo',ic:'🥟',price:9000,exp:3,lvl:5,cost:180000,sell:9000,grp:'topping'},banhgao:{nm:'Bánh gạo',ic:'🍙',price:7000,exp:3,lvl:6,cost:200000,sell:7000,grp:'topping'},bachi:{nm:'Ba chỉ heo',ic:'🥓',price:13000,exp:1,lvl:6,cost:220000,sell:13000,grp:'topping'},gagion:{nm:'Gà giòn',ic:'🍗',price:11000,exp:2,lvl:7,cost:250000,sell:11000,grp:'topping'},haisan:{nm:'Hải sản',ic:'🦐',price:18000,exp:1,lvl:8,cost:300000,sell:18000,grp:'topping'},bachtuoc:{nm:'Bạch tuộc',ic:'🐙',price:16000,exp:1,lvl:9,cost:320000,sell:16000,grp:'topping'}};
const EB={tomyum:{nm:'Tomyum',ic:'🍲',lvl:3,cost:250000,sell:39000},launam:{nm:'Lẩu nấm',ic:'🍲',lvl:4,cost:280000,sell:38000},tuongden:{nm:'Tương đen',ic:'🍲',lvl:5,cost:300000,sell:38000},mala:{nm:'Mala Tứ Xuyên',ic:'🍲',lvl:5,cost:350000,sell:44000},tieuxanh:{nm:'Bò tiêu xanh',ic:'🍲',lvl:6,cost:380000,sell:43000},suaphomai:{nm:'Sữa phô mai',ic:'🍲',lvl:7,cost:400000,sell:42000},galae:{nm:'Gà lá é',ic:'🍲',lvl:8,cost:420000,sell:45000},rieucua:{nm:'Riêu cua',ic:'🍲',lvl:9,cost:480000,sell:48000}};
const EQ={wifi:{nm:'Wifi miễn phí',ic:'📶',cat:'tb',lvl:2,cost:250000,desc:'Khách chờ lâu hơn 12%'},bieden:{nm:'Biển đèn MÌ CAY',ic:'💡',cat:'tb',lvl:2,cost:300000,desc:'+20% khách'},quat:{nm:'Quạt hơi nước',ic:'🌬️',cat:'tb',lvl:3,cost:350000,desc:'Khách chờ lâu hơn 25%'},ghe:{nm:'Ghế đệm êm',ic:'💺',cat:'tb',lvl:4,cost:350000,desc:'Khách chờ lâu hơn 12%'},bep:{nm:'Bếp lửa lớn',ic:'🔥',cat:'tb',lvl:5,cost:400000,desc:'Vùng xanh rộng hơn'},app:{nm:'App giao hàng',ic:'📱',cat:'tb',lvl:5,cost:500000,desc:'Nhận đơn giao xa'},tivi:{nm:'Tivi ca nhạc',ic:'📺',cat:'tb',lvl:6,cost:450000,desc:'Khách chờ lâu hơn 10%'},tiktok:{nm:'Quay TikTok',ic:'🎬',cat:'tb',lvl:6,cost:500000,desc:'+25% khách'},keban:{nm:'Kê thêm bàn',ic:'🪑',cat:'tb',lvl:7,cost:600000,desc:'+1 chỗ ngồi'},hutip:{nm:'Hũ tip heo đất',ic:'🐷',cat:'pk',lvl:2,cost:120000,desc:'Tip nhiều hơn 50%'},toroi:{nm:'Tờ rơi',ic:'📄',cat:'pk',lvl:2,cost:150000,desc:'+10% khách'},loakeokeo:{nm:'Loa kẹo kéo',ic:'📢',cat:'pk',lvl:3,cost:250000,desc:'+12% khách'},menuin:{nm:'Menu in màu',ic:'📋',cat:'pk',lvl:4,cost:400000,desc:'Khách chấp nhận giá cao'},meothantai:{nm:'Mèo thần tài',ic:'🐱',cat:'pk',lvl:4,cost:450000,desc:'+5k tip mỗi tô'},ghimmap:{nm:'Ghim Google Maps',ic:'📍',cat:'pk',lvl:5,cost:350000,desc:'+15% khách'},bangled:{nm:'Bảng LED',ic:'🪧',cat:'pk',lvl:5,cost:400000,desc:'Tối +25% khách'},tosu:{nm:'Tô sứ vẽ tay',ic:'🥣',cat:'pk',lvl:6,cost:600000,desc:'Tip +3k mỗi tô'},kol:{nm:'KOL review',ic:'⭐',cat:'pk',lvl:8,cost:1200000,desc:'+30% khách'},chiMan:{nm:'Chị Mận · Thu ngân',ic:'👩',cat:'nv',lvl:3,wage:40000,desc:'Khách không ăn quỵt'},beNa:{nm:'Bé Na · Phụ bếp',ic:'👧',cat:'nv',lvl:4,wage:28000,desc:'Tự vớt mì đúng lúc'},beMit:{nm:'Bé Mít · Chạy bàn',ic:'👦',cat:'nv',lvl:5,wage:45000,desc:'Khách kiên nhẫn hơn 15%'}};
const EC={nv:'Nhân viên',tb:'Trang bị',pk:'Phụ kiện'};
const DC={awning:[{id:'do',nm:'Đỏ ớt',c1:'#d94a3d',c2:'#fff',lvl:1},{id:'hong',nm:'Hồng đậu',c1:'#c48a9c',c2:'#e8d4d0',lvl:2},{id:'xanh',nm:'Xanh bạc hà',c1:'#7dab9a',c2:'#e8e0d0',lvl:3},{id:'vang',nm:'Vàng trứng',c1:'#c9a23d',c2:'#f0e0c0',lvl:4},{id:'tim',nm:'Tím khoai môn',c1:'#8a7db8',c2:'#d8d0e8',lvl:6}],pet:[{id:'hamster',nm:'Hamster Đậu',ic:'🐹',lvl:4,desc:'Ôm hạt hướng dương'},{id:'meo',nm:'Mèo mướp Mochi',ic:'🐱',lvl:6,desc:'Ngủ trước cửa'},{id:'cho',nm:'Cún shiba Bơ',ic:'🐶',lvl:8,desc:'Vẫy đuôi'}],plant:[{id:'xuong',nm:'Chậu xương rồng',ic:'🌵',lvl:2,desc:'Nhỏ xinh'},{id:'cuc',nm:'Chậu hoa cúc',ic:'🌼',lvl:3,desc:'Ai cũng nhìn'},{id:'trau',nm:'Cây trầu bà',ic:'🌿',lvl:4,desc:'Lá xanh mát'}],light:[{id:'den',nm:'Đèn lồng đỏ',ic:'🏮',lvl:3,desc:'Treo hai bên'},{id:'chuong',nm:'Chuông gió',ic:'🎐',lvl:5,desc:'Leng keng'}]};
const FA=['👩','👨','🧓','👵','👴','🧒','👦','👧','🧔','👩‍🦰','👨‍🦱','🧑'];
const NA=['Trinh','Hùng','Lan','Minh','Hà','An','Bảo','Vy','Khôi','Nhi','Linh','Khang','My','Duy'];
const PR=['Chị','Anh','Cô','Bác','Em'];
const RT={5:['Ngon tuyệt vời!','Quán nhỏ mà chất!','Cay đúng cấp!'],4:['Ngon, chỉ hơi chờ.','Ổn áp, giá hợp lý.'],3:['Tạm được.','Chờ hơi lâu.'],2:['Mì nhũn quá.','Chờ lâu kinh khủng.'],1:['Quá tệ.','Sai món hoàn toàn.']};
const LN=['Xe đẩy vỉa hè','Quán cóc','Tiệm nhỏ','Tiệm nổi tiếng','Vua mì cay'];
const LB=[{name:'Bộ cánh cam',lvl:10,day:241,money:900171900},{name:'Tiệm ăn bug',lvl:10,day:179,money:891189100},{name:'Trôn có lài',lvl:10,day:167,money:656846700},{name:'Tiệm Mỳ Của Bé Tín',lvl:10,day:135,money:503052200},{name:'Ngăn Bọt Tơ',lvl:10,day:121,money:467569800},{name:'Bá Khí Trường O',lvl:10,day:133,money:411978600}];
const NB=[{name:'Chauxhamster 🐙',lvl:10,rank:25174},{name:'Susu ơte',lvl:10,rank:25175},{name:'cay xốn lè',lvl:10,rank:25176},{name:'Mì Cay Tê Tái',lvl:10,rank:25177},{name:'tiệm mì c',lvl:10,rank:25178},{name:'Mì Cay Nhà Dulcie',lvl:10,rank:25179}];
const TB=[{name:'Mì cay xé lớn',score:3371},{name:'Mì Cay Nhà Sam',score:3354},{name:'Tìm mì Jseoul',score:3353}];
const RENT=50000,UTIL=20000;
const LV=[0,150,400,800,1400,2200,3300,4800,6800,9500,13000];
const fm=n=>Math.round(n).toLocaleString('vi-VN')+'đ';
const fk=n=>n>=1e6?(n/1e6).toFixed(1).replace('.',',')+'M':n>=1e3?Math.round(n/1e3)+'k':Math.round(n)+'đ';
const $=id=>document.getElementById(id);
const rd=a=>a[Math.floor(Math.random()*a.length)];

/* ---------- STATE ---------- */
let S={shopName:'mykay',day:1,time:9*60,money:400000,loan:0,xp:0,totalProfit:0,stars:4.0,reviews:0,tab:'kho',stock:{},buy:{},prices:{...DP},owned:{},decor:{awning:'do',pet:null,plant:null,light:null},reviewList:[],hired:{},haggleDiscount:0,haggledToday:false,missionBowl:0,missionAngry:0,missionFive:0,branches:1,pranksToday:0,tournamentsToday:0,collectedBowls:0,dirtyBowls:0,employeeMood:{},quanLyVui:true,nhanVienAnChan:{}};
for(const id in ING){S.stock[id]={qty:0,exp:null};S.buy[id]=0;}
for(const id in ET){S.stock[id]={qty:0,exp:null};S.buy[id]=0;}
for(const id in EB){S.stock[id]={qty:0,exp:null};}
let bowl={hasBowl:false,base:null,noodleState:null,cooking:false,cookProgress:0,toppings:[],chili:0};
let miTrongRo=[];
let customers=[];let nextCustId=1,servedToday=0,angryToday=0,revToday=0,fiveStarsToday=0,bowlsReturnedToday=0;
let dayTotal=8,spawnTimer=0.6;let running=false,lastTime=performance.now();
let tournamentMode=false,tournamentTimer=0,tournamentScore=0;let deliveryGame=null;let orderStripLastId=undefined;
let washState=null,washRafId=null;
let qlTimer=0;
let boxingActive=false;
let evActive=false;
let hgS=null,hgR=null;
let tIdx=0;
let appOrders = [];        // Danh sách đơn app đang chờ
let nextAppId = 1;         // ID đơn app
let appSpawnTimer = 5;     // Đếm ngược sinh đơn

/* ---------- SAVE / LOAD ---------- */
function save(){
  try{
    localStorage.setItem('micaay_v7',JSON.stringify({
      shopName:S.shopName,day:S.day,money:S.money,loan:S.loan,xp:S.xp,totalProfit:S.totalProfit,
      stock:S.stock,stars:S.stars,reviews:S.reviews,owned:S.owned,decor:S.decor,
      reviewList:S.reviewList.slice(-50),hired:S.hired,prices:S.prices,branches:S.branches,
      collectedBowls:S.collectedBowls,dirtyBowls:S.dirtyBowls,employeeMood:S.employeeMood,
      nhanVienAnChan:S.nhanVienAnChan
    }));
  }catch(e){}
}

function load(){
  try{const s=localStorage.getItem('micaay_v7');if(s)Object.assign(S,JSON.parse(s));}catch(e){}
  for(const id in ING)if(!S.stock[id])S.stock[id]={qty:0,exp:null};
  for(const id in ET)if(!S.stock[id])S.stock[id]={qty:0,exp:null};
  for(const id in EB)if(!S.stock[id])S.stock[id]={qty:0,exp:null};
  for(const id in ING)S.buy[id]=0;
  for(const id in ET)S.buy[id]=0;
  if(!S.owned)S.owned={};
  if(!S.decor)S.decor={awning:'do',pet:null,plant:null,light:null};
  if(!S.reviewList)S.reviewList=[];
  if(!S.hired)S.hired={};
  if(!S.prices)S.prices={...DP};
  if(!S.branches)S.branches=1;
  if(!S.shopName)S.shopName='mykay';
  if(typeof S.dirtyBowls!=='number')S.dirtyBowls=0;
  if(!S.employeeMood)S.employeeMood={};
  if(!S.nhanVienAnChan)S.nhanVienAnChan={};
  if(typeof S.loan!=='number')S.loan=0;
}

/* ---------- HELPERS ---------- */
function level(){for(let i=LV.length-1;i>=0;i--)if(S.xp>=LV[i])return i+1;return 1;}
function lnf(lv){return LN[Math.min(Math.floor((lv-1)/2),LN.length-1)];}
function lvl(){return lnf(level());}
function xpp(){const lv=level(),c=LV[lv-1]||0,n=LV[lv]||LV[LV.length-1];if(n<=c)return 100;return Math.min(100,((S.xp-c)/(n-c))*100);}
function tst(m,c=''){const e=document.createElement('div');e.className='tt2 '+c;e.textContent=m;document.body.appendChild(e);setTimeout(()=>e.remove(),1700);}
function sw(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));const e=$(id);if(e)e.classList.add('on');}
function sts(n){const f=Math.floor(n),h=n-f>=.5?1:0;return '★'.repeat(f)+(h?'☆':'')+'☆'.repeat(5-f-h);}
function hu(id){return !!S.owned[id];}
function gi(id){return ING[id]||ET[id]||null;}
function gn(id){const it=ING[id]||ET[id];return it?it.nm:id;}
function gb(id){if(id==='kimchi')return{nm:'Kim chi',ic:'🥘',sell:S.prices.base};const b=EB[id];return b?{nm:b.nm,ic:b.ic,sell:b.sell}:{nm:id,ic:'🍲',sell:35000};}
function pm(){let m=1;if(hu('wifi'))m+=.12;if(hu('quat'))m+=.25;if(hu('ghe'))m+=.12;if(hu('tivi'))m+=.10;if(hu('beMit'))m+=.15;return m;}
function cm2(){let m=1+(S.branches-1)*.5;if(hu('bieden'))m+=.20;if(hu('toroi'))m+=.10;if(hu('loakeokeo'))m+=.12;if(hu('tiktok'))m+=.25;if(hu('ghimmap'))m+=.15;if(hu('kol'))m+=.30;return m;}
function tm(){let m=1;if(hu('hutip'))m+=.5;return m;}
function etb(){let t=0;if(hu('tosu'))t+=3000;if(hu('meothantai'))t+=5000;return t;}
function ms(){return 3;}
function cgz(){return hu('bep')?[.30,.80]:[.35,.75];}
function ts2(){let t=0;for(const id in S.hired)if(S.hired[id]===true&&EQ[id]&&EQ[id].wage)t+=EQ[id].wage;return t;}
function hdu(){return hu('app');}
function rcm(){const z=$('cmZone');if(!z)return;const[g1,g2]=cgz();z.style.background=`linear-gradient(90deg,#5a2020 0%,#5a2020 ${g1*100}%,#4a9e4a ${g1*100}%,#4a9e4a ${g2*100}%,#5a2020 ${g2*100}%,#5a2020 100%)`;}

/* ---------- AUDIO ---------- */
let bgmCtx=null,bgmTimer=null,bgmOn=false,bgmVol=0.15;
const bgmScale=[261.63,293.66,329.63,392.00,440.00];
const bgmBass=[130.81,146.83,164.81,196.00,220.00];
function startBGM(){
  if(bgmOn)return;
  try{
    if(!bgmCtx)bgmCtx=new(window.AudioContext||window.webkitAudioContext)();
    if(bgmCtx.state==='suspended')bgmCtx.resume();
  }catch(e){return;}
  bgmOn=true;
  let beat=0;
  const playNote=(freq,dur,vol,type='triangle')=>{
    const o=bgmCtx.createOscillator();
    const g=bgmCtx.createGain();
    o.type=type;o.frequency.value=freq;
    g.gain.setValueAtTime(0,bgmCtx.currentTime);
    g.gain.linearRampToValueAtTime(vol*bgmVol,bgmCtx.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.001,bgmCtx.currentTime+dur);
    o.connect(g);g.connect(bgmCtx.destination);
    o.start();o.stop(bgmCtx.currentTime+dur+0.05);
  };
  bgmTimer=setInterval(()=>{
    if(!bgmOn)return;
    if(beat%2===0){const n=bgmScale[Math.floor(Math.random()*bgmScale.length)];playNote(n,0.5,0.5,'triangle');}
    if(beat%4===0){const b=bgmBass[Math.floor(Math.random()*bgmBass.length)];playNote(b,1.2,0.6,'sine');}
    beat++;
  },400);
}
function stopBGM(){bgmOn=false;if(bgmTimer){clearInterval(bgmTimer);bgmTimer=null;}}
function toggleBGM(){if(bgmOn)stopBGM();else startBGM();const b=$('btnBGM');if(b)b.textContent=bgmOn?'🔊 Nhạc':'🔇 Nhạc';save();}

/* ---------- START / TUTORIAL ---------- */
function initStart(){
  $('btnOpenShop').onclick=()=>{sw('s-prep');rPrep();if(!bgmOn)startBGM();};
  $('btnHowto').onclick=()=>{sw('s-tut');shTut(0);};
  $('btnLeaderboard').onclick=sLB;
  $('btnRename').onclick=sRN;
  $('btnPrank').onclick=sPK;
  $('btnTournament').onclick=sTN;
}
function initTut(){
  const sl=document.querySelectorAll('.ts'),d=$('tutDots');
  d.innerHTML='';
  sl.forEach((_,i)=>{const e=document.createElement('div');e.className='tdd'+(i===0?' on':'');d.appendChild(e);});
  $('tutNext').onclick=()=>{if(tIdx<sl.length-1)shTut(tIdx+1);else{sw('s-prep');rPrep();}};
  $('tutClose').onclick=()=>sw('s-start');
}
function shTut(i){
  tIdx=i;const sl=document.querySelectorAll('.ts');
  sl.forEach((s,j)=>s.classList.toggle('on',j===i));
  document.querySelectorAll('.tdd').forEach((d,j)=>d.classList.toggle('on',j===i));
  $('tutNext').textContent=i===sl.length-1?'Vào bếp':'Tiếp';
}

/* ---------- BANK ---------- */
function showBankModal(){
  const m=$('modal');
  m.innerHTML=`
    <div class="cd">
      <h2>🏦 Ngân Hàng mykay</h2>
      <p style="margin-bottom:15px;">Lãi suất: ̀5%/năm (Thu lãi mỗi cuối ngày)</p>
      <div class="rl"><div>Tiền mặt hiện có:</div><div class="po">${fm(S.money)}</div></div>
      <div class="rl"><div>Dư nợ hiện tại:</div><div class="ne">${fm(S.loan)}</div></div>
      <div class="rl"><div>Tiền lãi ước tính (hôm nay):</div><div class="ne">-${fm(Math.max(1,Math.floor(S.loan*(0.05/365))))}</div></div>
      <div style="margin-top:15px;display:flex;gap:10px;">
        <input type="number" id="bankAmount" placeholder="Nhập số tiền..." style="flex:1;">
      </div>
      <div style="display:flex;gap:10px;margin-top:10px;">
        <button class="cbb gr" id="btnBorrow" style="flex:1">Vay tiền</button>
        <button class="cbb" id="btnRepay" style="flex:1;background:var(--gold);box-shadow:0 3px 0 #a87b1c;color:#000;">Trả nợ</button>
      </div>
      <button class="cbb gy" id="btnCloseBank">Đóng</button>
    </div>`;
  m.classList.add('on');
  $('btnCloseBank').onclick=()=>m.classList.remove('on');
  $('btnBorrow').onclick=()=>{
    let amt=parseInt($('bankAmount').value);
    if(!amt||amt<=0)return tst('Vui lòng nhập số hợp lệ!','b');
    if(S.loan+amt>100000000)return tst('Ngân hàng từ chối cho vay thêm!','b');
    S.money+=amt;S.loan+=amt;save();
    showBankModal();if(typeof rPrep==='function')rPrep();
    tst('Đã giải ngân '+fk(amt),'g');
  };
  $('btnRepay').onclick=()=>{
    let amt=parseInt($('bankAmount').value);
    if(!amt||amt<=0)return tst('Vui lòng nhập số hợp lệ!','b');
    if(amt>S.money)return tst('Bạn không đủ tiền mặt!','b');
    if(amt>S.loan)amt=S.loan;
    S.money-=amt;S.loan-=amt;save();
    showBankModal();if(typeof rPrep==='function')rPrep();
    tst('Đã trả '+fk(amt)+' tiền nợ','g');
  };
}

/* ---------- SELL SHOP (làm lại từ đầu) ---------- */
function sellShop(){
  // Tính giá bán: 60% tài sản hiện có, trừ đi nợ
  const assetValue = Math.max(0, Math.round((S.money + S.totalProfit*0.3) * 0.6));
  const finalCash = Math.max(0, assetValue - S.loan);

  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`
    <h2>💸 Bán quán để làm lại</h2>
    <div style="text-align:center;font-size:50px;margin:8px 0">🏪💔</div>
    <p>Bạn sẽ bán toàn bộ quán, tô, nguyên liệu, trang trí, nhân viên...<br>
    Sau đó <b style="color:var(--gold)">chơi lại từ ngày 1</b> với số tiền mặt còn lại.</p>
    <div class="rl"><span>Tài sản ước tính</span><span class="po">${fm(assetValue)}</span></div>
    <div class="rl"><span>Dư nợ ngân hàng</span><span class="ne">-${fm(S.loan)}</span></div>
    <div class="rl" style="border-top:2px solid var(--border);padding-top:8px;margin-top:6px">
      <span><b>Tiền nhận được</b></span>
      <span class="${finalCash>=0?'po':'ne'}"><b>${finalCash>=0?'+':''}${fm(finalCash)}</b></span>
    </div>
    <p style="color:var(--red);font-size:11px;margin-top:10px">⚠️ Hành động này không thể hoàn tác!</p>
    <button class="cbb" id="ssConfirm" style="background:var(--red);box-shadow:0 3px 0 var(--red-dk)">💸 Xác nhận bán quán</button>
    <button class="cbb gh" id="ssCancel">❌ Ở lại làm tiếp</button>
  `;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');

  cd.querySelector('#ssCancel').onclick=()=>m.classList.remove('on');
  cd.querySelector('#ssConfirm').onclick=()=>{
    if(!confirm('Bạn chắc chắn muốn BÁN QUÁN và chơi lại từ đầu?'))return;

    // Reset toàn bộ state về mặc định, chỉ giữ tiền mặt còn lại
    const leftover = finalCash;
    S = {
      shopName: S.shopName || 'mykay',
      day: 1, time: 9*60,
      money: Math.max(200000, leftover),   // tối thiểu 200k để tái khởi nghiệp
      loan: 0, xp: 0, totalProfit: 0,
      stars: 4.0, reviews: 0, tab: 'kho',
      stock: {}, buy: {}, prices: {...DP},
      owned: {}, decor: {awning:'do', pet:null, plant:null, light:null},
      reviewList: [], hired: {},
      haggleDiscount: 0, haggledToday: false,
      missionBowl: 0, missionAngry: 0, missionFive: 0,
      branches: 1, pranksToday: 0, tournamentsToday: 0,
      collectedBowls: 0, dirtyBowls: 0,
      employeeMood: {}, quanLyVui: true, nhanVienAnChan: {}
    };
    // Khởi tạo lại stock/buy
    for(const id in ING){S.stock[id]={qty:0,exp:null};S.buy[id]=0;}
    for(const id in ET){S.stock[id]={qty:0,exp:null};S.buy[id]=0;}
    for(const id in EB){S.stock[id]={qty:0,exp:null};}

    // Reset biến runtime
    bowl={hasBowl:false,base:null,noodleState:null,cooking:false,cookProgress:0,toppings:[],chili:0};
    miTrongRo=[];customers=[];
    servedToday=0;angryToday=0;revToday=0;fiveStarsToday=0;bowlsReturnedToday=0;
    running=false;tournamentMode=false;

    save();
    m.classList.remove('on');
    tst('Đã bán quán! Chúc may mắn lần sau 🍜','g');
    sw('s-start');
    rPrep();
  };
}

/* ---------- PREP ---------- */
function rPrep(){
  $('prepDay').textContent=S.day;$('prepMoney').textContent=fk(S.money);
  $('prepStars').textContent=sts(S.stars);$('prepRate').textContent=S.stars.toFixed(1);
  $('prepRevCount').textContent=S.reviews+' đánh giá';
  $('brandName').textContent=S.shopName;$('startTitle').textContent=S.shopName;
  $('lvlNum').textContent=level();$('lvlName').textContent=lvl();
  const lv=level(),c=LV[lv-1]||0,n=LV[lv]||LV[LV.length-1];
  $('xpCur').textContent=S.xp;$('xpNext').textContent=n;$('xpFill').style.width=xpp()+'%';
  $('mBowl').textContent=S.missionBowl+'/6';$('mBowl').classList.toggle('dn',S.missionBowl>=6);
  $('mNoAngry').textContent=S.missionAngry===0?'cuối ngày':'thất bại';
  $('mFiveStars').textContent=S.missionFive+'/3';$('mFiveStars').classList.toggle('dn',S.missionFive>=3);

  const aw=DC.awning.find(a=>a.id===S.decor.awning)||DC.awning[0];
  const abg=`repeating-linear-gradient(90deg,${aw.c1} 0 16px,${aw.c2} 16px 32px)`;
  // Chỉ áp dụng cho màn start, không áp dụng cho màn prep vì đã dùng ảnh
  if($('startAwning')) $('startAwning').style.background=abg;

  const pt=S.decor.pet?DC.pet.find(p=>p.id===S.decor.pet):null;
  if($('shopPet')) $('shopPet').textContent=pt?pt.ic:'';

  const pl=S.decor.plant?DC.plant.find(p=>p.id===S.decor.plant):null;
  if($('shopPlants')) $('shopPlants').innerHTML=pl?`<span>${pl.ic}</span><span></span><span>${pl.ic}</span>`:'';

  const li=S.decor.light?DC.light.find(l=>l.id===S.decor.light):null;
  if($('shopLanterns')) $('shopLanterns').innerHTML=li?`<span>${li.ic}</span><span>${li.ic}</span>`:'';

  document.querySelectorAll('#prepTabs .tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===S.tab));
  $('btnServeDay').textContent='🚪 Mở cửa ngày '+S.day;
  $('btnServeDay').onclick=openDay;

  const bb=$('btnBuy');
  bb.disabled=true;bb.textContent='🛒 Nhập hàng';
  bb.style.background='#555';bb.style.boxShadow='0 4px 0 #333';
  bb.style.cursor='not-allowed';bb.onclick=null;

  rSA();

  const pmo=$('prepMoney');
  if(pmo){
    pmo.parentElement.style.cursor='pointer';
    pmo.parentElement.onclick=showBankModal;
  }

  // Nút "Bán quán" chỉ hiện khi đang lỗ nặng
  let sellBtn = $('btnSellShop');
  if(!sellBtn){
    sellBtn = document.createElement('button');
    sellBtn.id = 'btnSellShop';
    sellBtn.className = 'bp';
    sellBtn.style.cssText = 'flex:1;background:#7a3a3a;box-shadow:0 4px 0 #4a2020;font-size:12px';
    sellBtn.textContent = '💸 Bán quán';
    sellBtn.onclick = sellShop;
    const pf = document.querySelector('#s-prep .pf > div');
    if(pf) pf.appendChild(sellBtn);
  }
  const inTrouble = S.money < 0 || S.loan > 100000;
  sellBtn.style.display = inTrouble ? 'block' : 'none';
}

function initTabs(){
  document.querySelectorAll('#prepTabs .tab').forEach(t=>{
    t.onclick=()=>{
      S.tab=t.dataset.tab;
      rPrep();
    };
  });
}

function rSA(){
  const b=$('stockArea');b.innerHTML='';
  if(S.tab==='kho')rKho(b);
  else if(S.tab==='gia')rGia(b);
  else if(S.tab==='nang')rNang(b);
  else if(S.tab==='trang')rTrang(b);
  else if(S.tab==='danh')rDanh(b);
  else if(S.tab==='so')rSo(b);
}
function rKho(box){
  for(const id in S.stock){if(S.stock[id].exp!==null&&S.stock[id].exp<S.day){S.stock[id].qty=0;S.stock[id].exp=null;}}
  if(!S.haggledToday){
    const b=document.createElement('div');b.className='hg';
    b.innerHTML=`<div class="ha">👩</div><div class="hi"><div class="n">Đi chợ trả giá</div><div class="s">Chốt giá 3 lượt, bớt tối 15%.</div></div><button class="hb" id="hgb">Trả giá</button>`;
    box.appendChild(b);
    b.querySelector('#hgb').onclick=sHG;
  }else if(S.haggleDiscount>0){
    const b=document.createElement('div');b.className='hg';
    b.innerHTML=`<div class="ha">✅</div><div class="hi"><div class="n">Đã trả giá</div><div class="s">Giảm <b style="color:var(--gold)">${S.haggleDiscount}%</b></div></div>`;
    box.appendChild(b);
  }
  const ai={...ING};
  for(const id in ET){if(hu(id))ai[id]=ET[id];}
  for(const g of GRPS){
    const its=Object.keys(ai).filter(id=>ai[id].grp===g.id);
    if(!its.length)continue;
    const t=document.createElement('div');t.className='stl2';t.textContent=g.lbl;box.appendChild(t);
    for(const id of its){
      const it=ai[id],st=S.stock[id],bn=S.buy[id]||0;
      let ex='';
      if(st.exp!==null&&st.exp<=S.day+1&&st.qty>0)ex=' · <span style="color:var(--red)">hết hạn tối nay</span>';
      const lt=it.exp?`Để được ${it.exp} ngày`:'Không hết hạn';
      const r=document.createElement('div');r.className='ir';
      r.innerHTML=`<div class="ii">${it.ic}</div><div class="im"><div class="n">${it.nm}</div><div class="s">${lt} · ${(it.price/1000).toFixed(1)}k/phần</div><div class="s">Còn ${st.qty}${ex}</div></div><div class="qc"><button class="qb" data-id="${id}" data-d="-1" ${bn<1?'disabled':''}>−</button><div class="qn">${bn}</div><button class="qb pl" data-id="${id}" data-d="1">＋</button></div>`;
      box.appendChild(r);
    }
  }
  const ub=Object.keys(EB).filter(id=>hu(id));
  if(ub.length){
    const t=document.createElement('div');t.className='stl2';t.textContent='Nước dùng mới';box.appendChild(t);
    for(const id of ub){
      const b=EB[id],st=S.stock[id]||{qty:0},bn=S.buy[id]||0;
      const r=document.createElement('div');r.className='ir';
      r.innerHTML=`<div class="ii">${b.ic}</div><div class="im"><div class="n">${b.nm}</div><div class="s">Để được 1 ngày · 6.5k/phần</div><div class="s">Còn ${st.qty}</div></div><div class="qc"><button class="qb" data-id="${id}" data-d="-1" ${bn<1?'disabled':''}>−</button><div class="qn">${bn}</div><button class="qb pl" data-id="${id}" data-d="1">＋</button></div>`;
      box.appendChild(r);
    }
  }
  let tot=0;
  for(const id in S.buy){
    const q=S.buy[id];if(!q)continue;
    let p=0;
    if(ING[id])p=ING[id].price;
    else if(ET[id])p=ET[id].price;
    else if(EB[id])p=6500;
    tot+=q*p;
  }
  if(S.haggleDiscount>0)tot=Math.round(tot*(1-S.haggleDiscount/100));
  const sm=document.createElement('div');
  sm.style.cssText='padding:14px 0 8px;display:flex;justify-content:space-between;font-size:13px';
  sm.innerHTML=`<span>Tiền nhập hàng:</span><b style="color:${tot>S.money?'var(--red)':'var(--gold)'}">${fm(tot)}${S.haggleDiscount>0?` <span style="color:var(--green);font-size:11px">(-${S.haggleDiscount}%)</span>`:''}</b>`;
  box.appendChild(sm);
  box.querySelectorAll('.qb').forEach(x=>{
    x.onclick=()=>{
      const id=x.dataset.id,d=parseInt(x.dataset.d);
      S.buy[id]=Math.max(0,(S.buy[id]||0)+d);
      rPrep();
    };
  });
  const bb=$('btnBuy');
  if(tot>0){
    bb.disabled=false;bb.textContent=`🛒 Nhập hàng · ${fk(tot)}`;
    bb.style.background='var(--red)';bb.style.boxShadow='0 4px 0 var(--red-dk)';bb.style.cursor='pointer';
    bb.onclick=()=>doBuy(tot);
  }else{
    bb.disabled=true;bb.textContent='🛒 Nhập hàng';
    bb.style.background='#555';bb.style.boxShadow='0 4px 0 #333';bb.style.cursor='not-allowed';
    bb.onclick=null;
  }
}
function doBuy(t){
  if(t>S.money){tst('Không đủ tiền!','b');return;}
  S.money-=t;
  for(const id in S.buy){
    const q=S.buy[id];
    if(q>0){
      const it=ING[id]||ET[id];
      const ed=it?it.exp:(EB[id]?1:null);
      S.stock[id].qty+=q;
      if(ed)S.stock[id].exp=S.day+ed-1;
      S.buy[id]=0;
    }
  }
  S.haggleDiscount=0;tst('Đã nhập hàng!','g');rPrep();save();
}
function rGia(box){
  box.insertAdjacentHTML('beforeend','<div style="font-size:11px;color:var(--dim);padding:4px 0 10px;line-height:1.4">Giá cao lời nhiều nhưng ít khách. Quá đắt khách chê và trừ sao.</div>');
  BPI.forEach(it=>{
    const r=document.createElement('div');r.className='ir';
    r.innerHTML=`<div class="im"><div class="n">${it.nm}</div><div class="s">${it.sub}</div></div><div class="qc"><button class="qb" data-id="${it.id}" data-d="-1" ${S.prices[it.id]<=it.min?'disabled':''}>−</button><div class="pn2">${(S.prices[it.id]/1000)}k</div><button class="qb pl" data-id="${it.id}" data-d="1" ${S.prices[it.id]>=it.max?'disabled':''}>+</button></div>`;
    box.appendChild(r);
  });
  box.querySelectorAll('.qb').forEach(x=>{
    x.onclick=()=>{
      const id=x.dataset.id,d=parseInt(x.dataset.d),cf=BPI.find(y=>y.id===id);
      const nv=S.prices[id]+d*cf.step;
      if(nv<cf.min||nv>cf.max)return;
      S.prices[id]=nv;rPrep();
    };
  });
}
function rNang(box){
  const lv=level();
  const t1=document.createElement('div');t1.className='stl2';t1.textContent='Món mới';box.appendChild(t1);
  box.insertAdjacentHTML('beforeend','<div style="font-size:11px;color:var(--dim);padding:0 0 6px">Mở khoá món để khách gọi đa dạng.</div>');
  const au=[...Object.keys(ET).map(id=>({id,...ET[id],ty:'t'})),...Object.keys(EB).map(id=>({id,...EB[id],ty:'b'}))];
  au.forEach(u=>{
    const ow=hu(u.id),r=document.createElement('div');r.className='ir';let ri;
    if(ow)ri='<span class="bb own">✓</span>';
    else if(lv<u.lvl)ri=`<span class="lb2">🔒 Cấp ${u.lvl}</span>`;
    else ri=`<button class="bb" data-id="${u.id}" ${S.money>=u.cost?'':'disabled'}>${fk(u.cost)}</button>`;
    const d=u.ty==='b'?`Món chính · gợi ý ${Math.round(u.sell/1000)}k`:`Topping · ${Math.round(u.sell/1000)}k · ${u.exp} ngày`;
    r.innerHTML=`<div class="ii">${u.ic}</div><div class="im"><div class="n">${u.nm}</div><div class="s">${d}</div><div class="s">Mở giá ${fk(u.cost)}</div></div>${ri}`;
    box.appendChild(r);
  });
  for(const ci in EC){
    const its=Object.keys(EQ).filter(id=>EQ[id].cat===ci);if(!its.length)continue;
    const t=document.createElement('div');t.className='stl2';t.textContent=EC[ci];box.appendChild(t);
    its.forEach(id=>{
      const u=EQ[id],ow=hu(id),r=document.createElement('div');r.className='ir';let ri;
      if(ow)ri='<span class="bb own">✓</span>';
      else if(lv<u.lvl)ri=`<span class="lb2">🔒 Cấp ${u.lvl}</span>`;
      else{const ct=u.cost>0?fk(u.cost):(u.wage?u.wage/1000+'k/ngày':'Miễn phí');ri=`<button class="bb" data-id="${id}" ${S.money>=(u.cost||0)?'':'disabled'}>${ct}</button>`;}
      const pl2=u.cost>0?`<div class="s">Mở giá ${fk(u.cost)}</div>`:'';
      r.innerHTML=`<div class="ii">${u.ic}</div><div class="im"><div class="n">${u.nm}</div><div class="s">${u.desc}</div>${pl2}</div>${ri}`;
      box.appendChild(r);
    });
  }
  box.querySelectorAll('.bb[data-id]').forEach(x=>{
    x.onclick=()=>{
      const id=x.dataset.id;
      const u=ET[id]||EB[id]||EQ[id];if(!u)return;
      const c=u.cost||0;
      if(c>0&&S.money<c){tst('Không đủ tiền!','b');return;}
      if(c>0)S.money-=c;
      S.owned[id]=true;
      if(EQ[id]&&EQ[id].cat==='nv'){S.hired[id]=true;S.employeeMood[id]=1;}
      tst('Đã mở khoá: '+u.nm,'g');save();rPrep();
    };
  });
}
function rTrang(box){
  const t1=document.createElement('div');t1.className='stl2';t1.textContent='Màu mái hiên';box.appendChild(t1);
  const ar=document.createElement('div');ar.className='ar2';
  DC.awning.forEach(a=>{
    const lk=level()<a.lvl,sl=S.decor.awning===a.id;
    const c=document.createElement('div');
    c.className='ac2'+(lk?' lk':'')+(sl?' sel':'');
    c.innerHTML=`<div class="as" style="background:repeating-linear-gradient(90deg,${a.c1} 0 6px,${a.c2} 6px 12px)"></div><div class="an">${a.nm}</div><div class="al">${lk?`🔒 Cấp ${a.lvl}`:(sl?'Đang dùng':'')}</div>`;
    if(!lk)c.onclick=()=>{S.decor.awning=a.id;save();rPrep();};
    ar.appendChild(c);
  });
  box.appendChild(ar);
  const secs=[{k:'pet',t:'Thú cưng',s:'Mỗi lần một bé ra quán.'},{k:'plant',t:'Cây cảnh',s:'Bày trước cửa.'},{k:'light',t:'Đèn và chuông',s:'Treo dưới mái hiên.'}];
  secs.forEach(sc=>{
    const t=document.createElement('div');t.className='stl2';t.textContent=sc.t;box.appendChild(t);
    const sub=document.createElement('div');sub.style.cssText='font-size:11px;color:var(--dim);padding:0 0 4px';sub.textContent=sc.s;box.appendChild(sub);
    const g=document.createElement('div');g.className='dg';
    DC[sc.k].forEach(d=>{
      const lk=level()<d.lvl,sl=S.decor[sc.k]===d.id;
      const c=document.createElement('div');
      c.className='dc'+(lk?' lk':'')+(sl?' sel':'');
      c.innerHTML=`<div class="di">${d.ic}</div><div class="dn">${d.nm}</div><div class="dd">${d.desc}</div><div class="dl">${lk?`🔒 Cấp ${d.lvl}`:(sl?'Đang dùng':'Chạm chọn')}</div>`;
      if(!lk)c.onclick=()=>{S.decor[sc.k]=sl?null:d.id;save();rPrep();};
      g.appendChild(c);
    });
    box.appendChild(g);
  });
}
function rDanh(box){
  box.insertAdjacentHTML('beforeend',`<div style="padding:6px 0 14px"><div style="font-size:30px;color:var(--gold);letter-spacing:3px;line-height:1">${sts(S.stars)}</div><div style="font-size:11px;color:var(--dim);margin-top:5px">Tính trên 30 đánh giá gần nhất. Dưới 4 sao là vắng khách.</div><div style="font-size:11px;color:var(--dim);margin-top:3px">Tổng: <b style="color:var(--cream)">${S.reviews}</b> đánh giá</div></div>`);
  if(!S.reviewList.length){box.insertAdjacentHTML('beforeend','<div style="font-size:12px;color:var(--dim);padding:14px 0">Chưa có đánh giá.</div>');return;}
  [...S.reviewList].slice(-30).reverse().forEach(r=>{
    const i=document.createElement('div');i.className='rv';
    i.innerHTML=`<div class="rva">${r.face}</div><div class="rvb"><div><span class="rvs">${sts(r.stars)}</span><span class="rvn">${r.name}</span></div><div class="rvt">${r.text}</div><div class="rvd">Ngày ${r.day}</div></div>`;
    box.appendChild(i);
  });
}
function rSo(box){
  const sal=ts2();
  box.innerHTML=`<div style="padding:6px 0"><div class="lr"><span>Tổng tài sản</span><span class="po">${fm(S.money)}</span></div><div class="lr"><span>Tổng lãi</span><span class="po">${fm(S.totalProfit)}</span></div><div class="lr"><span>Tổng đã bán</span><span>${S.reviews} tô</span></div><div class="lr"><span>Tô đã thu lại</span><span>${S.collectedBowls} tô</span></div><div class="lr"><span>Tô bẩn chờ rửa</span><span>${S.dirtyBowls} tô</span></div><div class="lr"><span>Cấp độ</span><span>Cấp ${level()} · ${lvl()}</span></div><div class="lr"><span>Số chi nhánh</span><span>${S.branches}</span></div><div class="lr"><span>Dư nợ ngân hàng</span><span class="ne">${fm(S.loan)}</span></div></div><div class="stl2">Chi phí cố định</div><div class="lr"><span>Mặt bằng (×${S.branches})</span><span class="ne">-${fm(RENT*S.branches)}</span></div><div class="lr"><span>Điện nước</span><span class="ne">-${fm(UTIL)}</span></div>${sal>0?`<div class="lr"><span>Lương NV</span><span class="ne">-${fm(sal)}</span></div>`:''}<div class="stl2">Mở rộng kinh doanh</div><div style="font-size:11px;color:var(--dim);padding:6px 0;line-height:1.5">Mỗi chi nhánh +50% khách và +30% XP.</div>`;
  const b=document.createElement('button');b.className='cbb';b.style.cssText='background:var(--green);box-shadow:0 3px 0 var(--green-dk);margin-top:10px';
  b.textContent=`Thuê thêm mặt bằng · ${fk(S.branches*500000)}`;
  b.onclick=()=>{
    const c=S.branches*500000;
    if(S.money<c){tst('Không đủ tiền!','b');return;}
    if(S.branches>=5){tst('Tối đa 5 chi nhánh!','b');return;}
    if(!confirm(`Thuê chi nhánh thứ ${S.branches+1} giá ${fm(c)}?`))return;
    S.money-=c;S.branches++;tst('Đã mở chi nhánh!','g');save();rPrep();
  };
  box.appendChild(b);
    const sb=document.createElement('button');
  sb.className='cbb';
  sb.style.cssText='background:#7a3a3a;box-shadow:0 3px 0 #4a2020;margin-top:10px';
  sb.textContent='💸 Bán quán để làm lại từ đầu';
  sb.onclick=sellShop;
  box.appendChild(sb);
}

/* ---------- HAGGLE ---------- */
function sHG(){hgS={at:0,td:0,np:0,dr:1,ru:false,sp:0};rHG();}
function rHG(){
  if(!hgS){$('modal').classList.remove('on');if(hgR)cancelAnimationFrame(hgR);return;}
  const st=hgS,at=st.at+1,td=st.td;
  const zn=hgZL(st.at);
  const zh=zn.map(z=>`<div class="hgz ${z.cls}" style="flex:${z.w}">${z.pct>0?z.pct+'%':''}</div>`).join('');
  const c=document.createElement('div');c.className='cd hgc';
  c.innerHTML=`<div class="hga">👩</div><div class="hgt">ĐI CHỢ TRẢ GIÁ</div><div class="hgl">Lượt ${at}/3</div><div class="hgq">"Mua nhiều vậy, cô bớt cho cháu chút đi!"</div><div class="hgb" id="hgBar">${zh}<div class="hgn" id="hgN" style="left:0%"></div></div><div class="hgh">Chạm <b>Chốt giá!</b> khi kim trong <b style="color:#5ac25a">vùng xanh</b> (5%) hoặc <b style="color:#e0b840">vùng vàng</b> (2%). Đã bớt: <b>${td}%</b>.</div><button class="hgbtn" id="hgS">Chốt giá!</button><button class="hgbtn" style="background:transparent;color:var(--dim);box-shadow:none;border:1px solid var(--border);margin-top:6px" id="hgSk">Thôi, mua giá thường</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(c);m.classList.add('on');
  st.ru=true;st.np=0;st.dr=1;st.sp=[0.35,0.6,0.95][st.at]||0.95;
  const an=()=>{
    if(!hgS||hgS!==st||!st.ru)return;
    st.np+=st.dr*st.sp*(1/60);
    if(st.np>=1){st.np=1;st.dr=-1;}
    if(st.np<=0){st.np=0;st.dr=1;}
    const n=document.getElementById('hgN');if(n)n.style.left=(st.np*100)+'%';
    hgR=requestAnimationFrame(an);
  };
  hgR=requestAnimationFrame(an);
  c.querySelector('#hgS').onclick=stpHG;
  c.querySelector('#hgSk').onclick=()=>{hgS=null;if(hgR)cancelAnimationFrame(hgR);m.classList.remove('on');};
}
function hgZL(a){
  if(a===0)return[{cls:'y',w:3,pct:2},{cls:'g',w:4,pct:5},{cls:'y2',w:3,pct:2},{cls:'d',w:10,pct:0}];
  if(a===1)return[{cls:'y',w:2,pct:2},{cls:'g',w:2,pct:5},{cls:'y2',w:2,pct:2},{cls:'d',w:14,pct:0}];
  return[{cls:'y',w:1.5,pct:2},{cls:'g',w:1.5,pct:5},{cls:'y2',w:1.5,pct:2},{cls:'d',w:15.5,pct:0}];
}
function stpHG(){
  if(!hgS||!hgS.ru)return;
  hgS.ru=false;if(hgR)cancelAnimationFrame(hgR);
  const st=hgS,zn=hgZL(st.at),tw=zn.reduce((s,z)=>s+z.w,0),pz=st.np*tw;
  let ac=0,hi=null;
  for(const z of zn){if(pz>=ac&&pz<ac+z.w){hi=z;break;}ac+=z.w;}
  let gn=0;
  if(hi&&hi.cls==='g'){gn=5;tst('Chuẩn! Cô bớt 5%','g');}
  else if(hi&&(hi.cls==='y'||hi.cls==='y2')){gn=2;tst('Được! Cô bớt 2%','g');}
  else{tst('Hụt rồi!','b');}
  st.td+=gn;st.at++;
  if(st.at>=3){
    S.haggledToday=true;S.haggleDiscount=st.td;hgS=null;
    $('modal').classList.remove('on');
    tst(`Tổng bớt: ${st.td}%`,st.td>0?'g':'b');
    rPrep();save();return;
  }
  setTimeout(()=>{if(hgS)rHG();},700);
}

/* ---------- LEADERBOARD / RENAME / PRANK / TOURNAMENT ---------- */
function sLB(){
  const all=[...LB,{name:S.shopName,lvl:level(),day:S.day,money:S.totalProfit,me:true}];
  all.sort((a,b)=>b.money-a.money);
  const rs=all.map((r,i)=>{
    const c=i===0?'g1':i===1?'g2':i===2?'g3':'';
    return `<div class="lbr ${r.me?'me':''}"><div class="rk ${c}">${i+1}</div><div class="in"><div class="nm">${r.name}${r.me?' 🫵':''}</div><div class="sb">Cấp ${r.lvl} · ${lnf(r.lvl)} · ngày ${r.day}</div></div><div class="mny">+${fk(r.money)}</div></div>`;
  }).join('');
  const c=document.createElement('div');c.className='cd';
  c.innerHTML=`<h2>🏆 Bảng xếp hạng</h2><div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:12px;line-height:1.4">Tiệm nào kiếm được nhiều tiền nhất.</div>${rs}<button class="cbb gh" id="lbC">Đóng</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(c);m.classList.add('on');
  c.querySelector('#lbC').onclick=()=>m.classList.remove('on');
}
function sRN(){
  const c=document.createElement('div');c.className='cd';
  c.innerHTML=`<h2>✏️ Đặt tên quán</h2><div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:8px">Tối đa 26 ký tự.</div><input id="rnI" maxlength="26" value="${S.shopName.replace(/"/g,'&quot;')}"><button class="cbb gh" id="rnC">Huỷ</button><button class="cbb" id="rnS">Lưu tên</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(c);m.classList.add('on');
  c.querySelector('#rnC').onclick=()=>m.classList.remove('on');
  c.querySelector('#rnS').onclick=()=>{
    const v=c.querySelector('#rnI').value.trim();
    if(!v){tst('Tên không được trống!','b');return;}
    S.shopName=v.slice(0,26);tst('Đã đổi tên!','g');save();rPrep();m.classList.remove('on');
  };
}
function gSC(){const ch='abcdefghjkmnpqrstuvwxyz0123456789';const sg=()=>Array.from({length:4},()=>ch[Math.floor(Math.random()*ch.length)]).join('');return `${sg()}-${sg()}-${sg()}`;}
function sPK(){
  if(S.pranksToday>=3){tst('Hôm nay hết lượt chọc!','b');return;}
  const gs=['🌶️','🥩','🍜','🥣','🍄','🧀','🍢','🥟'];
  const rs=NB.map((n,i)=>`<div class="pkr"><div class="pav">🧑‍🍳</div><div class="pin"><div class="nm">${n.name}</div><div class="sb">Cấp ${n.lvl} · hạng ${n.rank}</div></div><button class="pbt" data-i="${i}">Chọn</button></div>`).join('');
  const c=document.createElement('div');c.className='cd';
  c.innerHTML=`<h2>🎁 Chọc quán bên cạnh</h2><div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:10px;line-height:1.4">Hôm nay còn <b style="color:var(--gold)">${3-S.pranksToday}/3</b> lượt.</div><div style="font-size:10px;color:var(--dim);text-align:center;margin-bottom:4px">Mã quán của bạn</div><div style="background:rgba(0,0,0,.3);padding:9px;border-radius:10px;text-align:center;font-family:monospace;font-size:13px;color:var(--gold);margin-bottom:10px">${gSC()}</div>${rs}<button class="cbb gh" id="pkC">Đóng</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(c);m.classList.add('on');
  c.querySelector('#pkC').onclick=()=>m.classList.remove('on');
  c.querySelectorAll('.pbt').forEach(b=>{
    b.onclick=()=>{
      const i=parseInt(b.dataset.i),g=rd(gs);
      S.pranksToday++;
      const r=20000+Math.floor(Math.random()*30000);
      S.money+=r;S.totalProfit+=r;
      tst(`Đã gửi ${g} tới ${NB[i].name}! +${fk(r)}`,'g');
      save();rPrep();m.classList.remove('on');
    };
  });
}
function sTN(){
  if(S.tournamentsToday>=1){tst('Hôm nay đã thi rồi!','g');return;}
  const rs=TB.map((b,i)=>`<div class="tnr"><span>${['🥇','🥈','🥉'][i]} ${b.name}</span><span>${b.score.toLocaleString('vi-VN')}</span></div>`).join('');
  const c=document.createElement('div');c.className='cd';
  c.innerHTML=`<h2>🍲 Giải mì hôm nay</h2><div style="font-size:12px;color:var(--dim);text-align:center;line-height:1.5;margin-bottom:10px">90 giây, 20 khách. Nấu đúng, mì vừa chín, giao nhanh.</div><div style="font-size:11px;color:var(--dim);line-height:1.6;padding:8px 12px;background:rgba(0,0,0,.2);border-radius:10px;margin-bottom:12px">• Tô đúng 100đ · mì vừa +30 · khách chờ ít +40<br>• Sai món -30 · khách bỏ -50<br>• Thi riêng, không tốn hàng</div>${rs}<button class="cbb" id="tnS" style="margin-top:12px">Thi ngay</button><button class="cbb gh" id="tnC">Để sau</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(c);m.classList.add('on');
  c.querySelector('#tnC').onclick=()=>m.classList.remove('on');
  c.querySelector('#tnS').onclick=stTN;
}
function stTN(){
  $('modal').classList.remove('on');
  tournamentMode=true;tournamentTimer=90;tournamentScore=0;S.tournamentsToday++;
  customers=[];
  bowl={hasBowl:false,base:null,noodleState:null,cooking:false,cookProgress:0,toppings:[],chili:0};
  servedToday=0;angryToday=0;revToday=0;dayTotal=20;nextCustId=1;spawnTimer=0.2;S.time=9*60;
  const h=document.createElement('div');h.className='tnh';h.id='tnH';h.textContent=`⏱ 90s · Điểm 0`;document.body.appendChild(h);
  rcm();sw('s-serve');rSrv();running=true;lastTime=performance.now();tst('Giải mì bắt đầu!','g');
}
function enTN(){
  running=false;const ms2=tournamentScore;
  const all=[...TB,{name:S.shopName,score:ms2,me:true}];all.sort((a,b)=>b.score-a.score);
  const rs=all.map((r,i)=>`<div class="tnr ${r.me?'me':''}"><span>${i+1}. ${r.name}${r.me?' 🫵':''}</span><span>${r.score.toLocaleString('vi-VN')}</span></div>`).join('');
  const c=document.createElement('div');c.className='cd';
  c.innerHTML=`<h2>Kết quả giải mì</h2><div style="font-size:14px;text-align:center;margin-bottom:12px">Điểm của bạn: <b style="color:var(--gold);font-size:20px">${ms2}</b></div>${rs}<button class="cbb gh" id="tnC2">Đóng</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(c);m.classList.add('on');
  c.querySelector('#tnC2').onclick=()=>{
    m.classList.remove('on');
    const h=document.getElementById('tnH');if(h)h.remove();
    sw('s-start');tournamentMode=false;
  };
}

/* ---------- SERVE ---------- */
function openDay(){
  const tq=Object.values(S.stock).reduce((s,x)=>s+x.qty,0);
  if(tq===0){tst('Chưa có nguyên liệu! Vào Kho nhập hàng trước.','b');return;}
  if(tq<3&&!confirm('Nguyên liệu còn ít. Vẫn mở cửa?'))return;
  customers=[];
  bowl={hasBowl:false,base:null,noodleState:null,cooking:false,cookProgress:0,toppings:[],chili:0};
  servedToday=0;angryToday=0;revToday=0;fiveStarsToday=0;bowlsReturnedToday=0;
  S.missionBowl=0;S.missionAngry=0;S.missionFive=0;
  nextCustId=1;spawnTimer=0.4;
  dayTotal=Math.max(1,1+Math.floor(Math.random()*999));
  if(dayTotal<=20)tst(`Hôm nay vắng khách (${dayTotal} người)...`,'b');
  else if(dayTotal>=500)tst(`Hôm nay CỰC ĐÔNG (${dayTotal} người)!`,'g');
  else if(dayTotal>=100)tst(`Hôm nay đông khách (${dayTotal} người)`,'g');
  for(const id in S.hired){if(S.hired[id]==='saved')S.hired[id]=true;}
  miTrongRo=[];
  appOrders = [];
  nextAppId = 1;
  appSpawnTimer = 5;
  S.time=9*60;S.haggledToday=false;S.pranksToday=0;tournamentMode=false;orderStripLastId=undefined;
  qlTimer=0;
  rcm();sw('s-serve');rSrv();running=true;lastTime=performance.now();
  setTimeout(maybeEmpEvent,2000);
}
function rSrv(){rSH();rSlot();rOS();rBR();rTR();rBW();rSC();uSrvB();rRoMi();}
function rSH(){
  $('svDay').textContent=S.day;
  const h=Math.floor(S.time/60),m=Math.floor(S.time%60);
  $('svTime').textContent=String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
  $('svMoney').textContent=fk(S.money);$('svStars').textContent=sts(S.stars);
  $('svRate').textContent=S.stars.toFixed(1);$('svRevCount').textContent=S.reviews;
}
function rSlot(){
  const el=$('custSlots');el.innerHTML='';const ms3=ms();
  for(let i=0;i<ms3;i++){
    const c=customers.find(x=>x.seat===i);
    const s=document.createElement('div');
    s.className='seat-item'+(c?'':' empty');
    if(c){
      s.innerHTML=`<div class="seat-av${c.isDelivery?' delivery':''}">${c.face}</div><div class="seat-name">${c.name}</div>`;
      s.onclick=()=>hDel(c);
    }else{
      s.innerHTML=`<div class="seat-av"></div><div class="seat-name">Bàn trống</div>`;
    }
    el.appendChild(s);
  }
}
function hDel(c){
  if(!c.isDelivery||c.deliveryHandled)return;
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>🛵 Đơn giao xa</h2><div style="font-size:13px;color:var(--dim);text-align:center;line-height:1.5;margin-bottom:12px">Khách ở xa quán.</div><button class="cbb gy" id="dvS">Thuê ship ngoài · ${fk(SHIP)}</button><button class="cbb gr" id="dvR">Tự chạy xe · có tip</button><button class="cbb gh" id="dvC">Để sau</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#dvC').onclick=()=>m.classList.remove('on');
  cd.querySelector('#dvS').onclick=()=>{S.money-=SHIP;c.deliveryHandled=true;tst('Đã thuê ship, mất '+fk(SHIP),'b');m.classList.remove('on');save();};
  cd.querySelector('#dvR').onclick=()=>{m.classList.remove('on');stDv(c);};
}

/* ---------- ĐƠN APP ONLINE ---------- */
function mkAppOrder(){
  const base = S.stock.kimchi.qty > 0 ? 'kimchi' : null;
  if(!base) return null;

  const ut = Object.keys(ET).filter(id=>hu(id)&&S.stock[id]?.qty>0);
  const pool = ['bomy','xucxich','raucai'].filter(id=>S.stock[id].qty>0).concat(ut);
  const tp = [];
  const n = Math.floor(Math.random()*3);
  for(let i=0;i<n&&pool.length>0;i++){
    const k = Math.floor(Math.random()*pool.length);
    tp.push(pool[k]); pool.splice(k,1);
  }
  return {
    id: nextAppId++,
    code: '#8' + String(1000 + Math.floor(Math.random()*9000)),
    name: rd(NA),
    face: rd(FA),
    order: { base, toppings: tp, spice: 1+Math.floor(Math.random()*5) },
    patience: 1,        // 1 = đầy, 0 = hết kiên nhẫn
    delivering: false
  };
}

function spAppOrder(){
  if(!hdu()) return;          // Chưa mua App giao hàng thì không có đơn
  if(appOrders.length >= 3) return;   // Tối đa 3 đơn
  const o = mkAppOrder();
  if(!o) return;
  appOrders.push(o);
  tst(`📱 Đơn app mới: ${o.code}`,'g');
  rAppOrders();
}

function rAppOrders(){
  const el = $('appOrders');
  if(!el) return;
  el.innerHTML = '';
  appOrders.forEach(o=>{
    const bi = gb(o.order.base);
    const tn = o.order.toppings.map(t=>gn(t).toLowerCase());
    const ts3 = tn.length ? ` thêm ${tn.join(', ')}` : '';
    const card = document.createElement('div');
    card.className = 'app-card order-card';
    if(o.delivering) card.classList.add('delivering');
    if(o.patience < 0.4) card.classList.add('urgent');
    card.innerHTML = `
      <div class="oc-head">
        <span class="oc-id">${o.code}</span>
        <span>${o.delivering ? '🛵 đang giao' : Math.ceil(o.patience*100)+'%'}</span>
      </div>
      <div class="oc-name">${o.face} ${o.name}</div>
      <div class="oc-order">1 tô <b>${bi.nm.toLowerCase()}</b>${ts3}, cấp <b>${o.order.spice}</b></div>
      <span class="oc-tag ${o.delivering?'green':''}">${o.delivering ? 'Đang giao' : 'Giao xa'}</span>
      ${!o.delivering ? `<div class="oc-bar"><div class="oc-fill ${o.patience<0.3?'danger':o.patience<0.6?'warn':''}" style="width:${o.patience*100}%"></div></div>` : ''}
    `;
    if(!o.delivering){
      card.onclick = ()=> openAppOrder(o);
    }
    el.appendChild(card);
  });
}

function openAppOrder(o){
  if(o.delivering) return;
  const bi = gb(o.order.base);
  const tn = o.order.toppings.map(t=>gn(t).toLowerCase());
  const ts3 = tn.length ? ` thêm <b>${tn.join(', ')}</b>` : '';
  const cd = document.createElement('div'); cd.className='cd';
  cd.innerHTML = `
    <h2>📱 Đơn app ${o.code}</h2>
    <div style="text-align:center;font-size:40px;margin:8px 0">${o.face}</div>
    <p><b>${o.name}</b> đặt: 1 tô <b>${bi.nm.toLowerCase()}</b>${ts3}, cấp <b>${o.order.spice}</b>.</p>
    <p style="color:var(--gold);font-weight:700">Thời gian còn: ${Math.ceil(o.patience*10)}s</p>
    <button class="cbb gy" id="aoShip">🛵 Thuê ship ngoài · ${fk(SHIP)}</button>
    <button class="cbb gr" id="aoSelf">🏍️ Tự chạy xe · có tip</button>
    <button class="cbb gh" id="aoCancel">Đóng</button>
  `;
  const m = $('modal'); m.innerHTML=''; m.appendChild(cd); m.classList.add('on');

  cd.querySelector('#aoCancel').onclick = ()=> m.classList.remove('on');

  cd.querySelector('#aoShip').onclick = ()=>{
    m.classList.remove('on');
    if(S.money < SHIP){ tst('Không đủ tiền thuê ship!','b'); return; }
    S.money -= SHIP;
    o.delivering = true;
    o.patience = 1;
    tst(`Đã thuê ship cho ${o.code}`,'g');
    rAppOrders(); rSrv(); save();
  };

  cd.querySelector('#aoSelf').onclick = ()=>{
    m.classList.remove('on');
    // Chạy minigame giao xe
    startDeliveryForApp(o);
  };
}

function startDeliveryForApp(o){
  // Minigame giống stDv nhưng gắn với đơn app
  const cd = document.createElement('div'); cd.className='cd';
  cd.innerHTML = `
    <h2>🛵 Chạy xe giao ${o.code}</h2>
    <div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:10px">Chạm nút khi xe ở vùng xanh.</div>
    <div style="height:56px;background:#1a0f0d;border-radius:12px;position:relative;overflow:hidden;border:2px solid var(--border);margin-bottom:10px">
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:28px">🛵</div>
      <div style="position:absolute;top:0;bottom:0;width:20%;left:40%;background:rgba(90,194,90,.3)" id="dvZ"></div>
      <div style="position:absolute;top:0;bottom:0;width:3px;background:#fff;box-shadow:0 0 8px #fff;left:0%" id="dvN"></div>
    </div>
    <div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:10px">Vấp: <b id="dvM" style="color:var(--red)">0</b> / 3</div>
    <button class="cbb gr" id="dvG">Chạm đổi làn!</button>
  `;
  const m = $('modal'); m.innerHTML=''; m.appendChild(cd); m.classList.add('on');

  const state = { pos:0, dir:1, running:true, misses:0, zoneCenter:0.5, speed:0.7 };
  const an = ()=>{
    if(!state.running) return;
    state.pos += state.dir * state.speed * (1/60);
    if(state.pos>=1){state.pos=1;state.dir=-1;}
    if(state.pos<=0){state.pos=0;state.dir=1;}
    const n = document.getElementById('dvN');
    if(n) n.style.left = (state.pos*100)+'%';
    requestAnimationFrame(an);
  };
  requestAnimationFrame(an);

  cd.querySelector('#dvG').onclick = ()=>{
    if(!state.running) return;
    const p = state.pos, zc = state.zoneCenter;
    if(Math.abs(p-zc) < 0.12){
      state.running = false;
      o.delivering = true;
      o.patience = 1;
      tst('Giao siêu tốc! Tip thêm 20k','g');
      S.money += 20000;
      m.classList.remove('on');
      rAppOrders(); rSrv(); save();
    } else {
      state.misses++;
      const mi = document.getElementById('dvM'); if(mi) mi.textContent = state.misses;
      state.zoneCenter = 0.15 + Math.random()*0.7;
      const zn = document.getElementById('dvZ');
      if(zn) zn.style.left = ((state.zoneCenter-0.1)*100)+'%';
      if(state.misses >= 3){
        state.running = false;
        tst('Vấp nhiều, khách chấm 3 sao','b');
        S.stars = Math.max(1, S.stars-0.1);
        m.classList.remove('on');
        // Vẫn cho đơn thành delivering để nấu xong giao
        o.delivering = true;
        o.patience = 1;
        rAppOrders(); rSrv(); save();
      }
    }
  };
}

function tickAppOrders(dt){
  if(!hdu()) return;
  appSpawnTimer -= dt;
  if(appSpawnTimer <= 0){
    appSpawnTimer = 15 + Math.random()*15;
    spAppOrder();
  }
  // Giảm kiên nhẫn
  const out = [];
  appOrders.forEach(o=>{
    if(o.delivering) return;
    o.patience -= dt/25;   // 25s thì hết
    if(o.patience <= 0) out.push(o);
  });
  out.forEach(o=>{
    appOrders = appOrders.filter(x=>x.id!==o.id);
    S.stars = Math.max(1, S.stars-0.1);
    S.reviewList.push({face:o.face,name:o.name,stars:2,text:'Đơn app bị hủy vì quá lâu.',day:S.day});
    tst(`❌ Đơn app ${o.code} bị hủy!`,'b');
  });
  rAppOrders();
}
function stDv(c){
  deliveryGame={custId:c.id,pos:0,dir:1,running:true,speed:0.7,misses:0,zoneCenter:0.5};
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>🛵 Chạy xe giao</h2><div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:10px">Chạm nút khi xe ở vùng xanh.</div><div style="height:56px;background:#1a0f0d;border-radius:12px;position:relative;overflow:hidden;border:2px solid var(--border);margin-bottom:10px"><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:28px">🛵</div><div style="position:absolute;top:0;bottom:0;width:20%;left:40%;background:rgba(90,194,90,.3)" id="dvZ"></div><div style="position:absolute;top:0;bottom:0;width:3px;background:#fff;box-shadow:0 0 8px #fff;left:0%" id="dvN"></div></div><div style="font-size:12px;color:var(--dim);text-align:center;margin-bottom:10px">Vấp: <b id="dvM" style="color:var(--red)">0</b> / 3</div><button class="cbb gr" id="dvG">Chạm đổi làn!</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  const an=()=>{
    if(!deliveryGame||!deliveryGame.running)return;
    deliveryGame.pos+=deliveryGame.dir*deliveryGame.speed*(1/60);
    if(deliveryGame.pos>=1){deliveryGame.pos=1;deliveryGame.dir=-1;}
    if(deliveryGame.pos<=0){deliveryGame.pos=0;deliveryGame.dir=1;}
    const n=document.getElementById('dvN');if(n)n.style.left=(deliveryGame.pos*100)+'%';
    requestAnimationFrame(an);
  };
  requestAnimationFrame(an);
  cd.querySelector('#dvG').onclick=()=>{
    if(!deliveryGame)return;
    const p=deliveryGame.pos,zc=deliveryGame.zoneCenter;
    if(Math.abs(p-zc)<0.12){deliveryGame.running=false;finDv(true);}
    else{
      deliveryGame.misses++;
      const mi=document.getElementById('dvM');if(mi)mi.textContent=deliveryGame.misses;
      deliveryGame.zoneCenter=0.15+Math.random()*0.7;
      const zn=document.getElementById('dvZ');if(zn)zn.style.left=((deliveryGame.zoneCenter-0.1)*100)+'%';
      if(deliveryGame.misses>=3){deliveryGame.running=false;finDv(false);}
    }
  };
  function finDv(ok){
    const cc=customers.find(x=>x.id===c.id);
    if(cc){
      cc.deliveryHandled=true;
      if(ok){tst('Giao siêu tốc! Tip thêm 20k','g');S.money+=20000;}
      else{tst('Vấp nhiều, khách chấm 3 sao','b');S.stars=Math.max(1,S.stars-0.1);}
    }
    deliveryGame=null;$('modal').classList.remove('on');
  }
}
function rOS(){
  const b=$('orderStrip');
  const bar=$('patienceFill');

  // Ưu tiên đơn app đang delivering
  const appO = appOrders.find(o=>o.delivering);
  if(appO){
    const bi = gb(appO.order.base);
    const tn = appO.order.toppings.map(t=>gn(t).toLowerCase());
    const ts3 = tn.length?` thêm <b>${tn.join(', ')}</b>`:'';
    b.innerHTML=`<div class="oi">📱</div><div class="otxt">Đơn app <b>${appO.code}</b>: 1 tô <b>${bi.nm.toLowerCase()}</b>${ts3}, cấp <b>${appO.order.spice}</b>!</div>`;
    if(bar){bar.style.width='100%';bar.className='patience-fill';}
    return;
  }

  if(!customers.length){
    b.innerHTML=`<div class="oi">🥣</div><div class="otxt">Đang chờ khách...</div>`;
    if(bar){bar.style.width='0%';bar.className='patience-fill';}
    return;
  }
  const c=customers[0],bi=gb(c.order.base);
  const tn=c.order.toppings.map(t=>gn(t).toLowerCase());
  const ts3=tn.length?` thêm <b>${tn.join(', ')}</b>`:'';
  const pr=PR[c.id%PR.length];
  const sh=c.isDelivery?` <b style="color:var(--gold)">(Giao xa)</b>`:'';
  b.innerHTML=`<div class="oi">🍜</div><div class="otxt">${pr} ơi cho em 1 tô <b>${bi.nm.toLowerCase()}</b>${ts3}, cấp <b>${c.order.spice}</b> ạ!${sh}</div>`;
  if(bar){
    bar.style.width=(c.patience*100)+'%';
    bar.className='patience-fill'+(c.patience<0.3?' danger':c.patience<0.6?' warn':'');
  }
}
function rBR(){
  const el=$('basesRow');el.innerHTML='';
  const tt=document.createElement('div');
  tt.className='base-tile'+(bowl.hasBowl?' sel':'')+(S.stock.to.qty<=0&&!bowl.hasBowl?' lk':'');
  tt.innerHTML=`<div class="bi">🥣</div><div class="bn">Lấy tô</div><div class="bc${S.stock.to.qty<=0?' low':''}">${S.stock.to.qty}</div>`;
  tt.onclick=onGB;el.appendChild(tt);
  const kc=document.createElement('div'),kq=S.stock.kimchi.qty;
  kc.className='base-tile'+(bowl.base==='kimchi'?' sel':'')+(kq<=0&&bowl.base!=='kimchi'?' lk':'');
  kc.innerHTML=`<div class="bi">🥘</div><div class="bn">Kim chi</div><div class="bc${kq<=0?' low':''}">${kq}</div>`;
  kc.onclick=()=>onAB('kimchi');el.appendChild(kc);
  Object.keys(EB).filter(id=>hu(id)).forEach(id=>{
    const b=EB[id],st=S.stock[id]||{qty:0},t=document.createElement('div');
    t.className='base-tile'+(bowl.base===id?' sel':'')+(st.qty<=0&&bowl.base!==id?' lk':'');
    t.innerHTML=`<div class="bi">${b.ic}</div><div class="bn">${b.nm.slice(0,8)}</div><div class="bc${st.qty<=0?' low':''}">${st.qty}</div>`;
    t.onclick=()=>onAB(id);el.appendChild(t);
  });
  const cur=el.children.length;
  for(let i=cur;i<5;i++){
    const t=document.createElement('div');t.className='base-tile lk';
    t.innerHTML=`<div class="bi">🍲</div><div class="bn">Sữa p.mai</div><div class="bl">🔒</div>`;
    el.appendChild(t);
  }
}
function rTR(){
  const el=$('toppingRow');el.innerHTML='';
  const appO = appOrders.find(o=>o.delivering);
  const cc = appO ? appO : customers[0];
  const nt = cc ? cc.order.toppings : [];
  ['bomy','xucxich','raucai'].forEach(id=>aTT(el,id,nt));
  Object.keys(ET).filter(id=>hu(id)).forEach(id=>aTT(el,id,nt));
}
function aTT(el,id,nt){
  const it=gi(id);if(!it)return;
  const st=S.stock[id];if(!st)return;
  const q=st.qty,ib=bowl.toppings.includes(id),in2=nt.includes(id),if2=in2&&ib;
  let c='tile';
  if(q<=0&&!ib)c+=' lk';
  if(in2&&!ib)c+=' n';
  if(if2)c+=' f';
  const t=document.createElement('div');t.className=c;
  t.innerHTML=`<div class="t-ic">${it.ic}</div><div class="t-nm">${it.nm.slice(0,10)}</div><div class="t-badge${q<=0?' low':''}">${q}</div>`;
  t.onclick=()=>onAT(id);el.appendChild(t);
}
function rBW(){
  const e=$('bowlEmpty'),c=$('bowlContents');
  if(!bowl.hasBowl){
    e.style.display='none';c.style.display='none';
    const st=$('bowlStatus');if(st)st.textContent='Chưa có tô — chạm chồng tô để lấy';
    return;
  }
  e.style.display='none';c.style.display='';
  let h='';
  if(bowl.base){const b=gb(bowl.base);h+=`<span class="big">${b.ic}</span>`;}
  if(bowl.noodleState==='song')h+=`<span class="med" style="filter:hue-rotate(20deg) brightness(0.85)">🍜</span>`;
  else if(bowl.noodleState==='vua')h+=`<span class="med">🍜</span>`;
  else if(bowl.noodleState==='nhun')h+=`<span class="med" style="filter:brightness(0.65)">🍜</span>`;
  bowl.toppings.forEach(id=>{const it=gi(id);if(it)h+=`<span class="med">${it.ic}</span>`;});
  c.innerHTML=h;
  if(bowl.noodleState){
    const l={song:'Mì sống',vua:'Mì vừa',nhun:'Mì nhũn'}[bowl.noodleState];
    const cl={song:'s',vua:'v',nhun:'n'}[bowl.noodleState];
    const b=document.createElement('div');b.className='bg '+cl;b.textContent=l;c.appendChild(b);
  }
  const st=$('bowlStatus');
  if(st){
    if(!bowl.hasBowl) st.textContent='Chưa có tô';
    else if(!bowl.base) st.textContent='Chưa có nước dùng';
    else if(!bowl.noodleState) st.textContent=gb(bowl.base).nm+' · chưa có mì';
    else{
      const stName={song:'mì sống',vua:'mì vừa',nhun:'mì nhũn'}[bowl.noodleState];
      st.textContent=gb(bowl.base).nm+' · '+stName;
    }
  }
  const hint=$('bowlHint');
  if(hint){
    if(!bowl.hasBowl)hint.textContent='Chạm chồng tô để lấy tô';
    else if(!bowl.base)hint.textContent='Chạm Kim chi để thêm nước dùng';
    else if(bowl.cooking)hint.textContent='Đang luộc mì...';
    else if(!bowl.noodleState&&miTrongRo.length>0)hint.textContent='Chạm rổ mì chín để lấy mì';
    else if(!bowl.noodleState)hint.textContent='Chạm Na luộc để nấu mì';
    else hint.textContent='Chạm topping để thêm';
  }
}
function rSC(){
  const el=$('sauceCount');
  el.textContent=bowl.chili;
  el.classList.toggle('zero',bowl.chili===0);
}
function uSrvB(){
  const hasApp = appOrders.some(o=>o.delivering);
  $('serveBtn').disabled = !(bowl.hasBowl && bowl.base && bowl.noodleState && (customers.length>0 || hasApp));
}
function onGB(){if(bowl.hasBowl){tst('Đã có tô rồi','b');return;}if(S.stock.to.qty<=0){tst('Hết tô!','b');return;}S.stock.to.qty--;bowl.hasBowl=true;tst('Đã lấy tô');rSrv();}
function onAB(id){
  if(!bowl.hasBowl){tst('Lấy tô trước!','b');return;}
  if(bowl.base){tst('Đã có nước dùng','b');return;}
  const st=S.stock[id];if(!st)return;
  if(st.qty<=0){tst('Hết '+gb(id).nm+'!','b');return;}
  st.qty--;bowl.base=id;tst('Đã thêm nước dùng');rSrv();
}
function onAT(id){
  if(!bowl.hasBowl){tst('Lấy tô trước!','b');return;}
  if(!bowl.base){tst('Cần nước dùng trước','b');return;}
  if(!bowl.noodleState){tst('Luộc mì trước đã!','b');return;}
  if(bowl.toppings.length>=3){tst('Tô đầy rồi','b');return;}
  const st=S.stock[id];if(!st)return;
  if(st.qty<=0){tst('Hết '+gn(id)+'!','b');return;}

  const appO = appOrders.find(o=>o.delivering);
  const cc = appO ? appO : customers[0];
  const nt = cc ? cc.order.toppings : [];

  if(!nt.includes(id)){tst('Không ai gọi món này!','b');return;}
  if(bowl.toppings.includes(id)){tst('Đã thêm rồi!','b');return;}
  st.qty--;bowl.toppings.push(id);tst('+'+gn(id),'g');rSrv();
}
function onPot(){
  if(boxingActive){tst('Đang đánh nhau!','b');return;}
  if(!bowl.hasBowl){tst('Lấy tô trước!','b');return;}
  if(!bowl.base){tst('Cần nước dùng trước!','b');return;}
  if(bowl.noodleState){tst('Tô đã có mì rồi!','b');return;}
  if(bowl.cooking){
    const p=bowl.cookProgress,[g1,g2]=cgz();
    bowl.cooking=false;
    let st;
    if(p<g1){st='song';tst('Mì còn sống!','b');}
    else if(p<g2){st='vua';tst('Mì vừa chín!','g');}
    else{st='nhun';tst('Mì nhũn rồi!','b');}
    miTrongRo.push(st);
    rRoMi();
    rSrv();
    return;
  }
  if(S.stock.mi.qty<=0){tst('Hết mì!','b');return;}
  S.stock.mi.qty--;bowl.cooking=true;bowl.cookProgress=0;
  tst('Đang luộc...');rSrv();
  if(Math.random()<0.5){
    setTimeout(()=>{
      boxingActive=true;
      startBoxingGame(win=>{
        boxingActive=false;
        if(!win){
          bowl.cooking=false;bowl.cookProgress=0;
          const c=customers[0];
          if(c){
            customers=customers.filter(x=>x.id!==c.id);
            S.stars=Math.max(1,S.stars-0.15);
            angryToday++;S.missionAngry++;
            S.reviewList.push({face:c.face,name:c.name,stars:1,text:'Chuột gián chạy loạn, không dám ăn!',day:S.day});
          }
          bowl={hasBowl:false,base:null,noodleState:null,cooking:false,cookProgress:0,toppings:[],chili:0};
          const n=$('needle');if(n)n.style.left='0%';
          const st=$('cookState');if(st){st.textContent='Chạm thả';st.className='tc-state';}
          rSrv();
        }else{rSrv();}
      });
    },300);
  }
}
function tickCk(dt){
  if(boxingActive)return;
  if(!bowl.cooking)return;
  bowl.cookProgress+=dt/2.2;
  if(bowl.cookProgress>=1){
    bowl.cookProgress=0;bowl.cooking=false;
    miTrongRo.push('nhun');
    tst('Mì nhũn mất rồi! Đã vào rổ','b');
    rRoMi();rSrv();return;
  }
  const n=$('needle');if(n)n.style.left=(bowl.cookProgress*100)+'%';
  const st=$('cookState');if(!st)return;
  const[g1,g2]=cgz();
  if(bowl.cookProgress<g1){st.textContent='Sống';st.className='tc-state song';}
  else if(bowl.cookProgress<g2){st.textContent='Vừa';st.className='tc-state vua';}
  else{st.textContent='Nhũn';st.className='tc-state nhun';}
}
function onSC(){if(!bowl.hasBowl)return;if(bowl.chili>=9)return;bowl.chili++;rSC();}
function rRoMi(){
  const el=$('roMiCount');
  if(el)el.textContent=miTrongRo.length;
}
function onRoMi(){
  if(!miTrongRo.length){tst('Rổ mì trống','b');return;}
  if(!bowl.hasBowl){tst('Lấy tô trước!','b');return;}
  if(!bowl.base){tst('Cần nước dùng trước!','b');return;}
  if(bowl.noodleState){tst('Tô đã có mì rồi!','b');return;}
  const st=miTrongRo.shift();
  bowl.noodleState=st;
  tst('Đã lấy mì từ rổ','g');
  rRoMi();rSrv();
}
function onBS(){if(!bowl.hasBowl){onGB();return;}if(!bowl.base){tst('Chọn nước dùng bên trên','b');return;}}
function onDump(){
  if(!bowl.hasBowl)return;
  bowl.base=null;bowl.noodleState=null;bowl.cooking=false;bowl.cookProgress=0;bowl.toppings=[];bowl.chili=0;
  const n=$('needle');if(n)n.style.left='0%';
  const st=$('cookState');if(st){st.textContent='Chạm thả';st.className='tc-state';}
  tst('Đã đổ tô (giữ lại tô)','g');rSrv();
}
function onSrv(){
  if(!bowl.hasBowl||!bowl.base||!bowl.noodleState) return;

  // Ưu tiên đơn app đang delivering trước
  const appOrder = appOrders.find(o=>o.delivering);
  if(appOrder){
    const ok = [...appOrder.order.toppings].sort().join(',');
    const bk = [...bowl.toppings].sort().join(',');
    if(ok !== bk){ tst('Sai topping so với đơn app!','b'); return; }

    const bi = gb(bowl.base);
    let pr = bi.sell + bowl.toppings.reduce((s,id)=>s+(S.prices[id]||(gi(id)?.sell)||0),0);
    let st = 5;
    if(bowl.noodleState==='song'||bowl.noodleState==='nhun') st -= 1;
    else pr += Math.round(3000*tm());
    if(bowl.chili === appOrder.order.spice) pr += Math.round(2000*tm());
    else if(Math.abs(bowl.chili - appOrder.order.spice) >= 3) st -= 1;
    pr += Math.round(etb()*tm());
    pr += 10000;   // Tip app online
    st = Math.max(1, Math.min(5, st));

    // Cộng tiền
    S.money += pr; revToday += pr; S.totalProfit += pr; S.reviews++;
    S.stars = Math.max(1, Math.min(5, (S.stars*(S.reviews-1)+st)/S.reviews));
    S.xp += 10 + (st===5?5:0);
    servedToday++; S.missionBowl++;
    if(st===5){ fiveStarsToday++; S.missionFive++; }
    if(Math.random()<0.85){ S.dirtyBowls++; S.collectedBowls++; bowlsReturnedToday++; }
    S.reviewList.push({face:appOrder.face, name:appOrder.name, stars:st, text:'Đơn app: '+rd(RT[st]||RT[3]), day:S.day});

    tst(`📱 +${fk(pr)} ★${st}`,'g');
    appOrders = appOrders.filter(o=>o.id!==appOrder.id);
    rAppOrders();
    resetBW(); rSrv();
    return;
  }

  // Nếu không có đơn app → xử lý khách bàn như cũ
  if(!customers.length) return;
  const c = customers[0];
  const ok = [...c.order.toppings].sort().join(',');
  const bk = [...bowl.toppings].sort().join(',');
  if(ok!==bk){ tst('Sai topping rồi!','b'); return; }
  const bi = gb(bowl.base);
  let pr = bi.sell + bowl.toppings.reduce((s,id)=>s+(S.prices[id]||(gi(id)?.sell)||0),0);
  let st = 5;
  if(bowl.noodleState==='song'||bowl.noodleState==='nhun') st-=1;
  else pr += Math.round(3000*tm());
  if(bowl.chili === c.order.spice) pr += Math.round(2000*tm());
  else if(Math.abs(bowl.chili - c.order.spice) >= 3) st-=1;
  pr += Math.round(etb()*tm());
  const mp = bi.sell + bowl.toppings.reduce((s,id)=>s+(S.prices[id]||(gi(id)?.sell)||0),0);
  const sp = 35000 + c.order.toppings.reduce((s,id)=>s+(DP[id]||0),0);
  const rt = mp/sp; let ep = 0;
  if(rt>1.3) ep=1; if(rt>1.6) ep=2;
  st = Math.max(1, Math.min(5, st-ep));
  if(!tournamentMode && Math.random()<0.22){ showCP(c,pr,st); return; }
  finSrv(c,pr,st,ep);
}

function finSrv(c,pr,st,ep){
  if(!tournamentMode&&st<=2){
    const ch=st===1?0.55:0.3;
    if(Math.random()<ch){khachDapChen(c,pr,st);return;}
  }
  customers=customers.filter(x=>x.id!==c.id);
  if(tournamentMode){
    tournamentScore+=100;
    if(bowl.noodleState==='vua')tournamentScore+=30;
    if(c.patience>0.6)tournamentScore+=40;
    if(bowl.noodleState!=='vua')tournamentScore-=30;
  }else{
    S.money+=pr;revToday+=pr;S.totalProfit+=pr;S.reviews++;
    S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+st)/S.reviews));
    S.xp+=10+(st===5?5:0);servedToday++;
    if(st===5){fiveStarsToday++;S.missionFive++;}
    S.missionBowl++;
    if(Math.random()<0.85){S.dirtyBowls++;S.collectedBowls++;bowlsReturnedToday++;}
    let tx;
    if(ep>0)tx=ep===2?'Quán chặt chém quá, không quay lại!':'Ngon nhưng hơi đắt, chắc ít ghé.';
    else{const ts3=RT[st]||RT[3];tx=rd(ts3);}
    S.reviewList.push({face:c.face,name:c.name,stars:st,text:tx,day:S.day});
  }
  tst(`+${fk(pr)} ${'★'.repeat(st)}`,st>=5?'g':'');
  resetBW();rSrv();
  if(!tournamentMode&&Math.random()<0.40){
    setTimeout(()=>triggerRandomEvent(c),300);
  }
}
function showCP(c,pr,st){
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>😳 Khách không có tiền</h2><div style="text-align:center;font-size:40px;margin:8px 0">${c.face}</div><p>"Chị ơi... em ăn xong rồi mà quên ví ở nhà!"</p><p style="color:var(--gold);font-weight:700">Hoá đơn: ${fm(pr)}</p><button class="cbb gy" id="cp1">💸 Cho khất · 30% mai trả <span class="bdg">-0⭐</span></button><button class="cbb" id="cp2">🚔 Gọi cảnh sát <span class="bdg">-1⭐</span></button><button class="cbb gr" id="cp3">🧼 Bắt rửa bát <span class="bdg">+2 tô +50%</span></button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#cp1').onclick=()=>{
    m.classList.remove('on');
    if(Math.random()<0.3){
      S.money+=pr;revToday+=pr;S.totalProfit+=pr;S.reviews++;
      S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+st)/S.reviews));
      S.reviewList.push({face:c.face,name:c.name,stars:st,text:'Mai quay lại trả đủ, xin lỗi chị!',day:S.day});
      tst('Khách quay lại trả tiền!','g');
    }else{
      S.reviews++;S.stars=Math.max(1,(S.stars*(S.reviews-1)+st)/S.reviews);
      S.reviewList.push({face:c.face,name:c.name,stars:st,text:'Khất tiền luôn, không thấy quay lại.',day:S.day});
      tst('Mất '+fk(pr)+', không thấy quay lại','b');
    }
    S.missionBowl++;servedToday++;
    if(Math.random()<0.85){S.dirtyBowls++;S.collectedBowls++;bowlsReturnedToday++;}
    customers=customers.filter(x=>x.id!==c.id);resetBW();rSrv();
  };
  cd.querySelector('#cp2').onclick=()=>{
    m.classList.remove('on');
    S.money+=pr;revToday+=pr;S.totalProfit+=pr;S.reviews++;
    const ns=Math.max(1,st-1);
    S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+ns)/S.reviews));
    S.reviewList.push({face:c.face,name:c.name,stars:ns,text:'Quán gọi cảnh sát vì khách quỵt tiền, hơi căng thẳng.',day:S.day});
    tst('Cảnh sát tới, thu đủ tiền!','g');
    S.missionBowl++;servedToday++;
    if(Math.random()<0.85){S.dirtyBowls++;S.collectedBowls++;bowlsReturnedToday++;}
    customers=customers.filter(x=>x.id!==c.id);resetBW();rSrv();
  };
  cd.querySelector('#cp3').onclick=()=>{
    m.classList.remove('on');
    const g=Math.round(pr*0.5);S.money+=g;revToday+=g;S.totalProfit+=g;S.reviews++;
    S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+st)/S.reviews));
    S.dirtyBowls+=2;
    S.reviewList.push({face:c.face,name:c.name,stars:st,text:'Ở lại rửa bát trừ nợ, cũng biết điều.',day:S.day});
    tst(`+${fk(g)} +2 tô bẩn`,'g');
    S.missionBowl++;servedToday++;
    if(Math.random()<0.85){S.dirtyBowls++;S.collectedBowls++;bowlsReturnedToday++;}
    customers=customers.filter(x=>x.id!==c.id);resetBW();rSrv();
  };
}
function resetBW(){
  bowl={hasBowl:false,base:null,noodleState:null,cooking:false,cookProgress:0,toppings:[],chili:0};
  const n=$('needle');if(n)n.style.left='0%';
  const st=$('cookState');if(st){st.textContent='Chạm thả';st.className='tc-state';}
}
function mkOrder(){
  const n=Math.floor(Math.random()*3);
  const ut=Object.keys(ET).filter(id=>hu(id)&&S.stock[id]?.qty>0);
  const pool=['bomy','xucxich','raucai'].filter(id=>S.stock[id].qty>0).concat(ut);
  const tp=[];
  for(let i=0;i<n&&pool.length>0;i++){
    const k=Math.floor(Math.random()*pool.length);
    tp.push(pool[k]);pool.splice(k,1);
  }
  const ub=Object.keys(EB).filter(id=>hu(id)&&S.stock[id]?.qty>0);
  const bp=(S.stock.kimchi.qty>0?['kimchi']:[]).concat(ub);
  const bs=bp.length>0?rd(bp):'kimchi';
  return{base:bs,toppings:tp,spice:1+Math.floor(Math.random()*5)};
}
function spCust(){
  const ms3=ms();
  const fr=[...Array(ms3).keys()].find(i=>!customers.some(c=>c.seat===i));
  if(fr===undefined)return false;
  const id=hdu()&&Math.random()<0.15;
  customers.push({id:nextCustId++,name:rd(NA),face:rd(FA),seat:fr,order:mkOrder(),patience:1,isDelivery:id,deliveryHandled:false});
  return true;
}
function tickPt(dt){
  if(boxingActive)return;
  const dr=dt/(10*pm());
  const out=[];
  customers.forEach(c=>{c.patience-=dr;if(c.patience<=0)out.push(c);});
  out.forEach(c=>{
    customers=customers.filter(x=>x.id!==c.id);
    if(tournamentMode){tournamentScore-=50;}
    else{
      S.stars=Math.max(1,S.stars-0.1);
      angryToday++;S.missionAngry++;
      S.reviewList.push({face:c.face,name:c.name,stars:2,text:rd(RT[2]),day:S.day});
    }
    tst('Khách bỏ về!','b');rSrv();
  });
}
function chkEnd(){
  if(tournamentMode)return;
  if(servedToday+angryToday>=dayTotal&&!customers.length){endDay();return;}
  if(running && !boxingActive && S.stock.mi.qty<=0 && !bowl.cooking && !bowl.noodleState && (customers.length>0 || servedToday>0)){
    const r=customers.length;
    running=false;
    miTrongRo=[];
    customers=[];
    angryToday+=r;S.missionAngry+=r;
    if(r>0)tst(`Hết mì rồi! ${r} khách còn lại phải về.`,'b');
    else tst('Hết mì rồi, đóng cửa nghỉ!','b');
    endDay();
  }
}
function closeShop(){
  if(!running)return;
  if(tournamentMode){tst('Đang thi, không đóng được!','b');return;}
  if(customers.length>0){if(!confirm(`Còn ${customers.length} khách đang chờ. Đóng cửa luôn?`))return;}
  else{if(!confirm('Đóng cửa và tổng kết ngày hôm nay?'))return;}
  running=false;
  miTrongRo=[];
  const r=customers.length;customers=[];angryToday+=r;S.missionAngry+=r;
  if(r>0)tst(`${r} khách bỏ về!`,'b');
  endDay();
}
function closeShopAuto(){if(!running)return;running=false;customers=[];endDay();}
function khachDapChen(c,pr,st){
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>😡 Khách đập chén!</h2><div style="text-align:center;font-size:44px;margin:8px 0">${c.face} 💥🍜</div><p>"Dở quá, không ăn được! Đền đây!"</p><p style="color:var(--red);font-weight:800">Khách đập chén bỏ về, không trả tiền!</p><div class="rl"><span>Thiệt hại</span><span class="ne">-${fk(pr)}</span></div><div class="rl"><span>Chén vỡ</span><span class="ne">+1 tô bẩn</span></div><div class="rl"><span>Đánh giá</span><span class="ne">-2⭐</span></div><button class="cbb gr" id="dck">Chịu đựng</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#dck').onclick=()=>{
    m.classList.remove('on');
    S.reviews++;S.stars=Math.max(1,(S.stars*(S.reviews-1)+Math.max(1,st-2))/S.reviews);
    S.dirtyBowls+=1;
    S.reviewList.push({face:c.face,name:c.name,stars:1,text:'Đập chén bỏ về, mì dở quá!',day:S.day});
    S.missionBowl++;servedToday++;angryToday++;S.missionAngry++;
    customers=customers.filter(x=>x.id!==c.id);
    resetBW();rSrv();
  };
}

/* ---------- QUẢN LÝ ---------- */
function showQuanLyTangGia(){
  if(!running||tournamentMode)return;
  const keys=['base','bomy','xucxich','raucai'];
  const k=rd(keys);
  const names={base:'Mì cay Kim chi',bomy:'Bò Mỹ',xucxich:'Xúc xích',raucai:'Rau cải'};
  const pct=10+Math.floor(Math.random()*20);
  const oldP=S.prices[k];
  const newP=Math.min(60000,Math.round(oldP*(1+pct/100)/1000)*1000);
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>🧑‍💼 Quản lý ghé thăm</h2><div style="text-align:center;font-size:40px;margin:8px 0">🧑‍💼</div><p>"Quán bán ế quá, tôi đề xuất tăng giá <b style="color:var(--gold)">${names[k]}</b> thêm <b style="color:var(--gold)">${pct}%</b>."</p><div class="rl"><span>Giá hiện tại</span><span>${fk(oldP)}</span></div><div class="rl"><span>Giá mới</span><span class="po">${fk(newP)}</span></div><p style="color:var(--red);font-size:11px">Cảnh báo: giá cao khách sẽ không hài lòng, có thể bỏ về.</p><button class="cbb gr" id="ql1">✅ Đồng ý tăng giá</button><button class="cbb gy" id="ql2">❌ Từ chối</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#ql1').onclick=()=>{
    m.classList.remove('on');
    S.prices[k]=newP;
    tst(`Đã tăng giá ${names[k]} lên ${fk(newP)}`,'g');
    const toLeave=customers.filter(cc=>Math.random()<0.4);
    toLeave.forEach(cc=>{
      customers=customers.filter(x=>x.id!==cc.id);
      S.stars=Math.max(1,S.stars-0.1);angryToday++;S.missionAngry++;
      S.reviewList.push({face:cc.face,name:cc.name,stars:2,text:'Giá tăng vọt, bỏ về!',day:S.day});
    });
    if(toLeave.length)tst(`${toLeave.length} khách bỏ về vì giá tăng!`,'b');
    rSrv();rPrep();save();
  };
  cd.querySelector('#ql2').onclick=()=>{m.classList.remove('on');tst('Quản lý không hài lòng','b');save();};
}
function showQuanLyPhat(){
  if(!running||tournamentMode)return;
  const h=getHired();if(!h.length)return;
  const id=rd(h);const nv=EQ[id];
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>🧑‍💼 Quản lý phạt nhân viên</h2><div style="text-align:center;font-size:40px;margin:8px 0">🧑‍💼</div><p>Quản lý phát hiện <b>${nv.nm}</b> làm việc lơ là, đề xuất phạt <b style="color:var(--red)">${fk(nv.wage)}</b>.</p><button class="cbb" id="pf1">😤 Phạt thật nặng</button><button class="cbb gy" id="pf2">😐 Nhắc nhở nhẹ</button><button class="cbb gr" id="pf3">🤝 Bỏ qua, động viên</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#pf1').onclick=()=>{
    m.classList.remove('on');
    S.money-=nv.wage;
    S.employeeMood[id]=(S.employeeMood[id]||1)-0.5;
    S.nhanVienAnChan[id]=(S.nhanVienAnChan[id]||0)+1;
    tst(`${nv.nm} bị phạt, mặt đỏ gay...`,'b');save();
  };
  cd.querySelector('#pf2').onclick=()=>{
    m.classList.remove('on');
    S.employeeMood[id]=(S.employeeMood[id]||1)-0.15;
    tst(`${nv.nm} hơi buồn`,'b');save();
  };
  cd.querySelector('#pf3').onclick=()=>{
    m.classList.remove('on');
    S.employeeMood[id]=(S.employeeMood[id]||1)+0.2;
    tst(`${nv.nm} cảm kích chủ quán`,'g');save();
  };
}
function checkAnChan(){
  let stolen=0;
  for(const id in S.nhanVienAnChan){
    if(S.nhanVienAnChan[id]>0 && Math.random()<0.6){
      const amt=Math.round(revToday*0.1)+Math.floor(Math.random()*50000);
      stolen+=amt;
      S.nhanVienAnChan[id]--;
      tst(`${EQ[id]?EQ[id].nm:'Nhân viên'} ăn chặn ${fk(amt)}!`,'b');
    }
  }
  return stolen;
}

/* ---------- BOXING MINIGAME ---------- */
/* ---------- BOXING MINIGAME (màn riêng) ---------- */
function startBoxingGame(callback){
  const screen = $('s-boxing');
  const pestIc = $('boxPestIc');
  const pests = ['🐭','🐀','🦗','🪳'];
  pestIc.textContent = rd(pests);

  let pHP = 100, eHP = 100, running2 = true;

  const h1 = $('bh1'), h2 = $('bh2');
  const t1 = $('bht1'), t2 = $('bht2');
  const msg = $('boxMsg');
  const hitBtn = $('boxHit');
  const closeBtn = $('boxingClose');

  function updateHUD(){
    h1.style.width = Math.max(0,pHP)+'%';
    h2.style.width = Math.max(0,eHP)+'%';
    t1.textContent = Math.max(0,Math.round(pHP));
    t2.textContent = Math.max(0,Math.round(eHP));
  }

  function cleanup(){
    screen.classList.remove('on');
    hitBtn.onclick = null;
    closeBtn.onclick = null;
  }

  function endGame(win){
    running2 = false;
    cleanup();
    if(win){
      tst('ĐẤM THẮNG! Tiếp tục nấu 🍜','g');
      S.xp += 5;
    }else{
      tst('Bị đánh bại! Khách bỏ về 😡','b');
    }
    if(callback) callback(win);
  }

  // Reset trạng thái
  pHP = 100; eHP = 100; running2 = true;
  updateHUD();
  msg.textContent = 'ĐẤM NÓ!';
  msg.className = 'boxing-msg';

  hitBtn.onclick = ()=>{
    if(!running2) return;
    const dmg = 15 + Math.floor(Math.random()*16);
    eHP -= dmg;
    msg.textContent = `Đấm ${dmg}!`;
    msg.className = 'boxing-msg hit';
    setTimeout(()=>{ if(running2) msg.className='boxing-msg'; },180);
    updateHUD();
    if(eHP <= 0){
      running2 = false;
      setTimeout(()=>endGame(true),350);
    }
  };

  closeBtn.onclick = ()=>{
    if(!running2) return;
    // Thoát = thua
    if(!confirm('Thoát ra nghĩa là bỏ cuộc. Chắc chắn?')) return;
    running2 = false;
    cleanup();
    if(callback) callback(false);
  };

  const tickAtk = ()=>{
    if(!running2) return;
    const dmg = 6 + Math.floor(Math.random()*16);
    pHP -= dmg;
    msg.textContent = `Bị đánh ${dmg}!`;
    msg.className = 'boxing-msg ouch';
    setTimeout(()=>{ if(running2) msg.className='boxing-msg'; },180);
    updateHUD();
    if(pHP <= 0){
      running2 = false;
      setTimeout(()=>endGame(false),350);
      return;
    }
    setTimeout(tickAtk, 900 + Math.random()*600);
  };
  setTimeout(tickAtk, 1200);

  // Hiện màn
  screen.classList.add('on');
}

/* ---------- RANDOM EVENTS ---------- */
function showEvent({avatar,tag,title,desc,options}){
  evActive=true;
  const modal=document.createElement('div');modal.className='ev-modal on';
  const opts=options.map((o,i)=>`<button class="ev-opt${o.alt?' alt':''}${o.ghost?' ghost':''}" data-i="${i}">${o.label}<span class="sub">${o.sub||''}</span></button>`).join('');
  modal.innerHTML=`<div class="ev-card"><div class="ev-avatar">${avatar}</div><div class="ev-tag">${tag}</div><div class="ev-title">${title}</div><div class="ev-desc">${desc}</div>${opts}</div>`;
  document.body.appendChild(modal);
  modal.querySelectorAll('.ev-opt').forEach(b=>{
    b.onclick=()=>{
      const opt=options[parseInt(b.dataset.i)];
      modal.remove();evActive=false;
      if(opt.action)opt.action();
    };
  });
}
function triggerRandomEvent(c){
  if(!c||tournamentMode||evActive)return;
  const name=c.name,face=c.face;
  const roll=Math.random();
  let ev;
  if(roll<0.12)ev='anquyt';
  else if(roll<0.24)ev='phanNan';
  else if(roll<0.32)ev='gayRoi';
  else if(roll<0.42)ev='thieuTien';
  else if(roll<0.52)ev='duTien';
  else if(roll<0.62)ev='traGia';
  else if(roll<0.68)ev='hetGas';
  else return;
  if(ev==='anquyt')evAnQuyt(name,face);
  else if(ev==='phanNan')evPhanNan(name,face);
  else if(ev==='gayRoi')evGayRoi(name,face);
  else if(ev==='thieuTien')evThieuTien(name,face);
  else if(ev==='duTien')evDuTien(name,face);
  else if(ev==='traGia')evTraGia(name,face);
  else if(ev==='hetGas')evHetGas();
}
function evAnQuyt(name,face){
  const amt=30000+Math.floor(Math.random()*40000);
  showEvent({avatar:face,tag:'ĂN QUỴT',title:`${name} định ăn quỵt!`,
    desc:`Ăn xong, <b>${name}</b> lẳng lặng đứng dậy đi ra cửa mà chưa trả <b>${fm(amt)}</b>.`,
    options:[
      {label:'Chạy theo đòi',sub:'hên xui, 50% đòi được',action:()=>{
        if(Math.random()<0.5){S.money+=amt;revToday+=amt;S.totalProfit+=amt;tst(`Đòi được ${fk(amt)}!`,'g');}
        else{S.stars=Math.max(1,S.stars-0.1);tst(`Không đuổi kịp, mất ${fk(amt)}`,'b');S.reviewList.push({face,name,stars:2,text:'Khách ăn quỵt chạy mất.',day:S.day});}
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Thôi, bỏ qua',sub:`mất ${fk(amt)}`,alt:true,action:()=>{
        S.reviews++;S.stars=Math.max(1,S.stars-0.05);
        S.reviewList.push({face,name,stars:2,text:'Khách ăn quỵt, chủ quán không đuổi.',day:S.day});
        tst(`Bỏ qua, mất ${fk(amt)}`,'b');
        servedToday++;S.missionBowl++;save();
      }},
    ]});
}
function evPhanNan(name,face){
  const amt=40000+Math.floor(Math.random()*30000);
  showEvent({avatar:face,tag:'KHÁCH PHÀN NÀN',title:`${name} than phiền`,
    desc:`"Ủa, trong tô có <b>sợi tóc</b> nè!" ${name} nói to, mấy bàn bên cạnh quay sang nhìn.`,
    options:[
      {label:'Xin lỗi, hoàn tiền',sub:`mất ${fk(amt)}, giữ uy tín`,action:()=>{
        S.money-=amt;
        S.reviews++;S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+4)/S.reviews));
        S.reviewList.push({face,name,stars:4,text:'Quán xử lý lỗi nhanh, có hoàn tiền.',day:S.day});
        tst(`Xin lỗi hoàn tiền ${fk(amt)}`,'g');
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Tặng thêm topping',sub:'tốn 10k, hên xui',alt:true,action:()=>{
        if(Math.random()<0.7){
          S.money-=10000;S.reviews++;
          S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+4.5)/S.reviews));
          tst('Khách hài lòng, tip thêm!','g');S.money+=15000;
          S.reviewList.push({face,name,stars:5,text:'Quán tặng topping bù, dễ thương!',day:S.day});
        }else{
          S.stars=Math.max(1,S.stars-0.15);
          S.reviewList.push({face,name,stars:2,text:'Tóc trong tô, tặng topping không đủ.',day:S.day});
          tst('Khách vẫn bực!','b');
        }
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Cãi: tóc của khách mà',sub:'hên xui, có thể mất sao',alt:true,action:()=>{
        if(Math.random()<0.3){tst('Khách chột dạ, xin lỗi!','g');}
        else{S.stars=Math.max(1,S.stars-0.3);S.reviewList.push({face,name,stars:1,text:'Chủ quán cãi khách, tệ!',day:S.day});tst('Khách giận dữ bỏ về!','b');}
        servedToday++;S.missionBowl++;save();
      }},
    ]});
}
function evGayRoi(name,face){
  showEvent({avatar:face,tag:'KHÁCH GÂY RỐI',title:`${name} say xỉn làm ồn`,
    desc:`${name} vừa nhậu ở quán bên cạnh qua, nói to hát hò làm các bạn khác khó chịu.`,
    options:[
      {label:'Mời khách về',sub:'mất một khách',action:()=>{tst(`Đã mời ${name} về`,'g');servedToday++;S.missionBowl++;save();}},
      {label:'Pha ly trà gừng',sub:'tốn 5k, hên xui',alt:true,action:()=>{
        S.money-=5000;
        if(Math.random()<0.75){tst('Khách tỉnh ra, xin lỗi!','g');S.money+=10000;}
        else{tst('Khách vẫn say, ồn ào hơn!','b');S.stars=Math.max(1,S.stars-0.1);}
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Kệ khách',sub:'khách khác mất kiên nhẫn nhanh hơn',alt:true,action:()=>{
        customers.forEach(c=>{c.patience=Math.max(0.1,c.patience-0.3);});
        tst('Khách khác bực bội!','b');
        servedToday++;S.missionBowl++;save();
      }},
    ]});
}
function evThieuTien(name,face){
  const amt=10000;
  showEvent({avatar:face,tag:'ĐƯA NHẦM TIỀN',title:`${name} đưa thiếu tiền`,
    desc:`${name} đưa thiếu <b>${fk(amt)}</b> rồi vội vàng đi ra cửa.`,
    options:[
      {label:'Gọi lại nhắc khéo',sub:'hên xui',action:()=>{
        if(Math.random()<0.7){S.money+=amt;revToday+=amt;S.totalProfit+=amt;tst(`Đòi được ${fk(amt)}!`,'g');}
        else{tst(`Khách không nghe, mất ${fk(amt)}`,'b');}
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Thôi bỏ qua',sub:`mất ${fk(amt)}`,alt:true,action:()=>{tst(`Bỏ qua, mất ${fk(amt)}`,'b');servedToday++;S.missionBowl++;save();}},
    ]});
}
function evDuTien(name,face){
  const amt=20000;
  showEvent({avatar:face,tag:'ĐƯA NHẦM TIỀN',title:`${name} đưa dư tiền`,
    desc:`${name} đưa nhầm tờ tiền, dư <b>${fk(amt)}</b> mà không để ý.`,
    options:[
      {label:'Trả lại tiền dư',sub:'khách quý, quán nổi tiếng thật thà',action:()=>{
        S.reviews++;S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+5)/S.reviews));
        S.reviewList.push({face,name,stars:5,text:'Quán thật thà trả lại tiền dư!',day:S.day});
        tst('Khách cảm kích, để lại 5 sao!','g');
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Im lặng giữ luôn',sub:'hên xui',alt:true,action:()=>{
        S.money+=amt;revToday+=amt;S.totalProfit+=amt;
        if(Math.random()<0.4){S.stars=Math.max(1,S.stars-0.15);S.reviewList.push({face,name,stars:2,text:'Quán không trả lại tiền dư!',day:S.day});tst('Khách phát hiện, bực!','b');}
        else{tst(`Giữ được ${fk(amt)}`,'g');}
        servedToday++;S.missionBowl++;save();
      }},
    ]});
}
function evTraGia(name,face){
  const amt=5000+Math.floor(Math.random()*8000);
  showEvent({avatar:face,tag:'TRẢ GIÁ',title:`${name} trả giá`,
    desc:`"Quán ơi bớt cho em <b>${fk(amt)}</b> đi, lần sau em dẫn bạn tới ăn!"`,
    options:[
      {label:`Bớt ${fk(amt)}`,sub:'khách vui, dễ quay lại',action:()=>{
        S.money-=amt;
        S.reviews++;S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+5)/S.reviews));
        tst(`Đã bớt ${fk(amt)}`,'g');
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Giữ giá',sub:'hên xui',alt:true,action:()=>{
        if(Math.random()<0.6){tst('Khách chấp nhận, vẫn trả đủ','g');}
        else{S.stars=Math.max(1,S.stars-0.05);tst('Khách hơi buồn','b');}
        servedToday++;S.missionBowl++;save();
      }},
      {label:'Tặng ly trà đá',sub:'tốn 3k, hên xui',alt:true,action:()=>{
        S.money-=3000;
        if(Math.random()<0.85){S.reviews++;S.stars=Math.max(1,Math.min(5,(S.stars*(S.reviews-1)+4.8)/S.reviews));tst('Khách vui, tip lại 5k!','g');S.money+=5000;}
        else{tst('Khách vẫn muốn bớt tiền','b');}
        servedToday++;S.missionBowl++;save();
      }},
    ]});
}
function evHetGas(){
  showEvent({avatar:'🔥',tag:'SỰ CỐ BẾP',title:'Hết bình gas!',
    desc:'Bếp phụt tắt giữa giờ đông khách, bình gas đã cạn.',
    options:[
      {label:'Gọi gas giao gấp',sub:'tốn 60k, nấu tiếp ngay',action:()=>{S.money-=60000;tst('Gas mới tới, nấu tiếp!','g');save();}},
      {label:'Dùng bếp điện dự phòng',sub:'mì chín chậm hơn 40 giây',alt:true,action:()=>{
        customers.forEach(c=>{c.patience=Math.max(0.05,c.patience-0.4);});
        tst('Bếp điện chậm, khách sốt ruột!','b');save();
      }},
    ]});
}

/* ---------- EMPLOYEE EVENTS ---------- */
function getHired(){return Object.keys(S.hired).filter(id=>S.hired[id]===true&&EQ[id]&&EQ[id].cat==='nv');}
function maybeEmpEvent(){
  if(!running)return;
  const h=getHired();if(!h.length)return;
  const r=Math.random();
  if(r<0.15)trLeave(rd(h));
  else if(r<0.22)trWedding(rd(h));
}
function trLeave(id){
  const nv=EQ[id];
  const rs=['bị ốm, không dậy nổi','nhà có việc gấp ở quê','con nhỏ sốt phải đưa đi viện','đi đám cưới họ hàng','bị tai nạn xe nhẹ, đau chân','bố mẹ già yếu cần chăm'];
  const r=rd(rs);
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>📢 Nhân viên xin nghỉ</h2><div style="text-align:center;font-size:40px;margin:8px 0">${nv.ic}</div><p><b>${nv.nm}</b> xin nghỉ hôm nay vì <b style="color:var(--gold)">${r}</b>.</p><p style="color:var(--dim)">Lương ngày: ${fm(nv.wage)}</p><button class="cbb gr" id="lv1">✅ Cho nghỉ · mất ${fk(nv.wage)} <span class="bdg">+tinh thần</span></button><button class="cbb gy" id="lv2">💪 Bắt làm tiếp · có lương <span class="bdg">-tinh thần</span></button><button class="cbb" id="lv3">😤 Tăng ca không lương <span class="bdg">tiết kiệm</span></button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#lv1').onclick=()=>{m.classList.remove('on');S.money-=nv.wage;S.employeeMood[id]=(S.employeeMood[id]||1)+0.15;tst(`Cho ${nv.nm} nghỉ, mất ${fk(nv.wage)}`,'g');save();};
  cd.querySelector('#lv2').onclick=()=>{m.classList.remove('on');S.employeeMood[id]=(S.employeeMood[id]||1)-0.2;S.stars=Math.max(1,S.stars-0.05);tst(`${nv.nm} miễn cưỡng làm`,'b');save();};
  cd.querySelector('#lv3').onclick=()=>{m.classList.remove('on');S.employeeMood[id]=(S.employeeMood[id]||1)-0.4;S.stars=Math.max(1,S.stars-0.1);tst(`${nv.nm} tăng ca không lương`,'b');S.hired[id]='saved';save();};
}
function trWedding(id){
  const nv=EQ[id],gm=Math.round(nv.wage*2);
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>💒 Nhân viên mời cưới</h2><div style="text-align:center;font-size:40px;margin:8px 0">💍</div><p><b>${nv.nm}</b> mời cưới và xin nghỉ lo đám.</p><p style="color:var(--dim)">Lương ngày: ${fm(nv.wage)}</p><button class="cbb gr" id="wd1">🎁 Cho nghỉ + mừng ${fk(gm)} <span class="bdg">+tinh thần</span></button><button class="cbb gy" id="wd2">😐 Không cho nghỉ <span class="bdg">-tinh thần</span></button><button class="cbb" id="wd3">😤 Bắt làm + không lương <span class="bdg">-tinh thần mạnh</span></button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#wd1').onclick=()=>{m.classList.remove('on');S.money-=gm;S.employeeMood[id]=(S.employeeMood[id]||1)+0.3;tst(`Đã mừng cưới ${nv.nm} ${fk(gm)}`,'g');save();};
  cd.querySelector('#wd2').onclick=()=>{m.classList.remove('on');S.employeeMood[id]=(S.employeeMood[id]||1)-0.25;S.stars=Math.max(1,S.stars-0.05);tst(`${nv.nm} buồn vì không được nghỉ`,'b');save();};
  cd.querySelector('#wd3').onclick=()=>{
    m.classList.remove('on');S.employeeMood[id]=(S.employeeMood[id]||1)-0.5;S.stars=Math.max(1,S.stars-0.15);
    tst(`${nv.nm} rất buồn, có thể xin nghỉ việc sớm`,'b');
    if(S.employeeMood[id]<0.3&&Math.random()<0.5){tst(`${nv.nm} đã xin nghỉ việc!`,'b');delete S.hired[id];delete S.owned[id];}
    save();
  };
}

/* ---------- END DAY ---------- */
function endDay(){
  running=false;
  // Lãi ngân hàng trước
  let interest=0;
  if(S.loan>0){
    interest=Math.max(1,Math.floor(S.loan*(0.05/365)));
    S.loan+=interest;
  }
  S.money-=RENT*S.branches+UTIL;
  const sal=ts2();S.money-=sal;
  const stolen=checkAnChan();S.money-=stolen;
  for(const id in S.stock){if(S.stock[id].exp!==null&&S.stock[id].exp<=S.day){S.stock[id].qty=0;S.stock[id].exp=null;}}
  let bon=0;
  if(S.missionBowl>=6)bon+=20000;
  if(S.missionAngry===0)bon+=20000;
  if(S.missionFive>=3)bon+=20000;
  if(bon>0)S.money+=bon;
  const net=revToday+bon-RENT*S.branches-UTIL-sal-stolen-interest;
  const dw=S.dirtyBowls;
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>Hết ngày ${S.day}</h2><div class="rl"><span>Phục vụ</span><span class="po">${servedToday} khách</span></div><div class="rl"><span>Khách bỏ về</span><span class="ne">${angryToday}</span></div><div class="rl"><span>Tô thu lại</span><span class="po">${bowlsReturnedToday}</span></div><div class="rl"><span>Tô bẩn chờ rửa</span><span style="color:var(--gold)">${dw} tô</span></div><div class="rl"><span>Doanh thu</span><span class="po">+${fm(revToday)}</span></div>${bon>0?`<div class="rl"><span>Thưởng nhiệm vụ</span><span class="po">+${fm(bon)}</span></div>`:''}<div class="rl"><span>Mặt bằng</span><span class="ne">-${fm(RENT*S.branches)}</span></div><div class="rl"><span>Điện nước</span><span class="ne">-${fm(UTIL)}</span></div>${sal>0?`<div class="rl"><span>Lương NV</span><span class="ne">-${fm(sal)}</span></div>`:''}${stolen>0?`<div class="rl"><span>NV ăn chặn</span><span class="ne">-${fm(stolen)}</span></div>`:''}${interest>0?`<div class="rl"><span>Lãi ngân hàng</span><span class="ne">-${fm(interest)}</span></div>`:''}<div class="rl" style="border-top:2px solid var(--border);margin-top:6px;padding-top:10px"><span><b>Lãi ngày</b></span><span class="${net>=0?'po':'ne'}"><b>${net>=0?'+':''}${fm(net)}</b></span></div><div class="rl"><span>Còn lại</span><span class="po">${fm(S.money)}</span></div>${dw>=3?`<button class="cbb gr" id="doW">🧼 Rửa ${dw} tô bẩn</button>`:''}<button class="cbb gh" id="nxD">Sang ngày ${S.day+1}</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  cd.querySelector('#nxD').onclick=()=>{
    S.day++;m.classList.remove('on');sw('s-prep');rPrep();save();
  };
  const wb=cd.querySelector('#doW');
  if(wb)wb.onclick=()=>{
    const c=S.dirtyBowls;
    m.classList.remove('on');
    stWash(c,()=>{
      S.day++;
      sw('s-prep');
      rPrep();
      save();
    });
  };
  save();
}

/* ---------- WASH MINIGAME ---------- */
function stWash(count,onDone){
  washState={total:count,cleaned:0,bowls:[],timeLeft:15,running:true,onDone};
  for(let i=0;i<count;i++)washState.bowls.push({taps:0,need:3,clean:false});
  const cd=document.createElement('div');cd.className='cd';
  cd.innerHTML=`<h2>🧼 Rửa tô cuối ngày</h2><div class="wt" id="wtT">⏱ 15s</div><div class="wsc">Đã rửa: <b id="wCl">0</b> / ${count} tô</div><div class="wg" id="wG"></div><div style="font-size:11px;color:var(--dim);text-align:center;line-height:1.4">Chạm mỗi tô 3 lần để rửa sạch. Tô sạch cất lại vào kho.</div><button class="cbb gh" id="wSk" style="margin-top:10px">Bỏ qua, để mai rửa</button>`;
  const m=$('modal');m.innerHTML='';m.appendChild(cd);m.classList.add('on');
  const g=cd.querySelector('#wG');
  washState.bowls.forEach((b,i)=>{
    const el=document.createElement('div');el.className='wb';
    el.innerHTML=`<div class="wi">🥣</div><div class="wp"><div class="wpf"></div></div>`;
    el.onclick=()=>{
      if(b.clean||!washState.running)return;
      b.taps++;
      const f=el.querySelector('.wpf');if(f)f.style.width=(b.taps/b.need*100)+'%';
      if(b.taps>=b.need){
        b.clean=true;el.classList.add('cl');el.querySelector('.wi').textContent='✨';
        washState.cleaned++;
        const ce=document.getElementById('wCl');if(ce)ce.textContent=washState.cleaned;
        tst('Tô sạch!','g');
      }
    };
    g.appendChild(el);
  });
  cd.querySelector('#wSk').onclick=()=>{
    washState.running=false;
    if(washRafId)cancelAnimationFrame(washRafId);
    $('modal').classList.remove('on');
    if(onDone)onDone();
  };
  const sT=performance.now();
  const tk=()=>{
    if(!washState||!washState.running)return;
    const el=(performance.now()-sT)/1000;
    washState.timeLeft=Math.max(0,15-el);
    const t=document.getElementById('wtT');if(t)t.textContent=`⏱ ${Math.ceil(washState.timeLeft)}s`;
    if(washState.timeLeft<=0||washState.cleaned>=washState.total){
      washState.running=false;
      S.stock.to.qty+=washState.cleaned;
      S.dirtyBowls-=washState.cleaned;if(S.dirtyBowls<0)S.dirtyBowls=0;
      tst(`Rửa xong ${washState.cleaned} tô!`,'g');
      $('modal').classList.remove('on');
      if(onDone)onDone();
      return;
    }
    washRafId=requestAnimationFrame(tk);
  };
  washRafId=requestAnimationFrame(tk);
}

/* ---------- MAIN LOOP ---------- */
function loop(now){
  const dt=Math.min(0.1,(now-lastTime)/1000);lastTime=now;
  if(running){
    if(tournamentMode){
      tournamentTimer-=dt;
      const h=document.getElementById('tnH');
      if(h)h.textContent=`⏱ ${Math.ceil(tournamentTimer)}s · Điểm ${tournamentScore}`;
      if(tournamentTimer<=0)enTN();
    }else{
      S.time+=dt*0.4;
      if(S.time>=21*60){
        S.time=21*60;
        if(!tournamentMode&&running){tst('21h rồi, đóng cửa nghỉ!','b');closeShopAuto();}
      }
    }
    tickCk(dt);
    tickPt(dt);
    tickAppOrders(dt);   // ← thêm dòng này
    qlTimer+=dt;
    if(!tournamentMode && qlTimer>180+Math.random()*180){
      qlTimer=0;
      if(getHired().length>0 && Math.random()<0.5)showQuanLyPhat();
      else showQuanLyTangGia();
    }
    spawnTimer-=dt;
    const sl=tournamentMode?20:dayTotal;
    if(spawnTimer<=0&&!boxingActive&&servedToday+angryToday+customers.length<sl){
      if(spCust()){
        if(tournamentMode){
          spawnTimer=1.5+Math.random()*1.5;
        }else{
          const remainTime=(21*60-S.time)/0.4;
          const remainCust=sl-(servedToday+angryToday+customers.length);
          spawnTimer=Math.max(0.5, Math.min(300, remainTime/Math.max(1,remainCust)*0.7));
        }
        rSlot();rOS();
      }else{spawnTimer=0.5;}
    }
    rSH();
    const bar=$('patienceFill');
    if(bar&&customers.length>0){
      const c=customers[0];
      bar.style.width=(c.patience*100)+'%';
      bar.className='patience-fill'+(c.patience<0.3?' danger':c.patience<0.6?' warn':'');
    }
    if(customers.length>0){
      const fid=customers[0].id;
      if(orderStripLastId!==fid){orderStripLastId=fid;rOS();rTR();}
    }else if(orderStripLastId!==null&&orderStripLastId!==undefined){
      orderStripLastId=null;rOS();rTR();
    }
    chkEnd();
  }
  requestAnimationFrame(loop);
}

/* ---------- INIT ---------- */
function init(){
  load();
  initStart();initTut();initTabs();
  $('potCol').onclick=onPot;
  $('sauceCol').onclick=onSC;
  $('btnBGM').onclick=toggleBGM;
  $('roMi').onclick=onRoMi;
  $('bowlStage').onclick=onBS;
  $('dumpBtn').onclick=onDump;
  $('serveBtn').onclick=onSrv;
  $('btnCloseShop').onclick=closeShop;
  let tp=0,tm2=null;
  const ph=document.querySelector('.ph');
  if(ph){
    ph.addEventListener('click',()=>{
      tp++;clearTimeout(tm2);tm2=setTimeout(()=>tp=0,800);
      if(tp>=5&&confirm('Reset toàn bộ tiến trình?')){localStorage.removeItem('micaay_v7');location.reload();}
    });
  }
  rcm();rPrep();sw('s-start');
  running=false;requestAnimationFrame(loop);lastTime=performance.now();      
}

init();  