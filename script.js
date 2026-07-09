<script>
// ==================== UTILITY FUNCTIONS ====================
function convertNumberToWords(amount) {
    if (amount === 0) return 'Zero Only';
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

// ==================== VALIDATION ====================
function validateReceiptForm() {
    const required = ['receiptNo', 'name', 'phone', 'course', 'year', 'paidAmount', 'installment'];
    for (let id of required) {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            alert(`⚠️ Please fill "${id.replace(/([A-Z])/g, ' $1')}" field`);
            el?.focus();
            return false;
        }
    }
    return true;
}

// ==================== SYNC PREVIEW ====================
function syncPrintPreviews() {
    document.getElementById('print_receiptNo').innerText = document.getElementById('receiptNo').value || '';
    document.getElementById('print_name').innerText = document.getElementById('name').value || 'N/A';
    document.getElementById('print_phone').innerText = document.getElementById('phone').value || 'N/A';
    document.getElementById('print_course').innerText = document.getElementById('course').value || 'N/A';
    document.getElementById('print_paidAmount').innerText = document.getElementById('paidAmount').value ? '₹ ' + document.getElementById('paidAmount').value : 'N/A';
    document.getElementById('print_words').innerText = document.getElementById('words').value || 'N/A';
    document.getElementById('print_transactionId').innerText = document.getElementById('transactionId').value || 'N/A';
    document.getElementById('print_installment').innerText = document.getElementById('installment').value || 'N/A';
    document.getElementById('print_remarks').innerText = document.getElementById('remarks').value ? 'Remarks: ' + document.getElementById('remarks').value : '';

    const payment = document.querySelector('input[name="payment"]:checked');
    document.getElementById('print_paymentMode').innerText = payment ? payment.value : 'Cash';
}

// ==================== PDF DOWNLOAD (Fixed) ====================
document.getElementById('download').addEventListener('click', async () => {
    if (!validateReceiptForm()) return;

    const downloadBtn = document.getElementById('download');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '⏳ Generating PDF...';
    downloadBtn.disabled = true;

    try {
        syncPrintPreviews();

        // Hide form inputs, show print previews
        document.querySelectorAll('input, select, textarea').forEach(el => {
            if (!el.closest('.buttons')) el.style.display = 'none';
        });
        document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'inline-block');

        const canvas = await html2canvas(document.getElementById('receipt'), {
            scale: 3,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false
        });

        // Restore form
        document.querySelectorAll('input, select, textarea').forEach(el => el.style.display = '');
        document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'none');

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');        // Portrait is better for receipt
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, pdfWidth, pdfHeight);

        const fileName = `APA_Receipt_${document.getElementById('receiptNo').value || '0001'}.pdf`;
        pdf.save(fileName);

    } catch (err) {
        console.error(err);
        alert("❌ PDF generation failed. Check console (F12) for details.");
    } finally {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
});

// ==================== OTHER EVENT LISTENERS ====================
document.getElementById('phone').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

document.getElementById('paidAmount').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    document.getElementById('words').value = convertNumberToWords(val);
});

document.getElementById('name').addEventListener('input', (e) => {
    document.getElementById('studentNamePreview').innerText = e.target.value || "______________________";
});

document.getElementById('course').addEventListener('change', (e) => {
    document.getElementById('coursePreview').innerText = e.target.value || "______________________";
});

document.getElementById('printBtn').addEventListener('click', () => {
    if (!validateReceiptForm()) return;
    logReceiptData();
    syncPrintPreviews();
    window.print();
});

// Clear Form
document.getElementById('clearForm').addEventListener('click', () => {
    if (confirm("Reset the form?")) {
        document.querySelectorAll('input:not([type="radio"]), select, textarea').forEach(el => el.value = '');
        document.getElementById('studentNamePreview').innerText = "______________________";
        document.getElementById('coursePreview').innerText = "______________________";
        document.querySelector('input[name="payment"][value="Cash"]').checked = true;
    }
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    updateLiveLedgerDisplay();
});
</script>
