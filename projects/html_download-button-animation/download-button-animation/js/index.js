let tl, downloading = false, points = [], 
    btn = document.querySelector('.btn'),
    dot = document.querySelector('.dot'),
    text = document.querySelector('.text'),
    mainCirc = document.querySelector('.mainCircle'),
    subCirc = document.querySelector('.subCircle'),
    mainCircFill = document.querySelector('.mainCircleFill'),
    arrow = document.querySelector('.arrow'),
    rect = document.querySelector('.rect');

TweenLite.set(rect, {transformOrigin: '50% 50%', rotation: 45});

btn.addEventListener('click', animation);

function animation() {
  if (downloading) return;
  downloading = !downloading;
  let downloadTime = Math.random() * .5 + .7;
  tl = new TimelineLite({onComplete: restart});
  tl.restart().play()
  .to(arrow, .35, {y: 2.5, ease: CustomEase.create('custom', 'M0,0,C0.042,0.14,0.374,1,0.5,1,0.64,1,0.964,0.11,1,0')}, 'click')
  .to(text, .3, {svgOrigin: '55% 35%', scale: .77, ease: CustomEase.create('custom', 'M0,0,C0.042,0.14,0.374,1,0.5,1,0.64,1,0.964,0.11,1,0')}, 'click+=.05')
  .set(subCirc, {fillOpacity: 1, strokeOpacity: 1}, 'squeeze-=.3')
  .to(subCirc, .35, {fillOpacity: 0, ease: Power1.easeInOut}, 'squeeze-=.3')
  .to(subCirc, .45, {attr:{r: 13}, strokeOpacity: 0, className: '+=strokeW', ease: Power0.easeNone}, 'squeeze-=.3')
  .to(btn, .7, {attr:{d: 'M50,25 h0 a10,10 0 0,1 10,10 a10,10 0 0,1 -10,10 s0,0 0,0  a10,10 0 0,1 -10,-10 a10,10 0 0,1 10,-10 h0'}, ease: Sine.easeOut}, 'squeeze')
  .to([mainCirc, mainCircFill, rect, arrow], .7, {x: 30, ease: Sine.easeOut}, 'squeeze')
  .to(rect, .7, {fill: '#fff', rotation: 270, ease: Sine.easeOut}, 'squeeze')
  .to(text, .3, {autoAlpha: 0, y: 7, onComplete: changeText}, 'squeeze')
  .to(arrow, .7, {attr:{d: 'M20,39 l3.5,-3.5 l-3.5,-3.5 M20,39 l-3.5,-3.5 l3.5,-3.5 M20,39 l0,0'}, transformOrigin: '50% 50%', rotation: 225, ease: Sine.easeOut}, 'squeeze')
  .to(dot, .4, {attr:{r: 1.5}, ease: Back.easeOut.config(7)})
  .set(subCirc, {drawSVG: 0, strokeOpacity: 1,  transformOrigin: '50% 50%', x: 30, rotation: -90, attr:{r: 9.07}})
  .to(subCirc, downloadTime, {drawSVG: '102%', ease: Power2.easeIn}, 'fill+=.02')
  .to(dot, downloadTime, {bezier:{type: "cubic", values: points}, attr:{r: 2.7} , ease: Power2.easeIn}, 'fill')
  .to('.gradient', downloadTime, {attr:{offset: '0%'}, ease: Power2.easeIn}, 'fill')
  .to(dot, .44, {fill: '#02fc86', y: -22, ease: Power1.easeOut}, 'stretch-=.01')
  .to(dot, .27, {transformOrigin: '50% 50%', scaleX: .5, ease: SlowMo.ease.config(0.1, 2, true)}, 'stretch+=.04')
  .to(dot, .3, {scaleY: .6, ease: SlowMo.ease.config(0.1, 2, true)}, 'stretch+=.31')
  .to(dot, .44, {scaleX: .4, y: 22, ease: Power2.easeIn}, 'stretch+=.45')
  .to([mainCirc, subCirc, arrow, rect, mainCircFill], .33, {opacity: 0, ease: Power2.easeOut}, 'stretch+=.2')
  .to(btn, .4, {attr:{d: 'M50,25 h20 a10,10 0 0,1 10,10 a10,10 0 0,1 -10,10 s-20,0 -40,0 a10,10 0 0,1 -10,-10 a10,10 0 0,1 10,-10 h20'}, ease: Power1.easeOut}, 'stretch+=.2')
  .set(dot, {opacity: 0}, 'stretch+=.875')
  .to(btn, .01, {stroke: '#02fc86', ease: Power2.easeIn}, 'stretch+=.87')
  .to(btn, .3, {attr:{d: 'M50,25 h20 a10,10 0 0,1 10,10 a12,12 0 0,1 -10,10.5 s-20,6 -40,0 a12,12 0 0,1 -10,-10.5 a10,10 0 0,1 10,-10 h20'},
                ease: CustomEase.create("custom", "M0,0 C0.046,0.062 0.018,1 0.286,1 0.532,1 0.489,-0.206 0.734,-0.206 0.784,-0.206 0.832,-0.174 1,0")}, 'stretch+=.869')
  .to(text, .45, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(2.5)}, 'stretch+=.855');
};

function restart() {
  setTimeout(() => {
    tl.seek(0).pause();
    text.textContent = 'download';
    TweenLite.set(text, {x: 0});
    downloading = false;
  }, 2000);
};

function changeText() {
  text.textContent = 'open';
  TweenLite.set(text, {x: -5});
};

(function() {
  let data = Snap.path.toCubic('M0,0 a9,9 0 0,1 0,18 a9,9 0 0,1 0,-18'),
      dataLen = data.length;
  for (let i = 0; i < dataLen; i++) {
    let seg = data[i];
    if (seg[0] === "M") {
      let point = {};
      point.x = seg[1];
      point.y = seg[2];
      points.push(point);
    } else {
      for (let i = 1; i < 6; i+=2) {
        let point = {};
        point.x = seg[i];
        point.y = seg[i+1];
        points.push(point);
      }
    }
  }
})();