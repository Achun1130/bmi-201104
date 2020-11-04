var testBtn = document.querySelector('.p-test__btn');
var test = document.querySelector('.p-test');
var text = document.querySelector('.p-test__btn__text');
var title = document.querySelector('.p-test__title');
var list = document.getElementById('listId');
var bmiArr = JSON.parse(localStorage.getItem('BMI')) || [];
var type = '';
var size = '';
var time = '';

bmiList();
testBtn.addEventListener('click', calculate, false);
list.addEventListener('mouseover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.nodeName !== 'A') { return; }
    e.target.innerText = 'remove_circle'
});
list.addEventListener('mouseout', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.nodeName !== 'A') { return; }
    e.target.innerText = 'remove_circle_outline'
});
list.addEventListener('click', delList, false);

function calculate(e) {
    e.preventDefault();
    var height = document.getElementById('height');
    var weight = document.getElementById('weight');

    // init
    if (test.classList.length === 2) {
        height.value = '';
        weight.value = '';
        test.className = 'p-test';
        text.textContent = '看結果';
        title.textContent = '';
        return;
    }

    height = height.value;
    weight = weight.value;
    if (height === '' || weight === '') {
        alert('請輸入身高及體重');
        return;
    }

    height = parseFloat(height);
    weight = parseFloat(weight);
    if (height === 0 || weight === 0) {
        alert('身高體重不得為0');
        return;
    }

    height = Math.round(height * 100) / 100;
    weight = Math.round(weight * 100) / 100;
    heightM = height * .01;
    var bmi = weight / (heightM * heightM)
    bmi = bmi.toFixed(2);

    defBmi(bmi);
    getDate();
    addList(height, weight, bmi, type, size, time);
}

function defBmi(num) {
    if (num < 18.5) {
        test.classList.add('p-test--sm')
        text.textContent = num;
        title.textContent = '過輕';
        size = 'sm';
        type = '過輕'
        return type, size;
    } else if (18.5 <= num && num < 25) {
        test.classList.add('p-test--md')
        text.textContent = num;
        title.textContent = '理想';
        size = 'md';
        type = '理想'
        return type, size;
    } else if (25 <= num && num < 30) {
        test.classList.add('p-test--lg')
        text.textContent = num;
        title.textContent = '過重';
        size = 'lg';
        type = '過重'
        return type, size;
    } else if (30 <= num && num < 35) {
        test.classList.add('p-test--xl')
        text.textContent = num;
        title.textContent = '輕度肥胖';
        size = 'xl';
        type = '輕度肥胖'
        return type, size;
    } else if (35 <= num && num < 40) {
        test.classList.add('p-test--xl')
        text.textContent = num;
        title.textContent = '中度肥胖';
        size = 'xl';
        type = '中度肥胖'
        return type, size;
    } else if (num >= 40) {
        test.classList.add('p-test--2l')
        text.textContent = num;
        title.textContent = '重度肥胖';
        size = '2l';
        type = '重度肥胖'
        return type, size;
    }
}

function addList(cm, kg, getBmi, getType, getSize, getTime) {
    bmiArr.push({
        height: cm,
        weight: kg,
        bmi: getBmi,
        type: getType,
        size: getSize,
        time: getTime
    });
    var bmiStr = JSON.stringify(bmiArr);
    localStorage.setItem('BMI', bmiStr);
    bmiList();
}

function bmiList() {
    var listInit = document.getElementById('listInitId');
    var str = '';

    if (bmiArr.length === 0) {
        listInit.textContent = '- - 無紀錄 - -';
    } else {
        listInit.textContent = '';
    }

    var bmiLen = bmiArr.length;
    for (var i = 0; i < bmiLen; i++) {
        str += '<tr class="p-list p-list--' + bmiArr[i].size + '">\
                            <td class="p-list__item" width="120">' + bmiArr[i].type + '</td>\
                            <td class="p-list__item"><span class="p-list__small">BMI</span>' + bmiArr[i].bmi + '</td>\
                            <td class="p-list__item"><span class="p-list__small">weight</span>' + bmiArr[i].weight + 'kg</td>\
                            <td class="p-list__item"><span class="p-list__small">height</span>' + bmiArr[i].height + 'cm</td>\
                            <td class="p-list__item justify-content-center"><span class="p-list__small">' + bmiArr[i].time + '</span></td>\
                            <td class="p-list__item"><a href="#" class="material-icons p-list__item__btn" data-num="' + i + '">remove_circle_outline</a>\
                        </tr>';
    }

    list.innerHTML = str;
}

function getDate() {
    var today = new Date();
    var date = today.getDate().toString();
    var month = (today.getMonth() + 1).toString();
    var year = today.getFullYear().toString();

    if (date.length === 1) {
        date = '0' + date;
    }

    if (month.length === 1) {
        date = '0' + date;
    }

    time = month + '-' + date + '-' + year;
    return time;
}

function delList(e) {
    e.preventDefault();
    var num = e.target.dataset.num;
    bmiArr.splice(num, 1);
    var bmiStr = JSON.stringify(bmiArr);
    localStorage.setItem('BMI', bmiStr);
    bmiList();
}