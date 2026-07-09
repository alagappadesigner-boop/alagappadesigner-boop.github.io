document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download');
    const printBtn = document.getElementById('printBtn');

    // 1. DOWNLOAD PDF FUNCTION
    downloadBtn.addEventListener('click', async () => {
        // Prevent action if validation fails (if function exists)
        if (typeof validateReceiptForm === 'function' && !validateReceiptForm()) return;

        // Force text previews to update with form values
        if (typeof syncPrintPreviews === 'function') {
            syncPrintPreviews();
        } else {
            console.warn("syncPrintPreviews function missing. Attempting fallback sync.");
            fallbackSync();
        }

        const receipt = document.getElementById('receipt');

        try {
            // STEP A: Hide input elements from the DOM screen layer so html2canvas doesn't see them
            const inputs = receipt.querySelectorAll('input, select, textarea');
            const previews = receipt.querySelectorAll('.print-text-preview');
            
            inputs.forEach(el => el.style.setProperty('display', 'none', 'important'));
            previews.forEach(el => el.style.setProperty('display', 'inline-block', 'important'));

            // Give the browser UI a tiny moment to complete the layout shift
            await new Promise(resolve => setTimeout(resolve, 150));

            // STEP B: Take high-resolution snapshot of the clean layout
            const canvas = await html2canvas(receipt, { 
                scale: 2, 
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            });

            // STEP C: Revert styling immediately so the user can continue typing
            inputs.forEach(el => el.style.removeProperty('display'));
            previews.forEach(el => el.style.removeProperty('display'));

            // STEP D: Process into Landscape A4 PDF document
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            const receiptNo = document.getElementById('receiptNo')?.value || 'Receipt';
            pdf.save(`APA_Receipt_${receiptNo}.pdf`);

            // Log data to ledger if logging engine exists
            if (typeof logReceiptData === 'function') logReceiptData();

        } catch (err) {
            console.error("PDF Generation Error:", err);
            alert("Failed to generate PDF. Make sure you are connected to the internet to load dependencies.");
            
            // Safety fallback clean up if crash happens mid-generation
            document.querySelectorAll('input, select, textarea').forEach(el => el.style.removeProperty('display'));
            document.querySelectorAll('.print-text-preview').forEach(el => el.style.removeProperty('display'));
        }
    });

    // 2. PRINT RECEIPT FUNCTION
    printBtn.addEventListener('click', () => {
        if (typeof validateReceiptForm === 'function' && !validateReceiptForm()) return;
        
        if (typeof syncPrintPreviews === 'function') {
            syncPrintPreviews();
        } else {
            fallbackSync();
        }
        
        if (typeof logReceiptData === 'function') logReceiptData();
        
        // Brief delay ensures rendering loop completes before browser halts thread for print layout modal
        setTimeout(() => {
            window.print();
        }, 150);
    });

    // Fallback UI Sync engine in case the primary script script falls out of scope
    function fallbackSync() {
        const nameVal = document.getElementById('name')?.value || '';
        const courseVal = document.getElementById('course')?.value || '';
        
        const lblName = document.getElementById('lblStudentName');
        const lblCourse = document.getElementById('lblCourseName');
        
        if (lblName) lblName.innerText = nameVal.trim() || "______________________";
        if (lblCourse) lblCourse.innerText = courseVal || "______________________";
        
        // Map individual field strings
        const fields = ['receiptNo', 'name', 'phone', 'course', 'paidAmount', 'words', 'transactionId', 'installment', 'remarks'];
        fields.forEach(f => {
            const el = document.getElementById(f);
            const pr = document.getElementById('print_' + f);
            if (el && pr) {
                if (f === 'paidAmount' && el.value) {
                    pr.innerText = '₹ ' + el.value;
                } else {
                    pr.innerText = el.value || 'N/A';
                }
            }
        });
    }
});
