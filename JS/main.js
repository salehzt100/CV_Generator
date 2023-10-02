/*===========  SHOW MENU    ===========*/

const showMenu = (toggleId, navId) => {

    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (nav && toggle) {
        toggle.addEventListener('click', () => {

            nav.classList.toggle('show__menu')
        })
    }

}
showMenu('nav-toggle', 'nav-menu');


/*===========  REMOVE MENU MOBILE   ===========*/

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {

    const navMenu = document.getElementById('nav-menu');


    navMenu.classList.remove('show__menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction))


/*

//======== SCROLL SECTIONS ACTIVE LINK
const sections = document.queryselectorAll('section[id]')

function scrollActive() {
    const scrolly = window.pageYoffset;
    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrolly <= sectionTop + sectionHeight) {
            document.querySelector('.nav_menu a[href*_' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')

        }

    });
}
window.addEventListener('scroll', scrollActive);
*/


/*===========  show  scroll top    ===========*/

function scrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    if (this.scrollY >= 200) {
        scrollTop.classList.add('show__scroll');
    } else {
        scrollTop.classList.remove('show__scroll');
    }
}

window.addEventListener('scroll', scrollTop);


/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-sun' : 'bxs-moon'


// We validate if the user previously chose a topic
if (selectedTheme) {
    let resume = document.getElementsByClassName('resume');
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    resume[0].classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-sun' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/

function scaleCV() {
    document.body.classList.add('scale-cv')
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
function removeScaleCV() {
    document.body.classList.remove('scale-cv')
}

/*==================== GENERATE PDF  ====================*/

// Html2pdf options
let opt = {
    margin: 0,
    filename: 'myResume.pdf',
    image:       {type: 'jpeg', quality: 0.98},
    htm12canvas: {scale: 6},
    jsPDF:       {format: 'a4', orientation: 'portrait'}
}

// PDF generated area
let areaCV = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// Function to call areaCv and Htm12Pdf options

function generateResume() {
    html2pdf(areaCV,opt);
}


// When the button is clicked, it executes the three functions
/*
resumeButton.addEventListener('click', () => {

    scaleCV();

    generateResume();

    setTimeout(removeScaleCV,3000);

})*/

window.onload = function () {
    document.getElementById("resume-button")
        .addEventListener("click", () => {
            scaleCV();

            const invoice = this.document.getElementById("area-cv");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 1,
                filename: 'MyResume.pdf',
                image: {type: 'jpeg', quality: 0.98},
                html2canvas: {scale: 2},
                jsPDF: {format: 'a4', orientation: 'portrait'}
            };
            html2pdf().from(invoice).set(opt).save();
        })

    setTimeout(removeScaleCV,3000);
}


document.addEventListener("DOMContentLoaded", function () {
    // Your code here
    const photoPreview = document.getElementById("userImg");
    const photoPreviewResume = document.getElementById("home__img");
    const photoInput = document.getElementById("input-user-img");
    const home = document.getElementById('home');

    // Function to handle file input change
    function handleFileInputChange(event) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            // Display the image preview and adjust the layout
            photoPreviewResume.classList.remove('nonDisplay_img');
            home.classList.remove('padding');

            // Use FileReader to set the src attribute of the img element

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageSrc = e.target.result;
                photoPreview.src = imageSrc;
                photoPreviewResume.src = imageSrc;

                // Save the image source to local storage
                localStorage.setItem('uploadedImageSrc', imageSrc);
            };
            reader.readAsDataURL(file);
        }
    }


    const delete_img = document.getElementById('delete__img');


    delete_img.addEventListener('click', () => {
        const uploadedImageSrc = localStorage.getItem('uploadedImageSrc');
        if (photoPreview && uploadedImageSrc) {
            localStorage.setItem('uploadedImageSrc', '');
            photoPreview.src = 'assets/images/user.jpg';
            photoPreviewResume.src = '';
            photoPreviewResume.classList.add('nonDisplay_img');
            home.classList.add('padding');
        }


    })


    // Add an event listener to the input element
    photoInput.addEventListener("change", handleFileInputChange);

    // Load image source from local storage on page load
    window.addEventListener("load", () => {
        const uploadedImageSrc = localStorage.getItem('uploadedImageSrc');
        if (uploadedImageSrc) {
            photoPreview.src = uploadedImageSrc;
            photoPreviewResume.src = uploadedImageSrc;
            photoPreviewResume.classList.remove('nonDisplay_img');
            home.classList.remove('padding');
        } else {
            photoPreview.src = 'assets/images/user.jpg';
            photoPreviewResume.src = '';
            photoPreviewResume.classList.add('nonDisplay_img');
            home.classList.add('padding');
        }
    });


});


/*==================== show list   ====================*/

const forms = document.getElementsByClassName('form__content');
const listButton = document.getElementsByClassName('show__list');
const listIcons = document.getElementsByClassName('list__icon');


for (let i = 0; i < listIcons.length; i++) {

    listButton[i].addEventListener('click', () => {
        listIcons[i].classList.toggle('bx-chevron-down');
        listIcons[i].classList.toggle('bx-chevron-up');


        forms[i].classList.toggle('visibleForm');

    });
}


const inputs = document.querySelectorAll("input");
const textarea = document.querySelectorAll("textarea");

