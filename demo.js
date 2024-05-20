document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(emailList);
        alert(JSON.stringify(emailList));
    };

    reader.readAsArrayBuffer(file);
});
