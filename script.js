console.log("We will rock you!");

var calcBtn = document.getElementById('calcBtn');
var upBtn = document.getElementById('upBtn')
var grpBtn = document.getElementById('grpBtn');
var lambEl = document.getElementById('lamb');
var muEl = document.getElementById('mu');


calcBtn.addEventListener('click', ()=>{
    var lamb = parseInt(lambEl.value);
    var mu = parseInt(muEl.value);
    
    if(lamb > mu){
        alert("If λ is greter than μ then queue will increase indefinitely and the system will not have a stationary distribution!");
        //window.location.href = "#top";
    }else{
        var util = (lamb/mu).toFixed(5); //utilization
        var p0 = (1 - util).toFixed(5); //used in other formula
        var L = (lamb/(mu-lamb)).toFixed(5); //expected number of jobs in the system
        var Lq = (lamb**2/(mu*(mu-lamb))).toFixed(5); //expected number of jobs in the queue
        var W = (L/lamb).toFixed(5); //average time spent in the system
        var Wq = (Lq/lamb).toFixed(5); //average time spent waiting in the queue
        //console.log("util:", util, "L:", L, "Lq:", Lq, "W:", W, "Wq:", Wq);

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