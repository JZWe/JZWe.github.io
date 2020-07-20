// 選取DOM
const topdown = document.querySelector(".topdownList");
const hotArea = document.querySelector(".hotArea");

/*
const navPaging = document.querySelector(".nav-paging")

navPaging.addEventListener("click", function (e) {
    if (e.target.nodeName === "A") { // 若按鈕被點擊時，列表的值也要跟著變動
        alert(e.target.textContent.trim());
        if (e.target.textContent === "Previous" )
        {
            
        }
        if (e.target.textContent === "Next") {

        }
    }
});
*/


// 綁定事件
hotArea.addEventListener("click",function(e){
    if (e.target.nodeName === "BUTTON") { // 若按鈕被點擊時，列表的值也要跟著變動
        let zone = e.target.textContent; 
        update_areaInfo(zone);
        update_topdownList(zone); 
        
    }
});

topdown.addEventListener("change",function(e)
{
    let option = getOption(e); 
    update_areaInfo(e.target.value);
});


// 函式定義
function update_topdownList(str)
{
    for(let i= 1 ;i < topdown.length;i++)
    {
        if(topdown[i].textContent === str)
        {
            topdown.value = str;
        }
    }
}
function update_areaInfo(element)
{
    let length = data[0].result.records.length; // 陣列的長度
    let str1 = ""; // 儲存第一排col的innerHTML內容
    let str2 = ""; // 儲存第二排col的innerHTML內容
    
    // 需要更新資料時，選取col DOM
    const col = document.querySelectorAll(".col");// 有兩排col
    const zoneName = document.querySelector(".zoneName"); 
    
    // 把地區名稱assign給zoneName
    zoneName.textContent = element;

    // 把count初始為0
    let count = 0;
    let pageCount = 0;
   
    /*
    let thisAreaArray = [{}];
    */
    // 計算有多少資料跟點選的選項相同，
    for (var i = 0; i < length; i++) {

        // 從陣列元素中撈地區資訊，該地區的開放時間、地址、電話、是否免費參觀等資訊
        var records = data[0].result.records[i];
        var zone = records.Zone;
        var opentime = records.Opentime;
        var address = records.Add;
        var telphone = records.Tel;
        var name = records.Name;
        var info = records.Ticketinfo;
        var picture = records.Picture1;
        
        /*
        let tempData = {
            "records": records,
            "zone": zone,
            "opentime": opentime,
            "address": address,
            "telphone": telphone,
            "name": name,
            "info": info,
            "picture": picture
        };
        */
        // 若選取的選項與陣列元素的地區資訊相同，用字串紀錄資訊
        if (element === zone) {
            
            /*thisAreaArray.push(tempData)*/
            ++count; // element與zone的值相同時，增加count的值
            
             if (count % 2 === 1) // 儲存到第一排
            {
              str1 += '<div class="card"> '
                    + '<div class="card-img-top" style="background-image:url(' + picture + ')">'
                    + '<h2>' + name + '</h2>'
                    + '<h5>' + zone + '</h5>'
                    + '</div>'
                    + '<div class="card-body">'
                    + '<p class="open-time"><i class="far fa-clock"></i>' + opentime + '</p>'
                    + '<p class="address"><i class="fas fa-map-marker-alt"></i>' + address + '</p>'
                    + '<span class="telphone"><i class="fas fa-mobile-alt"></i>' + telphone + '</span>' 
                    + '<span class="info"><i class="fas fa-tag"></i><span>' + info + '</span></span>'
                    + '</div>'
                    + '</div>';
            }
            else // 儲存到第二排
            {
                 str2 += '<div class="card"> '
                    + '<div class="card-img-top" style="background-image:url(' + picture + ')">'
                    + '<h2>' + name + '</h2>'
                    + '<h5>' + zone + '</h5>'
                    + '</div>'
                    + '<div class="card-body">'
                    + '<p class="open-time"><i class="far fa-clock"></i>' + opentime + '</p>'
                    + '<p class="address"><i class="fas fa-map-marker-alt"></i>' + address + '</p>'
                    + '<div>'
                    + '<span class="telphone"><i class="fas fa-mobile-alt"></i>' + telphone + '</span>' 
                    + '<span class="info"><i class="fas fa-tag"></i><span>' + info + '</span></span>'
                    + '</div>'
                    + '</div>'
                    + '</div>';  
             }
             
         } 
         
     }
     /*
     pageCount = Math.ceil( (count / 8) ); // 一頁最多裝8個卡片
     
     
     for (let i = 0; i < pageCount; i++) {
         
        for(let j = 0 ; j < i * 8 ; j++){
            console.log(i);
        }
    }
     */
       
     col[0].innerHTML = str1;
     col[1].innerHTML = str2;
}

function getOption(e) {
    return e.target.value;
}
