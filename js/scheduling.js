/* 

   inspired by https://dhtmlx.com/docs/products/dhtmlxScheduler/
   以及大學選課系統的編排方式
    
   心得：
   欲改善的內容，在DOM跟function的編排上不夠完善，在function裡(ex:updateTable()、resetTable())修改DOM還需要再指定一次重複的DOM
   而不是透過外圍或上層的DOM做修改
*/

const homeworkDiv = document.querySelector("#homework");

const buttons = document.querySelector("#buttons_homework"); // 按鈕們的外層DOM

var tableInDatabase = JSON.parse(localStorage.getItem("tableData")) || [];  // 要存放的資料


// 目前頁面要顯示的資料
var tableForView = [];

// table為9橫列7直排，總長度為63
for(let i=0;i<63;i++){ 
  tableForView[i] = 0; 
}

localStorage.setItem("initialize", JSON.stringify(tableForView));
let initialTable = JSON.parse(localStorage.getItem("initialize"));

let initialFlag = false; // 不可初始化

/*
  對我來說很重要的思路:
       tableInDatabase一開始一定為空陣列(因為甚麼動作都還沒開始，tableForView的值還不會存進去)
       按照先前的做法會先將tableInDatabase直接設為tableForView的值，然後直接存入localStorage中的tableData裡
       但這樣子的話，每當離開排課系統的頁面時再進入排課系統時，因為scheduling.html又要重新引入這個script檔
       且tableForView所有元素的一開始皆為0，會導致沒辦法儲存先前動作的結果，tableInDatabase的元素都會為0
       所以設立initialFlag，來確立tableInDatabase該不該初始化
       如果tableInDatabase為空，將initialFlag為true
       initialFlag為true時，表示需要初始化，這時候將tableInDatabase設為localStorage中的initialTable(全為0)
       並且
       反之則代表已完成初始化，就可以放心的將tableData的值指派為tableInDatabase，達到儲存table的作用
*/

if(tableInDatabase.length == 0){
  initialFlag = true;
}

if (initialFlag === false){
  localStorage.setItem("tableData",JSON.stringify(tableInDatabase));
}
else{
  tableInDatabase = initialTable;
  localStorage.setItem("tableData",JSON.stringify(tableForView));
}

buttons.addEventListener("click", function (e) {
  for (let i = 0; i < homeworks.length; i++) {
    if (e.target.textContent === homeworks[i].title) {
      window.location.href = homeworks[i].url;
    }
  }
})


