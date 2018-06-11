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
            // adding script by shu

            //calling meta data by CMS API
            var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "https://bcov-cms-api-test.herokuapp.com/videos?apiKey=46752ba1e6fa44348761&tag=test&limit=4", true);
                xhttp.onload = function () { 
                var response = JSON.parse(xhttp.responseText); 
                    for(var i=0; i<4; i++){
                     document.getElementById("image"+i).src = response[i].images.thumbnail.src;
                     
                    }

                };
                xhttp.send();


            //Countdown timer from here
            setInterval(countDown,1000);
            function countDown(){

                var sec = document.getElementById("timer").innerHTML;
                if(sec == 0){
                    // location.href="";
                }else{
                    sec -= 1;
                    document.getElementById("timer").innerHTML = sec;
                }
            }
            //Countdown timer to here


            //send request to hapyak plugin

            function execRequest(action, method, data) {
                var form = document.createElement("form");
                form.setAttribute("", action); 
                form.setAttribute("post", method); 
                form.style.display = "none";
                document.body.appendChild(form);
                if (data !== undefined) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('videoid', 'name'); //「name」は適切な名前に変更する。
                    input.setAttribute('value', data);
                    form.appendChild(input);
                }
                form.submit();
            }




            if (library.mode === 'edit') {
                return;
            }

            if (inEditor) {
                setup();
            }
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
            setupToggle();

            if (didSetup) {
                return;
            }

            didSetup = true;
            $('#widget-body, #view-container').toggleClass('active', true);
            hapyak.context.player.addClass('hapyak-annotation-full-frame');
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
