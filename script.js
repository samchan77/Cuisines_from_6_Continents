//Variable declaration
                        
let key = "0199889dc2d09169913e03c6ee9e2678"  
let id = "36d5e2fb"

//Food dish function
function getFoodDish() {
    //Getting the value of the specified food selection
    let foodDish = $("input[name=selector]:checked").val();

    //URL with user cuisine selection
    let foodImage = "https://api.edamam.com/search?q=" + foodDish + "&app_id=" + id + "&app_key=" + key + "&from=0&to=50";

    //AJAX call getting each food dish
    $.ajax({
        type: "GET",
        url: foodImage,
    }).then(function(response) {
        console.log(foodImage);
        console.log(response);
        
         //Page scroll
        $("html, body").animate({ scrollTop: "700px" }, 1000);

        //Displaying the food dish.
        $(".card").attr("class", "card");

        //Randomizing the food dish to display a different one each time.
        let foodchoice = Math.floor((Math.random() * response.hits.length));
        console.log(response.hits.length);

        //Getting and appending the title.
        $(".card-title").html(response.hits[foodchoice].recipe.label);
        $(".card-text").empty();
        let list = $("<ul>")
        $(".card-text").append(list)

        //For loop to loop through the food list and append them.
        for (let i=0; i< response.hits[foodchoice].recipe.ingredientLines.length; i++) {
            let item = $("<li>")
            item.html(response.hits[foodchoice].recipe.ingredientLines[i]);
            list.append(item)
        }

        //Getting and appending the food dish and link.
        $(".card-img-top").attr("src", response.hits[foodchoice].recipe.image);
        $("#recipieLink").attr("href", response.hits[foodchoice].recipe.url);
        $(".card").css("border", "1px solid black");
    });
}

//Function that calls the food dish on click of the "More Great info" button.
$(function(){
    $('#redbutton').click(function(){
        getFoodDish();
    });
  });


  