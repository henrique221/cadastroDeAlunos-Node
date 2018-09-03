$( document ).ready(function() {
    // SUBMIT FORM
    $("#cadastro").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });
    function ajaxPost(){
        var formData = {
            nome : $("#nomeAluno").val(),
            curso :  $("#curso").val()
        }
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : window.location,
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(aluno) {
                $("#postResultDiv").addClass("alert alert-success")
                $("#postResultDiv").html("<p>" + 
                "Post Successfully! " +
                "Nome: " + aluno.nome + " " + "Curso: " + aluno.curso + "</p></div>"); 
                $("#postResultDiv").fadeOut(5000)
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
        resetData();
    }
    function resetData(){
        $("#nome").val("");
        $("#curso").val("");
    }
    
})