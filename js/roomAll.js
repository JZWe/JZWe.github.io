/* 版型來源：https://quebec87.github.io/hotel_reservation */


const rooms = document.querySelector('.rooms');
const container = document.querySelector('.container-custom');
const roomList = document.querySelector('.container-custom li')
const swiperWrapper = document.querySelector('.swiper-wrapper');






window.onload = function(){
    getAllRooms();
}

function getAllRooms(){
    
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms');
    xhr.setRequestHeader('authorization', 'Bearer i5F3RYoJziMTyM7M8cvlywOX1KPgRPJzbHsb5uj0Vew1iwggDsCzWmXg5bv2');
    xhr.send(null);

   
    xhr.onload = function(){
        let object = JSON.parse(xhr.responseText);
        if(object.success === true){
            roomArray = object.items;
            let str = '';
            let str2 = '';
            
            for(let i=0;i<roomArray.length;i++){
                let holidayPrice = roomArray[i].holidayPrice;
                let id = roomArray[i].id;
                let imageUrl = roomArray[i].imageUrl;
                let name = roomArray[i].name;
                let normalDayPrice = roomArray[i].normalDayPrice;
                str += `<li data-id="${roomArray[i].id}">
                            <a class="card" href="room_${roomArray[i].id}.html">
                                <img src="${imageUrl}" class="img-fluid" >
                                </div>
                                <div class="card-textBlock">
                                  <h5 class="card-title">${name}</h5>
                                  <p class="card-text price">
                                    <span>
                                        NT.${normalDayPrice}
                                        <span class="small">Weekday</span>
                                    </span>
                                    <span>
                                        NT.${holidayPrice}
                                        <span class="small">Weekday</span>
                                    </span>
                                    
                                    
                                  </p>
                                </div>
                            </a>
                        </li>
                        `
                str2 += `<div class="swiper-slide" style="background-image:url(${imageUrl})"></div>`
                console.log(str);
            }
            container.innerHTML = str;
            swiperWrapper.innerHTML = str2;
        }
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            effect: 'fade',
            autoplay:{
                delay:5000,
                disableOnInteraction:true
            },
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}


