$(document).ready(function() {
    let USER = new URLSearchParams(window.location.search).get('USER');
    $('#user').text(USER);
    $.getJSON('../data/data.json', function(data) {
        for (let a in data) {
            if(data[a].username===USER) {
                if (data[a].av!=="") {
                    document.getElementById("avatar").style.content = "url('../pics/" +data[a].av;
                }
                for (let b in data[a].requests) {
                    let c=data[a].requests[b];
                        var button = document.createElement('button');
                        button.type = 'button';
                        button.id = 'change_' + b;
                        button.innerHTML = 'Изменить заявку';
                        button.className = 'change';
                        button.onclick = function() {
                            localStorage.setItem("check", true);
                            localStorage.setItem("change", b);
                            let url = `request.html?USER=${USER}`;
                            window.location.href = url;
                        };
                        var button2 = document.createElement('button');
                        button2.type = 'button';
                        button2.id = 'del_' + b;
                        button2.innerHTML = 'Удалить заявку';
                        button2.className = 'del';
                        button2.onclick = function() {
                            if(confirm("Вы уверены что хотите удалить заявку?")) {
                                let formData = new FormData();
                                formData.append('USER',USER);
                                formData.append('number',b);
                                $.ajax({
                                    url: '../php/del.php',
                                    type: 'POST',
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    success: function(ndata) {
                                        if (ndata.success) {
                                            location.reload();
                                        } else {
                                        }
                                    }
                                });
                            }
                        };
                    var tr = $('<tr>').append(
                        $('<th>').text(Number(b)+1),
                        $('<th>').text(c.r1),
                        $('<th>').text(c.r2),
                        $('<th>').text(c.r3),
                        $('<th>').text(c.r4),
                        $('<th>').text(c.r5),
                        $('<th>').append(button,button2)
                    );
                    $('#tabl').append(tr);
                }
            }
        }
    });
    $("#toauth_button").click(function(){
        window.open('../index.html', "_self");
    });
    $("#newrequest").click(function(){
        localStorage.setItem("check", false);
        let url = `request.html?USER=${USER}`;
        window.location.href = url;
    });
    const fileUploader = document.getElementById('fileupload');
    fileUploader.addEventListener('change', (event) => {
        const files = event.target.files;
        console.log('files', files);
        const form = document.getElementById('awa');
        let formData = new FormData(form);
        formData.append('USER',USER);
        $.ajax({
            url: '../php/avatar.php',
            type: 'POST',
            data: formData,
            cache:false, 
            contentType: false, 
            processData: false,
            success: function(ndata) {
                if (ndata.success) {
                    location.reload();
                } else {
                }
            }
        });
    });
});
