$(() => {

    let timeScroll = 500; // ความเร็วในการเลื่อนของ scroll

    function focusField(element) {
        $(element).focus();
    };

    function showError(text, isBool) {
        if (isBool) {
            $('#height-error').html(text);
            focusField('#height');
        } else {
            $('#weight-error').html(text);
            focusField('#weight');
        }
    };

    function clearField() {
        $('#height-error').html('');
        $('#weight-error').html('');
    };

    function checkField(height, weight) {
        if (height == '') {
            showError('* กรุณากรอกข้อมูลส่วนสูง', true);
            return false;
        } else if (height <= 140) {
            showError('* ข้อมูลส่วนสูงต้องมากกว่า 140 ซม.', true);
            return false;
        } else if (height >= 220) {
            showError('* ข้อมูลส่วนสูงต้องน้อยกว่า 220 ซม.', true);
            return false;
        } else if (weight == '') {
            showError('* กรุณากรอกข้อมูลน้ำหนัก', false);
            return false;
        } else if (weight <= 30) {
            showError('* ข้อมูลน้ำหนักต้องมากกว่า 30 กก.', false);
            return false;
        } else if (weight >= 200) {
            showError('* ข้อมูลน้ำหนักต้องน้อยกว่า 200 กก.', false);
            return false;
        };
        return true;
    };

    function setElementActive(element) {
        $(element).addClass('active');
        $('html, body').animate({
            scrollTop: $(element).offset().top
        }, timeScroll);
    };

    function clearElementActive() {
        for (let i=1; i<=5; i++) {
            $('#bmi-' + i).removeClass('active');
        };
    };

    function checkBMI(bmi) {
        clearElementActive();
        if (bmi < 18.5) {
            setElementActive('#bmi-1');
            return 'น้ำหนักน้อย / ผอม';
        } else if (bmi >= 18.5 && bmi < 23) {
            setElementActive('#bmi-2');
            return 'ปกติ (สุขภาพดี)';
        } else if (bmi >= 23 && bmi < 25) {
            setElementActive('#bmi-3');
            return 'ท้วม / โรคอ้วนระดับ 1';
        } else if (bmi >= 25 && bmi < 30) {
            setElementActive('#bmi-4');
            return 'อ้วน / โรคอ้วนระดับ 2';
        } else if (bmi >= 30) {
            setElementActive('#bmi-5');
            return 'อ้วนมาก / โรคอ้วนระดับ 3';
        } else {
            return 'ไม่สามารถคำนวณได้';
        };
    };

    $('#btn-calculate').click((e) => {
        e.preventDefault();

        let height = $('#height').val();
        let weight = $('#weight').val();

        clearField();
        if (!checkField(height, weight)) {
            return;
        };

        height = height / 100; // แปลงหน่วยเป็นเมตร
        let bmi = weight / (height * height);

        $('#bmi-result').html(bmi.toFixed(2)); // แสดงเลขทศนิยม 2 ตำแหน่ง
        $('#bmi-status').html(checkBMI(bmi));
    });

    $('#btn-reset').click((e) => {
        e.preventDefault();

        if ($(document).scrollTop() > 0) {
            $('html, body').animate({
                scrollTop: 0
            }, timeScroll);
        };

        clearField();
        clearElementActive();
        $('#height').val('');
        $('#weight').val('');
        $('#bmi-result').html('');
        $('#bmi-status').html('');
    });

});