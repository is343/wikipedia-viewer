"use strict";

// create the initial listeners for the search field and button
function createListeners() {
    $("input[type='text']").change(function() {
        // gettin the input search text
        var searchVal = $("input[type='text']").val();
        // erasing the search field
        $("input[type='text']").val("");
        // creating the url to search for
        searchWiki(searchVal);
    });
}

function searchWiki(searchVal) {
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchVal + "&callback=?";
    $.ajax({
            url: url,
            type: 'default GET (Other values: POST)',
            async: false,
            dataType: 'json',
        })
        .done(function(data) {
            clear(); // clear the search field before refreshing
            createEntries(data);
        })
        .fail(function() {
            clear();
            $("ul").append('<li><b>--ERROR RETIEVING DATA--</b></li>');
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

// creates entries
function createEntries(data) {
    if (data[1].length === 0) {
        $("ul").append('<li><b>--NO RESULTS--</b></li>');
        return;
    }
    for (var i = 0; i < data[1].length; i++) {
        var link = data[3][i];
        var title = data[1][i];
        var detail = data[2][i];
        if (detail === '') {
            detail = "--NO DESCRIPTION--"
        }

        $("ul").append('<li><a href="' + link + '" target="#"><h2>' + title + '</h2><p>' + detail + '</p></a></li>');
    };

};

// clear the board
function clear() {
    $("ul").html('');
}

$(document).ready(function() {
    createListeners();
});