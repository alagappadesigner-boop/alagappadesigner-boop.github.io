// --- BATCH MANAGEMENT TRACKING SYSTEM ---

// Function to automatically capture form inputs and save them to a running log
function logReceiptData() {
    const record = {
        receiptNo: document.getElementById('receiptNo')?.value || 'N/A',
        date: document.getElementById('joiningDate')?.value || new Date().toLocaleDateString(),
        studentName: document.getElementById('name')?.value || 'N/A',
        phone: document.getElementById('phone')?.value || 'N/A',
        course: document.getElementById('course')?.value || 'N/A',
        totalFee: document.getElementById('amount')?.value || '0',
        paidAmount: document.getElementById('paidAmount')?.value || '0',
        paymentMode: document.querySelector('input[name="payment"]:checked')?.value || 'Cash'
    };

    // Grab existing records from browser memory, add new record, and save it back
    let currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
    currentRecords.push(record);
    localStorage.setItem('receiptLogs', JSON.stringify(currentRecords));
}

// Hook into your existing Print button action to auto-save data seamlessly
document.getElementById('printBtn').addEventListener('click', () => {
    logReceiptData();
});

// Hook into your existing Download button action as well so nothing slips past
document.getElementById('download').addEventListener('click', () => {
    logReceiptData();
});

// Excel CSV compilation and download function
document.getElementById('exportExcel').addEventListener('click', () => {
    const currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
    
    if (currentRecords.length === 0) {
        alert("No receipt records found for this batch! Print or download some receipts first.");
        return;
    }

    // Set up standard spreadsheet headers
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Receipt No,Date,Student Name,Phone,Course,Total Fee,Amount Paid,Payment Mode\n";

    // Clean and append each logged data row
    currentRecords.forEach(rec => {
        let row = [
            `"${rec.receiptNo.replace(/"/g, '""')}"`,
            `"${rec.date.replace(/"/g, '""')}"`,
            `"${rec.studentName.replace(/"/g, '""')}"`,
            `"${rec.phone.replace(/"/g, '""')}"`,
            `"${rec.course.replace(/"/g, '""')}"`,
            `"${rec.totalFee}"`,
            `"${rec.paidAmount}"`,
            `"${rec.paymentMode}"`
        ].join(",");
        csvContent += row + "\n";
    });

    // Create a virtual download anchor link element and trigger it
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Receipt_Records_Batch_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);

    // Prompt if they want to start a new batch
    if (confirm("Records successfully exported! Would you like to clear the history log to start a fresh batch?")) {
        localStorage.removeItem('receiptLogs');
    }
});
