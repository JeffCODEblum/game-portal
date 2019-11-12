var URL = $("#url-div").data("url");
$( document ).ready(function() {
    $("#save-btn").click(function(e) {
        e.preventDefault();
        var title = $("#title-input").val();
        var description = $("#description-input").val();
        var body = $("#body-input").val();
        var directory = $("#directory-input").val();
        var payload = {};
        payload.title = title;
        payload.description = description;
        payload.body = body;
        payload.directory = directory;

        var url = URL + '/save-post';
        var id = $("#id-div").data('id');   
        $.ajax({
            type: 'POST',
            url: url + '/' + id,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(payload),
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            $.ajax({
                type: 'GET',
                url: URL + '/admin',
                contentType: 'html',
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();
                window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
            });
        });
    });

    $(".hide-comment-btn").click(function(e) {
        e.preventDefault();
        var id = $(e.target).data("id");

        $.ajax({
            type: 'POST',
            url: URL + '/hide-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            $.ajax({
                type: 'GET',
                url: URL + '/admin',
                contentType: 'html',
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();
                window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
            });
        }).fail(function(e) {
            console.log(e);
        });
    });

    $(".show-comment-btn").click(function(e) {
        e.preventDefault();
        var id = $(e.target).data("id");

        $.ajax({
            type: 'POST',
            url: URL + '/show-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            $.ajax({
                type: 'GET',
                url: URL + '/admin',
                contentType: 'html',
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();
                window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
            });
        }).fail(function(e) {
            console.log(e);
        });
    });

    $(".delete-comment-btn").click(function(e) {
        e.preventDefault();
        var id = $(e.target).data("id");

        $.ajax({
            type: 'DELETE',
            url: URL + '/delete-comment/' + id,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            $.ajax({
                type: 'GET',
                url: URL + '/admin',
                contentType: 'html',
                beforeSend: function (xhr) { 
                    xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
                }
            }).done(function(data) {
                var newDoc = document.open("text/html", "replace");
                newDoc.write(data);
                newDoc.close();
                window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
            });
        }).fail(function(e) {
            console.log(e);
        });
    });

    $("#cancel-btn").click(function(e) {
        e.preventDefault();
        $("#post-form").hide(); $.ajax({
            type: 'GET',
            url: URL + '/admin',
            contentType: 'html',
            beforeSend: function (xhr) { 
                xhr.setRequestHeader("Authorization", localStorage.getItem("jwt"));
            }
        }).done(function(data) {
            var newDoc = document.open("text/html", "replace");
            newDoc.write(data);
            newDoc.close();
            window.history.pushState({"html":"data","pageTitle":"admin"},"", URL + "/admin");
        });
    });
});