function render() {
  let str = `
        <div>
        <div class="bg-os" style="width:10px; height:10px; display:inline-block;"></div>
    作業系統概論 
    <div class="bg-se" style="width:10px; height:10px; margin-left:20px;display:inline-block"></div>
    軟體工程
        </div>
        
        <table class="table table-bordered ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">一</th>
      <th scope="col">二</th>
      <th scope="col">三</th>
      <th scope="col">四</th>
      <th scope="col">五</th>
      <th scope="col">六</th>
      <th scope="col">日</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"> 8:10~9:00</th>
      <td data-index="0"></td>
      <td data-index="9"></td>
      <td data-index="18"></td>
      <td data-index="27"></td>
      <td data-index="36"></td>
      <td data-index="45"></td>
      <td data-index="54"></td>
    </tr>
    <tr>
      <th scope="row"> 9:10~10:00</th>
      <td data-index="1"></td>
      <td data-index="10"></td>
      <td data-index="19"></td>
      <td data-index="28"></td>
      <td data-index="37"></td>
      <td data-index="46"></td>
      <td data-index="55"></td>
    </tr>
    <tr>
      <th scope="row"> 10:10~11:00</th>
      <td data-index="2"></td>
      <td data-index="11"></td>
      <td data-index="20"></td>
      <td data-index="29"></td>
      <td data-index="38"></td>
      <td data-index="47"></td>
      <td data-index="56"></td>
    </tr>
    <tr>
      <th scope="row"> 11:10~12:00</th>
      <td data-index="3"></td>
      <td data-index="12"></td>
      <td data-index="21"></td>
      <td data-index="30"></td>
      <td data-index="39"></td>
      <td data-index="48"></td>
      <td data-index="57"></td>
    </tr>
    <tr>
      <th scope="row"> 12:10~13:00</th>
      <td data-index="4"></td>
      <td data-index="13"></td>
      <td data-index="22"></td>
      <td data-index="31"></td>
      <td data-index="40"></td>
      <td data-index="49"></td>
      <td data-index="58"></td>
    </tr>
    <tr>
      <th scope="row"> 13:10~14:00</th>
      <td data-index="5"></td>
      <td data-index="14"></td>
      <td data-index="23"></td>
      <td data-index="32"></td>
      <td data-index="41"></td>
      <td data-index="50"></td>
      <td data-index="59"></td>
    </tr>
    <tr>
      <th scope="row"> 14:10~15:00</th>
      <td data-index="6"></td>
      <td data-index="15"></td>
      <td data-index="24"></td>
      <td data-index="33"></td>
      <td data-index="42"></td>
      <td data-index="51"></td>
      <td data-index="60"></td>
    </tr>
    <tr>
      <th scope="row"> 15:10~16:00</th>
      <td data-index="7"></td>
      <td data-index="16"></td>
      <td data-index="25"></td>
      <td data-index="34"></td>
      <td data-index="43"></td>
      <td data-index="52"></td>
      <td data-index="61"></td>
    </tr>
    <tr>
      <th scope="row"> 16:10~17:00</th>
      <td data-index="8"></td>
      <td data-index="17"></td>
      <td data-index="26"></td>
      <td data-index="35"></td>
      <td data-index="44"></td>
      <td data-index="53"></td>
      <td data-index="62"></td>
    </tr>
  </tbody>
</table>
  <label for="day">Choose day:</label>
  <select name="day" id="day">
    <option value="1">一</option>
    <option value="2">二</option>
    <option value="3">三</option>
    <option value="4">四</option>
    <option value="5">五</option>
    <option value="6">六</option>
    <option value="7">日</option>
  </select>
 <label for="startTime">Choose start time:</label>
  <select name="startTime" id="startTime">
    <option value="1">8:10~9:00</option>
    <option value="2">9:10~10:00</option>
    <option value="3">10:10~11:00</option>
    <option value="4">11:10~12:00</option>
    <option value="5">12:10~13:00</option>
    <option value="6">13:10~14:00</option>
    <option value="7">14:10~15:00</option>
    <option value="8">15:10~16:00</option>
    <option value="9">16:10~17:00</option>
  
  </select>
  <label for="endTime">Choose end time:</label>
  <select name="endTime" id="endTime">
    <option value="1">8:10~9:00</option>
    <option value="2">9:10~10:00</option>
    <option value="3">10:10~11:00</option>
    <option value="4">11:10~12:00</option>
    <option value="5">12:10~13:00</option>
    <option value="6">13:10~14:00</option>
    <option value="7">14:10~15:00</option>
    <option value="8">15:10~16:00</option>
    <option value="9">16:10~17:00</option>
   
  </select>
  <label for="course">Choose course:</label>
  <select name="course" id="course">
    <option value="1">作業系統概論</option>
    <option value="2">軟體工程</option>
  </select>
    
    <button type="button" class="btn btn-primary" id="submitBtn">送出</button>
    <button type="button" class="btn btn-primary" id="resetBtn">重置課表</button>
      `

  homeworkDiv.innerHTML = str;

}

/*
  tableDOM.rows.length 為 tableDOM的長度（有多少列）
  根據選到哪一天且選到的時間區段可不可以排課，再決定是否要更新col的值
  以下的function中跟tableDOM.rows.length有關的i
  i從1開始是因為要略過tableDOM的第一行(i = 0)，如果loop至第一行會存取到 # 8:00~9:00 ......
  i存取行元素 j存取列元素 
  [1,1] [2,1]  
  [1,2] [2,2]
  [1,3]
  [1,4]
  [1,5]
  [1,6]
  [1,7]
  [1,8]
  [1,9]  . . . . . . . . . . . . . . . . . [7,9]
   i j                                      i j
   按照這樣loop的話其實還是會有錯誤，因為tableDOM.rows.length為10
   不加入if(i>=8)的話，i最大會達到9，會多loop 2*9次
   且index算法可能也有錯誤，index中的9表示為列數
   但只求有想要的畫面就不思考該如何改善那麼多了
*/
/* 根據localStorage裡的tableData來更新頁面所呈現的資訊 */
function updateTable(){
  
  let tableInDatabase = JSON.parse(localStorage.getItem("tableData"));
  //alert("in updateTable() , tableInDatabase = " + tableInDatabase);
  
  let tableDOM = document.querySelector(".table");
  for (let i = 1; i < tableDOM.rows.length; i++) { 
    if( i>=8){
      break;
    }
    for (let j = 1; j <= 9; j++) {
      {
        let index = (i - 1) * 9 + (j - 1);
        // console.log("index = " + index);
        if (tableInDatabase[index] == 1){
            tableDOM.rows[j].cells[i].classList.add("bg-os");
           }
        if (tableInDatabase[index] == 2) {
            tableDOM.rows[j].cells[i].classList.add("bg-se");
        }
      }
    }
  }

  /* 存放頁面元素的table，跟localStorage的table做同步處理 */
  tableForView = tableInDatabase;
  
}

