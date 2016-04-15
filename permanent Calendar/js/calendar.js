/*使用立即执行匿名函数，dom加载完之前即可绘制*/
(function () {


    /*function获取元素id*/
    function getId(id) {
        return document.getElementById(id)
    }

    /*function创建元素ele*/
    function creatEle(ele) {
        return document.createElement(ele)
    }
    //150年内的阴历数据，每个数据代表一年，从阳历1900.1.31日起，为第一个数据年的开始，
    //即阳历1900.1.31＝阴历0.1.1。150个数据可推150年的阴历，因此目前最大只能推算到2049年，以后的推导，还需要从天文台得到新的数据后才能推导，否则将出现误差
    var lunarInfo = [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835];
    /*天干地支*/
    var str1 = "甲乙丙丁戊己庚辛壬癸";
    var str2 = "子丑寅卯辰巳午未申酉戌亥";

    /*12生肖*/
    var animal = "鼠牛虎兔龙蛇马羊猴鸡狗猪";

    /*阴历24节气*/
    var solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];

    /*距离小寒节气的时间差(分钟)*/
    var sTermInfo = [0, 21208, 43467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
    var weekName = "日一二三四五六七八九十";
    /*阴历月份*/
    var solarMonth = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"];
    /*阴历称呼*/
    var str3 = "初十廿卅";
    /*国历节日 *表示放假日*/
    var sFtv = {
        "0101": "*元旦节"
        , "0214": "情人节"
        , "0305": "学雷锋纪念日"
        , "0308": "妇女节"
        , "0312": "植树节"
        , "0315": "消费者权益日"
        , "0401": "愚人节"
        , "0501": "*劳动节"
        , "0504": "青年节"
        , "0512": "护士节"
        , "0601": "国际儿童节"
        , "0701": "建党节"
        , "0801": "建军节"
        , "0909 ": "毛泽东逝世纪念"
        , "0910": "中国教师节"
        , "0928 ": "孔子诞辰"
        , "1001": "*国庆节"
        , "1006 ": "老人节"
        , "1024": " 联合国日"
        , "1112 ": "孙中山诞辰纪念"
        , "1220 ": "澳门回归纪念"
        , "1224": "平安夜"
        , "1225": "圣诞节"
        , "1226 ": "毛泽东诞辰纪念"
    };
    /*农历节日 *表示放假日*/
    var lFtv = {
        "0101": "*春节"
        , "0115": "元宵节"
        , "0505": "*端午节"
        , "0707": "七夕情人节"
        , "0715 ": "中元节"
        , "0815": "*中秋节"
        , "0909": "重阳节"
        , "1208": "腊八节"
        , "1223 ": "小年"
        , "0100": "*除夕"
    , };

    /*特殊阶节假日*/
    var wFtv = {
        "0150  ": "世界麻风日"
        , "0520 ": " 国际母亲节"
        , "0530 ": " 全国助残日"
        , "0630  ": "父亲节"
        , "0716  ": "合作节"
        , "0730 ": " 被奴役国家周"
        , "0932  ": "国际和平日"
        , "0940 ": "国际聋人节 世界儿童日"
        , "0950  ": "世界海事日"
        , "1011  ": "国际住房日"
        , "1013  ": "国际减轻自然灾害日(减灾日)"
        , "1144 ": " 感恩节"
    };
    /*日期对象*/
    function dateObj(Z) {

        /*1900年小寒时刻为1月6日2:05:00，以这个节气时刻为基准，推算其它年份节气*/
        function sTerm(k, j) {
            var i = new Date((31556925974.7 * (k - 1900) + sTermInfo[j] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            return (i.getUTCDate())
        }
        /**
         * 传回农历 y年的总天数
         * @param {Object} y
         */
        function lYearDays(l) {
            var j, k = 348;
            for (j = 32768; j > 8; j >>= 1) {
                k += (lunarInfo[l - 1900] & j) ? 1 : 0
            }
            return (k + leapDays(l))
        }
        /**
         * 传回农历 y年的天干地支
         * @param {Object} y
         */
        function lEar(y) {
            return (str1.charAt(y % 10) + str2.charAt(y % 12))
        }
        /**
         * 传回农历 y年闰月的天数
         * @param {Object} y
         */
        function leapDays(y) {
            if (leapMonth(y)) {
                return ((lunarInfo[y - 1900] & 65536) ? 30 : 29)
            } else {
                return (0)
            }
        }

        /**
         * 传回农历 y年闰哪个月 1-12 , 没闰传回 0
         * @param {Object} y
         */
        function leapMonth(y) {
            return (lunarInfo[y - 1900] & 15)
        }

        function monthDays(j, i) {
            return ((lunarInfo[j - 1900] & (65536 >> i)) ? 30 : 29)
        }

        /**
         * 算出农历, 传入阳历日期对象, 传回农历日期对象(属性: .year .month .day .isLeap .yearCyl .dayCyl .monCyl)
         * @param {Object} objDate
         */
        function Lunar(objDate) {
            var i, leap = 0
                , temp = 0;
            /*从阳历1900.1.31日起，为第一个数据年的开始*/
            var m = new Date(1900, 0, 31);
            var o = (objDate - m) / 86400000;
            this.dayCyl = o + 40;
            this.monCyl = 14;
            for (i = 1900; i < 2050 && o > 0; i++) {
                temp = lYearDays(i);
                o -= temp;
                this.monCyl += 12
            }
            if (o < 0) {
                o += temp;
                i--;
                this.monCyl -= 12
            }
            this.year = i;
            this.yearCyl = i - 1864;
            leap = leapMonth(i);
            this.isLeap = false;
            for (i = 1; i < 13 && o > 0; i++) {
                if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
                    --i;
                    this.isLeap = true;
                    temp = leapDays(this.year)
                } else {
                    temp = monthDays(this.year, i)
                }
                if (this.isLeap == true && i == (leap + 1)) {
                    this.isLeap = false
                }
                o -= temp;
                if (this.isLeap == false) {
                    this.monCyl++
                }
            }
            if (o == 0 && leap > 0 && i == leap + 1) {
                if (this.isLeap) {
                    this.isLeap = false
                } else {
                    this.isLeap = true;
                    --i;
                    --this.monCyl
                }
            }
            if (o < 0) {
                o += temp;
                --i;
                --this.monCyl
            }
            this.month = i;
            this.day = o + 1
        }

        function G(i) {
            return i < 10 ? "0" + i : i
        }
        /**
         * 传入日期对象i,返回格式化日期
         * @param {Object} j,k
         */
        function format(j, k) {
            var i = j;
            return k.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g, function (l) {
                switch (l) {
                case "yyyy":
                    var m = "000" + i.getFullYear();
                    return m.substring(m.length - 4);
                case "dd":
                    return G(i.getDate());
                case "d":
                    return i.getDate().toString();
                case "MM":
                    return G((i.getMonth() + 1));
                case "M":
                    return i.getMonth() + 1
                }
            })
        }
        /**
         * 传入阴历数字号, 传回阴历显示一月中某一天汉字
         * @param {Object} j,i
         */
        function cDay(j, i) {
            var k;
            switch (j, i) {
            case 10:
                k = "初十";
                break;
            case 20:
                k = "二十";
                break;
            case 30:
                k = "三十";
                break;
            default:
                k = str3.charAt(Math.floor(i / 10));
                k += weekName.charAt(i % 10)
            }
            return (k)
        }
        this.date = Z;
        /*阳历日期置为不是今日*/
        this.isToday = false;
        this.isRestDay = false;
        /*阳历日期年*/
        this.solarYear = format(Z, "yyyy");
        /*阳历日期月*/
        this.solarMonth = format(Z, "M");
        /*阳历日期日*/
        this.solarDate = format(Z, "d");
        /*阳历日期一个星期的第几天*/
        this.solarWeekDay = Z.getDay();
        /*阳历日期星期几*/
        this.solarWeekDayInChinese = "星期" + weekName.charAt(this.solarWeekDay);
        /*传入阳历对象Z 得到阴历对象Y*/
        var Y = new Lunar(Z);
        /*阴历日期年*/
        this.lunarYear = Y.year;
        /*阴历日期生肖*/
        this.shengxiao = animal.charAt((this.lunarYear - 4) % 12);
        /*阴阴日期历月*/
        this.lunarMonth = Y.month;
        /*阴历日期闰月*/
        this.lunarIsLeapMonth = Y.isLeap;
        /*阴历日期闰月*/
        this.lunarMonthInChinese = this.lunarIsLeapMonth ? "闰" + solarMonth[Y.month - 1] : solarMonth[Y.month - 1];
        /*阴历日期某一天*/
        this.lunarDate = Y.day;
        /*阴历日期农历一月中某一天*/
        this.showInLunar = this.lunarDateInChinese = cDay(this.lunarMonth, this.lunarDate);
        /*阴历日期农历月份*/
        if (this.lunarDate == 1) {
            this.showInLunar = this.lunarMonthInChinese + "月"
        }

        /*阴历干支年月日*/
        this.ganzhiYear = lEar(Y.yearCyl);
        this.ganzhiMonth = lEar(Y.monCyl);
        this.ganzhiDate = lEar(Y.dayCyl++);

        /*节气计算*/
        this.jieqi = "";
        this.restDays = 0;
        if (sTerm(this.solarYear, (this.solarMonth - 1) * 2) == format(Z, "d")) {
            this.showInLunar = this.jieqi = solarTerm[(this.solarMonth - 1) * 2]
        }
        if (sTerm(this.solarYear, (this.solarMonth - 1) * 2 + 1) == format(Z, "d")) {
            this.showInLunar = this.jieqi = solarTerm[(this.solarMonth - 1) * 2 + 1]
        }
        if (this.showInLunar == "清明") {
            this.showInLunar = "清明节";
            this.restDays = 1
        }
        /*阳历节日计算*/
        this.solarFestival = sFtv[format(Z, "MM") + format(Z, "dd")];
        if (typeof this.solarFestival == "undefined") {
            this.solarFestival = ""
        } else {
            if (/\*(\d)/.test(this.solarFestival)) {
                this.restDays = parseInt(RegExp.$1);
                this.solarFestival = this.solarFestival.replace(/\*\d/, "")
            }
        }
        /*   特殊节日计算
            this.solarFestival = wFtv[format(Z, "MM") + format(Z, "dd")];
           if (typeof this.solarFestival == "undefined") {
               this.solarFestival = ""
           } else {
               if (/\*(\d)/.test(this.solarFestival)) {
                   this.restDays = parseInt(RegExp.$1);
                   this.solarFestival = this.solarFestival.replace(/\*\d/, "")
               }
           }
           */
        /*阴历节日计算*/
        this.showInLunar = (this.solarFestival == "") ? this.showInLunar : this.solarFestival;
        this.lunarFestival = lFtv[this.lunarIsLeapMonth ? "00" : G(this.lunarMonth) + G(this.lunarDate)];
        if (typeof this.lunarFestival == "undefined") {
            this.lunarFestival = ""
        } else {
            if (/\*(\d)/.test(this.lunarFestival)) {
                this.restDays = (this.restDays > parseInt(RegExp.$1)) ? this.restDays : parseInt(RegExp.$1);
                this.lunarFestival = this.lunarFestival.replace(/\*\d/, "")
            }
        }
        if (this.lunarMonth == 12 && this.lunarDate == monthDays(this.lunarYear, 12)) {
            this.lunarFestival = lFtv["0100"];
            this.restDays = 1
        }
        this.showInLunar = (this.lunarFestival == "") ? this.showInLunar : this.lunarFestival;
        this.showInLunar = (this.showInLunar.length > 4) ? this.showInLunar.substr(0, 2) + "..." : this.showInLunar
    }
    /*日历对象*/
    var sCalendarObj = (function () {
        var MonthJson = {};
        MonthJson.lines = 0;
        MonthJson.dateArray = new Array(42);

        /**
         * 计算阳历闰年 传回阳历是否润年
         * @param {Object} y
         */
        function sLeapYear(y) {
            return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0))
        }
        /**
         * 计算阳历每月天数 返回每月天数数组
         * @param {Object} y
         * @param {Object} y
         */
        function sMonthDays(y, m) {
            return [31, (sLeapYear(y) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m]
        }
        /**
         * 设置月份的某一天
         * @param {Object} b
         * @param {Object} c
         */
        function sSetDate(b, c) {
            b.setDate(b.getDate() + c);
            return b
        }

        /**
         * 传入日期对象b，得到阳历日期在日历中的显示对象
         * @param {Object} obj 日期对象
         */
        function getAMonthJson(obj) {
            var g = 0;
            var d = new dateObj(new Date(obj.solarYear, obj.solarMonth - 1, 1));
            var e = d.solarWeekDay;
            MonthJson.lines = Math.ceil((e + sMonthDays(obj.solarYear, obj.solarMonth - 1)) / 7);
            for (var f = 0; f < MonthJson.dateArray.length; f++) {
                if (d.restDays != 0) {
                    g = d.restDays
                }
                if (g > 0) {
                    d.isRest = true
                }
                if (e-- > 0 || d.solarMonth != obj.solarMonth) {
                    MonthJson.dateArray[f] = null;
                    continue
                }
                /*判断是否为今天*/
                var c = new dateObj(new Date());
                if (d.solarYear == c.solarYear && d.solarMonth == c.solarMonth && d.solarDate == c.solarDate) {
                    d.isToday = true
                }
                MonthJson.dateArray[f] = d;
                d = new dateObj(sSetDate(d.date, 1));
                g--
            }
        }
        return {
            init: function (obj) {
                getAMonthJson(obj)
            }
            , getJson: function () {
                return MonthJson
            }
        }
    })();
    /*#top的显示所选日期的年，月，干支年，生肖属相，是否为今天）*/
    /**
     * #top的显示所选日期的年，月，干支年，生肖属相，是否为今天
     * 
     */
    var topShow = (function () {
        var seleYear = getId("top").getElementsByTagName("SELECT")[0];
        var seleMonth = getId("top").getElementsByTagName("SELECT")[1];

        var eraYear = getId("top").getElementsByTagName("SPAN")[1];
        var animalYear = getId("top").getElementsByTagName("SPAN")[2];
        var btnToday = getId("top").getElementsByTagName("INPUT")[0];
        var time = getId("top").getElementsByTagName("SPAN")[0];

        function spanShow(dateObj) {
            eraYear.innerHTML = dateObj.ganzhiYear;
            animalYear.innerHTML = dateObj.shengxiao
        }

        function seleShow(dateObj) {
            seleYear[dateObj.solarYear - 1901].selected = true;
            seleMonth[dateObj.solarMonth - 1].selected = true
        }

        /*绘制当前的年，月，干支年，生肖，按钮在top上*/
        /**
         * 绘制当前所选的年，月，干支年，生肖，按钮在top上
         * 
         */
        function drawTop() {
            var year = seleYear.value;
            var month = seleMonth.value;
            var now = new dateObj(new Date(year, month - 1, 1));
            sCalendarObj.init(now);
            dayShow.draw();
            if (this == seleYear) {
                now = new dateObj(new Date(year, 3, 1));
                eraYear.innerHTML = now.ganzhiYear;
                animalYear.innerHTML = now.shengxiao
            }
            var today = new dateObj(new Date());
            btnToday.style.visibility = (year == today.solarYear && month == today.solarMonth) ? "hidden" : "visible"
        }

        /**
         * 绘制今日的年，月，干支年，生肖，按钮在top上
         * 
         */
        function drawTodayTop() {
            var obj = new dateObj(new Date());
            spanShow(obj);
            seleShow(obj);
            sCalendarObj.init(obj);
            dayShow.draw();
            btnToday.style.visibility = "hidden";
        }

        /*创建年月selected的option 选择option,绘制对应Top*/
        /**
         * 创建年月selected的option 选择option,绘制对应To
         * * @param {Object} year 所选年
         * * @param {Object} month 所选月
         */
        function selectYM(year, month) {
            for (var k = 1901; k < 2050; k++) {
                var option = creatEle("option");
                option.value = k;
                option.innerHTML = k;
                if (k == year) {
                    option.selected = "selected";
                }
                seleYear.appendChild(option)
            }
            for (var k = 1; k < 13; k++) {
                var option = creatEle("option");
                option.value = k;
                option.innerHTML = k;
                if (k == month) {
                    option.selected = "selected";
                }
                seleMonth.appendChild(option)
            }
            seleYear.onchange = drawTop;
            seleMonth.onchange = drawTop;
        }

        /**
         * 绘制日期对象在top上
         * * @param {Object} Obj 
         */
        function show(Obj) {

            setInterval(function () {
                var time1 = new Date();
                // 程序计时的月从0开始取值后+1
                var t = time1.getHours() + ":" + time1.getMinutes() + ":" + time1.getSeconds();
                time.innerHTML = t;
            }, 1000);

            selectYM(Obj.solarYear, Obj.solarMonth);
            eraYear.innerHTML = Obj.ganzhiYear;
            animalYear.innerHTML = Obj.shengxiao;
            btnToday.onclick = drawTodayTop;
            var today = new dateObj(new Date());
            btnToday.style.visibility = (Obj.solarYear === today.solarYear && Obj.solarMonth === today.solarMonth && Obj.solarDate === today.solarDate) ? "hidden" : "visible";
        }
        return {
            init: function (h) {
                show(h)
            }
            , reset: function (h) {
                seleShow(h)
            }
        }
    })();

    /*绘制#day部分将日期绘制在日历中*/
    var dayShow = (function () {

        /**
         * 绘制一个月日期对象对象在#day上
         * * @param {Object} dateObj 
         */
        function show(dateObj) {
            var objJson = sCalendarObj.getJson();
            var objJsonArray = objJson.dateArray;
            /*适应手机显示的日历尺寸*/
            if (document.body.clientWidth <= 600) {
                getId("day").style.height = objJson.lines * 28 + 2 + "px";
            } else {
                getId("day").style.height = objJson.lines * 38 + 2 + "px";
            }

            getId("day").innerHTML = "";
            for (var i = 0; i < objJsonArray.length; i++) {
                if (objJsonArray[i] == null) {
                    continue
                }
                var day = creatEle("div");
                if (dateObj) {
                    if (dateObj.solarDate === objJsonArray[i].solarDate) {
                        day.style.cssText = "border:1px solid #a5b9da;background:#c1d9ff"
                    }
                } else {
                    if (objJsonArray[i].isToday) {
                        day.style.cssText = "border:1px solid #a5b9da;background:#c1d9ff"
                    }
                }
                day.className = "cell";

                /*自适应手机，小于600px宽度下宽度*/
                if (document.body.clientWidth <= 600) {
                    day.style.left = (i % 7) * 42 + "px";
                } else {
                    day.style.left = (i % 7) * 60 + "px";
                }
                if (document.body.clientWidth <= 600) {
                    day.style.top = Math.floor(i / 7) * 28 + 2 + "px";
                } else {
                    day.style.top = Math.floor(i / 7) * 38 + 2 + "px";
                }

                var sDay = creatEle("div");
                sDay.className = "so";
                sDay.style.color = (i % 7 == 6 || i % 7 == 0 || objJsonArray[i].isRest) ? "#c60b02" : "#313131";
                sDay.innerHTML = objJsonArray[i].solarDate;
                day.appendChild(sDay);
                var lDay = creatEle("DIV");
                lDay.style.color = "#666";
                lDay.innerHTML = objJsonArray[i].showInLunar;
                day.appendChild(lDay);
                day.onmouseover = (function (f) {
                    return function (g) {
                        detailShow.show({
                            dateIndex: f
                            , cell: this
                        })
                    }
                })(i);
                day.onmouseout = function () {
                    detailShow.hide()
                };
                getId("day").appendChild(day)
            }
            var detailDiv = document.getElementById("footer");
            detailShow.init(detailDiv)
        }
        return {
            draw: function (obj) {
                show(obj)
            }
        }
    })();

    /**
     * 绘制时间发生目标的详细信息
     */
    var detailShow = (function () {
        var ele;
        /**
         * 正则表达式解析正则数据
         * * @param {Object} dateObj 
         * * @param {Object} dateObj
         */
        function regAnalyse(str, index) {
            if (arguments.length > 1) {
                var reg = /([.*+?^=!:${}()|[\]\/\\])/g
                    , str1 = "{".replace(reg, "\\$1")
                    , b = "}".replace(reg, "\\$1");
                var b = new RegExp("#" + str1 + "([^" + str1 + b + "]+)" + b, "g");
                if (typeof (index) == "object") {
                    return str.replace(b, function (g, i) {
                        var h = index[i];
                        return typeof (h) == "undefined" ? "" : h
                    })
                }
            }
            return str
        }

        /**
         * 传入目标日期对象，绘制详细信息
         * * @param {Object} Obj 
         */
        function dispalyDetail(obj) {
            var index = sCalendarObj.getJson().dateArray[obj.dateIndex];
            var cell = obj.cell;
            var str = "#{solarYear}&nbsp;年&nbsp;#{solarMonth}&nbsp;月&nbsp;#{solarDate}&nbsp;日&nbsp;#{solarWeekDayInChinese}";
            str += "&nbsp;&nbsp;<b>#{lunarMonthInChinese}月#{lunarDateInChinese}</b>";
            str += "&nbsp;&nbsp;#{ganzhiYear}年&nbsp;#{ganzhiMonth}月&nbsp;#{ganzhiDate}日";
            if (index.solarFestival != "" || index.lunarFestival != "" || index.jieqi != "") {
                str += "&nbsp;&nbsp;<b>#{lunarFestival} #{solarFestival} #{jieqi}</b>"
            }
            ele.innerHTML = regAnalyse(str, index);
            ele.style.display = "block"
        }

        function hideDetail() {
            ele.style.display = "none"
        }
        return {
            show: function (a) {
                dispalyDetail(a)
            }
            , hide: function () {
                hideDetail()
            }
            , init: function (a) {
                ele = a
            }
        }
    })();
    /*现在日期*/
    var nowDate = new dateObj(new Date());
    /**
     * 获取当前日期
     * * @param {Object} Obj 
     * return 当前日期
     */
    var getDate = (function () {
        if (window.op_calendar && window.op_calendar.year && window.op_calendar.month && window.op_calendar.day) {
            var C = new Date([window.op_calendar.year, window.op_calendar.month, window.op_calendar.day].join("/"));
            if ((C.toString().toLowerCase() !== "invalid date") && (Object.prototype.toString.apply(C).toLowerCase() === "[object date]")) {
                return new dateObj(C)
            } else {
                return nowDate
            }
        } else {
            return nowDate
        }
    })();
    /*初始化top框显示当前某一天日期信息*/
    topShow.init(getDate);
    /*初始化日历对象信息*/
    sCalendarObj.init(getDate);
    /*初始化day框每一天信息*/
    dayShow.draw(getDate);
})();