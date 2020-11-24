console.log("We will rock you!");

var calcBtn = document.getElementById('calcBtn');
var upBtn = document.getElementById('upBtn');
var upBtn2 = document.getElementById('upBtn2');
var grpBtn = document.getElementById('grpBtn');
var decBtn = document.getElementById('decBtn');
var mmcBtn = document.getElementById('mmc');
var mmiBtn = document.getElementById('mmi');
var mmckBtn = document.getElementById('mmck');
var mmcmBtn = document.getElementById('mmcm');
var md1Btn = document.getElementById('md1');
var probBtn = document.getElementById('probBtn');
var type;

var pointsForGraph;
var noPoints;

var inputEl = document.getElementById('dynamic_input');
var resultEl = document.getElementById('dynamic_result');

function factorial(num){
    if(num === 0 || num === 1)
        return 1;
    for(var i=num-1; i>=1; i--){
        num *= i;
    }
    return num;
}
function combination(n,r){
    return (factorial(n)/(factorial(r)*factorial(n-r)));
}
function get_graph(Lq, prob){
    var counter, j=0;
    let gpoints=[];
    let gvalues=[];
    var max= Math.max(1.5*Lq, 25);
    for(counter=0; counter<=max; counter++){
        if(prob(counter)>=0.005){
            gpoints[j] = counter;
            gvalues[j] = prob(counter);
            j++;
        }
    }
    return [gpoints, gvalues];
}

function selectMMC(){
    console.log("Selecting MMC model...");
    type = 'mmc';
    inputEl.innerHTML = '<div class="grid-container"><div class="model tooltip"><p>&lambda; (no units): <input type="number" value=60 id="lamb"></p><span class="tooltiptext">the arrival rate (the expected time between each customer arriving, e.g. 30 seconds)</span></div><div class="model tooltip"><p>&mu; (no units): <input type="number" value=75 id="mu"></p><span class="tooltiptext">the reciprocal of the mean service time (the expected number of consecutive service completions per the same unit time, e.g. per 30 seconds)</span></div><div class="model tooltip"><p>C (no units): <input type="number" value=1 id="c"></p><span class="tooltiptext">Total Number of Servers serving customers</span></div></div>';
    mmcBtn.innerHTML = '<span class="dot-checked"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
    md1Btn.innerHTML = '<span class="dot"></span>';
}
function selectMMI(){
    console.log("Selecting MMInf model...");
    type= 'mminf';
    inputEl.innerHTML = '<div class="grid-container"><div class="model tooltip"><p>&lambda; (no units): <input type="number" value=60 id="lamb"></p><span class="tooltiptext">the arrival rate (the expected time between each customer arriving, e.g. 30 seconds)</span></div><div class="model tooltip"><p>&mu; (no units): <input type="number" value=75 id="mu"></p><span class="tooltiptext">the reciprocal of the mean service time (the expected number of consecutive service completions per the same unit time, e.g. per 30 seconds)</span></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot-checked"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
    md1Btn.innerHTML = '<span class="dot"></span>';
}
function selectMMCK(){
    console.log("Selecting MMCK model...")
    type = 'mmck';
    inputEl.innerHTML = '<div class="grid-container"><div class="model tooltip"><p>&lambda; (no units): <input type="number" value=60 id="lamb"></p><span class="tooltiptext">the arrival rate (the expected time between each customer arriving, e.g. 30 seconds)</span></div><div class="model tooltip"><p>&mu; (no units): <input type="number" value=75 id="mu"></p><span class="tooltiptext">the reciprocal of the mean service time (the expected number of consecutive service completions per the same unit time, e.g. per 30 seconds)</span></div><div class="model tooltip"><p>C (no units): <input type="number" value=1 id="c"></p><span class="tooltiptext">Total Number of Servers serving customers</span></div><div class="model tooltip"><p>K (no units): <input type="number" value=50 id="k"></p><span class="tooltiptext">Maximum number of customers a system can hold</span></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot-checked"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
    md1Btn.innerHTML = '<span class="dot"></span>';
}
function selectMMCM(){
    console.log("Selecting MMC*M model...");
    type = 'mmcnn';
    inputEl.innerHTML = '<div class="grid-container"><div class="model tooltip"><p>&lambda; (no units): <input type="number" value=60 id="lamb"></p><span class="tooltiptext">the arrival rate (the expected time between each customer arriving, e.g. 30 seconds)</span></div><div class="model tooltip"><p>&mu; (no units): <input type="number" value=75 id="mu"></p><span class="tooltiptext">the reciprocal of the mean service time (the expected number of consecutive service completions per the same unit time, e.g. per 30 seconds)</span></div><div class="model tooltip"><p>C (no units): <input type="number" value=1 id="c"></p><span class="tooltiptext">Total Number of Servers serving customers</span></div><div class="model tooltip"><p>N (no units): <input type="number" value=100 id="m"></p><span class="tooltiptext">Limited population size being served by a system</span></div></div>'
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot-checked"></span>';
    md1Btn.innerHTML = '<span class="dot"></span>';
}
function selectMD1(){
    console.log("Selecting MD1 model...");
    type = 'md1';
    inputEl.innerHTML = '<div class="grid-container"><div class="model tooltip"><p>&lambda; (no units): <input type="number" value=60 id="lamb"></p><span class="tooltiptext">the arrival rate (the expected time between each customer arriving, e.g. 30 seconds)</span></div><div class="model tooltip"><p>&mu; (no units): <input type="number" value=75 id="mu"></p><span class="tooltiptext">the reciprocal of the mean service time (the expected number of consecutive service completions per the same unit time, e.g. per 30 seconds)</span></div></div>';
    mmcBtn.innerHTML = '<span class="dot"></span>';
    mmiBtn.innerHTML = '<span class="dot"></span>';
    mmckBtn.innerHTML = '<span class="dot"></span>';
    mmcmBtn.innerHTML = '<span class="dot"></span>';
    md1Btn.innerHTML = '<span class="dot-checked"></span>';
}

