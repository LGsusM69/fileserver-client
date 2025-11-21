import FileClient from "../FileClient.js";

//window.fileClient = new FileClient("http://192.168.1.22:8080/fileserver");
//window.fileClient = new FileClient("http://localhost:8080/fileserver");
window.fileClient = new FileClient("https://polibius.ddns.net:443/fileserver");

window.handleDownload = async function handleDownload() {
  const input = document.querySelector("#fileInput");
  const fileName = input.value;

  const status = document.querySelector("#status");
  if (!input.value) {
    alert("Please select a file first.");
    status.textContent = "No document selected";
    return;
  }
  status.textContent = "Downloading...";
  const body = await fileClient
    .download(fileName, "blob")
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
  const fileName = input.value;
  const status = document.querySelector("#status");
  if (fileName === "") {
    status.textContent = "No document selected";
    return;
  }
  status.textContent = "Ready to download";
};
