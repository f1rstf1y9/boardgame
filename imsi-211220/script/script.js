// 게임 이름 검색 버튼 누를 시 나타나는 검색 결과 구역
$(".text-search-btn").click(function () {
  $(".text-result-section").show();
});

// 우측 네비게이션 리모콘 가이드 함수
$("#menu > li > a:nth-child(2)").mouseenter(function () {
  $(this).siblings().removeClass('hide-nav');

});
$("#menu > li a:nth-child(2)").mouseleave(function () {
  $(this).siblings().addClass('hide-nav');
});

const navi = $(".navi");
$(window).scroll(function () {
  clearTimeout($.data(this, "scrollTimer"));
  $.data(
    this,
    "scrollTimer",
    setTimeout(function () {
      console.log("over");
      navi.css("position", "fixed");
    }, 500)
  );
});

// 키워드 버튼 함수
$("#number .select-btn").click(function () {
  $("#number .select-btn").not(this).removeClass("btn-clicked");
  $(this).toggleClass("btn-clicked");
});
$("#situation .select-btn").click(function () {
  $("#situation .select-btn").not(this).removeClass("btn-clicked");
  $(this).toggleClass("btn-clicked");
});
$("#genre .select-btn").click(function () {
  $(this).toggleClass("btn-clicked");
});

// 찾아주세요! 버튼 눌렀을 때 동적으로 데이터 가져오는 함수
function gameKeywordFinder() {
  $("#cardHolder2").empty();
  $.ajax({
    type: "GET",
    url: "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99",
    data: {},
    success: function (response) {
      const row = response["RealtimeCityAir"]["row"];
      for (let i = 0; i < row.length; i++) {
        // 검색결과 개수 표시
        const newRoot = document.querySelector("b");
        const resultCheck = document.querySelectorAll("#newCard");
        let gu_name = row[i]["MSRSTE_NM"];
        let gu_mise = row[i]["IDEX_MVL"];
        let temp_html = ``;
        if (gu_mise > 55) {
          temp_html = `
          <div class="cards" id="newCard">
          <div class="col">
            <div class="card h-100">
              <img src="./images/루미큐브.jfif" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="game-title">${gu_name}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${gu_mise}</li>
                <li class="list-group-item">권장 인원수</li>
                <li class="list-group-item">플레이 시간</li>
              </ul>
            </div>
          </div>
        </div>
      `;
        } else {
          console.log("죄송합니다. 해당 정보가 없습니다.");
        }
        $("#cardHolder2").append(temp_html);
        newRoot.innerHTML = resultCheck.length + "개";
      }
    },
  });
  $(".result").show();
  $(".section-array").show();
}

function gameTextFinder() {
  let newValue = document.querySelector(".search-input").value;
  console.log(newValue);
  $("#cardHolder1").empty();
  $.ajax({
    type: "GET",
    url: "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99",
    data: {},
    success: function (response) {
      const row = response["RealtimeCityAir"]["row"];
      for (let i = 0; i < row.length; i++) {
        let gu_name = row[i]["MSRSTE_NM"];
        let gu_mise = row[i]["IDEX_MVL"];
        let temp_html = ``;
        const searchBtn = $("input.search-input");
        if (newValue.substr(0, 2) === gu_name.substr(0, 2)) {
          temp_html = `
            <div class="col">
              <div class="card h-100">
                <img src="./images/루미큐브.jfif" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="game-title">${gu_name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${gu_mise}</li>
                  <li class="list-group-item">권장 인원수</li>
                  <li class="list-group-item">플레이 시간</li>
                </ul>
              </div>
            </div>
      `;
        }
        $("#cardHolder1").append(temp_html);
      }
    },
  });
}


//찾아주세요! 버튼 함수 (아무것도 누르지 않았을때, 결과페이지에 누른 버튼 삽입)
function btn_next() { 
  
  $(".selected-items").empty();
  var k_str = "";
  active_elements = document.getElementsByClassName('btn-clicked');
  console.log(active_elements);

  k_str="";
  for (var i=0; i<active_elements.length; i++) {
    if(k_str == "")
        k_str = active_elements[i].innerHTML;
      else
        k_str = k_str+","+active_elements[i].innerHTML;
  }
  console.log(k_str);

  if(k_str =="")
  {
    alert('1개 이상의 키워드를 선택해 주세요!')
  } 
  else {
    var temp_html = "";
    for (var i=0; i<active_elements.length; i++) {
      temp_html += `<a class="select-btn btn-clicked">${active_elements[i].innerHTML}</a>`;
    }
    $(".selected-items").append(temp_html);
    gameKeywordFinder();
  }
}

//자동 완성 기능
var ref = [
  {key:1, name:'루미큐브1'},
  {key:2, name:'루미큐브2'},
  {key:2, name:'루미큐브3'},
  {key:2, name:'루미큐브4'},
  {key:2, name:'루미큐브5'},
  {key:2, name:'루미큐브6'},
  {key:3, name:'할리갈리1'},
  {key:4, name:'할리갈리2'},
];

var isComplete = false;  //autoMaker 자식이 선택 되었는지 여부
$('.search-input').keyup(function(){
  $("#autoMaker").show();
  var txt = $(this).val();
  if(txt != ''){  //빈줄이 들어오면
      $('#autoMaker').children().remove();

      ref.forEach(function(arg){
          if(arg.name.indexOf(txt) > -1 ){
              $('#autoMaker').append(
                  $('<div class="hint">').text(arg.name).attr({'key':arg.key})
              );
          }
      });
      $('#autoMaker').children().each(function(){
          $(this).click(function(){
              $('.search-input').val($(this).text());
              $('#insert_target').val("key : "+$(this).attr('key')+ ", data : " + $(this).text());
              $('#autoMaker').children().remove();
              isComplete = true;
          });
      });
  } else {
      $('#autoMaker').children().remove();
      $("#autoMaker").hide();
  }
});
$('.search-input').keydown(function(event){
  if(isComplete) {  //autoMaker 자식이 선택 되었으면 초기화
      $('#insert_target').val('')
  }
})



/* 키워드 3개 이상 클릭 시 버튼 비활성화 (참고용) */
// function btn_click(e, key) {
//   active_elements = document.getElementsByClassName('active');
  
  
//   if(active_elements.length >= 3)
//   {
//     console.log("active_elements.length > 3");
//     if($(e).hasClass("active"))
//     {
//       $(e).toggleClass('active');
//     }

//   }
//   else
//   {
//     $(e).toggleClass('active');
//   }
//   active_elements = document.getElementsByClassName('active');

//   if(active_elements.length >= 3)
//   {
//     btn_elements = document.getElementsByName('select_btn');
//     for (var i=0; i<btn_elements.length; i++) {
//       if(!$(btn_elements[i]).hasClass("active"))
//       {
//         btn_arr[i].classList.add("disabled")
//       }
//     }
//   }
//   else
//   {
//     btn_elements = document.getElementsByName('select_btn');
//     for (var i=0; i<btn_elements.length; i++) {
//       if(!$(btn_elements[i]).hasClass("active"))
//       {
//         btn_arr[i].classList.remove("disabled")
//       }
//     }
//   }
  
  
//   if(active_elements.length > 0){
//       $(".next").addClass("next_active");
//   }else{
//       $(".next").removeClass("next_active");
//   }

// }