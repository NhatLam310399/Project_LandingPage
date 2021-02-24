const actMenubar = document.querySelector('.header__menu-bar');
const aniMenubar=document.querySelector('.menu-list');
actMenubar.addEventListener('click',function(e){
    e.stopPropagation();
    actMenubar.classList.toggle('active-bar')
    if(actMenubar.classList.contains('active-bar'))
    {
        aniMenubar.classList.add('act_menulist')
        actLang.style.visibility='hidden';
        actLang.style.opacity='0';
    }
    else{
        aniMenubar.classList.remove('act_menulist')
    }
})


//show language
const currentLang = document.querySelector('.header__lang .header__lang-current');
const actLang = document.querySelector('.header__lang-option');

currentLang.addEventListener('click',(e)=>{
    e.stopPropagation();
   if(actLang.classList.contains('act-lang'))
   {
        actLang.style.visibility='hidden';
        actLang.style.opacity='0';
   }
   else{
         actLang.style.visibility='visible';
         actLang.style.opacity='1';
   }
    actLang.classList.toggle('act-lang')
})
document.body.addEventListener('click',function(){
    actLang.style.visibility='hidden';
    actLang.style.opacity='0';
    actLang.classList.remove('act-lang');
    aniMenubar.classList.remove('act_menulist')
    actMenubar.classList.remove('active-bar')
})

//change content language
const listLang = actLang.querySelectorAll('a');

listLang.forEach((e,i) => {
    e.addEventListener('click',function(e){
        e.preventDefault();
        let text = this.innerText; //text to click
        let currentText = currentLang.querySelector('span');

        let temp = currentText.textContent;
        currentText.innerText = text;
        this.innerText = temp;
    })
});

//scroll change bg header
const sliderMain = document.querySelector('.slider');
const header = document.querySelector('.header');
window.addEventListener('scroll',function(){
    const scrollTop = document.querySelector('html').scrollTop;
   if(scrollTop > sliderMain.offsetHeight - header.offsetHeight)
   {
       header.style.background = "black";

   }
   else{
       header.style.background ="transparent";
   
   }
})

//back to stop
const btn_back= document.querySelector('.footer__back a');

btn_back.addEventListener('click', function(e){
    e.preventDefault();
    window.scrollBy({
        top: - document.body.offsetHeight,
        behavior: 'smooth'
    })
})

// play video
const btn_playVideo = document.querySelectorAll('.quality__video-item>div')
const btn_close = document.querySelector('.close')
let iframeVideo = document.getElementById('ifrVideo')

btn_playVideo.forEach((e)=>{
    e.addEventListener('click',function (e){

        let srcVideo = this.getAttribute('data-src')
        console.log(srcVideo)
        iframeVideo.src='https://www.youtube.com/embed/'+ srcVideo;
        document.querySelector('.showVideo').style.display='flex'
    })
})

btn_close.addEventListener('click',()=>{
    document.querySelector('.showVideo').style.display='none'
    iframeVideo.src=''
})




//scroll 
let $menu = $('.header__menu>ul>li>a')

function scrollActMenu(strSelector){
    let topProduct =  $(strSelector).position().top - 120;
   let heightProduct = $(strSelector).outerHeight();
   let scrolltop = $(window).scrollTop();

  if(scrolltop > topProduct && scrolltop < topProduct+heightProduct )
  {
    $menu.filter("[data-section='"+strSelector+"']").addClass('act__section')
  }else{
    $menu.filter("[data-section='"+strSelector+"']").removeClass('act__section')
  }
}

let setionArr=[]

for(let i = 0; i<$menu.length; i++)
{
    let s = $menu[i].getAttribute('data-section')

    setionArr.push(s)
}

$(window).on('scroll',function(){

    for(let i=0; i< setionArr.length; i++)
    {
        scrollActMenu(setionArr[i]);
    }

})

//hover menu
// let subMenu = $('.sub__menu a')
// subMenu.hover(function(){
//     $(this).addClass('active-sub').siblings().removeClass('active-sub')
// },function(){
//     subMenu.removeClass('active-sub')
// })

//photoSwipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM('.item__gallery');
   

});

//slider
//slider
let $sliderItem = $('.slider__item')
let $pre_slider = $('.slider__btn .--pre')
let $next_slider = $('.slider__btn .--next')
let $number_slider= $('.number h3')
let $dot = $('.dotted').find("li")


let currentSlider = 0;
// pre_slider.addEventListener('click',function(){
//     if(currentSlider-1 < 0)
//     {
//         slidersTo(sliderItem.length-1);
//     }else{
//        slidersTo(currentSlider-1)

//     }
// })
function slidersTo(to){
        sliderItem[currentSlider].classList.remove('active-slider')
        sliderItem[to].classList.add('active-slider')
        dot[currentSlider].classList.remove('act-dot');
        dot[to].classList.add('act-dot')
        currentSlider = to;
        numbers(currentSlider);

}
function numbers(num){
    if(num < 10)
    {
        number_slider.innerText = (num + 1).toString().padStart(2,'0')
    }
    else
    {
       number_slider.innerText= num+1;
    }
}
// next_slider.addEventListener('click',function(){
//     if(currentSlider+1 > sliderItem.length-1)
//     {
//         slidersTo(0)
//     }
//     else{
//        slidersTo(currentSlider+1);
//     }
    
// })

// dot.forEach((e,i)=>{
//     e.addEventListener('click',function(){
//         slidersTo(i)
//     })
// })

//flickity
$('.slider__list').flickity({
    // options
    wrapAround: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    fullscreen: true,
    lazyLoad: true
  });
  $('.slider__list').on( 'change.flickity', function( event, index ) {
    var numStart = '0';
    if(index < 10)
    { 
        $number_slider.text(numStart + (index + 1));
    }
    
  });
  var flkty = $('.slider__list').data('flickity');
  // previous
$('.fl-pre').on( 'click', function() {
    $('.slider__list').flickity('previous');
    console.log("pre")
  });
  // next
  $('.fl-next').on( 'click', function() {
    $('.slider__list').flickity('next');
    console.log("next")
  });

  $('.slider__list').on( 'select.flickity', function() {
   $dot.filter('.is-selected')
      .removeClass('is-selected');
    $dot.filter('.act-dot')
      .removeClass('act-dot');
   $dot.eq( flkty.selectedIndex )
      .addClass('is-selected');
     $dot.eq( flkty.selectedIndex )
      .addClass('act-dot');
  });

  $dot.on( 'click', function() {
    var index = $(this).index();
    console.log(index)
    $('.slider__list').flickity( 'select', index );
  });
// $pre_slider.onclick(function(){
//     console.log('click')
// })
$('.carsoul').flickity({
    // options
    wrapAround: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    autoPlay: 1500,
    pauseAutoPlayOnHover: false,
    fullscreen: true,
    lazyLoad: true,
    // freeScrollAttraction: 0.03,

    // selectedAttraction: 0.01,
    friction: 1
    // groupCells: '100%'
  });
