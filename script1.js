function toreg() {
    document.getElementById("authorization").style.display = "none";
    document.getElementById("registration").style.display = "block";
}

function toauth() {
    document.getElementById("registration").style.display = "none";
    document.getElementById("authorization").style.display = "block";
}

$("#button_1").click(function() {
    const form = document.getElementById('authorization');
    document.getElementById('username_logerr').textContent = "";
    document.getElementById('psw_logerr').textContent = "";
    const formData = new FormData(form);
    
    $.ajax({
        url: 'php/login.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.success) {
                const USER = document.getElementById("username").value;
                let url = `html/account.html?USER=${USER}`;
                window.location.href = url;
            } else {
                if (data.username) {
                document.getElementById('username_logerr').textContent = data.username;
                }
                if (data.psw) {
                document.getElementById('psw_logerr').textContent = data.psw;
                }
            }
        }
    });
});

$("#button_3").click(function() {
    const form = document.getElementById('registration');
    $('.error').text('');
    const formData = new FormData(form);

    $.ajax({
        url: 'php/reg.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.success) {
                location.reload();
            } else {
                if (data.email) {
                document.getElementById('email_error').textContent = data.email;
                }
                if (data.age) {
                document.getElementById('age_error').textContent = data.age;
                }
                if (data.username) {
                document.getElementById('username_error').textContent = data.username;
                }
                if (data.psw) {
                document.getElementById('psw_error').textContent = data.psw;
                }
                if (data.pswrep) {
                document.getElementById('pswrep_error').textContent = data.pswrep;
                }
            }
        }
    });
});