/* 清空table並移除table中td的className*/
function resetTable() {
  
  /* 存放頁面元素的table，所有元素都設為0*/ 
  for (let i = 0; i < tableForView.length; i++) {
    tableForView[i] = 0;
  }

  let tableInDatabase = JSON.parse(localStorage.getItem("tableData"));

  // alert("in resetTable() , tableInDatabase = " + tableInDatabase);

  let tableDOM = document.querySelector(".table");
  
  // 根據localStorage的tableData來移除className，確保整個td都沒有className
  for (let i = 1; i < tableDOM.rows.length; i++) {
    if (i >= 8) {
      break;
    }
    for (let j = 1; j <= 9; j++) {
      {
        let index = (i - 1) * 9 + (j - 1);
        if (tableInDatabase[index] == 1) {
          tableDOM.rows[j].cells[i].classList.remove("bg-os");
        }
        if (tableInDatabase[index] == 2) {
          tableDOM.rows[j].cells[i].classList.remove("bg-se");
        }
      }
    }
  }
  // localStorage的tableData元素們皆為0
  tableInDatabase = tableForView;
  localStorage.setItem("tableData", JSON.stringify(tableInDatabase));
}

function checkValid() {
  
  let day = document.querySelector("#day");
  let startTime = document.querySelector("#startTime");
  let endTime = document.querySelector("#endTime");
  let tableDOM = document.querySelector(".table");
  
  let scheduleFlag = true;
  for (let i = 1; i < tableDOM.rows.length; i++) {
      if ((i == (day[day.selectedIndex].value))) {
      console.log("i = " + i);
      alert("選到星期" + day[day.selectedIndex].textContent);

      let timeSection_head = (i - 1) * 9 + startTime.selectedIndex + 1; // 時間區段的開頭是第幾格
      let difference = endTime.selectedIndex - startTime.selectedIndex; // 時間區段的結尾跟開頭差幾個格子
      //alert("timeSection_head = " + timeSection_head);
      //alert("difference = " + difference);

      /* 
        先遍歷時間區段，若有課了，就表示不能再排課，flag要設為false並離開迴圈
                       若沒有則，不更新flag的狀態 
      */
      for (let k = timeSection_head - 1; k < (timeSection_head + difference); k++) {
        //alert("table[" + k + "] = " + table[k]);
        if (tableForView[k] != 0) {
          scheduleFlag = false;
          //alert("不能排課，請另尋時間");
          break;
        }
        else {
          ;  // do nothing
        }
      }
    }
  }

  return scheduleFlag;
}



function scheduling() {
    let day = document.querySelector("#day");
    let startTime = document.querySelector("#startTime");
    let endTime = document.querySelector("#endTime");
    let course = document.querySelector("#course");
    let tableDOM = document.querySelector(".table");
    for (let i = 1; i < tableDOM.rows.length; i++) {
      if ((i == (day[day.selectedIndex].value))) {
        for (let j = (startTime.selectedIndex + 1); j <= (endTime.selectedIndex + 1); j++) {
          {
            let index = (i - 1) * 9 + (j - 1); // 根據迴圈決定目前巡訪到的格子是第幾格，但由於是要用來存取陣列，所以j要多減1
            // alert("table[" + index + "] = " + table[index]);
            if (tableForView[index] == 0) {
              if (course[course.selectedIndex].value == 1) {
                tableDOM.rows[j].cells[i].classList.add("bg-os");
                tableForView[index] = 1;
              }
              if (course[course.selectedIndex].value == 2) {
                tableDOM.rows[j].cells[i].classList.add("bg-se");
                tableForView[index] = 2;
              }
            }
          }
        }
      }
    }
   tableInDatabase = tableForView;
   localStorage.setItem("tableData", JSON.stringify(tableInDatabase));
}

