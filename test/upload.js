import FileClient from "../FileClient.js";

window.fileClient = new FileClient("http://192.168.1.22:8080/fileserver");

window.handleUpload = async function handleUpload() {
    const input = document.querySelector("#fileInput");
    const file = input.files[0];

    const status = document.querySelector("#status");
    if (!file) {
        alert("Please select a file first.");
        status.textContent = "No document selected";
        return;
    }
    status.textContent = "Uploading...";
    const body = await fileClient.upload(file).then(result => {
        console.log("Server response:", result);
    }).catch(err => {
        //console.log("calamardo: " + err);
        //console.error("calamardo: " + err);
        status.textContent = "Upload failed";
    });
        //console.log("don cangrejo: " + body)
        status.textContent = body.message
}

window.handleFileSelect = function handleFileSelect() {
    const input = document.querySelector("#fileInput");
    const file = input.files[0];
    const status = document.querySelector("#status");
    if (!file) {
        status.textContent = "No document selected";
        return;
    }
    status.textContent = "Ready to upload";
}