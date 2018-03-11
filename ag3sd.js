
var $scope = {};
var prev = "";
//console.log(typeof $scope.obj);
//interpolate($scope);

function init() {
    try {
    interpolate($scope);
    agrepeat();
    myinter($scope);
    

    } catch (error) {
        //console.log(error);    
    }
}



try {
    document.querySelectorAll("[agmodel]")[0].addEventListener("keyup",function(){
        // alert("l");
         var bind=document.querySelectorAll("[agmodel]")[0];
         var attr = bind.getAttribute("agmodel");
         //console.log(bind.value);
         $scope[""+attr+""]=bind.value;
         myinter($scope);
         //interpolate($scope);
     });
} catch (error) {
    //console.log(error);
}

 
function myinter(obj) {

    Object.keys(obj).forEach(function (item) {
        //console.log(obj[''+item+'']);
        //console.log(''+item+'');
        //console.log(prev);
        if (typeof obj['' + item + ''] == "object") {
            var h = item + ".";
            prev += h;

            myinter(obj['' + item + '']);

            prev = prev.slice(0, -h.length);
        }
        else {
            //console.log("{{" + prev + "" + item + "}}");
            try {
                document.querySelectorAll("[id*=\'{{" + prev + "" + item + "}}\']").forEach(function(element){
                        element.innerHTML=obj['' + item + ''];
                });
            } catch (error) {
                console.log(error);
            }
           
           
        }

    });

}




function agrepeat()
{

    var rep=document.querySelectorAll("[agrepeat]")
    
    for ( l=rep.length-1;l>=0;l--) {
        //console.log(rep.length);
        if(typeof rep.length=="number" && rep.length>0);
        repeat(l);
    }

}

function repeat(l) {
    
       // console.log(l);
        var elem = document.querySelectorAll("[agrepeat]")[l];
        var text = elem.getAttribute("agrepeat");
        // console.log(elem);
        for (i in $scope['' + text + '']) {
            clone = elem.cloneNode(true)

            //console.log(i);
            elem.parentNode.appendChild(clone);
            // rod("{{i.name}}","{{coll."+i+".name}}");
            //console.log( clone.children.length);
            for (var j = 0; j < clone.children.length; j++) {

                var str = clone.children[j].innerHTML;

                str = str.replace(text, text + "." + i);

                clone.children[j].innerHTML = str;
                //console.log(str);
            }

        }
        elem.parentNode.removeChild(elem);
        interpolate($scope);
    
}

function interpolate(obj) {
    Object.keys(obj).forEach(function (item) {
        if (typeof obj['' + item + ''] == "object") {
            var h = item + ".";
            prev += h;

            interpolate(obj['' + item + '']);

            prev = prev.slice(0, -h.length);
        }
        else{
        //console.log(obj[''+item+'']);
         //console.log(''+item+'');

        //console.log(prev);
        rod("{{" + prev + "" + item + "}}", obj['' + item + '']);
        //console.log(typeof item);
        }
       
    });

}

function rod(pattern, string) {
    //alert("in rod");
    Array.from(document.querySelectorAll("body, body *:not(script):not(noscript):not(style)"))
        .forEach(someNode => Array.from(someNode.childNodes)
            .filter(childNode => childNode.nodeType == 3)
            .forEach(textNode => textNode.textContent = textNode.textContent.replace(pattern, string)));
}