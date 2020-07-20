const roomInfo = document.querySelector('.roomInfo');
const largeRow = document.querySelector('.largeRow');
const smallRow = document.querySelector('.smallRow');

window.onload = function (e) {
    getSingleRoom();
}


function getSingleRoom() {

    let id = getID();
    let targetURL = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id; // 單一房號的目標URL
    // alert(targetURL);

    let xhr = new XMLHttpRequest();

    xhr.open('GET', targetURL);
    xhr.setRequestHeader('authorization', 'Bearer i5F3RYoJziMTyM7M8cvlywOX1KPgRPJzbHsb5uj0Vew1iwggDsCzWmXg5bv2');
    xhr.send(null);

    
    xhr.onload = function () {
        let roomObject = JSON.parse(xhr.responseText); // 儲存房型的單一細節
        console.log(roomObject);
        if (roomObject.success === true) {
            let room = roomObject.room[0]; // abbreviation for roomObject.room[0]
            let name = room.name;
            let normalDayPrice = room.normalDayPrice;
            let holidayPrice = room.holidayPrice;
            let imageUrl = room.imageUrl; // imageUrl有三個元素，為陣列
            let description = room.description;
            let checkInAndOut = room.checkInAndOut; // checkIn跟checkOut的時間，此attribute為物件
            let checkInEarly = checkInAndOut.checkInEarly; // checkIn
            let checkInLate = checkInAndOut.checkInLate;
            let checkOut = checkInAndOut.checkOut;
            let amenities = room.amenities; // 便利設施，此attribute為物件
            let amenities_Str = printAmenities();

            // descriptionShortOfRoom
            // 為描述房客人數限制、床型、衛浴數量的room attribute，該attribute為Object
            let descriptionShortOfRoom = room['descriptionShort']; // abbreviation for roomObject.room[0].descriptionShort
            let guestMin = descriptionShortOfRoom['GuestMin'];  // 最小人數
            let guestMax = descriptionShortOfRoom['GuestMax']; // 最大人數
            let bed = descriptionShortOfRoom['Bed']; // 床型
            let privateBath = descriptionShortOfRoom['Private-Bath']; // 衛浴數量
            let footage = descriptionShortOfRoom['Footage']; // 房間大小
            

            /*
            
                `<div class="img" style='background-image:url(${imageUrl[0]})'>
                                  </div>
                                 `;
            */


            largeRow.innerHTML = `<div class="img" style='background-image:url(${imageUrl[0]})'>
                                  </div>
                                 `;
            smallRow.innerHTML = `<div class="img" style='background-image:url(${imageUrl[1]})'>
                                  </div>
                                  <div class='img' style='background-image:url(${imageUrl[2]})'>
                                  </div>
                                 `;
            roomInfo.innerHTML = `
                                  <div class="roomInfo-left">
                                    <h1 class="room-name">${name}</h1>
                                    <ul class="room-shortDescription">
                                        <li>
                                            房客人數限制：
                                            <span class="guest-limit">
                                                ${guestMin} ~ ${guestMax}
                                            <span>
                                        </li>
                                        <li>
                                            床型：
                                            <span class="bed-type">
                                                ${bed}
                                            <span>
                                        </li>
                                        <li>
                                            衛浴數量：
                                            <span class="bath-num">
                                                ${privateBath}
                                            </span>
                                        </li>
                                        <li>
                                            房間大小：
                                            <span class="roomSize">
                                                ${footage}平方公尺
                                            </span>
                                        </li>
                                    </ul>
                                    <p class="room-description">${description}</p>
                                    <div class="room-checkInAndOut">
                                        <div class="room-checkIn">
                                            <p>Check In</p>
                                            <span id="checkIn">${checkInEarly} - ${checkInLate}</span>
                                        </div>
                                        <div class="room-checkOut">
                                            <p>Check Out</p>
                                            <span id="checkOut">${checkOut}</span>
                                        </div>
                                    </div>
                                    
                                    ${amenities_Str}
                                  </div>
                                  <div class="roomInfo-middle">
                                    <div class="room-normalDay">
                                        <span>
                                            NT.${normalDayPrice}
                                        </span>
                                        <h4>平日(一~四)</h4>
                                    </div>
                                    <div class="room-holiday">
                                        <span>
                                            NT.${holidayPrice}
                                        </span>
                                        <h4>假日(五~日)</h4>
                                    </div>
                                  </div>
                                  <div class="roomInfo-right">
                                       <div class="calnedar-section">
                                            <input type="text" id="demo-1"/>
                                            <p id="result-1"></p>
                                       </div>
                                       <button type="button" id="bookingButton" class="btn btn-secondary">預約時段</button>
                                       <div class="roomForm" style="display:none;">
                                       </div>
                                  </div>
                                  
                                </div>`;

            addAmenitiesClass(amenities);
            
            let picker = new Lightpick({
                field: document.getElementById('demo-1'),
                singleDate: false,
                inline:true,
                onSelect: function (start, end) {
                    var str = '';
                    str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
                    str += end ? end.format('YYYY-MM-DD') : '...';
                }
            });
            
            

            let bookingBtn = document.querySelector("#bookingButton");
            let roomForm = document.querySelector(".roomForm");
            bookingBtn.addEventListener("click",function(e){
                if(picker.getStartDate() == null || picker.getEndDate() == null ){
                    alert("請選擇日期！");
                }
                else{
                     roomForm.innerHTML = printForm();
                     roomForm.style.display = "block"; // 顯示表單
                     let validCustomTime = document.querySelector("#validationCustomTime");
                     let start = new Date(picker.getStartDate());
                     let end = new Date(picker.getEndDate());
                     let tempDay = start;
                     let normalDayCount = 0;
                     let holidayCount = 0;
                     const oneDay = 24 * 60 * 60 * 1000; // 一天有毫秒 hours * minutes *seconds *millisecond
                     const diffDays = Math.floor((end - start)) / oneDay; // 差的天數
                     
                     // i從0開始，表示從start開始計算
                     for(let i=0;i<= diffDays;i++){
                         // 利用直接帶數字進去物件的方式，讓Date物件針對毫秒來做計算
                         tempDay = new Date(start.getTime() + oneDay * i ); 
                         if(1 <= tempDay.getDay() && tempDay.getDay() <= 4){
                             ++normalDayCount;
                         }
                         if(tempDay.getDay() == 0 || tempDay.getDay() > 4){
                             ++holidayCount;
                         }
                    }
                    
                    let price = document.querySelector(".price");
                    price.textContent = "= " + (normalDayPrice * normalDayCount + holidayPrice * holidayCount).toString();
                    
                    validCustomTime.value = start.toLocaleDateString() + " - " + end.toLocaleDateString();
                    
                    if (roomForm.style.display === "block") {
                        let night = document.querySelectorAll(".night");
                        night[0].textContent = normalDayCount + "夜"; 
                        night[1].textContent = holidayCount + "夜";
                        let submitBtn = document.querySelector("#submitButton")
                        submitBtn.addEventListener("click",function(e){
                            let inputPhone = document.querySelector("#validationCustomPhone")
                            let inputName = document.querySelector("#validationCustomName")
                            e.preventDefault();
                           
                            // 若目前預訂的房間沒有人訂購，就可以直接利用AJAX POST 資料
                            if(roomObject.booking.length === 0){
                                
                                let dateArr = [];
                                if(inputPhone.value != "" && inputName.value != ""){
                                    
                                    for (let i = 0; i <= diffDays; i++) {
                                        // 利用直接帶數字進去物件的方式，讓Date物件針對毫秒來做計算
                                        tempDay = new Date(start.getTime() + oneDay * i);
                                        let tempDayString = "";
                                        let year = (tempDay.getFullYear()).toString();
                                        let month = "";
                                        let date = "";
                                        if(tempDay.getMonth() + 1 < 10){
                                            month = "0" + (tempDay.getMonth() + 1).toString(); // 小於10要在數字前面補0
                                        }
                                        else{
                                            month = (tempDay.getMonth() + 1).toString();
                                        }
                                        if(tempDay.getDate() < 10){
                                            date = "0" + (tempDay.getDate()).toString(); // 小於10要在數字前面補0
                                        }
                                        else{
                                            date = (tempDay.getDate()).toString();
                                        }
                                        tempDayString = year + "-" + month + "-" + date;
                                        dateArr.push(tempDayString);
                                        
                                        //console.log(tempDayString);
                                        //console.log(today.localeCompare(tempDayString));
                                    }
                                    let xhr = new XMLHttpRequest();
                                    xhr.open('post',targetURL,true);
                                    xhr.setRequestHeader('Content-type','application/json');
                                    
                                    let json = new Object();
                                    json.name = inputName.value;
                                    json.tel = inputPhone.value;
                                    json.date = dateArr;
                                    console.log(json);
                                    
                                    xhr.send(JSON.stringify(json));
                                    
                                }
                                else{
                                    alert("請確認欄位");
                                }
                            }
                            else {

                            }
                            //console.log(roomObject.booking[0].date);
                           
                            
                        })
                    }
                }
            })
            
        }
    }
}

