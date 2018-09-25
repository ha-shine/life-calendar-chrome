const cogIcon = document.getElementById('cog-icon');

cogIcon.onclick = function(element) {
    modal.style.display = "block";
}

// calculate the remaining weeks with given momentjs date and life expectancy (in years)
// returns the total weeks remaining
function calculateRemainingWeeks(birthday, lifeExpectancy) {
    const now = moment();
    const weeksFromBirthday = moment.duration(now-birthday).asWeeks();
    const lifeExpectancyInWeeks = moment.duration({years: lifeExpectancy}).asWeeks();
    return Math.round(lifeExpectancyInWeeks - weeksFromBirthday);
}

// displaying of remainder boxes in the calendar box
const calendarBox = document.getElementById('calendar-box');
const boxHTML = '<div class="box"></div>';

function updateRemainderBoxes(num) {
    const boxesHTML = [...Array(num).keys()].map(() => boxHTML).join('');
    calendarBox.innerHTML = boxesHTML;
}

// total weeks indicator span
const weeksIndicator = document.getElementById('weeks-indicator');
function updateWeeksIndicator(weeks) { weeksIndicator.innerText = weeks; }

// form related functions
const modal = document.getElementById('popup-modal');
const birthdayField = document.getElementById('birthdayField');
const lifeExpectancyField = document.getElementById('lifeExpectancyField');
const saveButton = document.getElementById('save-button');

// close the modal if the user click outside of the window
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// update the number of boxes and weeks indicator
function updateUI() {
    const birthday = moment(birthdayField.value, 'YYYY-MM-DD');
    const lifeExpectancy = lifeExpectancyField.value;
    const totalWeeks = calculateRemainingWeeks(birthday, lifeExpectancy);
    updateRemainderBoxes(totalWeeks);
    updateWeeksIndicator(totalWeeks);
}

// save the data back into chrome storage
function saveData() {
    const birthday = birthdayField.value;
    const lifeExpectancy = lifeExpectancyField.value;

    chrome.storage.sync.set({birthday: birthday, lifeExpectancy: lifeExpectancy});
}

saveButton.onclick = function(element) {
    saveData();
    updateUI();
    modal.style.display = 'none';
}

// entry point
function init() {
    chrome.storage.sync.get(['birthday', 'lifeExpectancy'], function(values) {
        birthdayField.value = values.birthday;
        lifeExpectancyField.value = values.lifeExpectancy;

        updateUI();
    });
}
init();