import FileClient from "../FileClient.js";

//window.fileClient = new FileClient("http://192.168.1.22:8080/fileserver");
//window.fileClient = new FileClient("http://localhost:8080/fileserver");
window.fileClient = new FileClient("https://polibius.ddns.net:443/fileserver");

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
  const body = await fileClient
    .upload(file)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);

      status.textContent = "Upload failed";
    });
  status.textContent = body.message;
};

window.handleFileSelect = function handleFileSelect() {
  const input = document.querySelector("#fileInput");
  const file = input.files[0];
  const status = document.querySelector("#status");
  if (!file) {
    status.textContent = "No document selected";
    return;
  }
  status.textContent = "Ready to upload";
};
