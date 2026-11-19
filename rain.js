// 🌧 有雨 / 没雨：户外事项各有一个「下雨的话」的方案，可以按当前时段切换。
// 选择只存在这台手机上。每天顶部可以一键切换，单个事项也能单独切。
(function () {
  const R = {
    // 11/19
    '1::露台 / 泳池看日落': '下雨看不到日落，就待在房间或五楼咖啡厅看雨里的洱海，雾蒙蒙的也很好看。泡个澡、把下午茶拖长一点。',
    // 11/20
    '2::露台看日出': '下雨没有日出，安心睡个懒觉。雨停后拉开窗帘，苍山和湖面上常常会有云雾。',
    '2::30 分钟旅拍': '下雨的话先问酒店旅拍能不能换个时间，或者换到室内拍。',
    '2::小普陀': '小普陀很小、没地方躲雨，下雨可以跳过，直接去双廊。',
    '2::双廊古镇': '少逛一会儿街，早点去野栩坐窗边吃饭，看雨里的洱海。',
    '2::无极咖啡 WUJICAFE': '坐室内靠窗的位置，雨天的洱海颜色更沉，很适合发呆。',
    '2::南诏风情岛（可选）': '下雨就不去了，岛上基本都是露天的。早点回酒店休息。',
    '2::泳池 / 露台日落': '下雨看不到日落，就在房间里泡澡、换好衣服慢慢准备晚宴。',
    // 11/21
    '3::才村码头看晚霞': '下雨大概率没有晚霞，可以直接去稻云滇吃饭，或者回酒店先开一局。',
    '3::稻云滇·现炒山野云南菜·屋顶观景（才村店）': '下雨就不上屋顶，选室内的位置。',
    // 11/22
    '4::龙龛码头看日出 · 喂海鸥（想早起再去）': '下雨没有日出，海鸥也少，睡到自然醒就好。',
    '4::喜洲古镇': '带把伞照样能逛。重点去严家大院这类能进屋看的老宅子，少在露天街上久站。',
    '4::海舌公园': '下雨就别去了，长堤上没地方躲雨。可以在喜洲找家咖啡馆坐坐，或者在点评上搜喜洲附近的扎染体验，室内能动手做。也可以早点回龙龛。',
    '4::苍山感通索道（天气好可替换下午）': '下雨不要坐，山上又冷又看不到风景。',
    // 11/23
    '5::崇圣寺三塔': '小雨照样可以去，大殿和长廊能躲雨，雨后聚影池的倒影也好看。雨大的话就直接去古城，少走露天的路。',
    '5::大理古城：人民路 / 洋人街 / 五华楼': '古城里店铺多，逛文创小店、进咖啡馆都能躲雨。可以早点去请请请坐 OTM 坐着。',
    '5::竹水谣·花间堂海景私汤花园民宿（洱海店）': '下雨正好泡私汤听雨，看不到日落也很舒服。',
  };

  const KEY = (d, n) => d + '::' + n;
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} };
  const state = (d, n) => get('wx::' + KEY(d, n)) || get('wxday::' + d) || 'sun';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const css = document.createElement('style');
  css.textContent = `
.wx{display:flex;gap:6px;margin:6px 0 2px}
.wx .btn.wxb{font-size:12px;padding:3px 10px;border-radius:99px;border:1px solid var(--separator,#ddd);background:transparent;color:var(--text-secondary,#666);font-weight:600}
.wx .btn.wxb.on{background:#2f7fd6;border-color:#2f7fd6;color:#fff}
.wx .btn.wxb.on[data-v="sun"]{background:#e8901f;border-color:#e8901f}
.rainbox{display:none;margin:6px 0;padding:8px 10px;border-radius:10px;background:#eaf3fd;border:1px solid #bcd8f5;font-size:13px;line-height:1.6;color:#1d3a5c}
.tl-item.is-rain .rainbox{display:block}
.tl-item.is-rain .card>.desc{opacity:.5}
.wxday{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0 14px;padding:10px 12px;border-radius:12px;background:var(--bg-secondary,#f4f6f8);font-size:14px}
.wxday .btn.wxb{font-size:13px;padding:5px 12px;border-radius:99px;border:1px solid var(--separator,#ddd);background:transparent;color:inherit;font-weight:600}
.wxday .btn.wxb.on{background:#2f7fd6;border-color:#2f7fd6;color:#fff}
.wxday .btn.wxb.on[data-v="sun"]{background:#e8901f;border-color:#e8901f}
@media (prefers-color-scheme: dark){.rainbox{background:#16283b;border-color:#29496b;color:#d6e6f7}}`;
  document.head.appendChild(css);

  const _lc = locCard;
  locCard = function (loc, dayIdx) {
    let h = _lc(loc, dayIdx);
    const r = R[KEY(dayIdx, loc.name)];
    if (!r) return h;
    const k = KEY(dayIdx, loc.name), st = state(dayIdx, loc.name);
    const toggle = `<div class="wx"><button class="btn wxb${st === 'sun' ? ' on' : ''}" data-wx="${esc(k)}" data-v="sun">☀️ 没雨</button><button class="btn wxb${st === 'rain' ? ' on' : ''}" data-wx="${esc(k)}" data-v="rain">🌧 有雨</button></div><div class="rainbox">🌧 <b>下雨的话：</b>${esc(r)}</div>`;
    h = h.replace('<div class="tl-item">', `<div class="tl-item${st === 'rain' ? ' is-rain' : ''}" data-wxkey="${esc(k)}">`);
    return h.replace('<div class="desc">', toggle + '<div class="desc">');
  };

  const _rd = renderDay;
  renderDay = function (idx) {
    const d = DAYS.find(x => x.id === idx);
    const has = d && d.locations.some(l => R[KEY(idx, l.name)]);
    if (!has) return _rd(idx);
    const st = get('wxday::' + idx) || 'sun';
    const bar = `<div class="wxday">🌦 现在下雨吗？<button class="btn wxb${st === 'sun' ? ' on' : ''}" data-wxday="${idx}" data-v="sun">☀️ 没雨</button><button class="btn wxb${st === 'rain' ? ' on' : ''}" data-wxday="${idx}" data-v="rain">🌧 有雨</button><span style="font-size:12px;opacity:.7">每一项也能单独切换</span></div>`;
    return _rd(idx).replace(/(<div class="day-head">[\s\S]*?<\/div>)/, '$1' + bar);
  };

  function paint(item, v) {
    item.classList.toggle('is-rain', v === 'rain');
    item.querySelectorAll('[data-wx]').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-wx],[data-wxday]'); if (!b) return;
    e.stopPropagation();
    const v = b.dataset.v;
    if (b.dataset.wxday != null) {
      const d = b.dataset.wxday;
      set('wxday::' + d, v);
      document.querySelectorAll('[data-wxday]').forEach(x => x.classList.toggle('on', x.dataset.v === v));
      document.querySelectorAll('.tl-item[data-wxkey]').forEach(it => {
        if (it.dataset.wxkey.startsWith(d + '::')) { set('wx::' + it.dataset.wxkey, null); paint(it, v); }
      });
    } else {
      const k = b.dataset.wx;
      set('wx::' + k, v);
      paint(b.closest('.tl-item'), v);
    }
  }, true);
})();
