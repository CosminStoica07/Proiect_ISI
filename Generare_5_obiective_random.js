var c;
var blob = null
var xhr = new XMLHttpRequest()
xhr.open("GET", "date.csv")
xhr.responseType = "blob"
xhr.onload = function()
{
    blob = xhr.response
    var fr=new FileReader();
    fr.readAsText(blob);
    fr.onload=function(){
        c = fr.result;

        var textByLine = c.split("\n")
        var antet = textByLine[0] + '\n';
        textByLine.shift()
        const n = textByLine.length

        var arr = [];
        while(arr.length < 5){
            var r = Math.floor(Math.random() * n);
            if(arr.indexOf(r) === -1) arr.push(r);
        }

        for(var i = 0; i < 5; i++)
            antet += textByLine[arr[i]] + '\n';
        console.log(antet);



        var file = new Blob([antet], {type: 'plain/text'});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, 'small.csv');
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = 'small.csv';
            setTimeout(() => {  document.body.appendChild(a); a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);}, 2000);

        }
    }
}
xhr.send()