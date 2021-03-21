$(function (){
    var presentHour = moment().format("HH");
    var presentDate = moment().format("dddd, D MMMM");

    $("#nowDay").text(presentDate);

    setInterval(function () {
        var d = new Date();
        var n = d.toLocaleDateString();
        $("#now-time").text(n);
    }, 1000);

    var hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];

    for (var i = 0; i < hours.length; i++) {
        var rows = $("<div class='rows'>");
        var displayHour = $("<div class='col-sm-1 hour'>").text(
            hours[i] + ".00"
        );

        var input = $(
            "<textarea class='description col-sm-10 time-block'>"
        );

        input.attr("data-hour", hours[i]);

        if (input.attr("data-hour") < presentHour) {
            input.addClass("past");
        } else if (input.attr("data-hour") == presentHour) {
            input.addClass("present");
        } else {
            input.addClass("future");
        }
        
        if (localStorage.getItem(hours[i]) ) {
            input.text(localStorage.getItem(hours[i]));
        }

        var saveButton = $("<button clas='col-sm-1 saveBtn'>");
        var saveIcon = $("<i class='fas fa-save'>");
        saveButton.append(saveIcon);
        saveButton.attr("data-hour", hours[i]);
        rows.append(displayHour, input, saveButton);
        $(".container").append(rows);
    }

    $(document).on("click", ".saveBtn", function () {
        var hourStore = $(this).attr("data-hour");
        var textStore = $(this).siblings(".description").val();

        localStorage.setItem(hourStore, textStore);
    });
});