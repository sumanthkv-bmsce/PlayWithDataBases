const register = (function() {
    
    const items = JSON.parse(document.getElementById("items").textContent);
    document.getElementById("items").textContent = ""

    var table = document.getElementById("itemList");

    for(let i=1;i<items.length+1;i++) {
        var row = table.insertRow(i);    
        var cell = row.insertCell(0);
        cell.innerHTML = items[i-1].email
        cell = row.insertCell(1);
        cell.innerHTML = items[i-1].name
        cell = row.insertCell(2);
        cell.innerHTML = items[i-1].subject
        cell = row.insertCell(3);
        cell.innerHTML = items[i-1].query
        cell = row.insertCell(4);
        cell.innerHTML = items[i-1].message
    }

 


})()

function home() {
    window.location.href="/"
}


