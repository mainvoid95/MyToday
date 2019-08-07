var pretodolist = document.getElementsByTagName("li");
var j;
for(j = 0; j < pretodolist.length; j++){
    var span = document.createElement("span");
    var xtext = documetn.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(xtext);
    pretodolist[j].appendChild(span);
}

var list = document.getElementById("todomain");
list.addEventListener('click', function(event){
    event.target.classList.toggle("check");
}, false);

function addItem(){
    var li = document.createElement("li");
    var inputValue = document.getElementById("todoinput").value;
    var t =document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue === ''){
        alert("내용을 입력하고 엔터를 눌러주세요");
    }else{
        document.getElementById("todomain").appendChild(li);
    }
    document.getElementById("todoinput").value = "";

    var span = document.createElement("span");
    var xtext = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(xtext);
    li.appendChild(span);

    for (i = 0; i < close.length; i++){
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

var close = document.getElementsByClassName("close");
var i ;
for (i = 0; i < close.length; i++){
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

function onEnter(){
    if(event.keyCode == 13){
        addItem()
    }
}
