console.log("We will rock you!");

var myBtn = document.getElementById('calcBtn');
var lamb = document.getElementById('lamb');
var mu = document.getElementById('mu');

myBtn.addEventListener('click', ()=>{
    console.log(lamb.value, mu.value);
    var util = lamb.value/mu.value; //utilization
    var p0 = 1 - util; //used in other formula
    var L = lamb.value/(mu.value-lamb.value); //expected number of jobs in the system
    var Lq = lamb.value**2/(mu.value*(mu.value-lamb.value)); //expected number of jobs in the queue
    var W = L/lamb.value; //average time spent in the system
    var Wq = Lq/lamb.value; //average time spent waiting in the queue

    console.log("util:", util, "L:", L, "Lq:", Lq, "W:", W, "Wq:", Wq);
    
    document.getElementById('res1').innerText = util;
    document.getElementById('res2').innerText = L;
    document.getElementById('res3').innerText = Lq;
    document.getElementById('res4').innerText = W;
    document.getElementById('res5').innerText = Wq;
});