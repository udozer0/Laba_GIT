$(document).ready(function() {
    let USER = new URLSearchParams(window.location.search).get('USER');
    document.getElementById("user").value=USER;
    let ch = localStorage.getItem('check');
    let b=0;
    if (ch==="true") {
        let b = parseInt(localStorage.getItem('change'));
        document.getElementById("sendrequest").style.display = "none";
        document.getElementById("changerequest").style.display = "block";
        document.getElementById("zaya").innerHTML="Изменение заявки номер " + (b+1);
        $.getJSON('../data/data.json', function(data) {
            for (let a in data) {
                if(data[a].username===USER) {
                    let count=1;
                    for (let c in data[a].requests[b]) {
                        document.getElementById("r"+count).value=data[a].requests[b][c];
                        count++;
                    }
                }
            }
        });
    }
    $("#sendrequest").click(function(){
        $('.error').text('');
        const form = document.getElementById('request');
        let formData = new FormData(form);
        $.ajax({
            url: '../php/request.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success) {
                    let url = `account.html?USER=${USER}`;
                    window.location.href = url;
                } else {
                    if (data.r1) {
                    document.getElementById('r1_error').textContent = data.r1;
                    }
                    if (data.r2) {
                    document.getElementById('r2_error').textContent = data.r2;
                    }
                    if (data.r3) {
                    document.getElementById('r3_error').textContent = data.r3;
                    }
                    if (data.r4) {
                    document.getElementById('r4_error').textContent = data.r4;
                    }
                    if (data.r5) {
                    document.getElementById('r5_error').textContent = data.r5;
                    }
                    if (data.repeat) {
                    document.getElementById('r5_error').textContent = data.repeat;
                    }
                }
            }
        });
    });
    $("#changerequest").click(function(){
        $('.error').text('');
        const form = document.getElementById('request');
        let formData = new FormData(form);
        let c = parseInt(localStorage.getItem('change'));
        formData.append('number',c);
        $.ajax({
            url: '../php/change.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success) {
                    let url = `account.html?USER=${USER}`;
                    window.location.href = url;
                } else {
                    if (data.r1) {
                    document.getElementById('r1_error').textContent = data.r1;
                    }
                    if (data.r2) {
                    document.getElementById('r2_error').textContent = data.r2;
                    }
                    if (data.r3) {
                    document.getElementById('r3_error').textContent = data.r3;
                    }
                    if (data.r4) {
                    document.getElementById('r4_error').textContent = data.r4;
                    }
                    if (data.r5) {
                    document.getElementById('r5_error').textContent = data.r5;
                    }
                    if (data.repeat) {
                    document.getElementById('r5_error').textContent = data.repeat;
                    }
                }
            }
        });
    });
    $("#cancel").click(function(){
        let url = `account.html?USER=${USER}`;
        window.location.href = url;
    });
});
