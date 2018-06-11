/*globals hapyak */
'use strict';

(function () {
    var didSetup = false,
        inEditor = false,
        widgetData = null,
        library = null,
        init = function mainSetup (isEditMode, data) {
            widgetData = data;
            inEditor = library.mode === 'view' &&  hapyak.widget.player.isEditMode;
            hapyak.widget.set('customClasses', 'hapyak-annotation-full-frame');

            //calling meta data by CMS API
            var xhttp = new XMLHttpRequest();
            var videoId = [];

            xhttp.open("POST", "http://microservice-feature.hapyak.com/api/brightcoveUpload/videos?tags=test&limit=4", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhttp.onload = function () 
                { 
                    if(xhttp.readyState === 4 && xhttp.status === 200) 
                    {
                        var response = JSON.parse(xhttp.responseText); 
                        for(var i=0; i<4; i++)
                        {
                         document.getElementById("image"+i).src = response[i].images.thumbnail.src;
                         document.getElementById("title"+i).innerHTML = response[i].name;                       
                         videoId[i]= response[i].id;
                         getVideoId(i);
                        }
                    }
                    
                };
            xhttp.send('apiKey=46752ba1e6fa44348761');


            //sending videoId data to hapyak plugin
            function getVideoId(imgNum){
                document.getElementById('image'+imgNum).addEventListener('click', function(){
                    var Id = videoId[imgNum];
                    window.top.postMessage(JSON.stringify({
                        context: "hapyak-end-card",
                        videoId: Id
                    }), "*");
                }, false);
            }

            //Countdown timer from here
            setInterval(countDown,1000);
            function countDown(){

                var sec = document.getElementById("timer").innerHTML;
                if(sec == 0){

                }else{
                    sec -= 1;
                    document.getElementById("timer").innerHTML = sec;
                }
            }


            //get current video id
            // function getCurrentId(){
            //     var vTag = document.getElementsByTagName('video')[0];
            //     vTag.on('loadstart', function(){
            //         currentId = mediainfo.id;
            //         return;
            //     })
            // }

            if (library.mode === 'edit') {
                return;
            }

            setup();
        },
        EndcardNum = function (){
            if (library && library.config) 
            {
            var selectedIcon = hapyak.widget.library.utils.dotget(hapyak.widget.library, 'config.formPosition.value');
            }
           return selectedIcon;
        },
        setupToggle = function mainSetupToggle () {
            // Toggle for editing/viewing in hy edit mode
            var toggleBtn = document.getElementById('change-mode'),
                isEditMode = hapyak.widget.player.isEditMode;

            if (toggleBtn) {
                toggleBtn.style.display = isEditMode && library.mode === 'view' ? 'block' : 'none';
                toggleBtn.addEventListener('click', library.utils.reload, false);
            }
        },
        setup = function mainSetup () {
            library = hapyak.widget.library;
            setupToggle();
            if (library && library.config) {
                EndcardNum();
            }
            if (didSetup) {
                return;
            }

            didSetup = true;
            $('#widget-body, #view-container').toggleClass('active', true);
            hapyak.context.player.addClass('hapyak-annotation-full-frame');
            setEndNum();
        },
        setEndNum =function setEndcardNum(){

                if(EndcardNum() == 1)
                {
                    $('#title0').show();
                    $('#image0').show();
                    $('#title1').hide();
                    $('#image1').hide();
                    $('#title2').hide();
                    $('#image2').hide();
                    $('#title3').hide();
                    $('#image3').hide();
                }
                else if(EndcardNum() == 2)
                {
                    $('#title0').show();
                    $('#image0').show();
                    $('#title1').show();
                    $('#image1').show();
                    $('#title2').hide();
                    $('#image2').hide();
                    $('#title3').hide();
                    $('#image3').hide();
                }
                else if(EndcardNum() == 3)
                {
                    $('#title0').show();
                    $('#image0').show();
                    $('#title1').show();
                    $('#image1').show();
                    $('#title2').show();
                    $('#image2').show();
                    $('#title3').hide();
                    $('#image3').hide();
                }
                else if(EndcardNum() == 4)
                {
                    $('#title0').show();
                    $('#image0').show();
                    $('#title1').show();
                    $('#image1').show();
                    $('#title2').show();
                    $('#image2').show();
                    $('#title3').show();
                    $('#image3').show();
                }

            
        },
        customLoad = function customLoadWhenReady() {
            /*
                Required to init widget load for both editor and viewer.
                Widgets may require unique events to occur before load, so this logic
                is executed on a per widget basis.
            */
            library = hapyak && hapyak.widget && hapyak.widget.library || {};
            library.utils.startLoad();


        };

    hapyak.widget.library.utils.onWidgetLoad(init);
    hapyak.context.addEventListener('annotationload', customLoad, false);
}());
