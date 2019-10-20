$(document).ready(function() {
    var topicArray = [
      "cats",
      "dogs",
      "harry potter",
      "arrested development",
      "sailor moon",
      "muppets",
      "disney world",
      "the office"
    ];
    var indexCounter = 7;
    //generates buttons
    function genButtons() {
      console.log("called fn");
      for (var i = 0; i < topicArray.length; i++) {
        genOneButton(i);
      }
    }

    genButtons();

    function genOneButton(topicIndex) {
      var gifButton = $(
        "<button class='col s2 waves-effect waves-light btn-small' offset-count='0' data-topic='" +
          topicArray[topicIndex] +
          "'style='margin: 1px'>" +
          topicArray[topicIndex] +
          "</button>"
      );
      $("#button-div").append(gifButton);
    }

    //form submit logic
    $("#find-gif").on("click", function(event) {
      event.preventDefault();
      var searchInput = $("#user-input")
        .val()
        .trim();
      var searchTerm = searchInput.toLowerCase();
      console.log(searchTerm);
      topicArray.push(searchTerm);
      console.log(topicArray);
      //$("#button-div").empty();
      indexCounter++;
      genOneButton(indexCounter);
    });

    //on giphy button
    $(document).on("click", "button", function() {
      var topic = $(this).attr("data-topic");
      console.log("this is topic:", topic);
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        topic +
        "&api_key=WtPUrZWjO8g4ZVFP8BHRfOOOpHyOd59Y&limit=10&offset=" +
        $(this).attr("offset-count");

      var self = this;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var results = response.data;
        var offsetNum = parseInt($(self).attr("offset-count"));
        for (var i = 0; i < results.length; i++) {
          var moveImg = results[i].images.fixed_height.url; //animated gif url
          var stillImg = results[i].images.fixed_height_still.url;
          var topicDiv = $("<div class= 'col s5 center align'>");
          var pTitle = $("<p class='flow-text z-depth-2' style='font-size: 14px; font-weight: bold; color: #1a237e; background-color:#e0f7fa;'>Title: "+ results[i].title + "</p>")
          var pRating = $("<p class='flow-text z-depth-2' style='font-size: 14px; font-weight: bold; color: #1a237e; background-color:#e0f7fa;'>Rating: " + results[i].rating + "</p>");
          var topicImage = $(
            '<img class="gif" src="' +
              stillImg +
              '" data-still="' +
              stillImg +
              '" data-animate="' +
              moveImg +
              '" data-state="still">'
          );
          $(topicDiv).append(topicImage);
          $(topicDiv).append(pTitle);
          $(topicDiv).append(pRating);
          $("#gifs-appear-here").prepend(topicDiv);
        }
        offsetNum = offsetNum + 10; //update offset parameter
        console.log(self);
        $(self).attr("offset-count", offsetNum);
        console.log($(self).attr("offset-count"));
      });
    });

    //play/pause gifs
    $(document).on("click", ".gif", function() {
      console.log($(this).attr("data-state"));
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });