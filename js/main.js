/* ===================================================================
 * Ceevee 2.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";
    
    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        document.addEventListener('DOMContentLoaded', function() {
            
            document.querySelector('body').classList.remove('ss-preload');
            document.querySelector('body').classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function(e) {
                if (e.target.matches("#preloader")) {
                    this.style.display = 'none';
                }
            });

        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Parallax
    * -------------------------------------------------- */
    const ssParallax = function() { 

        const rellax = new Rellax('.rellax');

    }; // end ssParallax


   /* Move header menu
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#hero');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function(){
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;
           

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });

    }; // end ssMoveHeader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const headerNavWrap = document.querySelector('.s-header__nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && headerNavWrap)) return;

        toggleButton.addEventListener('click', function(event){
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        headerNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(evt) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".s-header__nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".s-header__nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },          
            breakpoints: {
                // when window width is >= 401px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 801px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 48
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-item a');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let keydownHandler;
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    className: 'portfolio-lightbox',
                    onShow: function(instance) {
                        instance.element().querySelectorAll('img[data-src]').forEach(function(image) {
                            if (!image.getAttribute('src')) {
                                image.setAttribute('src', image.getAttribute('data-src'));
                            }
                        });

                        keydownHandler = function(evt) {
                            evt = evt || window.event;
                            if (evt.key === 'Escape' || evt.keyCode === 27) {
                                instance.close();
                            }
                        };

                        document.addEventListener("keydown", keydownHandler);
                    },

                    onClose: function() {
                        if (keydownHandler) {
                            document.removeEventListener("keydown", keydownHandler);
                            keydownHandler = null;
                        }
                    }
                }
            );

            let modalPopup = instance.element().querySelector('.modal-popup');
            let modalDetails = modalPopup && modalPopup.querySelector('.modal-popup__details');

            if (modalPopup && !modalPopup.querySelector('.modal-popup__actions')) {
                let modalActions = document.createElement('div');
                let closeButton = document.createElement('button');

                modalActions.className = 'modal-popup__actions';

                if (modalDetails) {
                    modalActions.appendChild(modalDetails);
                } else {
                    modalActions.classList.add('modal-popup__actions--close-only');
                }

                closeButton.className = 'modal-popup__close';
                closeButton.type = 'button';
                closeButton.setAttribute('aria-label', 'Close project details');
                closeButton.textContent = 'X';
                closeButton.addEventListener('click', function() {
                    instance.close();
                });

                modalActions.appendChild(closeButton);
                modalPopup.insertBefore(modalActions, modalPopup.firstChild);
            }

            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box) {

            box.addEventListener('click', function(e){
                if (e.target.matches(".alert-box__close")) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add("hideit");

                    setTimeout(function() {
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssSmoothScroll = function () {
        
        const triggers = document.querySelectorAll(".smoothscroll");

        triggers.forEach(function(trigger) {
            trigger.addEventListener("click", function() {
                const target = trigger.getAttribute("href");

                Jump(target, {
                    duration: 1200,
                });
            });
        });

    }; // end ssSmoothScroll


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop



   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssParallax();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();
})(document.documentElement);

/* Project filter tabs
 * ------------------------------------------------------
 * Items can belong to several categories (space-separated data-category).
 * "featured" is shown on load; "rnd" swaps the grid for the publications panel.
 */
(function ssProjectFilter() {
    const portfolio = document.querySelector('.s-portfolio');
    if (!portfolio) return;

    const filterButtons = portfolio.querySelectorAll('.filter-btn[data-category]');
    const folioList = portfolio.querySelector('.folio-list');
    const folioItems = portfolio.querySelectorAll('.folio-item');
    const rndList = portfolio.querySelector('.rnd-list');
    const defaultCategory = 'featured';
    let fadeTimeout;

    if (!filterButtons.length) return;

    function itemMatches(item, category) {
        if (category === 'all') return true;
        return (item.getAttribute('data-category') || '').split(/\s+/).indexOf(category) !== -1;
    }

    function applyFilter(category) {
        const showRnd = category === 'rnd';

        if (rndList) rndList.hidden = !showRnd;
        if (folioList) folioList.hidden = showRnd;

        folioItems.forEach(function(item) {
            item.style.display = itemMatches(item, category) ? '' : 'none';
        });

        filterButtons.forEach(function(button) {
            const isActive = button.getAttribute('data-category') === category;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const category = button.getAttribute('data-category');

            clearTimeout(fadeTimeout);
            portfolio.classList.add('is-filtering');

            fadeTimeout = setTimeout(function() {
                applyFilter(category);
                portfolio.classList.remove('is-filtering');
            }, 250);
        });
    });

    applyFilter(defaultCategory);
})();

