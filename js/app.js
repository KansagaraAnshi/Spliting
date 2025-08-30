// SPA navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
}

// Instant Split
function calculateInstantSplit() {
    const names = document.getElementById('instant-names').value.split(',').map(n=>n.trim()).filter(n=>n);
    const amount = parseFloat(document.getElementById('instant-amount').value);
    if (!names.length || !amount) { alert('Enter names and amount'); return; }
    const perPerson = (amount / names.length).toFixed(2);
    const resultList = document.getElementById('instant-result');
    resultList.innerHTML = '';
    names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = `${name} owes $${perPerson}`;
        resultList.appendChild(li);
    });
}

// Food Split
function calculateFoodSplit() {
    const names = document.getElementById('food-names').value.split(',').map(n=>n.trim()).filter(n=>n);
    const amount = parseFloat(document.getElementById('food-amount').value);
    if (!names.length || !amount) { alert('Enter names and amount'); return; }
    const perPerson = (amount / names.length).toFixed(2);
    const resultList = document.getElementById('food-result');
    resultList.innerHTML = '';
    names.forEach(name => {
        const li = document.createElement('li');
        li.textContent = `${name} owes $${perPerson}`;
        resultList.appendChild(li);
    });
}

// Manual Split
function showManualSplit(type) {
    let inputDiv, sectionDiv;
    if(type==='instant'){
        sectionDiv = document.getElementById('instant-manual-section');
        inputDiv = document.getElementById('instant-manual-inputs');
        const names = document.getElementById('instant-names').value.split(',').map(n=>n.trim()).filter(n=>n);
        inputDiv.innerHTML = '';
        names.forEach(name=>{
            const input = document.createElement('input');
            input.type='number';
            input.placeholder=`${name}'s amount`;
            input.id=`instant-${name}`;
            inputDiv.appendChild(input);
        });
        sectionDiv.style.display='block';
    } else if(type==='food'){
        sectionDiv = document.getElementById('food-manual-section');
        inputDiv = document.getElementById('food-manual-inputs');
        const names = document.getElementById('food-names').value.split(',').map(n=>n.trim()).filter(n=>n);
        inputDiv.innerHTML = '';
        names.forEach(name=>{
            const input = document.createElement('input');
            input.type='number';
            input.placeholder=`${name}'s amount`;
            input.id=`food-${name}`;
            inputDiv.appendChild(input);
        });
        sectionDiv.style.display='block';
    }
}

function calculateManualSplit(type){
    let names, totalAmount, resultList;
    if(type==='instant'){
        names = document.getElementById('instant-names').value.split(',').map(n=>n.trim()).filter(n=>n);
        totalAmount = parseFloat(document.getElementById('instant-amount').value);
        resultList = document.getElementById('instant-result');
    } else if(type==='food'){
        names = document.getElementById('food-names').value.split(',').map(n=>n.trim()).filter(n=>n);
        totalAmount = parseFloat(document.getElementById('food-amount').value);
        resultList = document.getElementById('food-result');
    }
    let sum=0, results=[];
    try{
        names.forEach(name=>{
            const val = parseFloat(document.getElementById(`${type}-${name}`).value);
            if(isNaN(val)){ throw `${name} missing`; }
            sum+=val;
            results.push({name,val});
        });
    } catch(e){ alert("Enter all manual amounts"); return; }
    if(sum!==totalAmount){ alert(`Sum ${sum} doesn't match total ${totalAmount}`); return; }
    resultList.innerHTML='';
    results.forEach(r=>{
        const li = document.createElement('li');
        li.textContent=`${r.name} owes $${r.val.toFixed(2)}`;
        resultList.appendChild(li);
    });
}

// Group Split
let groupTransactions=[];
function addGroupTransaction(){
    const desc=document.getElementById('group-desc').value.trim();
    const amt=parseFloat(document.getElementById('group-amount').value);
    if(!desc||!amt){alert('Enter description and amount'); return;}
    groupTransactions.push({desc,amt});
    updateGroupList();
    document.getElementById('group-desc').value='';
    document.getElementById('group-amount').value='';
}
function updateGroupList(){
    const list=document.getElementById('group-list');
    list.innerHTML='';
    groupTransactions.forEach(t=>{
        const li=document.createElement('li');
        li.textContent=`${t.desc}: $${t.amt}`;
        list.appendChild(li);
    });
}