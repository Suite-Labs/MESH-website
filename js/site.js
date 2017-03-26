// Initialize collapse button
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();

// Zoom down to section two after clicking on bouncing down arrow
$(".section-two-zoom").click(function () {
    $('html, body').animate({
        scrollTop: $(".section-two").offset().top
    }, 750);
});

// Blow up image on screen
$(document).ready(function(){
    $('.materialboxed').materialbox();
  });

// Section 2

// Object constructor for the categories in section 2
var Category = (function() {
    var globalId = 0;
    
    return function Category(icon, header, description, img, color) {
        this.id = globalId++;
        this.icon = icon;
        this.header = header;
        this.description = description;
        this.img = img;
        this.color = color;
    }
    
})();

// Holds all the categories for section 2
var categories = [
    new Category('add', 'Automated Brilliance', 'Mesh integrates with your institution to automate the creation of communities that already exist naturally, whether it be a class, club, team, or department, Mesh does the heavy lifting and creates communities for you.', 'img/automated-brilliance.png', '#FFC200'),
    new Category('perm_identity', 'Real Time Collaboration', 'Vestibulum vel lorem dapibus, tristique nulla et, rhoncus justo. Nunc vitae maximus ante. Pellentesque ornare sem mauris, porttitor pharetra erat placerat quis. Nunc ornare dignissim facilisis. Vestibulum a nulla laoreet.', 'img/realtime-collaboration.png', '#0085CC'),
    new Category('info_outline', 'A new age in safety.', 'Fusce pharetra semper mi, vitae auctor turpis finibus eu. Suspendisse tempus condimentum elit. Vestibulum luctus est a tortor porttitor, a facilisis arcu tincidunt. Suspendisse volutpat justo vitae lacus luctus congue. Maecenas imperdiet dolor in diam vestibulum, sit amet mattis dolor pretium.', 'img/safety-placeholder.png', '#FB6253'),
    new Category('invert_colors', 'Engage. Explore. Network.', 'In hac habitasse platea dictumst. Quisque tempus mi nec massa gravida vestibulum. Fusce ipsum neque, rutrum quis fermentum in, pharetra sit amet lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 'img/engage-explore.png', '#3ABF67'),
    new Category('input', 'Retention and Inclusion', 'Mauris et scelerisque justo. Fusce elementum ipsum ante, sed imperdiet eros euismod quis. Integer ultricies volutpat nisl a egestas. Suspendisse semper magna enim, ut bibendum massa ultrices non.', 'img/retention-inclusion.png', '#F38C00'),
    new Category('label', 'Analytics', 'Fusce in enim ac lectus molestie rhoncus. Phasellus semper congue lacus, vitae gravida turpis tempus quis. Ut vestibulum commodo libero in maximus.Nulla vel rutrum augue, eget lacinia sem. Ut eros sem, vehicula vulputate hendrerit id.', 'img/safety-placeholder.png', '#03A9F4'),
];

// Populate the category icons on the left. Dynamic based on how many categories you have.
for(var i = 0; i < categories.length; i++){
    $('.categories').append('<i class="material-icons category ' + ((i == 0) ? 'active' : '' ) + '" data-id="' + categories[i].id + '">' + categories[i].icon + '</i>');
}   

// Populates section two with the first category
RenderSectionTwo(categories[0]);

// ID of the active category being shown. Matches with the index of categories
var ActiveCategory = 1;

// Timer to loop through the categories. The second parameter determines how long between each cycle
var LoopTimer = setInterval(LoopCategories, 6000);

// Loops through the categories
function LoopCategories() {
    if (ActiveCategory == categories.length)
        ActiveCategory = 0;
    $('.category').removeClass('active');
    $('.category[data-id='+(ActiveCategory)+']').addClass('active');
    RenderSectionTwo(categories[(ActiveCategory)]);
    ActiveCategory++;
}

// Cancels the timer
function abortTimer() {
  clearInterval(LoopTimer);
}

$('.category').on('click', function() {
    ActiveCategory = $(this).attr('data-id');
    var category = GetCategoryByID($(this).attr('data-id'));
    // Don't change the content and attempt to fade if you clicked on the current one
    if (!$(this).hasClass('active')){
        RenderSectionTwo(category);
    }
    $('.category').removeClass('active');
    $(this).addClass('active');
    
    // Currently ends the timer - WIP
    abortTimer();
    
});

// Returns the Category from the categories array that matches the ID passed in.
function GetCategoryByID(id) {
    return categories.filter(function( obj ) { return obj.id == id; })[0];
}

// Takes a Category you want to pull data from and changes all the elemnts in section two to match the data from the given category. Fades.
function RenderSectionTwo(category) {
    // How fast you want things to fade in and fade out
    var speed = 200;
    
    $('.category-header').fadeOut(speed, function () {
        $(this).html(category.header).fadeIn(speed);
    });
    $('.category-description').fadeOut(speed, function () {
        $(this).html(category.description).fadeIn(speed);
    });
    $('.category-hr').fadeOut(speed, function () {
        $(this).css('background-color', category.color).fadeIn(speed);
    });
    $('.category-learn-more-btn').fadeOut(speed, function () {
        $(this).css('color', category.color).fadeIn(speed);
    });

    $('.category-img').attr('src', category.img);
    $('.category-img').addClass('active-img');
    setTimeout(function(){
        $('.category-img').removeClass('active-img');
    }, 500);
    //$('.category-header').html(category.header);
    //$('.category-description').html(category.description);
    //$('.category-hr').css('background-color', category.color);
    //$('.category-learn-more-btn').css('color', category.color);
}

/*


var Year = (function() {

    var globalId = 0;

    return function Year(year, title) {
        this.id = globalId++;
        this.year = year;
        this.title = title;
        this.description = 'Mauris condimentum eros non nunc cursus, consectetur sodales arcu condimentum. Morbi ultrices maximus arcu fringilla finibus. In hac habitasse platea dictumst. Praesent porttitor dolor in purus molestie vehicula. Ut risus mauris, gravida eu felis eget, consectetur suscipit velit. Vivamus interdum lacinia suscipit. Quisque augue libero, vehicula ut enim et, cursus blandit arcu.';
    }

})();

var years = [
    new Year('1970', 'Early Life'),
    new Year('1971', 'Moving to Trenchtown'),
    new Year('1972', 'Early Wailers Era'),
    new Year('1973', 'Burnin'),
    new Year('1974', 'Bob Marley & The Wailers'),
    new Year('1975', 'Bob Marley in Africa'),
    new Year('1976', 'Bob Marley Live Forever'),
    new Year('1977', 'One Love'),
    new Year('1978', 'World Tour'),
    new Year('1979', 'Legacy'),
    new Year('1980', 'Inspiration')
];

for (var i = 0; i < years.length; i++) {

    $('.years').append('<div class="year ' + ((i == 0) ? 'active' : '' ) + '" data-year="' + years[i].year + '">' +
            years[i].year +
        '</div>');

    $('.events').append('<div class="event ' + ((i == 0) ? 'active' : 'right' ) + '" data-year="' + years[i].year + '">' +
            '<h4>' + years[i].title + '</h4>' +
            '<p>' + years[i].description + '</p>' +
        '</div>');

}
*/