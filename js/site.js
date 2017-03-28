// ----------------------- INITIALIZE ------------------------ //

// Initialize collapse button
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();

// Blow up image on screen
$(document).ready(function () {
    $('.materialboxed').materialbox();
});

// ----------------------- SECTION ONE ----------------------- //

// Zoom down to section two after clicking on bouncing down arrow
$(".section-two-zoom").click(function () {
    $('html, body').animate({
        scrollTop: $(".section-two").offset().top
    }, 750);
});


// ----------------------- SECTION TWO ----------------------- //

/* 
    icon - string - holds the path to the icon referenced
    header - string - holds the header for the category
    description - string - holds the description for the category
    img - string - holds the image path
    btn - string - holds the href that the learn more button should refer to
    color - string - color theme of that category. Should be taken from the image. Used for hr and button colors
*/
var Category = (function () {
    var globalId = 0;

    return function Category(icon, header, description, img, btn, color) {
        this.id = globalId++;
        this.icon = icon;
        this.header = header;
        this.description = description;
        this.img = img;
        this.btn = btn;
        this.color = color;
    }

})();

// Holds all the categories for section 2
var categories = [
    new Category('add', 'Automated Brilliance', 'Mesh integrates with your institution to automate the creation of communities that already exist naturally, whether it be a class, club, team, or department, Mesh does the heavy lifting and creates communities for you.', '../img/automated-brilliance.png', '#', '#154A87'),
    new Category('perm_identity', 'Real Time Collaboration', 'Vestibulum vel lorem dapibus, tristique nulla et, rhoncus justo. Nunc vitae maximus ante. Pellentesque ornare sem mauris, porttitor pharetra erat placerat quis. Nunc ornare dignissim facilisis. Vestibulum a nulla laoreet.', '../img/realtime-collaboration.png', '#', '#051E36'),
    new Category('info_outline', 'A new age in safety.', 'Fusce pharetra semper mi, vitae auctor turpis finibus eu. Suspendisse tempus condimentum elit. Vestibulum luctus est a tortor porttitor, a facilisis arcu tincidunt. Suspendisse volutpat justo vitae lacus luctus congue. Maecenas imperdiet dolor in diam vestibulum, sit amet mattis dolor pretium.', '../img/safety-placeholder.png', '#', '#FB6253'),
    new Category('invert_colors', 'Engage. Explore. Network.', 'In hac habitasse platea dictumst. Quisque tempus mi nec massa gravida vestibulum. Fusce ipsum neque, rutrum quis fermentum in, pharetra sit amet lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', '../img/engage-explore.png', '#', '#FF9B00'),
    new Category('input', 'Retention and Inclusion', 'Mauris et scelerisque justo. Fusce elementum ipsum ante, sed imperdiet eros euismod quis. Integer ultricies volutpat nisl a egestas. Suspendisse semper magna enim, ut bibendum massa ultrices non.', '../img/retention-inclusion.png', '#', '#0085CC'),
    new Category('label', 'Analytics', 'Fusce in enim ac lectus molestie rhoncus. Phasellus semper congue lacus, vitae gravida turpis tempus quis. Ut vestibulum commodo libero in maximus.Nulla vel rutrum augue, eget lacinia sem. Ut eros sem, vehicula vulputate hendrerit id.', '../img/safety-placeholder.png', '#', '#FB6253'),
];

// Loops through all the categories and populates them on the left side of section two
for (var i = 0; i < categories.length; i++) {
    $('.categories').append('<i class="material-icons category ' + ((i == 0) ? 'active' : '') + '" data-id="' + categories[i].id + '">' + categories[i].icon + '</i>');
}

// Populates section two with the first category
RenderSectionTwo(categories[0]);

// ID of the active category being shown. Matches with the index of categories. Starts at 1 so when the category loop starts it doesn't try to transition to the default index.
var ActiveCategory = 1;

