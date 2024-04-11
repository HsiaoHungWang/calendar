function showCalendar(theMonth) {
    
    theMonth = theMonth || moment().format("YYYY/MM")
    let aMonth = moment(theMonth, "YYYY/MM").format("MM");

    //產生表格
    let calendar = $(document.createDocumentFragment());

    //每月1號
    let theDay = 1;

    //每月有幾天
    let TotalDays = moment(theMonth, "YYYY/MM").daysInMonth();


    //每月1號 2020/06/01
    let currentMonth = theMonth + "/01";


    //每月1號是星期幾，回傳的結果是1、2、3、4、5、6、0，1 是星期一，0 是星期日
    let currentMonthFirstDay = moment(currentMonth, "YYYY/MM/DD").day();
    //判斷每月有幾周
    let weekcount = 5
    if (currentMonthFirstDay == 0 || (currentMonthFirstDay == 6 && TotalDays == 31)) {
        weekcount = 6
    }
    let firstWeek = true;
    for (let i = 0; i < weekcount; i++) {

    //firstColumn
    const firstColumn = `<span style="visibility: hidden;">0</span>
                        <div>上午</div>
                        <div>下午</div>
                        <div>晚間</div>`
    let firstDiv = $('<div></div>').addClass('calendar__day day').html(firstColumn);
    let weekDiv = $('<div></div>').addClass('calendar__week').append(firstDiv);
    const cell = `<div class="timezone" contenteditable="true"></div>
                  <div class="timezone" contenteditable="true"></div>
                  <div class="timezone" contenteditable="true"></div>`
    let x = true;
    for (let j = 1; j <= 7; j++) {
        let day = null;
        //星期日會是0改成7
        if (currentMonthFirstDay == 0) {
            currentMonthFirstDay = 7;
        }
        //第一個星期
        if (x && firstWeek) {
            //判斷每月第一天從星期幾開始
            if (j == currentMonthFirstDay) {
                let cellNumber = $('<span></span>').text(formatMonth(aMonth, theDay));
                day = $('<div></div>').addClass('calendar__day day').append([cellNumber, cell]);
                x = false;
                theDay += 1
            } else {
                let cellNumber = $('<span></span>').text(formatMonth(aMonth, theDay));
                if (x) {
                  day = $('<div></div>').addClass('calendar__day day bg-info').html("<span>&nbsp;</span>");
                } else {
                    day = $('<div></div>').addClass('calendar__day day').append([cellNumber, cell]);
                    theDay += 1
                }

            }
        } else {
            //其它星期
            //判斷是不是最後一天了
            if (theDay <= TotalDays) {
                let cellNumber = $('<span></span>').text(formatMonth(aMonth, theDay));
                day = $('<div></div>').addClass('calendar__day day').append([cellNumber, cell]);

                theDay += 1
            } else {
                day = $('<div></div>').addClass('calendar__day day bg-info').html("<span>&nbsp;</span>");
            }
        }
        weekDiv.append(day);
    }
        firstWeek = false;
        calendar.append(weekDiv);
    }
    return calendar;
    
}

function showMonth(theMonth){
    theMonth = theMonth || moment().format("YYYY/MM")
    return theMonth;
}

function formatMonth(m, d) {
    //console.log(d.toString().length)
    return (d.toString().length == 2 ? m + "/" + d : m + "/0" + d);
  }
