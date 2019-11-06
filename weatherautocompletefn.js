var obj1;
var city;
function getweather() {
    city = document.getElementsByName("cityname")[0].value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Typical action to be performed when the document is ready:
            ul = document.getElementById("element");
            ul.parentNode.removeChild(ul);
            document.getElementById("display").innerHTML = "The weather at " + city + " is";
            obj1 = JSON.parse(xhttp.responseText);
            document.getElementById("humidity").innerHTML = "Humidity:"
            document.getElementById("chhumid").innerHTML = obj1.main.humidity;
            document.getElementById("pressure").innerHTML = "Pressure:"
            document.getElementById("chpressure").innerHTML = obj1.main.pressure;
            document.getElementById("temperature").innerHTML = "Temperature:"
            document.getElementById("chtemp").innerHTML = obj1.main.temp;
            document.getElementById("type").innerHTML = "Type:"
            document.getElementById("chtype").innerHTML = obj1.weather[0].main;
            document.getElementById("description").innerHTML = "Description:"
            document.getElementById("chdesc").innerHTML = obj1.weather[0].description;
        }
    };
    xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a3b15be8937e2850e67a5cc0c7e2d052", true);
    xhttp.send();

}
var data=[];
function getdata() {
   
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Typical action to be performed when the document is ready:
            obj2 = JSON.parse(xhttp.responseText); 
            for (i = 0; i < obj2.length; i++) {
                data[i] = obj2[i].name;
            }
            }
    };
    xhttp.open("GET", "data/city.list.json" , true);
    xhttp.send();

}
document.onload = getdata();
var filtereddata = [];
var input;
function getfilterdata() {

     input = document.getElementById("cityentry").value;
    inputuppercase = input.charAt(0).toUpperCase() + input.slice(1);   
    filtereddata = data.filter(word => word.startsWith(input) || word.startsWith(inputuppercase) );
    createlist();
   
}

var ul;
function createlist()
{
     ul = document.getElementById("element");
    if (ul != null )
    {
        ul.parentNode.removeChild(ul);
    }
        var uldiv = document.getElementById("autocomplete");
        
        var ul = document.createElement("UL");
    if ( input == "") {
        ul.parentNode.removeChild(ul);
    }
        uldiv.appendChild(ul);
        ul.setAttribute("id", "element");
    var location = document.getElementById("cityentry");
        for (i = 0; i < 10; i++) {
            if (typeof (filtereddata[i]) != 'undefined') {
                var list = document.createElement("LI");
                list.innerHTML = filtereddata[i];
                ul.appendChild(list);
                
                list.addEventListener("click", function () {
                    location.value = this.innerHTML;
                }
                    );
                
            }
        }  
}
