const fun = (function() {
    
    const val = document.getElementById("text").textContent;
    
    if(val) {
        alert(val)
        document.getElementById("text").textContent = ""
    }



})()
    