function printAmenities() {
    let str = "";
    str = `<ul class="amenities first">
                <li id="Wi-Fi">
                    <i class="fas fa-wifi"></i>
                    Wi-Fi
                </li>
                <li id="Television">
                    <i class="fas fa-tv"></i>
                    電視
                </li>
                <li id="View">
                    <i class="fas fa-binoculars"></i>
                    漂亮的視野
                </li>
            </ul>
            <ul class="amenities second">
                <li id="Breakfast">
                    <i class="fas fa-utensils"></i>
                    早餐
                </li>
                <li id="AirCondition">
                    <i class="fas fa-fan"></i>
                    空調
                </li>
                <li id="Smoking">
                    <i class="fas fa-smoking-ban"></i>
                    禁止吸菸
                </li>
            </ul>
            <ul class="amenities third">
                <li id="MiniBar">
                    <i class="fas fa-glass-martini-alt"></i>
                    Mini Bar
                </li>
                <li id="Refrigeator">
                    <i class="fas fa-icicles"></i>
                    冰箱
                </li>
                <li id="Child">
                    <i class="fas fa-baby"></i>
                    適合兒童
                </li>
            </ul>
            <ul class="amenities forth">
                <li id="RoomService">
                    <i class="fas fa-concierge-bell"></i>
                    Room service
                </li>
                <li id="Sofa">
                    <i class="fas fa-couch"></i>
                    沙發
                </li>
                <li id="Pet">
                    <i class="fas fa-cat"></i>
                    寵物攜帶
                    </li>
            </ul>`
    return str;
}

