console.log("We will rock you!");

var calcBtn = document.getElementById('calcBtn');
var upBtn = document.getElementById('upBtn')
var grpBtn = document.getElementById('grpBtn');
var mmcBtn = document.getElementById('mmc');
var mmiBtn = document.getElementById('mmi');
var mmckBtn = document.getElementById('mmck');
var mmcmBtn = document.getElementById('mmcm');
var type;

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
var resultEl = document.getElementById('dynamic_result');

function factorial(num){
    if (num === 0 || num === 1)
        return 1;
    for (var i = num - 1; i >= 1; i--) {
        num *= i;
    }
    return num;
}
function combination(n,r){
  return (factorial(n)/(factorial(r)*factorial(n-r)));
}

function selectMMC(){
    console.log("Selecting MMC model...");
    type = 'mmc';
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>&lambda; (no units): <input type="number" id="lamb"></p></div><div class="grid-item"><p>&mu; (no units): <input type="number" id="mu"></p></div><div class="grid-item"><p>C (no units): <input type="number" value=1 id="c"></p></div></div>';
    mmcBtn.innerHTML = '<span class="dot-checked"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
}
function selectMMI(){
    console.log("Selecting MMInf model...");
    type= 'mminf';
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>&lambda; (no units): <input type="number" id="lamb"></p></div><div class="grid-item"><p>&mu; (no units): <input type="number" id="mu"></p></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot-checked"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
}
function selectMMCK(){
    console.log("Selecting MMCK model...");
    type = 'mmck';
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>&lambda; (no units): <input type="number" id="lamb"></p></input></div><div class="grid-item"><p>&mu; (no units): <input type="number" id="mu"></p></div><div class="grid-item"><p>C (no units): <input type="number" id="c"></p></div><div class="grid-item"><p>K (no units): <input type="number" id="k"></p></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot-checked"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
}
function selectMMCM(){
    console.log("Selecting MMC*M model...");
    type = 'mmc*m';
    inputEl.innerHTML = '<div class="grid-container"><div class="grid-item"><p>&lambda; (no units): <input type="number" id="lamb"></p></div><div class="grid-item"><p>&mu; (no units): <input type="number" id="mu"></p></div><div class="grid-item"><p>C (no units): <input type="number" id="c"></p></div><div class="grid-item"><p>M (no units): <input type="number" id="m"></p></div></div>'
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot-checked"></span>';
}

mmcBtn.addEventListener('click', selectMMC);
document.getElementById('mmc2').addEventListener('click', selectMMC);

mmiBtn.addEventListener('click', selectMMI);
document.getElementById('mmi2').addEventListener('click', selectMMI);

mmckBtn.addEventListener('click', selectMMCK);
document.getElementById('mmck2').addEventListener('click', selectMMCK);

mmcmBtn.addEventListener('click', selectMMCM);
document.getElementById('mmcm2').addEventListener('click', selectMMCM);


