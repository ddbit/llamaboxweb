document.addEventListener('DOMContentLoaded', () => {
    const endpoint = '/gpuprices/output.json'; // Sostituisci con l'endpoint reale

    fetch(endpoint)
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching data:', error));

    function populateTable(data) {
        const tableBody = document.getElementById('gpu-table').getElementsByTagName('tbody')[0];

        data.forEach(gpu => {
            const row = tableBody.insertRow();

            row.insertCell(0).textContent = gpu.pricePerGB;
            row.insertCell(1).textContent = gpu.price;
            row.insertCell(2).textContent = gpu.gpuModel;
            row.insertCell(3).textContent = gpu.vramCapacity;
            row.insertCell(4).textContent = gpu.warranty;
            row.insertCell(5).textContent = gpu.clockSpeedBoost;
            row.insertCell(6).textContent = gpu.technology;
            row.insertCell(7).textContent = gpu.condition;
            row.insertCell(8).textContent = gpu.formFactor;
            row.insertCell(9).textContent = gpu.flops;
            row.insertCell(10).textContent = gpu.nvlink ? 'Yes' : 'No';
            row.insertCell(11).textContent = gpu.powerConsumption;
            row.insertCell(12).innerHTML = `<a href="${gpu.affiliateLink}" target="_blank">Link</a>`;
        });
    }
});
