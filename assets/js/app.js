var topics = ["comedy", "cheese", "levitation", "rick and morty", "fur","dharma","bollywood","tarantino movies",];

var newTopic = "";

var numberOfResults = 10;

// Function for displaying topic data
function renderButtons() {
    // console.log("renderButtons hit!");

    // empty js-topics-view div before adding new topics
    $("#js-topics-view").empty();

    // Loop through the array of topics, then generate buttons for each topic in the array
    for (var i = 0; i < topics.length; i++) {

        $('#js-topics-view').append("<button type='button' class='btn btn-outline-warning js-topic-button'>" + topics[i] + "</button>");

    };

}





// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// file:///Users/stephjaps/Documents/github/class_repo/01-Class-Content/06-ajax/01-Activities/16-NYTSearch/nyt-example.html



function buildQueryURL(topicInput) {
    // queryURL is the base for the url needed to query the API
    var queryURL = "https://api.giphy.com/v1/gifs/search?";

    // Begin building an object to contain our API call's query parameters
    var queryParams = {
        "q": topicInput
    };

    queryParams.api_key = "kKufxYUJRDHAVkljlMGVO4x5k48SWjj0";
    
    

    queryParams.limit = numberOfResults;

    // VERIFY THAT QUERY RETURNS DATA
    var getStuff = $.get(queryURL + $.param(queryParams));
    getStuff.done(function (data) {
        console.log("i got stuff done", data);
        updatePage(data.data);
    });

    // console.log(queryURL + $.param(queryParams));

};


// Function to empty out the image section
function clear() {
    $(".js-image-section").empty();
};


function updatePage(requestedGIFs) {

    // console.log("this is requestedGIFs ", requestedGIFs);
    // console.log(numberOfResults);
    for (var i = 0; i < requestedGIFs.length; i++) {

        // console.log(requestedGIFs[i].embed_url);

        // var makeImg = $("<img>").attr("src", requestedGIFs[i].images.original.url);
        var makeImg = $("<img class='js-animate'>").attr("src", requestedGIFs[i].images.original_still.url).attr("data-still", requestedGIFs[i].images.original_still.url).attr("data-animate", requestedGIFs[i].images.original.url).attr("data-state", "still");

        // var makeDivRating = $("<div>").text("Rating: " + requestedGIFs[i].rating);
        var makeDivRating = $("<div>").text("rating: ");
        var ratingSpan = $("<span>").text(requestedGIFs[i].rating);
        var makeDivRating = makeDivRating.append(ratingSpan);

        var wrapImg = $("<div class='image-box col-12 col-md-6'>").append(makeImg).append(makeDivRating);

        $(".js-image-section").append(wrapImg);
    };

};


/////////////////////////////////////////////////////////
// CALL FUNCTIONS
/////////////////////////////////////////////////////////


// This function handles events where the add topic button is clicked
$("#add-topic").on("click", function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    var newTopic = $("#topic-input").val();

    // Write code to add the new topic into the topics array
    topics.push(newTopic);

    // CLEARS INPUT FIELD
    // $("#topic-input").val("").focus();


    // The renderButtons function is called, rendering the list of topic buttons
    renderButtons();

    // Function to empty out  .js-image-section
    clear();

});

// CLICK TOPIC BUTTON TO MAKE GIFS DISPLAY
$(document).on("click", ".js-topic-button", function (event) {
    // console.log("button got clicked");
    // console.log($(this).text());

    clear();

    buildQueryURL($(this).text());
});

// CLICK TO TOGGLE BETWEEN ANIMATED AND STILL IMAGE
$(document).on("click", ".js-animate", function (event) {

    // STEP ONE: study the html above.
    // Look at all the data attributes.
    // Run the file in the browser. Look at the images.

    // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

    // STEP TWO: make a variable named state and then store the image's data-state into it.
    // Use the .attr() method for this.

    // ============== FILL IN CODE HERE FOR STEP TWO =========================

    var $img = $(this);
    var state = $img.attr('data-state');

    // =============================================

    // STEP THREE: Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.

    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
    // ============== FILL IN CODE HERE FOR STEP THREE =========================

    if (state == "still") {
        var animated_gif_url = $img.attr('data-animate');
        // $img.attr('src', animated_gif_url);
        // $img.attr('data-state', "animate");
        $img.attr({
            'src': animated_gif_url,
            'data-state': 'animate'
        });
    } else {
        var still_gif_url = $img.attr('data-still');
        // $img.attr('src', still_gif_url);
        // $img.attr('data-state', "still");
        $img.attr({
            'src': still_gif_url,
            'data-state': 'still'
        });
    }

    // ==============================================

    // STEP FOUR: open the file in the browser and click on the images.
    // Then click again to pause.
});


// Calling the renderButtons function to display the initial list of topics
renderButtons();