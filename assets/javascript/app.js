// Function for displaying GIFs data
function createButtons() {

    // Deleting the buttons prior to adding new  buttons
    // (this is necessary otherwise we will have repeat buttons)
    $(".gifbuttons-view").empty();

    // Looping through the array of gifs
    for (let i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each gif in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        let a = $("<button>");
        // Adding a class
        a.addClass("gifButton");
        // Adding a data-attribute with a value of index i
        a.attr("data-name", gifs[i]);
        // Providing the button's text with a value of index i
        a.text(gifs[i]);
        // Adding the button to the HTML
        $(".gifbuttons-view").append(a);
    }
}

// function to display object content from API call
function displayGIPHY(data) {

    // Get reference to existing tbody element, create a new table row element
    // let tBody = $(".display");
    // let tRow = $("<tr>");

    // Get reference to existing display-poster element
    let poster = $(".display-poster");


    for (let i = 0; i < limit; i++) {

        // still picture
        console.log(data.data[i].images.fixed_height_still.url);

        // clickable image element
        let imgButton = $("<button>");
        let imgElement = $("<img>");

        // Adding a class
        imgElement.addClass("gif");
        // Adding a data-attribute with a value of index i
        imgElement.attr("data-gifindex", i);
        imgElement.attr("src", data.data[i].images.fixed_width_still.url);
        imgButton.append(imgElement);
        poster.append(imgButton);

        // gif for testing
        // let imgElement2 = document.createElement("img");
        // imgElement2.setAttribute("src", data.data[i].images.fixed_width.url);
        // poster.append(imgElement2);


        // meta data display below
        // let titleTd = $("<td>").text(data.data[0].title + ";");
        // let idTd = $("<td>").text(data.data[0].id + ";");
        // let ratingTd = $("<td>").text(data.data[0].rating + ";");
        // Append the newly created table data to the table row and table body
        //   tRow.append(titleTd, idTd, ratingTd);
        //   tBody.append(tRow);
    }

};


// function to search GIFPHY
function searchGIPHY(gif) {
    let url = "https://api.giphy.com/v1/gifs/search";
    url += '?' + $.param({
        'api_key': "L3lB7fj2BcQYRf6bEl7cRXH8ZjVs2Ywr",
        'q': gif,
        'limit': "10",
        'offset': "0",
        'rating': "pg-13",
        'lang': "en",
        'fmt': "json"
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result);
        gifObject = result;
        displayGIPHY(result);
    }).fail(function (err) {
        throw err;
    });

};


// Initial array of gifs
let gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
let limit = 10;
let gifObject = {};
let isPlayed = true;

// This function handles events where add-gif button is clicked
$(".add-gif").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    let gif = $(".gif-input").val().trim();
    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // calling craeteButtons which handles the processing of gifs array
    createButtons();
});

// This function handles events where individule gif button (not the picture) is clicked
$(".gifbuttons-view").on("click", ".gifButton", function (event) {
    event.preventDefault();

    // This line will grab the data-name 
    let gif = $(this).data("name");
    console.log(gif);
    $(".display").empty();
    $(".display-poster").empty();
    searchGIPHY(gif);

});

// This function handles events where individule gif picture is clicked
$(".display-poster").on("click", ".gif", function (event) {
    event.preventDefault();

    // This line will grab the data-gifindex
    let gifindex = $(this).data("gifindex");
    console.log(gifindex);

    // swapping still image and gif when click
    console.log(gifObject);
    if (isPlayed) {
        $(this).attr("src", gifObject.data[gifindex].images.fixed_width.url);
        isPlayed = false;
    }
    else {
        $(this).attr("src", gifObject.data[gifindex].images.fixed_width_still.url);
        isPlayed = true;
    }

});
// Calling the renderButtons function at least once to display the initial list of gifs
createButtons();

      // testing the logic
      // searchGIPHY("matrix");
