document.addEventListener('DOMContentLoaded', function(){
    
    function getElement(element){
        return document.querySelector(element);
    }
    function getElements(elements){
        return document.querySelectorAll(elements);
    }

    // SLIDER STUFF
    /*****************************************/
    const slidersParentContainer = getElement('.hero_section_slider')
    slidersWrapper = getElement('.sliders_wrapper'),
    slides = getElements('.slide'),
    controls = getElement('.hero_slider_controls'),
    sliderProgress = getElement('.slider_progress'),
    startIndex = 0,
    timeInterval = 5000
    let timeOut = setInterval(resetInterval, timeInterval);

    // set the width of the slides parent wrapper
    function setParentWrapperWidth(){
    slides.forEach(slide => slide.style.width = slidersParentContainer.clientWidth+'px');
    //slidersWrapper.style.width = (slides.length - 1 * slides[0].clientWidth)+'px';
    }
    window.addEventListener('resize', setParentWrapperWidth);
    setParentWrapperWidth();

    Object.keys(slides).forEach(key => {
    controls.innerHTML += `<div class="slide_control" data-target="${key}"></div>`
    })
    const slideControls = getElements('.slide_control');

    slideControls[0].classList.add('active');

    Object.keys(slideControls).forEach((key) => {
        slideControls[key].addEventListener('click', () => {
        startIndex = key;

        resetSliderControls();
        slide(key);
        })
    })

    function resetSliderControls(){
        sliderProgress.style.width = '0px';
        slideControls.forEach(slide => {
        if(slide.classList.contains('active')) slide.classList.remove('active');
        })
    }

    function slide(key){
    clearInterval(timeOut);
    timeOut = setInterval(resetInterval, timeInterval);

    resetSliderControls();
    slideControls[key].classList.add('active');
    let targetSlide = parseInt(slideControls[startIndex].getAttribute('data-target'));
    slidersWrapper.style.transform = 'translateX('+(-slides[0].clientWidth * targetSlide)+'px)';    
    }

    function resetInterval(){
    startIndex++;
    if(startIndex > slides.length - 1){
    startIndex = 0
    }
    slide(startIndex);
    }

    // const progressInterval = setInterval(() => {
    //     let startProgress = 0;
    //     startProgress++;
    //     console.log(startProgress)
    //     sliderProgress.style.width = ((startProgress/timeInterval) * 100)+'%';
    // }, 1);
    /*****************************************/


    /********************CARDS STUFF *************************** */
        const options = { threshold: 0.2 };
        const observer = new IntersectionObserver(checkInterSection, options);
        
        const cards = document.querySelectorAll('.card');
        
        function checkInterSection(entries){
            entries.forEach((entry, index) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('animate__animated','animate__slideInUp');
                    entry.target.style.visibility = 'visible';
                }
            })
        }

        cards.forEach((card) => {
            observer.observe(card);
        })
    

    // MAP STUFF
    // center the map to TZ to bring our East african markers to view
    var mymap = L.map('mapid').setView([-2.5123, 28.8480], 6);

    // array of locations
    const locations = [
        {imageSrc: "https://traverseafrika.com/wp-content/uploads/2019/08/cheetah-in-the-masai-mara.jpg", locationName: 'Maasai Mara national park', coordinates:[-1.3719, 34.9381]},
        {imageSrc: "https://traverseafrika.com/wp-content/uploads/2019/08/serengeti.jpg", locationName: 'Serengeti national park', coordinates:[-1.8936, 34.6857]},
        {imageSrc: "https://traverseafrika.com/wp-content/uploads/2019/08/amboseli1-1.jpg", locationName: 'Amboseli national park', coordinates:[-2.6527, 37.2606]},
        {imageSrc: "http://traverseafrika.com/wp-content/themes/wild-safari-lite/images/slides/slider-default.jpg", locationName: 'Lake Mburo National Park', coordinates:[0.5805, 30.9919]},
        {imageSrc: "https://traverseafrika.com/wp-content/uploads/2019/08/UHURU-1.jpg", locationName: 'Mt Kilimanjaro', coordinates: [-3.0674, 37.3556]},
        {imageSrc: "https://traverseafrika.com/wp-content/uploads/2019/08/Mount-Kenya-Climb-via-Sirimon-and-Naro-Moru-Route.jpg", locationName: 'Mt Kenya', coordinates: [-0.1521, 37.3084]}
    ]

    // set markers and popups for each of the locations
    locations.forEach((location, index) => {
        L.marker(location.coordinates).addTo(mymap);
        let marker = L.marker(location.coordinates).addTo(mymap);
        marker
            .bindPopup(`<div class='popup_content'>
                            <img src="${location.imageSrc}" alt="" />
                            <p>${location.locationName}</p>
                        </div>`)
            .openPopup();
    })

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hhcmxlc2RldjI1NCIsImEiOiJja2hycmN6cWMwNmY3MnFwaWF4bXN2b3NkIn0.KDgdX8xlRU8C7vG5ZF8lPw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hhcmxlc2RldjI1NCIsImEiOiJja2hycmN6cWMwNmY3MnFwaWF4bXN2b3NkIn0.KDgdX8xlRU8C7vG5ZF8lPw'
    }).addTo(mymap);

})
