var overall_total_units = 0,
    overall_total_addresses = 0;
for (var i=0; i<route_info.length; i++) {
    var dname = route_info[i]["name"],
        map = route_info[i]["map"],
        sequence = route_info[i]["sequence"],
        details = route_info[i]["details"],
        units = route_info[i]["units"],
        names = route_info[i]["names"],
        e_time = (parseInt(route_info[i]["time"]) / 60);
    var total_units = 0;
    var section_id = dname.replace(" ", "-");
    var route_title = dname.split(" ")[0] + "'s Route";
    var elapsed_time = "";
    if (Math.round(e_time / 60) == 1) {
        elapsed_time = Math.round(e_time / 60) + " hr " + Math.round(e_time % 60) + " min";
    } else if (e_time > 60) {
        elapsed_time = Math.round(e_time / 60) + " hrs " + Math.round(e_time % 60) + " min";
    } else {
        elapsed_time = Math.round(e_time % 60) + " min ";
    }
    var est_time = "<div class='d-flex flex-column'><div class='ml-4 mb-2'>Estimated time: <span class='font-weight-bold'>" + elapsed_time + "</span></div>";
    var addr_list = "<div><ol>";
    for (var j=0; j<sequence.length; j++) {
        total_units += parseInt(units[j]);
        addr_list += "<li class='pl-3 mt-2'>" + sequence[j] + " <span class='font-weight-bold'>(" + parseInt(units[j]) + ")</span></li>";
        addr_list += "<ul><li><span class='font-weight-bold'>Names:</span> " + names[j] + "</li>";
        if (details[j]) {
            addr_list += "<li><span class='font-weight-bold'>Details:</span> " + details[j] + "</li>";
        }
        addr_list += "</ul>";
    }
    addr_list += "</ol></div></div>";
    var container = "<div class='d-flex flex-column flex-md-row'><div class='route-map'><img src='" + map + "' class='w-100' /></div>" + est_time + addr_list + "<div>";
    $("#routes").append("<div class='my-4' id='" + section_id + "'><h2>" + route_title + "</h2>" + container + "</div>");
    $("#overview-body").append("<tr><th scope='row'>" + (i+1) + "</th><td><a href='#" + section_id + "'>" + dname + "</a></td><td>" + (sequence.length) + "</td><td>" + (total_units) + "</td></tr>");
    overall_total_units += total_units;
    overall_total_addresses += sequence.length;
}
$("#overview-body").append("<tr><td colspan='2' class='text-right font-weight-bold'>Total</td><td class='font-weight-bold'>" + (overall_total_addresses) + "</td><td class='font-weight-bold'>" + (overall_total_units) + "</td></tr>");
