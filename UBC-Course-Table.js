jQuery(document).ready(function ($) {
    //parsing by p tags and storing in items array
    var items = $('p').map(function () {
        return $(this).html();
    }).get();
    //html tags for table
    var trTag = "<tr>";
    var tdTag = "<td>";
    var trEndTag = "</tr>";
    var tdEndTag = "</td>";
    var strongTag = "<strong>";
    var strongEndTag = "</strong>";
    var aEndTag = "</a>";
    var bracket = ">";
    var wikiLink = '<a href="http://wiki.ubc.ca/Course:';
    //edge cases, courses with blogs
        //iterate over items array and discard irrevant entries
    for (i = 0; i < items.length; i++) {
        var curItem = items[i];
        //check for irrelevant entries
        if (curItem === " " || (curItem.indexOf("<strong>") < 0)) {
            continue;
        }
        //create the table by appending the tags
        else {
            var stringArray = curItem.split(" ");
            var courseCode = stringArray.shift();
            var onlyCourseCode = courseCode.replace("<strong>", '');
            var lastCourseCode = onlyCourseCode.slice(-1);
            //get rid of last letter, ie. 530A, 530B, etc
            if (/^[a-zA-Z()]+$/.test(lastCourseCode)) {
                onlyCourseCode = onlyCourseCode.substring(0, onlyCourseCode.length - 1);
            }
            var stringArray = stringArray.join(" ");
            var courseCode = trTag + tdTag + courseCode + strongEndTag + tdEndTag;
            var courseName = tdTag + strongTag + stringArray + tdEndTag;
            //edge cases for courses with blogs instead of wiki page
            
            else {
                var thisWikiLink = tdTag + wikiLink + onlyCourseCode + '"' + bracket + "Wiki: " + onlyCourseCode + aEndTag + tdEndTag + trEndTag;
                var curItemTag = courseCode + courseName + thisWikiLink;
            }
            $("tbody").append(curItemTag);
        }
    }
    $('#courses').DataTable({
        "search": {
            "caseInsensitive": false
        }
        , "pageLength": 20
        , "bLengthChange": false
    });
    var dataTable = $('#courses').DataTable();
    $("#searchbox").on("keyup search input paste cut", function () {
        dataTable.search(this.value).draw();
    });
    
});