function printForm(){
    let str = `
    
        <div class="container-form">
            <form class="needs-validation" novalidate>
                <div class="row">
                    <div class="col">
                        <div class="input-group">
                            <label for="validationCustomName">姓名</label>
                            <input type="text" class="form-control input-item" id="validationCustomName" placeholder="name" aria-describedby="inputGroupPrepend" required>
                                <div class="invalid-feedback">
                                    Please provide your name.
                                                                </div>
                                                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="input-group">
                                <label for="validationCustomName">電話</label>
                                <input type="text" class="form-control input-item" id="validationCustomPhone" placeholder="name" aria-describedby="inputGroupPrepend" required>
                                    <div class="invalid-feedback">
                                        Please provide your telphone.
                                                                </div>
                                                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="input-group">
                                    <label for="validationCustomTime">預約起迄</label>
                                    <input type="text" class="form-control input-item" id="validationCustomTime" placeholder="2020/XX/XX - 2020/XX/XX" aria-describedby="inputGroupPrepend" required>
                                        <div class="invalid-feedback">
                                            請選擇時間
                                                                </div>
                                                            </div>
                                </div>
                            </div>
                            <div class="normalAndHoliday">
                                <div class="show-normalDay">
                                    <span>平日時段</span>
                                    <span class="night">夜</span>
                                </div>
                                <div class="show-holiday">
                                    <span>假日時段</span>
                                    <span class="night">夜</span>
                                </div>
                            </div>
                            <p class="price">
                            </p>
                            <button class="btn btn-primary" id="submitButton" type="submit">確定預約</button>
                                                </form>
                    </div>`
                ;
            
        return str;
}

function addAmenitiesClass(attribute) {
    
    let amenitiesDOM = document.querySelectorAll(".amenities")
    
    /* 
        確認傳入的型別是否為物件

        iterate property through object
        Link : https://stackoverflow.com/questions/8312459/iterate-through-object-properties
    
        Check if a value is an object
        Link : https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
    */

    // 若為物件就iterate到object的每一個property
    if (typeof attribute === 'object' && attribute !== null) {
      let count = 0; // 紀錄object的property個數才可以計算index以處理li的class新增
      let i = 0; // amenitiesDOM index
      let j = 0; // li index in amenitiesDOM 
        for (var prop in attribute) {
            count++;
            i = Math.ceil(count / 3) - 1;
            j = count - 1 - (3 * i);
            if (Object.prototype.hasOwnProperty.call(attribute, prop)) {
                let item = amenitiesDOM[i].querySelectorAll("li");
                if (attribute[prop] === false) {
                    item[j].classList.add("false");
                }
            }
        }
    }
    else {
        return;
    }
    
}

function getID() {
    let pathname = window.location.pathname; // 得到有掛載這支js檔的html檔路徑
    let pathnameArr = Array.from(pathname); // 把string轉成Array來方便移除/room_跟.html
    pathnameArr.splice(0, 6); // 利用.splice()來remove 路徑開始的 /room_
    pathnameArr.splice(pathnameArr.length - 5, 5); // remove 路徑最後面的.html

    pathname = pathnameArr.toString(); // 把Array轉成String以移除逗號
    pathname = pathname.split(','); // 移除逗號後
    let id = ""; // 宣告id
    for (let i = 0; i < pathname.length; i++) {
        id += pathname[i]; // 透過串接substring來得到完整的id，這樣就可以串接URL
    }
    return id;
}

