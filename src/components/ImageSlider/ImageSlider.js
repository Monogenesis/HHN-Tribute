var counter = 1;
setInterval(function(){
    document.createElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1;
    }
}, 5000);