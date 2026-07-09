document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download');
    const printBtn = document.getElementById('printBtn');

    // 1. DOWNLOAD PDF FUNCTION
    downloadBtn.addEventListener('click', async () => {
        if (typeof validateReceiptForm === 'function' && !validateReceiptForm()) return;

        // Ensure text previews are synced before capture
        if (typeof syncPrintPreviews === 'function') syncPrintPreviews();

        const receipt = document.getElementById('receipt');

        try {
            // Add a slight delay to ensure UI is ready
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(receipt, { 
                scale: 2, 
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('l', 'mm', 'a4'); // 'l' for Landscape
            const imgData = canvas.toDataURL('image/png');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            const receiptNo = document.getElementById('receiptNo')?.value || 'Receipt';
            pdf.save(`APA_Receipt_${receiptNo}.pdf`);
        } catch (err) {
            console.error("PDF Generation Error:", err);
            alert("Failed to generate PDF. Check console for details.");
        }
    });

    // 2. PRINT RECEIPT FUNCTION
    printBtn.addEventListener('click', () => {
        if (typeof validateReceiptForm === 'function' && !validateReceiptForm()) return;
        
        // Sync previews so the print-ready text is visible
        if (typeof syncPrintPreviews === 'function') syncPrintPreviews();
        
        // Triggers the browser print dialog
        // The @media print CSS in your style sheet will handle hiding buttons
        window.print();
    });
});