// Loops through the categories. Gets called on set interval below.
function LoopCategories() {
    // Sets back to start if it's at the end
    if (ActiveCategory >= categories.length)
        ActiveCategory = 0;
    $('.category').removeClass('active');
    $('.category[data-id=' + (ActiveCategory) + ']').addClass('active');
    RenderSectionTwo(categories[(ActiveCategory)]);
    ActiveCategory++;
}

// -----  LOOP & IDLE TIMER ----- //
/*
    "Loop" refers to the looping mechanism that loops through the categories
    "Timer" or "IdleTimer" refers to the timer running that checks if a category has been interacted with in a set period of time (idleDuration). If not, it will start the loop again to cycle through the categories.
*/

// Time it takes between each cycle of the categories
var cycleTime = 6000;

// Time it takes after not clicking a category before it starts looping again
var idleDuration = 8000; //The first cycle will occur after idleDuration + cycleTime seconds because the loop starts again, but doesn't visually change until after one iteration of cycleTime.

// Initial declaration of idleTimer variable. Referenced in StartIdleTimer function.
var idleTimer;

// Starts the loop on page load.
var LoopTimer = setInterval(LoopCategories, cycleTime);

// Starts idle timer
function StartIdleTimer() {
    idleTimer = setTimeout(StartLoop, idleDuration)
}

// Resets idle timer
function ResetIdleTimer() {
    clearInterval(idleTimer);
    StartIdleTimer();
    console.log('Reset the idle timer. Will loop in begin in ' + idleDuration + ' milliseconds starting now.')
}

// Starts category loop
function StartLoop() {
    LoopTimer = setInterval(LoopCategories, cycleTime);
    ActiveCategory++;
    console.log('Starting the loop through the categories. Will change the next category in ' + cycleTime + ' milliseconds');
}

// Cancels category loop
function AbortLoop() {
    clearInterval(LoopTimer);
    console.log('loop aborted');
}

// When an icon on the left is clicked, change active class, call RenderSectionTwo with the category clicked on, pause the loop, and reset the idle timer.
$('.category').on('click', function () {
    ActiveCategory = $(this).attr('data-id');
    var category = GetCategoryByID($(this).attr('data-id'));
    // Don't change the content and attempt to fade if you clicked on the current one
    if (!$(this).hasClass('active')) {
        RenderSectionTwo(category);
    }
    $('.category').removeClass('active');
    $(this).addClass('active');

    // Stops the category loop and resets the idle timer
    AbortLoop();
    ResetIdleTimer();
});

// Stops the category loop and resets the idle timer when the image is clicked AKA being looked at full screen
$('.category-img').on('click', function () {
    AbortLoop();
    ResetIdleTimer();
});


// Returns the Category from the categories array that matches the ID passed in.
function GetCategoryByID(id) {
    return categories.filter(function (obj) {
        return obj.id == id;
    })[0];
}

// Populates section two with the data from the category passed in. Fades in and fades out most elements and adds a class on the image to slide in.
function RenderSectionTwo(category) {
    // How fast you want things to fade in and fade out
    var speed = 200;

    // Header
    $('.category-header').fadeOut(speed, function () {
        $(this).html(category.header).fadeIn(speed);
    });
    // Description
    $('.category-description').fadeOut(speed, function () {
        $(this).html(category.description).fadeIn(speed);
    });
    // Color of the hr line between header and description
    $('.category-hr').fadeOut(speed, function () {
        $(this).css('background-color', category.color).fadeIn(speed);
    });
    // Color of the learn more btn
    $('.category-learn-more-btn').fadeOut(speed, function () {
        $(this).css('color', category.color).fadeIn(speed);
    });
    // href of the learn more btn
    $('.category-learn-more-btn').attr('href', category.btn);
    // Image source
    $('.category-img').attr('src', category.img);
    // Image animation

    $('.category-img').addClass('active-img');
    setTimeout(function () {
        $('.category-img').removeClass('active-img');
    }, 500);

}