calcBtn.addEventListener('click', ()=>{

    var lambEl = document.getElementById('lamb');
    var muEl = document.getElementById('mu');
    var cEl = document.getElementById('c');
    var kEl = document.getElementById('k');
    var mEl = document.getElementById('m');
    var lamb = parseInt(lambEl.value);  //lamda value
    var mu = parseInt(muEl.value);  //mu value

    switch(type) {
      case 'mmc':
            var c = parseInt(cEl.value); //c value
            console.log("MMC");
            if(lamb > c*mu){
              alert("λ must be smaller than c*μ otherwise queue will increse indefinitely! ");
            }else{
              let temp = 0;
              var rho = lamb/mu;
              for(let n=0; n<=c-1; n++){
                temp += ((rho**n)/factorial(n));
              }
              function prob(P0, rho, n, c){ //used to calculate probabilities
                  if (n<c){
                    return (P0*(rho**n))/factorial(n);
                  }
                  else{
                    return ((P0*(rho**n))/(c**(n-c))*factorial(c));
                  }
              }
              var P0 = 1/(temp + (rho**c)/(factorial(c)*(1- rho/c)));
              var util = rho/c;
              var Lq = ((P0*(lamb**(c+1))*mu)/((factorial(c-1))*(mu**c)*((c*mu-lamb)**2)));
              var Ls = Lq + (lamb/mu);
              var Lw = ((c*mu)/(c*mu - lamb));
              var Ws = Ls/lamb;
              var Wq = Lq/lamb;
            }

            resultEl.innerHTML = '<h3>The Utilization</h3><h2 class="indent">&rho; = <span id="res1" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the system</h3><h2 class="indent">Ls = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">Ws = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2><h3>Probability of idle server</h3><h2 class="indent">P(0) = <span id="res6" style="color: lightgreen;"></span></h2>';
            document.getElementById('res1').innerText = (util).toFixed(5);
            document.getElementById('res2').innerText = (Ls).toFixed(5);
            document.getElementById('res3').innerText = (Lq).toFixed(5);
            document.getElementById('res4').innerText = (Ws).toFixed(5);
            document.getElementById('res5').innerText = (Wq).toFixed(5);
            document.getElementById('res6').innerText = (P0).toFixed(5);

	        break;

      case 'mminf':
            console.log("MMinf");
            var util = 0;
            var p0 = 0;
            var Ls = lamb/mu;
            var Lq = 0;
            var Ws = Ls/lamb;
            var Wq = 0;

            resultEl.innerHTML = '<h3>The Expected number of jobs in the system</h3><h2 class="indent">Ls = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">Ws = <span id="res4" style="color: lightgreen;"></span></h2>';
            document.getElementById('res2').innerText = (Ls).toFixed(5);
            document.getElementById('res4').innerText = (Ws).toFixed(5);

            break;

      case 'mmck':
            var c = parseInt(cEl.value); //c value
            var k = parseInt(kEl.value); //k value
            console.log("MMCK");
            if(lamb > c*mu){
              alert("λ must be smaller than c*μ otherwise queue will increse indefinitely! ");
            }else{
              var i = 0;
              var P0, Ws, Wk,  Lq,Ls,Pk;
              var rho = lamb / (c * mu);
              var util = rho;
              var r = lamb / mu;
              if (rho !== 1) { //P0 Calculation
                  for (i = 0, P0 = 0; i <= c - 1; i++) {
                      P0 += Math.pow(r, i) / factorial(i);
                  }
                  P0 += Math.pow(r, c) * (1 - Math.pow(rho, k - c + 1)) / (factorial(c) * (1 - rho));
                  P0 = Math.pow(P0, -1);
              } else {
                  for (i = 0; i <= c - 1; i++) {
                      P0 += Math.pow(r, i) / factorial(i);
                  }

                  P0 += Math.pow(r, c) * (k - c + 1) / (factorial(c));
                  P0 = Math.pow(P0, -1);
              }
              //Lq Calc down
              if (rho !== 1) {
                  Lq = P0 * Math.pow(c * rho, c) * rho * (1 - Math.pow(rho, k - c + 1) - (1 - rho) * (k - c + 1) * Math.pow(rho, k - c)) / (factorial(c) * Math.pow(1 - rho, 2));
              } else {
                  Lq = P0 * Math.pow(c, c) * (k - c) * (k - c + 1) / (2 * factorial(c));
              }
              //Ls calc down
              for (i = 0; i <= c - 1; i++) {
                  Ls = (c - i) * Math.pow(rho * c, i) / factorial(i);
              }
              Ls *= -P0;
              Ls += Lq + c;
              //Pk calc
              if (k === 0) {
                  Pk = P0;
              } else if (1 <= k && k <= c) {
                  Pk = Math.pow(r, k) * P0 / factorial(k);
              } else {
                  Pk = Math.pow(r, k) * P0 / (factorial(c) * Math.pow(c, k - c));
              }
              lambp = lamb * (1 - Pk);
              Ws = Ls / lambp;
              Wq = Ws - 1 / mu;

              function prob(P0, r, n, c){
              if (n === 0) {
                  return P0;
              } else if (1 <= n && n <= c) {
                  return Math.pow(r, n) * P0 / Math.pow(n, k - c);
              } else {
                  return Math.pow(r, n) * P0 / (factorial(c) * Math.pow(c, n - c));
              }
              }
            }

            resultEl.innerHTML = '';resultEl.innerHTML = '<h3>The Utilization</h3><h2 class="indent">&rho; = <span id="res1" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the system</h3><h2 class="indent">Ls = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">Ws = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2><h3>Probability of idle server</h3><h2 class="indent">P(0) = <span id="res6" style="color: lightgreen;"></span></h2>';
            document.getElementById('res1').innerText = (util).toFixed(5);
            document.getElementById('res2').innerText = (Ls).toFixed(5);
            document.getElementById('res3').innerText = (Lq).toFixed(5);
            document.getElementById('res4').innerText = (Ws).toFixed(5);
            document.getElementById('res5').innerText = (Wq).toFixed(5);
            document.getElementById('res6').innerText = (P0).toFixed(5);

            break;
      case 'mmc*m': //Done
            console.log("MMc*m");
            var c = parseInt(cEl.value); //c value
            var m = parseInt(mEl.value); //k value
            console.log("MMC*m");
            if(lamb > c*mu){
              alert("λ must be smaller than c*μ otherwise queue will increse indefinitely! ");
            }else{
              var P0= "We dont do that here";
              var r = lamb / mu;
              var util= "We dont do that here";
              var L, Ls, Lq, fakeP0, Ws, Wq;
              var i=0, Po_1=0,Px=0;
              for (i = 0, Po_1 = 0; i < c; i++) {
                    Po_1 += combination(m, i) * Math.pow(r, i);
                }
                for (i = c, Px = 0; i <= m; i++) {
                    Px += combination(m, i) * factorial(i) * Math.pow(r, i) / (Math.pow(c, i - c) * factorial(c));
                }
                fakeP0 = 1 / (Po_1 + Px);

                Ls = 0; //Find Ls
                for (i = 0; i <= c - 1; i++) {
                    Ls += i * combination(m, i) * Math.pow(r, i);
                }
                for (i = c; i <= m; i++) {
                    Ls += i * combination(m, i) * Math.pow(r, i) * factorial(i) / (Math.pow(c, i - c) * factorial(c));
                }
                Ls *= fakeP0;
                Lq = 0; //Find Lq
                for (i = 0; i <= c - 1; i++) {
                    Lq += (c - i) * combination(m, i) * Math.pow(r, i);
                }
                Lq *= fakeP0;
                Lq = Lq + Ls - c;
                Ws = Ls / (lamb * (m - Ls));
                Wq = Lq / (lamb * (m - Ls));
                var Lambdap = mu * (Ls - Lq);

              function prob(fakeP0, r, n, c){
                if (0 <= n && n < c) {
                    Pn = combination(m, n) * Math.pow(r, n) * fakeP0;
                } else if (n >= c && n <= m) {
                    Pn = combination(m, n) * factorial(n) * Math.pow(r, n) * fakeP0 / (Math.pow(c, n - c) * factorial(c));
                } else {
                    Pn = 0;
                }
              }

            }

            resultEl.innerHTML = '<h3>The Expected number of jobs in the system</h3><h2 class="indent">Ls = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">Ws = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2>'; 
            document.getElementById('res2').innerText = (Ls).toFixed(5);
            document.getElementById('res3').innerText = (Lq).toFixed(5);
            document.getElementById('res4').innerText = (Ws).toFixed(5);
            document.getElementById('res5').innerText = (Wq).toFixed(5);
	        break;
    }
        window.location.href = "#result";
    }
);  //removed } from here

upBtn.addEventListener('click', ()=>{
    window.location.href = "#top";
});

grpBtn.addEventListener('click', ()=>{
    window.location.href = "#graph";
});