/* Skill category tabs
 * ------------------------------------------------------
 * One category visible at a time; arrow keys / Home / End move between tabs.
 */
(function ssSkillTabs() {
    const tabs = Array.prototype.slice.call(document.querySelectorAll('.skill-tab'));
    const panels = document.querySelectorAll('.skill-group');

    if (!tabs.length) return;

    function selectTab(tab, moveFocus) {
        const target = tab.getAttribute('aria-controls');

        tabs.forEach(function(t) {
            const isActive = t === tab;
            t.classList.toggle('is-active', isActive);
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
            t.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(function(panel) {
            panel.hidden = panel.id !== target;
        });

        if (moveFocus) tab.focus();
    }

    tabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            selectTab(tab, false);
        });

        tab.addEventListener('keydown', function(e) {
            let next;

            if (e.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
            else if (e.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
            else if (e.key === 'Home') next = tabs[0];
            else if (e.key === 'End') next = tabs[tabs.length - 1];

            if (next) {
                e.preventDefault();
                selectTab(next, true);
            }
        });
    });
})();

const skillBubbles = document.querySelectorAll('.skill-bubble');
let skillsCelebration;
let skillsCelebrationTimeout;
let skillsCelebrationActive = false;

function ensureSkillsCelebration() {
    if (skillsCelebration) return skillsCelebration;

    skillsCelebration = document.createElement('div');
    skillsCelebration.className = 'skills-celebration';
    skillsCelebration.innerHTML = `
        <div class="skills-celebration__backdrop"></div>
        <div class="skills-celebration__confetti"></div>
        <div class="skills-celebration__message" role="status" aria-live="polite">
            <span class="skills-celebration__eyebrow">Skill Tree Complete</span>
            <strong>Congrats!</strong>
            <span>You clicked every skill.</span>
        </div>
    `;

    document.body.appendChild(skillsCelebration);
    return skillsCelebration;
}

function populateSkillsConfetti(container) {
    const colors = ['#f97316', '#fb7185', '#38bdf8', '#34d399', '#facc15', '#a78bfa'];

    container.innerHTML = '';

    for (let index = 0; index < 28; index += 1) {
        const piece = document.createElement('span');
        piece.className = 'skills-celebration__piece';
        piece.style.setProperty('--left', `${4 + (index * 3.4)}%`);
        piece.style.setProperty('--delay', `${(index % 7) * 0.08}s`);
        piece.style.setProperty('--duration', `${2.1 + ((index % 5) * 0.18)}s`);
        piece.style.setProperty('--rotate', `${-30 + ((index * 17) % 60)}deg`);
        piece.style.setProperty('--drift', `${-40 + ((index * 23) % 80)}px`);
        piece.style.setProperty('--color', colors[index % colors.length]);
        container.appendChild(piece);
    }
}

function triggerSkillsCelebration() {
    if (skillsCelebrationActive) return;

    const celebration = ensureSkillsCelebration();
    const confetti = celebration.querySelector('.skills-celebration__confetti');

    skillsCelebrationActive = true;
    populateSkillsConfetti(confetti);

    celebration.classList.remove('is-visible');
    void celebration.offsetWidth;
    celebration.classList.add('is-visible');

    clearTimeout(skillsCelebrationTimeout);
    skillsCelebrationTimeout = setTimeout(() => {
        celebration.classList.remove('is-visible');
        skillsCelebrationActive = false;
    }, 3200);
}

function maybeCelebrateSkills() {
    if (!skillBubbles.length) return;

    const allClicked = Array.from(skillBubbles).every((bubble) => {
        return bubble.classList.contains('clicked');
    });

    if (allClicked) {
        triggerSkillsCelebration();
    }
}

skillBubbles.forEach((bubble) => {
    bubble.addEventListener('click', () => {
        bubble.classList.toggle('clicked');
        maybeCelebrateSkills();
    });
});
