import FileClient from "../FileClient.js";

//window.fileClient = new FileClient("http://192.168.1.22:8080/fileserver");
//window.fileClient = new FileClient("http://localhost:8080/fileserver");
window.fileClient = new FileClient("https://polibius.ddns.net:443/fileserver");

window.handleDownload = async function handleDownload(name = null) {
  let fileName;
  
  if (name) {
    fileName = name;
  } else {
    const input = document.querySelector("#fileInput");
    fileName = input.value;
    if (!input.value) {
      alert("Please select a file first.");
      status.textContent = "No document selected";
      return;
    }
  }
  
  const status = document.querySelector("#status");
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
  
  const fileNames = await window.fileClient.getFileNames();
  console.log("aiba");
  console.log(fileNames);
  const tableBody = document.querySelector("#file-list");
  fileNames.forEach((fileName) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = fileName;
    row.appendChild(nameCell);
    const downloadCell = document.createElement("td");
    const downloadLink = document.createElement("a");
    downloadLink.innerText = "Download";
    downloadLink.href = "#";
    downloadLink.onclick = async (e) => {
      e.preventDefault();
      await handleDownload(fileName);
    };
    downloadCell.appendChild(downloadLink);
    row.appendChild(downloadCell);

    tableBody.appendChild(row);
  });
  
