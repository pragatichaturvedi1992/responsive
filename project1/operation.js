var SERVER_URL = 'http://dev.cs.smu.ca:9898';

// Save the record
function save(){
var name = $("#name").val();
 var address = $("#address").val();
 var phone = $("#phone").val(); 
 

    if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }
    if (address == '') {
        alert("Please enter the address of the university!");
        $("#address").focus();
        return false;
    }
    if (phone == '') {
        alert("Please enter the phone number of the university!");
        $("#phone").focus();
        return false;
    }
    var tokens = phone.split('-');
 
    for (var i = 0; i < tokens.length; i++) {
        if (isNaN(tokens[i])) {
            alert("Please use only numbers or hyphens!");
            $("#phone").focus();
            return false;
        }
    }
    var firstChar = address.trim().substr(0, 1);
 
    if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
    if (validCharForStreetAddress(address)) {
        alert("Address should contain letters!");
        $("#address").focus();
        return false;
    }
    var universityInfo = {
        "Name": document.getElementById("name").value ,
        "Address": document.getElementById("address").value ,
        "Phone": document.getElementById("phone").value ,
    };
 
        $.post(SERVER_URL + "/addUniversity",
                        universityInfo,
                        function (data) {
                        alert(data);
        });
 
}
function validCharForStreetAddress(c) {
    if(",#-/ !@$%^*(){}|[]\\".indexOf(c) >= 0){
        return true
    }
    var regExp = /[a-zA-Z]/g;
    if(!regExp.test(c)){
        return true
    }
}
 

// remove the record
function remove(){
var name = $("#name").val();
if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }
var universityInfo = {
            "Name": document.getElementById("name").value  };
    $.post(SERVER_URL + "/deleteUniversity",
                        universityInfo,
                        function (data) {
if(data['n']==0){
alert("Record Not Found");
}
else{
alert("Record deleted");
}
        });
 

        $("#name").val('');
        $("#address").val('');
        $("#phone").val('');
    return;
}

//show table 
function showTable(ele){
    $("#displayTable").html(
                    "   <tr>" +
                    "<th>Name</th>" +
                    "     <th>Address</th>" +
                    "     <th>Phone</th>" +
                    "   </tr>"
            );
    if(ele.id=="0"){
    var name = $("#search").val();
    console.log("tables")
    if (name == '') {
            alert("Please enter the name of the university!");
            $("#name").focus();
            return false;
        }
        var universityInfo = {
                    "Name": document.getElementById("search").value  };
        $.post(SERVER_URL + "/searchUniversity",
                                universityInfo,
                                function (data) {
                                var table = document.getElementById('displayTable');
                var universities = (data);
                if(universities.length==0){
                        alert("Invalid University")
                return;
                }
               
                for (var i = 0; i < universities.length; i++) {
                    var name = universities[i].Name;
                    var address = universities[i].Address;
                    var phone = universities[i].Phone; 
                    var r = table.insertRow();
                    r.insertCell(-1).innerHTML = name;
                    r.insertCell(-1).innerHTML = address;
                    r.insertCell(-1).innerHTML = phone; 
                }
                });
        }
        else{
        $.post(SERVER_URL + "/searchAllUniversity",
                                function (data) {
                                var table = document.getElementById('displayTable');
                var universities = (data);
        if(universities.length==0){
        alert("No Such university")
        return;
        }
               
                for (var i = 0; i < universities.length; i++) {
                    var name = universities[i].Name;
                    var address = universities[i].Address; 
                    var phone = universities[i].Phone; 
                    var r = table.insertRow();
                    r.insertCell(-1).innerHTML = name;
                    r.insertCell(-1).innerHTML = address;
                    r.insertCell(-1).innerHTML = phone;
                }
                });
        
        }
        
    }