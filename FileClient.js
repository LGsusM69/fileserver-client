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
                body: formData
            });
            const result = await response.json();
            return result;

        } catch(error) {
            console.log("Upload failed: " + error);
        }
        return {
                message: "Upload failed!",
                error: "Server unreachable."
            }
    }

    async download(filename, returnType = "arrayBuffer") {
        const response = await fetch(this.baseUrl + this.downloadUrl + "?filename=" + filename, {
            method: "GET"
        });
        const fileData = await response.blob();

        if(returnType === "blob") return fileData;
        
        const arrayBuffer = await fileData.arrayBuffer();
        return arrayBuffer;

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
}