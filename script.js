// SIMPLE TEST PDF DOWNLOAD - Replace only this part
document.getElementById('download').addEventListener('click', async () => {
    if (!validateReceiptForm()) return;

    alert("✅ Button clicked! Starting PDF generation...");

    try {
        syncPrintPreviews();

        const receipt = document.getElementById('receipt');
        
        document.querySelectorAll('input, select, textarea').forEach(el => {
            if (!el.closest('.buttons')) el.style.display = 'none';
        });
        document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'inline-block');

        const canvas = await html2canvas(receipt, { scale: 2 });

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
        pdf.save(`APA_Receipt_${document.getElementById('receiptNo').value || 'TEST'}.pdf`);

        // Restore
        document.querySelectorAll('input, select, textarea').forEach(el => el.style.display = '');
        document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'none');

    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
    }
});