window.onload = function () {
    render();
    
    let day = document.querySelector("#day");
    let startTime = document.querySelector("#startTime");
    let endTime = document.querySelector("#endTime");
    let submit = document.querySelector("#submitBtn")
    let reset = document.querySelector("#resetBtn");
    let course = document.querySelector("#course");
    let tableDOM = document.querySelector(".table");


    day.addEventListener("change", function (e) {
      let selectedIndex = e.target.value - 1;
      alert("星期" + day[selectedIndex].textContent);
    })
    startTime.addEventListener("change", function (e) {
      let selectedIndex = e.target.value - 1;
      alert("開始時間：" + startTime[selectedIndex].textContent);
    })
    endTime.addEventListener("change", function (e) {
      let selectedIndex = e.target.value - 1;
      alert("結束時間：" + endTime[selectedIndex].textContent);
    })
    course.addEventListener("change", function (e) {
      let selectedIndex = e.target.value - 1;
      alert("課程：" + course[selectedIndex].textContent);
    })

    tableDOM.addEventListener("click",function(e){
      if(e.target.textContent === ""){
        let targetIndex = parseInt(e.target.dataset.index); // 目標格子的index值，要使用parseInt是因為data-*的值為string
        if (tableForView[targetIndex] <= 0){
          ; // do nothing
        }
        else{
          let i = Math.floor((targetIndex / 9)) + 1;
          let j = targetIndex - 9*(i-1) + 1;
          if (tableForView[targetIndex] === 1){
            tableForView[targetIndex] = 0;
            tableDOM.rows[j].cells[i].classList.remove("bg-os");
          }
          if (tableForView[targetIndex] === 2) {
            tableForView[targetIndex] = 0;
            tableDOM.rows[j].cells[i].classList.remove("bg-se");
          }

          localStorage.setItem("tableData", JSON.stringify(tableForView));
        }
      
      }
    })
    
    tableDOM.addEventListener("mouseover", function (e) {
      
      if (e.target.textContent === "") {
        let targetIndex = parseInt(e.target.dataset.index); // 目標格子的index值，要使用parseInt是因為data-*的值為string
        let i = Math.floor((targetIndex / 9)) + 1; // 第幾行
        let j = targetIndex - 9 * (i - 1) + 1; // 第幾列
        if (tableForView[targetIndex] <= 0) {
          tableDOM.rows[j].cells[i].classList.add("whitespace-hover");
        }
        else {
          if (tableForView[targetIndex] === 1) {
            tableDOM.rows[j].cells[i].classList.add("opacity-light");
          }
          if (tableForView[targetIndex] === 2){
              tableDOM.rows[j].cells[i].classList.add("opacity-light");
          }
        }
      }
    })
    tableDOM.addEventListener("mouseout", function (e) {
      if (e.target.textContent === "") {
        let targetIndex = parseInt(e.target.dataset.index); // 目標格子的index值，要使用parseInt是因為data-*的值為string
        let i = Math.floor((targetIndex / 9)) + 1; // 第幾行
        let j = targetIndex - 9 * (i - 1) + 1; // 第幾列
        if (tableForView[targetIndex] <= 0) {
          tableDOM.rows[j].cells[i].classList.remove("whitespace-hover");
        }
        else {
          if (tableForView[targetIndex] === 1) {
            tableDOM.rows[j].cells[i].classList.remove("opacity-light");
          }
          if (tableForView[targetIndex] === 2) {
            tableDOM.rows[j].cells[i].classList.remove("opacity-light");
          }
        }
      }
    })
    submit.addEventListener("click", function (e) {
      if (startTime[startTime.selectedIndex].value <= endTime[endTime.selectedIndex].value) {
        // checkValid()會檢查當前選擇的時間區段是否可以排課
        if (checkValid()) {
          alert("可以排課");
          scheduling();
          localStorage.setItem("tableData", JSON.stringify(tableInDatabase));
        }
        else {
          alert("不能排課，請另尋時間");
        }
      }
      else {
        alert("請重新確認時間");
      }
    })
    reset.addEventListener("click", function (e) {
      resetTable();
    })
    updateTable(); 
}

