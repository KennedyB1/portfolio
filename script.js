function initComparisons() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
    }
    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        /*get the width and height of the img element*/
        w = img.offsetWidth;
        h = img.offsetHeight;
        /*set the width of the img element to 50%:*/
        img.style.width = (w / 2) + "px";
        /*create slider:*/
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /*insert slider*/
        img.parentElement.insertBefore(slider, img);
        /*position the slider in the middle:*/
        slider.style.top = '50%'
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

        animateSliderOnLoad(slider, img, w);

        /*execute a function when the mouse button is pressed:*/
        slider.addEventListener("mousedown", slideReady);
        /*and another function when the mouse button is released:*/
        window.addEventListener("mouseup", slideFinish);
        /*or touched (for touch screens:*/
        slider.addEventListener("touchstart", slideReady);
        /*and released (for touch screens:*/
        window.addEventListener("touchend", slideFinish);
        function slideReady(e) {
            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*the slider is now clicked and ready to move:*/
            clicked = 1;
            /*execute a function when the slider is moved:*/
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            /*the slider is no longer clicked:*/
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            /*if the slider is no longer clicked, exit this function:*/
            if (clicked == 0) return false;
            /*get the cursor's x position:*/
            pos = getCursorPos(e)
            /*prevent the slider from being positioned outside the image:*/
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            /*execute a function that will resize the overlay image according to the cursor:*/
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            /*get the x positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x coordinate, relative to the image:*/
            x = e.pageX - a.left;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            /*resize the image:*/
            img.style.width = x + "px";
            /*position the slider: adjust here to ensure the full slider moves */
            slider.style.left = x - (slider.offsetWidth / 2) + "px";
        }
    }

    function animateSliderOnLoad(slider, img, width) {
        let startPos = width / 2;
        let endPos = startPos + 250; // adjust the distance as needed
        let currentPosition = startPos;
        let direction = 1; // 1 for right, -1 for left
        let speed = 2; // adjust the speed as needed

        function moveSlider() {
            if ((direction === 1 && currentPosition >= endPos) || (direction === -1 && currentPosition <= startPos)) {
                direction *= -1;
            }
            currentPosition += speed * direction;

            // Adjusting the slider position
            slider.style.left = currentPosition - (slider.offsetWidth / 2) + "px";

            // Updating the width of the overlay image
            img.style.width = currentPosition + "px";

            if (currentPosition !== startPos) {
                requestAnimationFrame(moveSlider);
            }
        }

        requestAnimationFrame(moveSlider);
    }

}

// Array of image file names
var images = ["Logo/1.png", "Logo/2.png", "Logo/3.png", "Logo/4.png", "Logo/5.png", "Logo/6.png", "Logo/7.png"];
var counter = 0;

function swapImage() {
    var img = document.getElementById("myImage");

    // Fade-out effect
    img.style.opacity = 0;

    setTimeout(function () {
        // Change the image source after fade-out
        img.src = images[counter];

        // Fade-in effect
        img.style.opacity = 1;
    }, 500); // Wait for 0.5 seconds (duration of fade-out transition)

    counter++;
    if (counter >= images.length) {
        counter = 0;
    }
}

setInterval(swapImage, 3000);


//////////////////////////////

function expandContent(element) {
    const expandedContent = document.createElement('div');
    expandedContent.classList.add('expanded-content');
    expandedContent.innerHTML = `
    <div class="close-button" onclick="closeExpandedContent()">
                &#10006;
            </div>
        <div class="content">
            ${element.querySelector('.content-pop').innerHTML}
            
        </div>
    `;
    document.body.appendChild(expandedContent);

    const contentHome = expandedContent.querySelector('.content-home');


    if (contentHome) {
        contentHome.classList.add('hidden');
    }
}



function closeExpandedContent() {
    const expandedContent = document.querySelector('.expanded-content');
    expandedContent.remove();

    // Show the content-home element
    const contentHome = document.querySelector('.content-home');
    contentHome.classList.remove('hidden');
}






function copyEmail() {
    var email = 'vindahl.simon@gmail.com';
    navigator.clipboard.writeText(email);
    var icon = document.createElement('span');
    icon.className = 'copied-icon';
    icon.textContent = 'Copied!';
    document.getElementById('email').appendChild(icon);
    setTimeout(function () {
        icon.remove();
    }, 2000);
}


