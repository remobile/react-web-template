const moment = require('moment');

module.exports = {
    createDateData (start, end) {
        let date = {};
        let iy = start.year(), im = start.month() + 1, id = start.date();
        let ey = end.year(), em = end.month() + 1, ed = end.date();
        for (let y = iy; y <= ey; y++) {
            let month = {};
            let mm = [0, 31, (!(y % 4) & (!!(y % 100))) | (!(y % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let iim = (y === iy) ? im : 1;
            let eem = (y === ey) ? em : 12;
            for (let m = iim; m <= eem; m++) {
                let day = [];
                let iid = (y === iy && m === im) ? id : 1;
                let eed = (y === ey && m === em) ? ed : mm[m];
                for (let d = iid; d <= eed; d++) {
                    day.push(d + '日');
                }
                month[m + '月'] = day;
            }
            date[y + '年'] = month;
        }
        return date;
    },
    createMonthData (start, end) {
        let date = [];
        let iy = start.year(), im = start.month() == 0 ? start.month() + 1 : start.month();
        let ey = end.year(), em = end.month() + 1;
        for (let y = iy; y <= ey; y++) {
            let month = {};
            let iim = (y === iy) ? im : 1;
            let eem = (y === ey) ? em : 12;
            for (let m = iim; m <= eem; m++) {
                month.push(m + '月');
            }
            date[y + '年'] = month;
        }
        return date;
    },
    createTimeData (start, end, date, hasSeconds) {
        const d = date.startOf('day');
        const isStart = d.isSame(moment(start).startOf('day'));
        const isEnd = d.isSame(moment(end).startOf('day'));
        let time = {};
        let ih = start.hour(), it = start.minute(), is = start.second();
        let eh = end.hour(), et = end.minute(), es = start.second();
        let iih = isStart ? ih : 0;
        let eeh = isEnd ? eh : 24;

        for (let h = iih; h < eeh; h++) {
            let minute = {};
            let iit = (isStart && h === ih) ? it : 0;
            let eet = (isEnd && h === eh) ? et : 60;
            for (let t = iit; t < eet; t++) {
                if (!hasSeconds) {
                    minute.push(t + '分');
                } else {
                    let second = [];
                    let iis = (isStart && h === ih && t === it) ? is : 1;
                    let ees = (isEnd && h === eh && t === et) ? es : 60;
                    for (let s = iis; s <= ees; s++) {
                        second.push(s + '秒');
                    }
                    minute[t + '分'] = second;
                }
            }
            time[h + '时'] = minute;
        }
        return time;
    },
    showDatePicker (Picker, start, end, selected) {
        return new Promise(async(resolve) => {
            const selectedValue = [selected.year() + '年', (selected.month() + 1) + '月', selected.date() + '日'];
            const pickerData = this.createDateData(start, end);
            Picker(pickerData, selectedValue, '选择日期').then((value) => {
                const time = moment(value.join(''), 'YYYY年M月D日');
                const date = moment(time.year() + '年' + (time.month() + 1) + '月' + time.date() + '日' + selected.hour() + '时' + selected.minute() + '分', 'YYYY年MM月DD日HH时mm分');
                resolve(date);
            });
        });
    },
    showTimePicker (Picker, start, end, selected, hasSeconds) {
        return new Promise(async(resolve) => {
            const selectedValue = [selected.hour() + '时', selected.minute() + '分', selected.second() + '秒'];
            const pickerData = this.createTimeData(start, end, selected, hasSeconds);
            Picker(pickerData, selectedValue, '选择时间').then((value) => {
                const time = moment(value.join(''), 'HH时mm分');
                const date = moment(selected.year() + '年' + (selected.month() + 1) + '月' + selected.date() + '日' + time.hour() + '时' + time.minute() + '分', 'YYYY年MM月DD日HH时mm分');
                resolve(date);
            });
        });
    },
    timeConversion (timelong) {
        const ss = parseInt((timelong % 3600) % 60);
        const mm = parseInt((timelong % 3600) / 60);
        const hh = parseInt(timelong / 3600);
        if (timelong < 60) {
            return (ss + '秒');
        } else if (timelong < 3600) {
            return (mm + '分' + ss + '秒');
        } else {
            return (hh + '小时' + mm + '分' + ss + '秒');
        }
    },
};
