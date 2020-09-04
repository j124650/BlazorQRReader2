function DoWork() {


}

function setResult(a, b) {
}

var dotnetHelper = null;
var scanner = null;

function CreateScanner(p) {
    dotnetHelper = p;
    const video = document.getElementById('the-video');
    const labelResult = document.getElementById('theResult');

    scanner = new QrScanner(video, result => setResult(labelResult, result), error => {
        labelResult.textContent = "Nothing found";
        labelResult.style.color = 'inherit';
    });

    scanner.start();
}

function StopScanner() {
    if (scanner != null) {
        dotnetHelper = null;
        scanner.stop();
        scanner.destroy();
        scanner = null;
    }
}

function setResult(label, result) {

    label.textContent = result;
    WriteCSharpMessageToConsole(result);
}

window.WriteCSharpMessageToConsole = (txt) => {
    dotnetHelper.invokeMethodAsync('GetHelloMessage', txt)
        .then(message => console.log(txt));
}