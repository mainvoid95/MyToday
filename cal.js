var today = new Date();
var tagetday = new Date();

function makecal(){
    var firstday = new Date(today.getFullYear(),today.getMonth(),1);
    var lastday = new Date(today.getFullYear(), today.getMonth()+1, 0);
    var showtable = document.getElementById("cal");
    var tableym = document.getElementById("calym");
    tableym.innerHTML = today.getFullYear()+ " 년 " + (today.getMonth() + 1)+ " 월 ";

    //기존에 테이블에 잇던 달력 내용 삭제
    while(showtable.rows.length>2){
        showtable.deleteRow(showtable.rows.length -1);
    }
    var row = null;
    row = showtable.insertRow();
    var cnt =0;
    // 1일이 시작되는 칸을 맞추어줌
    for ( i=0; i < firstday.getDay(); i++) {
        cell = row.insertCell();
        cnt = cnt + 1;
        cell.className = "nohi";
    }
    //달력 출력
    for(i=1; i <= lastday.getDate(); i++){
        cell = row.insertCell();
        cell.innerHTML = i;
        if(cell.innerHTML == tagetday.getDate() 
        && tableym.innerHTML == tagetday.getFullYear()+ " 년 " + (tagetday.getMonth() + 1)+ " 월 "){
            cell.className = "todayhi";
        }
        cnt = cnt + 1;
        if (cnt%7 == 0)    //1주=7일
        row = cal.insertRow();
    }
    while(showtable.rows.length < 9){
        cell = row.insertCell();
        cell.className = "notday";
        cnt = cnt + 1;
        if(cnt%7 == 0){
            row = cal.insertRow();
        }
    }

}

function precal(){
    today = new Date(today.getFullYear(), (today.getMonth() - 1), today.getDate());
    makecal();
}

function nextcal(){
    today = new Date(today.getFullYear(), (today.getMonth() + 1), today.getDate());
    makecal();
}

