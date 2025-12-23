export default class FileClient {
  constructor(baseUrl, uploadUrl = "/upload", downloadUrl = "/download") {
    this.baseUrl = baseUrl;
    this.uploadUrl = uploadUrl;
    this.downloadUrl = downloadUrl;
  }
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(this.baseUrl + this.uploadUrl, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Upload failed:", error);
      return {
        message: "Upload failed!",
        error: error.message || "Server unreachable.",
      };
    }
  }

  async download(fileName, returnType = "arrayBuffer") {
    try {
      const response = await fetch(
        this.baseUrl + this.downloadUrl + "?filename=" + fileName,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        return { message: "Download failed!" };
      }

      const fileData = await response.blob();

      if (returnType === "blob") {
        const fileName = response.headers
          .get("Content-Disposition")
          ?.split("filename=")[1]
          ?.replace(/"/g, "");
        const urlObject = URL.createObjectURL(fileData);
        const a = document.createElement("a");
        a.href = urlObject;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(urlObject);
        return { message: "Download successful!" };
      }

      const arrayBuffer = await fileData.arrayBuffer();
      return arrayBuffer;
    } catch (error) {
      console.error("Download failed:", error);
      throw error;
    }
  }

  async selectFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    const file = await new Promise((resolve, reject) => {
      input.addEventListener("change", () => {
        resolve(input.files[0]);
      });
    });
    return file;
  }

  async getFileNames() {

    const response = await fetch(this.baseUrl + "/files", {
      method: "GET",
    });
    const obj = await response.json();
    return obj.fileNames;
  }
}
