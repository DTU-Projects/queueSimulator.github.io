console.log("We will rock you!");

var calcBtn = document.getElementById('calcBtn');
var upBtn = document.getElementById('upBtn')
var grpBtn = document.getElementById('grpBtn');
var mmcBtn = document.getElementById('mmc');
var mmiBtn = document.getElementById('mmi');
var mmckBtn = document.getElementById('mmck');
var mmcmBtn = document.getElementById('mmcm');


function create(htmlStr){
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while(temp.firstChild){
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
var inputEl = document.getElementById('dynamic_input');

/*
<div class="grid-container">
    <div class="grid-item">
        <p>λ (no units): </p><input type="number" id="lamb">
    </div>
    <div class="grid-item">
        <p>μ (no units): </p><input type="number" id="mu">
    </div>
    <div class="grid-item">
        <p>C (no units): </p><input type="number" id="c">
    </div>
    <div class="grid-item">
        <p>M (no units): </p><input type="number" id="c">
    </div>
</div>
*/

console.log(mmc, mmi, mmck, mmcm);

mmcBtn.addEventListener('click', () => {
    console.log("Selecting MMC model...");
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>λ (no units): <input type="number" id="lamb"></p></div><div class="grid-item"><p>μ (no units): <input type="number" id="mu"></p></div><div class="grid-item"><p>C (no units): <input type="number" id="c"></p></div></div>';
    mmcBtn.innerHTML = '<span class="dot-checked"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
});
mmiBtn.addEventListener('click', () => {
    console.log("Selecting MMI model...");
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>λ (no units): <input type="number" id="lamb"></p></div><div class="grid-item"><p>μ (no units): <input type="number" id="mu"></p></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot-checked"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
});
mmckBtn.addEventListener('click', () => {
    console.log("Selecting MMCK model...");
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>λ (no units): <input type="number" id="lamb"></p></input></div><div class="grid-item"><p>μ (no units): <input type="number" id="mu"></p></div><div class="grid-item"><p>C (no units): <input type="number" id="c"></p></div><div class="grid-item"><p>K (no units): <input type="number" id="c"></p></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot-checked"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
});
mmcmBtn.addEventListener('click', () => {
    console.log("Selecting MMCM model...");
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>λ (no units): <input type="number" id="lamb"></p></div><div class="grid-item"><p>μ (no units): <input type="number" id="mu"></p></div><div class="grid-item"><p>C (no units): <input type="number" id="c"></p></div><div class="grid-item"><p>M (no units): <input type="number" id="c"></p></div></div>'
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot-checked"></span>';
});

calcBtn.addEventListener('click', ()=>{
    
    
    var lambEl = document.getElementById('lamb');
    var muEl = document.getElementById('mu');
    var cEl = document.getElementById('c');
    var lamb = parseInt(lambEl.value);
    var mu = parseInt(muEl.value);
    var c = parseInt(cEl.value);
    
    if(lamb > mu){
        alert("If λ is greter than μ then queue will increase indefinitely and the system will not have a stationary distribution!");
    }else{
        if(mmc){
            console.log("MMC");
            var util = (lamb/mu).toFixed(5);
            var p0 = (1 - util).toFixed(5);
            var L = (lamb/(mu-lamb)).toFixed(5);
            var Lq = (lamb**2/(mu*(mu-lamb))).toFixed(5);
            var W = (L/lamb).toFixed(5);
            var Wq = (Lq/lamb).toFixed(5);
        }else if(mmi){
            console.log("MMI");
            // computation for mmi
        }else if(mmck){
            console.log("MMCK");
            // computation for mmck
        }else if(mmcm){
            console.log("MMCM");
            // computation for mmcm
        }else{
            console.log("Select Radio");
        }
        document.getElementById('res1').innerText = util;
        document.getElementById('res2').innerText = L;
        document.getElementById('res3').innerText = Lq;
        document.getElementById('res4').innerText = W;
        document.getElementById('res5').innerText = Wq;
        window.location.href = "#result";
    }
});

upBtn.addEventListener('click', ()=>{
    window.location.href = "#top";
});

grpBtn.addEventListener('click', ()=>{
    window.location.href = "#graph";
})