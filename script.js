Here is the complete, clean JavaScript code integrating form validations, live data logging, dynamic receipt rendering, custom missing validation messages, conversion of numbers to words, and seamless downloads/exports.

```javascript
// --- 1. UTILITY: NUMBER TO WORDS ---
function convertNumberToWords(amount) {
    if (amount === 0) return 'Zero';
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if ((amount = amount.toString()).length > 9) return 'Overflow';
    let n = ('000000000' + amount).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return ''; 
    
    let str = '';
    str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += n[5] != 0 ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    
    return str.trim() + ' Only';
}

// --- 2. FORM VALIDATION ENGINE ---
function validateReceiptForm() {
    const fields = [
        { id: 'receiptNo', name: 'Receipt Number' },
        { id: 'name', name: 'Student Name' },
        { id: 'phone', name: 'Phone Number' },
        { id: 'course', name: 'Course' },
        { id: 'batch', name: 'Batch / Year Details' },
        { id: 'paidAmount', name: 'Amount Paid' },
        { id: 'installment', name: 'Installment' }
    ];

    for (let field of fields) {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            alert(`⚠️ Missing Required Information: "${field.name}" is required.`);
            if (element) element.focus();
            return false;
        }
    }

    const paymentMode = document.querySelector('input[name="payment"]:checked')?.value || 'Cash';
    if (paymentMode !== 'Cash') {
        const txElement = document.getElementById('transactionId');
        if (!txElement || !txElement.value.trim()) {
            alert('⚠️ Missing Required Information: "Transaction ID" is required for non-cash payments.');
            if (txElement) txElement.focus();
            return false;
        }
    }

    return true;
}

// --- 3. SYNC: UI TO PRINT VIEW ---
function syncPrintPreviews() {
    document.getElementById('print_receiptNo').innerText = document.getElementById('receiptNo').value;
    document.getElementById('print_name').innerText = document.getElementById('name').value || 'N/A';
    document.getElementById('print_phone').innerText = document.getElementById('phone').value || 'N/A';
    document.getElementById('print_course').innerText = document.getElementById('course').value || 'N/A';
    document.getElementById('print_batch').innerText = document.getElementById('batch').value || 'N/A';
    document.getElementById('print_paidAmount').innerText = document.getElementById('paidAmount').value ? '₹ ' + document.getElementById('paidAmount').value : 'N/A';
    document.getElementById('print_words').innerText = document.getElementById('words').value || 'N/A';
    document.getElementById('print_transactionId').innerText = document.getElementById('transactionId').value || 'N/A';
    document.getElementById('print_installment').innerText = document.getElementById('installment').value || 'N/A';
    document.getElementById('print_remarks').innerText = document.getElementById('remarks').value ? 'Remarks: ' + document.getElementById('remarks').value : '';
    
    const checkedPayment = document.querySelector('input[name="payment"]:checked');
    document.getElementById('print_paymentMode').innerText = checkedPayment ? checkedPayment.value : 'Cash';
}

// --- 4. BATCH LOGGING SYSTEM ---
function logReceiptData() {
    const record = {
        receiptNo: document.getElementById('receiptNo')?.value || 'N/A',
        date: new Date().toLocaleDateString(),
        studentName: document.getElementById('name')?.value || 'N/A',
        phone: document.getElementById('phone')?.value || 'N/A',
        course: document.getElementById('course')?.value || 'N/A',
        paidAmount: document.getElementById('paidAmount')?.value || '0',
        paymentMode: document.querySelector('input[name="payment"]:checked')?.value || 'Cash'
    };
    let currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
    currentRecords.push(record);
    localStorage.setItem('receiptLogs', JSON.stringify(currentRecords));
    updateLiveLedgerDisplay();
}

// --- 5. TABLE UI MANAGEMENT ---
function updateLiveLedgerDisplay() {
    const currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
    const tbody = document.getElementById('ledgerBody');
    if (!tbody) return;
    
    tbody.innerHTML = currentRecords.length === 0 ? '<tr><td colspan="6" style="text-align:center; color:#94a3b8;">No records captured yet.</td></tr>' : '';
    
    currentRecords.forEach((rec, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rec.receiptNo}</td>
            <td>${rec.studentName}</td>
            <td>${rec.course}</td>
            <td>₹${rec.paidAmount}</td>
            <td>${rec.paymentMode}</td>
            <td><button class="delete-btn" onclick="deleteLedgerRow(${index})"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteLedgerRow = (index) => {
    let currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
    currentRecords.splice(index, 1);
    localStorage.setItem('receiptLogs', JSON.stringify(currentRecords));
    updateLiveLedgerDisplay();
};

// --- 6. LIVE EVENT LISTENERS ---
document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

document.getElementById('paidAmount').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
        document.getElementById('words').value = convertNumberToWords(val);
    } else {
        document.getElementById('words').value = '';
    }
});

document.getElementById('name').addEventListener('input', (e) => {
    const preview = document.getElementById('studentNamePreview');
    if (preview) preview.innerText = e.target.value || "______________________";
});

document.getElementById('course').addEventListener('change', (e) => {
    const preview = document.getElementById('coursePreview');
    if (preview) preview.innerText = e.target.value || "______________________";
});

// --- 7. ACTION BUTTON HANDLERS ---
document.getElementById('printBtn').addEventListener('click', () => {
    if (!validateReceiptForm()) return;
    logReceiptData();
    syncPrintPreviews();
    window.print();
});

document.getElementById('download').addEventListener('click', () => {
    if (!validateReceiptForm()) return;
    
    logReceiptData();
    syncPrintPreviews();
    
    // Smooth visibility switch for high-quality snapshot compilation
    document.querySelectorAll('input, select, textarea').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'inline-block');
    
    html2canvas(document.getElementById('receipt'), { scale: 3, useCORS: true }).then(canvas => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 5, 5, 287, (canvas.height * 287) / canvas.width);
        pdf.save(`Receipt-${document.getElementById('receiptNo').value}.pdf`);
        
        // Revert form fields safely back to layout cascade defaults
        document.querySelectorAll('input, select, textarea').forEach(el => el.style.display = '');
        document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'none');
    });
});

document.getElementById('exportExcel').addEventListener('click', () => {
    const currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
    if (currentRecords.length === 0) return alert("⚠️ There are no captured records to export yet!");
    
    let csv = "Receipt No,Date,Student Name,Phone,Course,Amount Paid,Payment Mode\n";
    currentRecords.forEach(r => {
        csv += `"${r.receiptNo}","${r.date}","${r.studentName}","${r.phone}","${r.course}","${r.paidAmount}","${r.paymentMode}"\n`;
    });
    
    const link = document.createElement("a");
    link.href = encodeURI("data:text/csv;charset=utf-8," + csv);
    link.download = "Academy_Batch_Ledger_Records.csv";
    link.click();
    
    if (confirm("Clear live batch record logs?")) {
        localStorage.removeItem('receiptLogs');
        updateLiveLedgerDisplay();
    }
});

document.getElementById('clearForm').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset the form?")) {
        document.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.type === 'radio') {
                if (el.value === 'Cash') el.checked = true;
            } else {
                el.value = '';
            }
        });
        document.getElementById('studentNamePreview').innerText = "______________________";
        document.getElementById('coursePreview').innerText = "______________________";
    }
});

// Initialize Display View
updateLiveLedgerDisplay();

```