decBtn.addEventListener('click', ()=>{
    calcBtn.click();
});

document.getElementById('mmc2').addEventListener('click', selectMMC);
document.getElementById('mmi2').addEventListener('click', selectMMI);
document.getElementById('mmck2').addEventListener('click', selectMMCK);
document.getElementById('mmcm2').addEventListener('click', selectMMCM);
document.getElementById('md12').addEventListener('click', selectMD1);

calcBtn.addEventListener('click', ()=>{

    var lambEl = document.getElementById('lamb');
    var muEl = document.getElementById('mu');
    var cEl = document.getElementById('c');
    var kEl = document.getElementById('k');
    var mEl = document.getElementById('m');
    var deciEl= document.getElementById('decimals')
    var lamb = parseInt(lambEl.value);
    var mu = parseInt(muEl.value);
    var decimal= parseInt(deciEl.value);

    switch(type){
        case 'mmc':
            var c = parseInt(cEl.value)
            var Pn;
            console.log("MMC");
            if(lamb > c*mu){
                alert("λ must be smaller than c*μ otherwise queue will increse indefinitely! ");
            }else{
                let temp = 0;
                let r = lamb/mu;
                var rho = r/c;
                for(let n=0; n<=c-1; n++){
                    temp += ((rho**n)/factorial(n));
                }
                var P0 = 1/(temp + (rho**c)/(factorial(c)*(1- rho/c)));
                function prob(n){
                    if (!n){
                        return P0;
                    }else if(n>=1 && n<=c){
                        return(Math.pow(r, n) * P0) / factorial(n);
                    }else if(n > c) {
                        return (P0 * Math.pow(rho, n) * Math.pow(c, c)) / factorial(c);
                    }else
                        return null;
                }
                var util = rho/c;
                var Lq = ((P0*(lamb**(c+1))*mu)/((factorial(c-1))*(mu**c)*((c*mu-lamb)**2)));
                var L = Lq + (lamb/mu);
                var Lw = ((c*mu)/(c*mu - lamb));
                var W = L/lamb;
                var Wq = Lq/lamb;
                probBtn.addEventListener('click', ()=>{
                    var nEl = document.getElementById('probcalcn');
                    var n = parseInt(nEl.value);
                    let Pn = prob(n);
                    document.getElementById('Pn').innerText = Pn.toFixed(3);
                });
                var counter, j=0;
                var points=[];
                var values=[];
                points = get_graph(Lq,prob);
                noPoints = points[0];
                pointsForGraph = points[1];
            }
            resultEl.innerHTML = '<h3>The Utilization</h3><h2 class="indent">&rho; = <span id="res1" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the system</h3><h2 class="indent">L = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">W = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2>';
            document.getElementById('res1').innerText = (util).toFixed(decimal);
            document.getElementById('res2').innerText = (L).toFixed(decimal);
            document.getElementById('res3').innerText = (Lq).toFixed(decimal);
            document.getElementById('res4').innerText = (W).toFixed(decimal);
            document.getElementById('res5').innerText = (Wq).toFixed(decimal);
	    break;

        case 'mminf':
            console.log("MMinf");
            var util = 0;
            var r= lamb/mu;
            var p0 = 0;
            var L = r;
            var Lq = 0;
            var W = L/lamb;
            var Wq = 0;
            function prob(n){
              return Math.pow(r, n) * Math.exp(-r) / factorial(n);
            }
            points = get_graph(Lq,prob);
            noPoints = points[0];
            pointsForGraph = points[1];
            probBtn.addEventListener('click', ()=>{
                var nEl = document.getElementById('probcalcn');
                var n = parseInt(nEl.value);
                let Pn = prob(n);
                document.getElementById('Pn').innerText = Pn.toFixed(3);
            });
            resultEl.innerHTML = '<h3>The Expected number of jobs in the system</h3><h2 class="indent">L = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">W = <span id="res4" style="color: lightgreen;"></span></h2>';
            document.getElementById('res2').innerText = (L).toFixed(decimal);
            document.getElementById('res4').innerText = (W).toFixed(decimal);
        break;

        case 'mmck':
            var c = parseInt(cEl.value);
            var k = parseInt(kEl.value);
            console.log("MMCK");
            if(lamb > c*mu){
                alert("λ must be smaller than c*μ otherwise queue will increse indefinitely! ");
            }else{
                var i = 0;
                var P0, W, Wk,  Lq,L,Pk;
                var rho = lamb / (c * mu);
                var util = rho;
                var r = lamb / mu;
                if (rho !== 1){
                    for (i = 0, P0 = 0; i <= c - 1; i++) {
                        P0 += Math.pow(r, i) / factorial(i);
                    }
                    P0 += Math.pow(r, c) * (1 - Math.pow(rho, k - c + 1)) / (factorial(c) * (1 - rho));
                    P0 = Math.pow(P0, -1);
                }else{
                    for(i=0; i<=c-1; i++){
                        P0 += Math.pow(r, i) / factorial(i);
                    }
                    P0 += Math.pow(r, c) * (k - c + 1) / (factorial(c));
                    P0 = Math.pow(P0, -1);
                }
                if(rho !== 1){
                    Lq = P0 * Math.pow(c * rho, c) * rho * (1 - Math.pow(rho, k - c + 1) - (1 - rho) * (k - c + 1) * Math.pow(rho, k - c)) / (factorial(c) * Math.pow(1 - rho, 2));
                }else{
                    Lq = P0 * Math.pow(c, c) * (k - c) * (k - c + 1) / (2 * factorial(c));
                }
                for (i=0; i<=c-1; i++){
                    L = (c - i) * Math.pow(rho * c, i) / factorial(i);
                }
                L *= -P0;
                L += Lq + c;
                if(k === 0){
                    Pk = P0;
                }else if(1<=k && k<=c){
                    Pk = Math.pow(r, k) * P0 / factorial(k);
                }else{
                    Pk = Math.pow(r, k) * P0 / (factorial(c) * Math.pow(c, k - c));
                }
                lambp = lamb * (1 - Pk);
                W = L / lambp;
                Wq = W - 1 / mu;

                function prob(n){
                    if(n === 0){
                        return P0;
                    }else if(1 <= n && n <= c) {
                        return Math.pow(r, n) * P0 / Math.pow(n, k - c);
                    }else{
                        return Math.pow(r, n) * P0 / (factorial(c) * Math.pow(c, n - c));
                    }
                }
                points = get_graph(Lq,prob);
                noPoints = points[0];
                pointsForGraph = points[1];
                probBtn.addEventListener('click', ()=>{
                    var nEl = document.getElementById('probcalcn');
                    var n = parseInt(nEl.value);
                    let Pn = prob(n);
                    document.getElementById('Pn').innerText = Pn.toFixed(3);
                });
            }
            resultEl.innerHTML = '<h3>The Utilization</h3><h2 class="indent">&rho; = <span id="res1" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the system</h3><h2 class="indent">L = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">W = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2>';
            document.getElementById('res1').innerText = (util).toFixed(decimal);
            document.getElementById('res2').innerText = (L).toFixed(decimal);
            document.getElementById('res3').innerText = (Lq).toFixed(decimal);
            document.getElementById('res4').innerText = (W).toFixed(decimal);
            document.getElementById('res5').innerText = (Wq).toFixed(decimal);
        break;
      
        case 'mmcnn':
            var c = parseInt(cEl.value);
            var m = parseInt(mEl.value);
            console.log("MMC*m");
            if(lamb > c*mu){
                alert("λ must be smaller than c*μ otherwise queue will increse indefinitely! ");
            }else{
                var P0= "We dont do that here";
                var r = lamb / mu;
                var util= r;
                var L, Lq, fakeP0, W, Wq;
                var i=0, Po_1=0,Px=0;
                for(i = 0, Po_1 = 0; i < c; i++){
                    Po_1 += combination(m, i) * Math.pow(r, i);
                }
                for(i=c, Px=0; i<=m; i++){
                    Px += combination(m, i) * factorial(i) * Math.pow(r, i) / (Math.pow(c, i - c) * factorial(c));
                }
                fakeP0 = 1 / (Po_1 + Px);
                L = 0;
                for(i = 0; i <= c - 1; i++){
                    L += i * combination(m, i) * Math.pow(r, i);
                }
                for(i = c; i <= m; i++){
                    L += i * combination(m, i) * Math.pow(r, i) * factorial(i) / (Math.pow(c, i - c) * factorial(c));
                }
                L *= fakeP0;
                Lq = 0;
                for (i=0; i<=c-1; i++) {
                    Lq += (c - i) * combination(m, i) * Math.pow(r, i);
                }
                Lq *= fakeP0;
                Lq = Lq + L - c;
                W = L / (lamb * (m - L));
                Wq = Lq / (lamb * (m - L));
                var Lambdap = mu * (L - Lq);
                points = get_graph(Lq,prob);
                noPoints = points[0];
                pointsForGraph = points[1];
                function prob(n){
                    if(0 <= n && n < c){
                        return combination(m, n) * Math.pow(r, n) * fakeP0;
                    }else if(n >= c && n <= m) {
                        return combination(m, n) * factorial(n) * Math.pow(r, n) * fakeP0 / (Math.pow(c, n - c) * factorial(c));
                    }else{
                        return 0;
                    }
                }
                probBtn.addEventListener('click', ()=>{
                    var nEl = document.getElementById('probcalcn');
                    var n = parseInt(nEl.value);
                    console.log(n);
                    let Pn = prob(n);
                    console.log(Pn);
                    document.getElementById('Pn').innerText = Pn.toFixed(3);
                });
            }
            resultEl.innerHTML = '<h3>The Expected number of jobs in the system</h3><h2 class="indent">L = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">W = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2>';
            document.getElementById('res2').innerText = (L).toFixed(decimal);
            document.getElementById('res3').innerText = (Lq).toFixed(decimal);
            document.getElementById('res4').innerText = (W).toFixed(decimal);
            document.getElementById('res5').innerText = (Wq).toFixed(decimal);
        break;

        case 'md1':
            console.log("MD1");
            r = lamb/mu;
            util = r;
            L = r + (Math.pow(r,2)/2*(1-r));
            Lq = Math.pow(r,2)/2*(1-r);
            W = (1/mu) + r/(2*mu*(1-r));
            Wq = r/(2*mu*(1-r));
            D = (2-r)/(2*mu*(1-r)); //Average Delay in system
            Dq = (r)/(2*mu*(1-r)); // Average Delay in queue
                document.getElementById('p-size').innerHTML = '';
            
            resultEl.innerHTML = '<h3>The Utilization</h3><h2 class="indent">&rho; = <span id="res1" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the system</h3><h2 class="indent">L = <span id="res2" style="color: lightgreen;"></span></h2><h3>The Expected number of jobs in the queue</h3><h2 class="indent">Lq = <span id="res3" style="color: lightgreen;"></span></h2><h3>The Average time spent in the system</h3><h2 class="indent">W = <span id="res4" style="color: lightgreen;"></span></h2><h3>The Average time spent waiting in the queue</h3><h2 class="indent">Wq = <span id="res5" style="color: lightgreen;"></span></h2><h3>The Average delay in system</h3><h2 class="indent">D = <span id="res6" style="color: lightgreen;"></span></h2><h3>The Average delay in the queue</h3><h2 class="indent">Dq = <span id="res7" style="color: lightgreen;"></span></h2>';
            document.getElementById('res1').innerText = (util).toFixed(decimal);
            document.getElementById('res2').innerText = (L).toFixed(decimal);
            document.getElementById('res3').innerText = (Lq).toFixed(decimal);
            document.getElementById('res4').innerText = (W).toFixed(decimal);
            document.getElementById('res5').innerText = (Wq).toFixed(decimal);
            document.getElementById('res6').innerText = (D).toFixed(decimal);
            document.getElementById('res7').innerText = (Dq).toFixed(decimal);
        break;
    }
    probBtn.click();
    window.location.href = "#result";
});


