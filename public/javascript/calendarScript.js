
// jquery
function closeForm() {

    document.getElementById("myForm").style.display = "none";

}
$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var calendar = $('#calendar').fullCalendar({
        editable: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: '/full-calender',
        selectable: true,
        selectHelper: true,
        allDay: false,
        select: function(start, end, allDay) {
            // var title = prompt('Event Title:');
            var ins = document.getElementById("ins").value;
            var course = document.getElementById("course").value;
            var track = document.getElementById("track").value;
            document.getElementById("myForm").style.display = "block";


            //  'instructor_name','title','track_name', 'start', 'end'

            if (ins) {
                console.log("doneee");
                var start = $.fullCalendar.formatDate(start, 'Y-MM-DD HH:mm:ss');

                var end = $.fullCalendar.formatDate(end, 'Y-MM-DD HH:mm:ss');

                $.ajax({
                    url: "/full-calender/action",
                    type: "POST",
                    data: {
                        instructor_name: ins,
                        title: course,
                        track_name: track,
                        start: start,
                        end: end,
                        type: 'add'
                    },
                    success: function(data) {
                        calendar.fullCalendar('refetchEvents');
                        alert("Event Created Successfully");
                    }
                })
            }
        },
        editable: true,
        eventResize: function(event, delta) {
            var start = $.fullCalendar.formatDate(event.start, 'Y-MM-DD HH:mm:ss');
            var end = $.fullCalendar.formatDate(event.end, 'Y-MM-DD HH:mm:ss');
            var title = event.title;
            var id = event.id;
            $.ajax({
                url: "/full-calender/action",
                type: "POST",
                data: {
                    title: title,
                    start: start,
                    end: end,
                    id: id,
                    type: 'update'
                },
                success: function(response) {
                    calendar.fullCalendar('refetchEvents');
                    alert("Event Updated Successfully");
                }
            })
        },
        eventDrop: function(event, delta) {
            var start = $.fullCalendar.formatDate(event.start, 'Y-MM-DD HH:mm:ss');
            var end = $.fullCalendar.formatDate(event.end, 'Y-MM-DD HH:mm:ss');
            var title = event.title;
            var id = event.id;
            $.ajax({
                url: "/full-calender/action",
                type: "POST",
                data: {
                    title: title,
                    start: start,
                    end: end,
                    id: id,
                    type: 'update'
                },
                success: function(response) {
                    calendar.fullCalendar('refetchEvents');
                    alert("Event Updated Successfully");
                }
            })
        },

        eventClick: function(event) {
            if (confirm("Are you sure you want to remove it?")) {
                var id = event.id;
                $.ajax({
                    url: "/full-calender/action",
                    type: "POST",
                    data: {
                        id: id,
                        type: "delete"
                    },
                    success: function(response) {
                        calendar.fullCalendar('refetchEvents');
                        alert("Event Deleted Successfully");
                    }
                })
            }
        }



    });

});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function gettrack() {

    var dat = $("#dat").val();
    console.log(dat);
    $.ajax({
        url: "/full-calender/trackindex",
        type: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
            dat: dat
        },
        success: function(result) {


            console.log(result + "succes");
        },
        error: function(result) {


            alert(result + "mahmoud");

        }
    });

}
$('#dat').on("change", function() {
    var item = $("#dat option:selected").text();
    $.ajax({
        url: '/full-calender/trackindex',
        type: "get",
        data: {
            data: item
        },
        success: function(response) { // What to do if we succeed
            if (data == "success")
                alert(response);
        }
    })

    console.log(item);
});



// test
// $(function () {
//     let $calendar = $("#calendar").fullCalendar({
//       defaultView: "basicWeek",
//       defaultDate: "2018-04-07",
//       resources: [//from  ww w.de  m o2s  .c o m
//       { id: "a", title: "Room A" },
//       { id: "b", title: "Room B", eventColor: "green" },
//       { id: "c", title: "Room C", eventColor: "orange" },
//       { id: "d", title: "Room D", eventColor: "red" }],
//       events: [
//       {
//         id: "1",
//         resourceId: "a",
//         start: "2018-04-06",
//         end: "2018-04-08",
//         title: "event 1" },
//       {
//         id: "2",
//         resourceId: "a",
//         start: "2018-04-07T09:00:00",
//         end: "2018-04-07T14:00:00",
//         title: "event 2" },
//       {
//         id: "3",
//         resourceId: "b",
//         start: "2018-04-07T12:00:00",
//         end: "2018-04-08T06:00:00",
//         title: "event 3" },
//       {
//         id: "4",
//         resourceId: "c",
//         start: "2018-04-07T07:30:00",
//         end: "2018-04-07T09:30:00",
//         title: "event 4" },
//       {
//         id: "5",
//         resourceId: "d",
//         start: "2018-04-07T10:00:00",
//         end: "2018-04-07T15:00:00",
//         title: "event 5" }],
//       eventRender: function (event, element) {
//         element.qtip({
//           content: {
//             title: { text: event.title },
//             text:
//             '<span class="title">Start: </span>' +
//             $.fullCalendar.formatDate(event.start, "hh:mmtt") +
//             '<br><span class="title">Description: </span>' +
//             event.description },
//             hide: {
//             delay: 200,
//             fixed: true },
//             position: {
//             target: "mouse", // Use the mouse position as the position origin
            // adjust: {
              // Don't continuously  the mouse, just use initial position
//               mouse: false } } });
//       } });  
//   });

//   if (document.location.search.match(/type=embed/gi)) {
//     window.parent.postMessage("resize", "*");
//   }
//   window.console = window.console || function(t) {};