const main=document.getElementById('main');
const adduserBtn=document.getElementById('add-user');
const doubleBtn=document.getElementById('double');
const showmillionairesBtn=document.getElementById('show-millionaires');
const sortBtn=document.getElementById('sort');
const calculatorwealthBtn=document.getElementById('calculator-wealth');

let  data=[];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser(){
    // fetch('https://randomuser.me/api').then(res=>res.json()).then(data=>)
   const res= await fetch('https://randomuser.me/api');
   const data=await res.json();
   //console.log(data);
   const user = data.results[0];
   const newuser={
        name:`${user.name.first} ${user.name.last}`,
            money:Math.floor(Math.random()*1000000)
    };
   // console.log(newuser);
   addData(newuser);
}

function addData(obj){
    data.push(obj);

    updateDom();
}

function updateDom(provideData=data){
    main.innerHTML='<h2><strong>Person</strong> Wealth</h2>';
    provideData.forEach(item => {
        const element=document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney(){
    data=data.map((user)=>{
        return{...user, money : user.money * 2}
    })
    updateDom();
}

function millionaires(){
    data=data.filter((user)=>user.money>1000000);
    updateDom();
}


function sort(){
   data=data.sort((a,b)=>b.money-a.money);
    updateDom();
}

 function calculate(){
     const weal=data.reduce((acc,user)=>(acc+=user.money),0);
     const wealth=document.createElement('div');
     wealth.innerHTML=`<h3>Total wealth:  <strong>${formatMoney(weal)}</strong><h3>`;
    main.appendChild(wealth);
    
 }

adduserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showmillionairesBtn.addEventListener('click',millionaires);
sortBtn.addEventListener('click',sort);
calculatorwealthBtn.addEventListener('click',calculate);
