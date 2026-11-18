// 📸 每日 50 张拍照任务：每个事项的拍照灵感 + 「拍到啦」打卡（打卡只存在这台手机上）
(function () {
  // [大约几张, 灵感1, 灵感2, ...]，key 是「第几天::店名」
  const P = {
    // ── 11/19 落地 ──
    '1::大理凤仪机场': [6, '起飞前拍一张天还没亮的长沙机场，和登机牌合个影 owo', '降落前盯着窗外！洱海和苍山会突然出现，连拍几张', '落地第一张：机场「大理」两个大字，比个耶 ovo'],
    '1::悦湾·VILLA 半山海景酒店': [8, '小红书说最好的机位在大门进来的接待处外面，先去那儿占位 owo', '五楼咖啡厅外俯拍整片洱海，人站栏杆边只露背影', '推开房门那一下录个小视频，第一反应最珍贵 ovo'],
    '1::裕春鱼庄': [4, '酸辣鱼刚上桌冒热气的时候俯拍，晚一秒就不香了', '偷拍 TA 被辣到吸气的表情 qwq'],
    '1::琻岽店小吃（备选）': [3, '米线俯拍，筷子挑起一缕菌子做特写 owo'],
    '1::入住 + 补觉': [5, '星空顶、露台、床，房间细节各来一张', '拉开窗帘那一下的光，配一张「困死了但是好美」自拍 qwq'],
    '1::酒店下午茶': [6, '点心摆好先 45° 来一张，手机放低一点更有层次', '手拿杯子、背景是虚化的洱海，人像模式拍 ovo', '两个人干杯，对面那个人负责笑 owo'],
    '1::露台 / 泳池看日落': [12, '无边泳池拍倒影：人站池边，手机贴近水面', '太阳落到山边时拍剪影，伸手做「捏太阳」 owo', '同一个角度每 5 分钟拍一张，回去能拼成日落变色合集 ovo'],
    '1::晚餐：酒店里或海东镇': [3, '随手记录就好，今天已经很累啦 qwq'],
    '1::星空房 + 晚安甜汤': [4, '晚安甜汤特写，配一张露台夜景（手机靠栏杆放稳，用夜景模式）', '躺在床上仰拍星空顶，第一天圆满 ovo'],

    // ── 11/20 生日 🎂 ──
    '2::露台看日出': [10, '日出前十几分钟天是蓝紫色的，这段最出片，别等太阳出来才拍 owo', '太阳一冒头，暖光打在侧脸上拍人像', '裹着外套捧一杯热饮看日出，背影一张、正脸一张 ovo'],
    '2::酒店早餐': [3, '寿星吃第一口的抓拍 owo', '早餐桌俯拍，手入镜更有生活感'],
    '2::30 分钟旅拍': [8, '正片交给摄影师，你用手机拍花絮：换衣服、被指导摆姿势、笑场 qwq', '拍一张摄影师在拍你们的画面，很有纪念感 ovo'],
    '2::小普陀': [7, '岸边对准小岛，把岛放在画面正中间，对称构图 owo', '喂海鸥时开连拍，手伸直让海鸥围着手飞', '海鸥和小岛同框，耐心等一只飞过去 ovo'],
    '2::双廊古镇': [6, '窄巷子从巷口往里拍，越深越好看', '门牌、晒太阳的猫、挂着的扎染布，小东西也算数 owo', '海边石阶坐着看海的背影 ovo'],
    '2::野栩·海景云南菜': [4, '用窗框当画框：窗外是湖，窗里是菜和人 owo', '菜上齐先别动筷，俯拍一张全家福'],
    '2::柏玲渔家私房菜（备选）': [3, '酸辣鱼冒热气俯拍 + 对面的人一张 owo'],
    '2::无极咖啡 WUJICAFE': [5, '悬崖边坐着的背影 + 整片洱海，这是今天的封面候选 ovo', '咖啡杯举高对准洱海，杯子清楚、背景虚化'],
    '2::南诏风情岛（可选）': [3, '上岛的船上拍一张回头看双廊的远景 owo'],
    '2::回酒店休息': [2, '换好晚宴的衣服，镜子前来一张 ovo'],
    '2::泳池 / 露台日落': [5, '穿生日装再拍一次日落，换个昨天没用过的机位 owo', '两个人背影 + 晚霞，用定时拍合照'],
    '2::生日晚餐：甘思咪哚·云南艺术餐厅': [10, '蛋糕端出来那一刻一定要录视频！记得提前开好相机 qwq', '吹蜡烛用实况照片（Live），火苗会动 owo', '许愿闭眼的特写 + 两个人和蛋糕的合照，生日快乐 ovo'],

    // ── 11/21 换酒店 ──
    '3::睡到自然醒 + 早餐': [5, '退房前跟海景房告别：露台再来一张 qwq', '收好的行李摆一排，像出发前的仪式 owo'],
    '3::打车去下关': [3, '车窗外沿路的洱海，窗户摇下来拍更清楚 owo'],
    '3::滨港电竞海景酒店（洱海公园店）': [6, '电竞房的 RGB 灯光关掉主灯再拍，超有氛围 ovo', '两台电脑并排 + 窗外（如果能看到海就赢了）'],
    '3::下关老味道': [3, '饵丝、米线俯拍，下关早点自带烟火气 owo'],
    '3::洱海公园 · 看海鸥': [18, '今天的主角是海鸥！开连拍，一按几十张，挑最好的 ovo', '蹲低从下往上拍，天空里全是海鸥', '手伸直托着食物，让海鸥飞过来叼，录慢动作视频 owo', '下关风大，头发被吹乱的抓拍反而最可爱 qwq'],
    '3::雨果·经典云南菜·海景餐厅': [5, '天快黑时的海景 + 餐桌灯光，暖暖的 owo'],
    '3::聚佳缘·地道白族菜（备选）': [3, '白族菜摆一桌俯拍 owo'],
    '3::海景房里打 CS': [5, '屏幕亮光照在侧脸上，很有电竞感 ovo', '赢了截个图也算一张！输了…也截 qwq'],

    // ── 11/22 古城 ──
    '4::崇圣寺三塔': [10, '经典机位：聚影池拍三塔倒影，没风时最清楚 owo', '人站在塔下，从远处拍，显得塔特别高', '仰拍塔身 + 蓝天，大理的天就是这么蓝 ovo'],
    '4::南诏村·现炒云南菜': [3, '现炒的锅气拍不到，就拍一桌菜 + 举杯 owo'],
    '4::滇小妹白族石板烧（备选）': [2, '石板滋滋响，录 5 秒小视频 ovo'],
    '4::大理古城：人民路 / 洋人街 / 五华楼': [15, '五华楼正面对称构图，人站中间 owo', '人民路往苍山方向拍，路的尽头是山', '走路时回头的抓拍，让 TA 叫你名字 ovo', '路边的小店招牌、花、手写菜单，集齐一组小细节'],
    '4::请请请坐 OTM': [5, '窗边坐着看手机或发呆，自然光最好看 owo', '饮品和甜品摆在一起俯拍'],
    '4::才村码头看晚霞': [10, '木栈道从近往远拍，人走在栈道上 ovo', '晚霞是粉紫色的时候拍剪影，跳起来那张最好玩 owo', '天黑前最后一张，记得准备回去啦 qwq'],
    '4::回下关晚饭：滇铺子': [3, '今天走了好多路，记录一下吃饭的满足脸 ovo'],

    // ── 11/23 喜洲 ──
    '5::喜洲古镇': [15, '白墙青瓦 + 蓝天，大理最经典的配色 owo', '照壁和门楼前正面拍，人小一点、建筑完整', '扎染布、老奶奶、转角的小巷，慢慢逛慢慢拍 ovo', '骑车经过的样子让 TA 在路边连拍'],
    '5::酥香园喜洲破酥粑粑': [3, '掰开那一下的热气和酥皮掉渣，拿近一点拍 owo'],
    '5::江湖味白族庭院餐厅': [4, '庭院里的光影 + 花，坐着吃饭的侧脸 ovo'],
    '5::一碗·云南味（备选）': [2, '一碗米线俯拍就够啦 owo'],
    '5::海舌公园': [15, '长堤伸进洱海，站在中间往远处拍，越远越好看 owo', '树下的人像，阳光从叶子缝里漏下来 ovo', '水面倒影：手机放低贴近水面，天和水连在一起', '今天是最后一个景点日，多拍几张合照 qwq'],
    '5::回下关': [2, '车窗外的夕阳 owo'],
    '5::苍山感通索道（天气好可替换下午）': [6, '缆车玻璃贴近拍下面的山和洱海 ovo', '山上回头看整个大理坝子'],

    // ── 11/24 回家 ──
    '6::达达小吃': [4, '在大理的最后一顿早饭，认真拍一下 qwq'],
    '6::退房': [5, '海景房窗外最后一眼 + 两个人在房间的合照 owo', '行李收好前拍一下这几天买的小东西 ovo'],
    '6::大理凤仪机场': [6, '起飞时窗外的洱海，好好说再见 qwq', '翻相册数一数这几天拍了多少张，有没有 300 张 owo'],
  };

  const KEY = (d, n) => 'shot::' + d + '::' + n;
  const get = k => { try { return localStorage.getItem(k) === '1'; } catch (e) { return false; } };
  const set = (k, v) => { try { v ? localStorage.setItem(k, '1') : localStorage.removeItem(k); } catch (e) {} };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const css = document.createElement('style');
  css.textContent = `
.photo{margin-top:10px;padding:10px 12px;border-radius:12px;background:#fff4f6;border:1px solid #ffd6df}
.photo .ph-h{display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:700;font-size:13px;color:#d6336c}
.photo ul{margin:6px 0 0;padding-left:18px;font-size:13px;line-height:1.6;color:#4a3a40}
.photo li+li{margin-top:2px}
.photo .btn.shot{font-size:12px;padding:4px 10px;border-radius:99px;border:1px solid #f3a5b8;background:#fff;color:#d6336c;font-weight:700;white-space:nowrap}
.photo .btn.shot.on{background:#d6336c;color:#fff;border-color:#d6336c}
.mission{margin:4px 0 14px;padding:12px 14px;border-radius:14px;background:linear-gradient(135deg,#fff0f4,#fff8ec);border:1px solid #ffd6df;font-size:14px;color:#4a3a40}
.mission b{color:#d6336c}
.mission .bar{height:6px;border-radius:99px;background:#ffe1e8;margin-top:8px;overflow:hidden}
.mission .bar i{display:block;height:100%;background:#ff6b8f;border-radius:99px;transition:width .3s}
@media (prefers-color-scheme: dark){
  .photo{background:#2d1f24;border-color:#4d2c36}.photo ul{color:#e8d6dc}.photo .btn.shot{background:#1f1a1c}
  .mission{background:linear-gradient(135deg,#2d1f24,#2b2519);border-color:#4d2c36;color:#e8d6dc}.mission .bar{background:#4d2c36}
}`;
  document.head.appendChild(css);

  const _lc = locCard;
  locCard = function (loc, dayIdx) {
    const h = _lc(loc, dayIdx), p = P[dayIdx + '::' + loc.name];
    if (!p) return h;
    const k = KEY(dayIdx, loc.name), on = get(k);
    const block = `<div class="photo"><div class="ph-h"><span>📸 拍照灵感 · 约 ${p[0]} 张</span><button class="btn shot${on ? ' on' : ''}" data-shot="${esc(k)}">${on ? '拍到啦 ✓' : '拍到了吗 ovo'}</button></div><ul>${p.slice(1).map(t => '<li>' + esc(t) + '</li>').join('')}</ul></div>`;
    return h.replace(/<\/div><\/div>$/, block + '</div></div>');
  };

  function mission(dayIdx) {
    const d = DAYS.find(x => x.id === dayIdx); if (!d) return '';
    const keys = d.locations.filter(l => l.time !== '—' && P[dayIdx + '::' + l.name]).map(l => KEY(dayIdx, l.name));
    const done = keys.filter(get).length;
    const msg = done === 0 ? '今天也要拍满 50 张哦 owo' : done < keys.length ? '继续冲！还差 ' + (keys.length - done) + ' 项 ovo' : '今天的任务全部完成！好棒 qwq✨';
    return `<div class="mission" id="mission">📸 <b>今日任务：50 张照片</b> · 已打卡 ${done}/${keys.length} 项<br><span style="font-size:13px">${msg}</span><div class="bar"><i style="width:${keys.length ? Math.round(done / keys.length * 100) : 0}%"></i></div></div>`;
  }
  const _rd = renderDay;
  renderDay = function (idx) {
    return _rd(idx).replace(/(<div class="day-head">[\s\S]*?<\/div>)/, '$1' + mission(idx));
  };

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-shot]'); if (!b) return;
    e.stopPropagation();
    const k = b.dataset.shot, on = !get(k);
    set(k, on);
    b.classList.toggle('on', on);
    b.textContent = on ? '拍到啦 ✓' : '拍到了吗 ovo';
    const m = document.getElementById('mission');
    if (m && typeof cur === 'number') m.outerHTML = mission(cur);
  }, true);
})();