grpBtn.addEventListener('click', ()=>{

    if(type == 'md1'){
        document.getElementById("myChart").remove();
        div = document.querySelector("#graph-container");
        div.insertAdjacentHTML("afterbegin", "<h3>No Graph for (M/D/1):(∞/∞/FIFO) model</h3>");
    }else{
        document.getElementById("myChart").remove();
        div = document.querySelector("#graph-container");
        div.insertAdjacentHTML("afterbegin", "<canvas id='myChart'></canvas>");
        
        let myChart = document.getElementById('myChart').getContext('2d');
    
        Chart.defaults.global.defaultFontFamily = 'Lato';
        Chart.defaults.global.defaultFontColor = '#ddd';
    
        let probChart = new Chart(myChart, {
            type:'bar',
            data:{
                labels: noPoints,
                datasets: [{
                    label: 'Probability',
                    data: pointsForGraph,
                    backgroundColor: '#fff',
                    borderWidth: 2,
                    borderColor: 'purple',
                    hoverBorderColor: 'red'
                }]
            },
            options:{
                title:{
                    display: true,
                    text: 'Probability of no. of customers in system',
                    fontSize: 24
                },
                legend:{
                    display:true,
                    position:'right',
                    labels:{
                        fontSize: 18,
                        fontColor:'#fff'
                    }
                },
                layout:{
                    padding:{
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips:{
                    enabled:true
                },
                scales:{
                    xAxes:[{
                        scaleLabel:{
                            display: true,
                            labelString: 'Number of Customers in system',
                            fontSize: 20,
                            fontFamily: 'Lato'
                        }
                    }]
                }
            }
        });
    }
    window.location.href = "#graph";
});

upBtn.addEventListener('click', ()=>{
    window.location.href = "#top";
});

upBtn2.addEventListener('click', ()=>{
    window.location.href = "#top";
});