// Saving input values to localStorage on 'input' event
inputs.forEach((n) => {
    n.addEventListener("input", () => {
        localStorage.setItem(n.id, n.value);
    });
});
// Retrieving and populating input values from localStorage on 'load' event
window.addEventListener("load", () => {
    inputs.forEach((n) => {
        if (n.type !== "file") {
            n.value = localStorage.getItem(n.id);
        }
    });
});

window.addEventListener("load", () => {
    inputs.forEach(n => () => {

        localStorage.setItem(n.id, n.value);
    });

});


// Saving input values to localStorage on 'text area' event
textarea.forEach((n) => {
    n.addEventListener("input", () => {
        localStorage.setItem(n.id, n.value);
    });
});

window.addEventListener('load', () => {

    textarea.forEach(n => () => {

        localStorage.setItem(n.id, n.value);


    });

});


// Retrieving and populating textarea values from localStorage on 'load' event
window.addEventListener("load", () => {
    textarea.forEach((n) => {
        n.value = localStorage.getItem(n.id);
    });
});


/*==================== display data inputs   ====================*/


const textInputs = document.querySelectorAll('input[type="text"]');
const textArea = document.querySelectorAll('textarea');
const link_inputs = document.querySelectorAll('input[type="url"]');
const emailInputs = document.querySelectorAll('input[type="email"]');
const phoneInputs = document.querySelectorAll('input[type="tel"]');


// ========================        link    ====================

link_inputs.forEach((input) => {
    input.addEventListener('keyup', (event) => {
        const inputId = event.target.id;
        const iconId=inputId.toLocaleString();
        const iconElement = document.getElementsByClassName(iconId);
        iconElement[0].href = storedValue;

    });
});

window.addEventListener("load", () => {

    link_inputs.forEach((input) => {
        const inputId = input.id;
        const iconId = inputId.toLowerCase();

        const storedValue = localStorage.getItem(inputId);

        if (storedValue) {
            const iconElement = document.getElementsByClassName(iconId);

            if (iconElement) {
                iconElement[0].href = storedValue;
            } else {
                console.warn(`Element with id '${iconId}' not found.`);
            }
        }
    });
});


// ========================        textarea    ====================
textArea.forEach((input) => {
    input.addEventListener('keyup', (event) => {
        const inputId = event.target.id;
        const inputValue = event.target.value;
        document.getElementById(`${inputId}-display`).innerText = inputValue;
    });
});

window.addEventListener("load", () => {
    textArea.forEach((input) => {
        const inputId = input.id;
        const inputValue = input.value;

        // Debugging: Log inputId and check if the element exists
        const element = document.getElementById(`${inputId}-display`);

        if (element) {
            element.innerText = inputValue;
        }
    });
});

// ========================        text    ====================

textInputs.forEach((input) => {
    input.addEventListener('keyup', (event) => {
        const inputId = event.target.id;
        const inputValue = event.target.value;

        document.getElementById(`${inputId}-display`).innerText = inputValue;
    });
});


window.addEventListener("load", () => {
    textInputs.forEach((input) => {
        const inputId = input.id;
        const inputValue = input.value;
        const displayElement = document.getElementById(`${inputId}-display`);

        if (displayElement) {
            displayElement.innerText = inputValue;
        }
    });
});


// =========    ====================


phoneInputs.forEach((input) => {
    input.addEventListener('keyup', (event) => {
        const inputId = event.target.id;
        const inputValue = event.target.value;
        document.getElementById(`${inputId}-display`).innerText = inputValue;
    });
});

window.addEventListener("load", () => {

    phoneInputs.forEach((input) => {
        const inputId = input.id;
        const inputValue = input.value;
        document.getElementById(`${inputId}-display`).innerText = inputValue;
    });
});


// ========================        email    ====================


emailInputs.forEach((input) => {
    input.addEventListener('keyup', (event) => {
        const inputId = event.target.id;
        const inputValue = event.target.value;
        document.getElementById(`${inputId}-display`).innerText = inputValue;
    });
});


window.addEventListener("load", () => {


    emailInputs.forEach((input) => {
        const inputId = input.id;
        const inputValue = input.value;
        document.getElementById(`${inputId}-display`).innerText = inputValue;
    });
});


/*


const skillsList = document.querySelector(".skills__data");

const liElements = skillsList.querySelectorAll("li.skill__name");


// Select the form element with class "skill-inputs"
const skillInputsForm = document.querySelector(".skill-inputs");

// Select all elements with class "section__item" within the form
const sectionItemElements = skillInputsForm.querySelectorAll(".section__item");


*/


document.addEventListener('DOMContentLoaded', function () {
    const circle_value = document.getElementsByClassName('circle-value');
    const circle = document.getElementsByClassName("circle");


    for (let i = 0; i < circle_value.length; i++) {
        let element = circle_value[i];
        let key = element.id.replace(/-display$/, '');


        if (localStorage.getItem(key)) {

            circle[i].classList.add('show__circle');

        } else if(circle_value[i].classList.contains('show__circle')) {

            circle[i].classList.remove('show__circle');
        }
    }

    const link_value = document.getElementsByClassName('link_value');
    const link_icon = document.getElementsByClassName("icon_link");

    for (let i = 0; i < link_value.length; i++) {
        let element = link_value[i];
        let key = element.id.replace(/-display$/, '');


        console.log(i, localStorage.getItem(key))
        if (localStorage.getItem(key)) {
            localStorage.getItem(key);

            link_icon[i].classList.add('show_link')
            console.log(link_icon[i].classList)
        }
    }


});


const LinkedIn_link=document.getElementById('LinkedIn_link');


