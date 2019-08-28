var today = new Date();
var tagetday = new Date();
var y = today.getFullYear();
var m = today.getMonth() + 1;
var d = today.getDate();

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
        cell.className = i;
        if(cell.innerHTML == tagetday.getDate() 
        && tableym.innerHTML == tagetday.getFullYear()+ " 년 " + (tagetday.getMonth() + 1)+ " 월 "){
            $('.' + tagetday.getDate()).css('color', 'white');
        }

        // 셀 생성후 셀에 대해서 이벤트 생성.
        // jquery로 되어있고 특정 날자에 이벤트를 추가하는방식
        $('.' + i).click(function(){
            getToDaydate();
            d = this.className; //클래스이름이 날자와 동일하기 때문에 클래스 이름을 날자변수로 사용
            $("#editback").show(30);
            $('#diaryy').val(y + " 년 ");
            $('#diarym').val(m + " 월 ");
            $('#diaryd').val(d + " 일 ");
        })

        cnt = cnt + 1;
        if (cnt%7 == 0)    //1주=7일
        row = cal.insertRow();
    }
    while(showtable.rows.length < 9){
        cell = row.insertCell();
        cell.className = "nohi";
        cnt = cnt + 1;
        if(cnt%7 == 0){
            row = cal.insertRow();
        }
    }


}

//달력 표기 월 변경
function precal(){
    today = new Date(today.getFullYear(), (today.getMonth() - 1), today.getDate());
    y = today.getFullYear();
    m = today.getMonth();
    d = today.getDate();
    makecal();
}
function nextcal(){
    today = new Date(today.getFullYear(), (today.getMonth() + 1), today.getDate());
    y = today.getFullYear();
    m = today.getMonth();
    d = today.getDate();
    makecal();
}

//날자 변수 리프래시
function getToDaydate(){
    y = today.getFullYear();
    m = today.getMonth() + 1;
}
