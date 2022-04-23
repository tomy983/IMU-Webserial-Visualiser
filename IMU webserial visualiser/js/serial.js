let port, writer, currentData;

// Buffer sizes for displaying, extracting currentData and saving to csv
const currentDataBufferLength = 500;





// Default baud value
document.getElementById("baud").value = (localStorage.baud == undefined ? 500000 : localStorage.baud);





// sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




// Attempt to connect to serial port
//const startStopButton = document.getElementById('startStop');
//startStopButton.addEventListener("click", connectSerial());
window.connectSerial = async function connectSerial() {
    try {
        // Prompt user to select any serial port.
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: document.getElementById("baud").value });
        listenToPort();

        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

        writer = textEncoder.writable.getWriter();
    } catch {
        alert("Serial Connection Failed");
    }
}





// Send data via serial port
window.sendSerialLine = async function sendSerialLine() {
    dataToSend = document.getElementById("lineToSend").value;
    if (document.getElementById("addLine").checked == true) dataToSend = dataToSend + "\r\n";
    if (document.getElementById("echoOn").checked == true) appendToTerminal("> " + dataToSend);
    await writer.write(dataToSend);
    document.getElementById("lineToSend").value = "";
    //await writer.releaseLock();
}





// Catching data from port
async function listenToPort() {
    sleep(100);
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    // Listen to data coming from the serial device.
    while (true) {
        const { value, done } = await reader.read();
        // value is a string.
        if (value != "\n" && value != "\n\n") { 
            updateCsvBuffer(value);
            getCurrentData();
            
        }
    }
}





// Limit buffer size while removes beginning lines that are incomplete
function limitLines(buffer, maxLength) {
    if (buffer.length > maxLength){
        buffer = buffer.slice(buffer.length - maxLength);
        const pos = buffer.match(/\n/).index + 1;
        buffer = buffer.slice(pos);
    }
    return buffer;
}





// Get latest full line of data by checking through the latest datachunk
function getCurrentData() {
    if (csvBuffer.length > currentDataBufferLength){
        let currentDataBuffer = limitLines(csvBuffer, currentDataBufferLength);
        currentDataBuffer = currentDataBuffer.split("\n");
        // Extract latest line of data and split into array
        currentData = currentDataBuffer[currentDataBuffer.length-2].split(',').map(Number);
        window.currentData = currentData;
    }
}





// Buffer for saving CSV file
let csvBufferSize = 30*100*10*10;
let csvBuffer = '';
document.getElementById("csvBufferSize").value = csvBufferSize;
function updateCsvBuffer(newStuff) {
    csvBuffer += newStuff;
    csvBuffer = limitLines(csvBuffer, csvBufferSize);
}





window.clearBuffers = function clearBuffers(){
    csvBuffer = '';
    csvBuffer = '';
}





// Saving data as CSV
let csvName = "test";
window.saveCSV = function saveCSV(){
    csvName = window.prompt("Enter file name: ", csvName);
    /*/
    const now = new Date();
    filename += " " + now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear();
    filename += ", " + now.getUTCHours() + "-" + now.getUTCMinutes() + "-" + now.getUTCSeconds();
    //*/
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/csv;charset=utf-8,'+csvBuffer);
    pom.setAttribute('download', csvName);
    pom.click();
};