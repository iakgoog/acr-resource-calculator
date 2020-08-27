let resourceIsToken = false;

function start() {
    const year = moment().year();
    const month = moment().month() + 1;
    const date = (() => {
        let result;
        if (moment().date() === moment().endOf('month')) {
            result = 1;
        } else {
            result = moment().date() + 1;
        }
        return result;
    })();
    const composedDate = `${year}-${month}-${date} 06:59:00.000`;
    const endTime = document.getElementById('endtime_input');
    endTime.value = composedDate;
}

function toggleResource() {
    if (resourceIsToken) {
        document.getElementById('resource_title').innerHTML = "Intel generation rate";
        document.getElementById('resource_input').value = 70;
        document.getElementById('hour_input').value = 5;
        document.getElementById('minute_input').value = 45;
        resourceIsToken = false;
    } else {
        document.getElementById('resource_title').innerHTML = "Helix Token generation rate";
        document.getElementById('resource_input').value = 100;
        document.getElementById('hour_input').value = 24;
        document.getElementById('minute_input').value = 0;
        resourceIsToken = true;
    }
}

function calculateIntel() {
    const resourceValue = document.getElementById('resource_input').value;
    const hourValue = document.getElementById('hour_input').value;
    const minuteValue = document.getElementById('minute_input').value;
    const endTimeValue = document.getElementById('endtime_input').value;
    const totalSeconds = ((parseInt(hourValue) * 60) + parseInt(minuteValue)) * 60;
    const resourcePerSecond = parseInt(resourceValue) / totalSeconds;

    const now = moment();
    const end = moment(endTimeValue);
    const duration = moment.duration(end.diff(now));
    const resourceValueToBeGenerated = duration.asSeconds() * resourcePerSecond;
    const showResult = document.querySelector('.result');
    showResult.innerHTML = resourceValueToBeGenerated.toFixed(2);
}

function calculateTime() {
    const resourceValue = document.getElementById('resource_input').value;
    const hourValue = document.getElementById('hour_input').value;
    const minuteValue = document.getElementById('minute_input').value;
    const eresourceValue = document.getElementById('eresource_input').value;
    const totalSeconds = ((parseInt(hourValue) * 60) + parseInt(minuteValue)) * 60;
    const resourcePerSecond = parseInt(resourceValue) / totalSeconds;

    const secondsToMeetExpectedIntel = parseInt(eresourceValue) / resourcePerSecond;
    const resultTime = moment().set('second', moment().seconds() + secondsToMeetExpectedIntel);
    const formattedSecondsToMeetExpectedIntel = moment.utc(secondsToMeetExpectedIntel*1000).format('HH:mm:ss');
    const showResult = document.querySelector('.result');
    showResult.innerHTML = `${resultTime.format('llll')} (${formattedSecondsToMeetExpectedIntel})`;
}
