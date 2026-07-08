<script>
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

    // --- 2. SYNC: UI TO PRINT VIEW ---
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
        document.getElementById('print_remarks').innerText = document.getElementById('remarks').value;
        const checkedPayment = document.querySelector('input[name="payment"]:checked');
        document.getElementById('print_paymentMode').innerText = checkedPayment ? checkedPayment.value : 'Cash';
    }

    // --- 3. BATCH LOGGING SYSTEM ---
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

    // --- 4. TABLE UI MANAGEMENT ---
    function updateLiveLedgerDisplay() {
        const currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
        const tbody = document.getElementById('ledgerBody');
        tbody.innerHTML = currentRecords.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No records.</td></tr>' : '';
        currentRecords.forEach((rec, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${rec.receiptNo}</td><td>${rec.studentName}</td><td>${rec.course}</td><td>₹${rec.paidAmount}</td><td>${rec.paymentMode}</td><td><button class="delete-btn" onclick="deleteLedgerRow(${index})">X</button></td>`;
            tbody.appendChild(tr);
        });
    }

    window.deleteLedgerRow = (index) => {
        let currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
        currentRecords.splice(index, 1);
        localStorage.setItem('receiptLogs', JSON.stringify(currentRecords));
        updateLiveLedgerDisplay();
    };

    // --- 5. ACTION HANDLERS ---
    document.getElementById('printBtn').addEventListener('click', () => {
        logReceiptData();
        syncPrintPreviews();
        window.print();
    });

    document.getElementById('download').addEventListener('click', () => {
        logReceiptData();
        syncPrintPreviews();
        html2canvas(document.getElementById('receipt'), { scale: 3 }).then(canvas => {
            const pdf = new jspdf.jsPDF('l', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 5, 5, 287, (canvas.height * 287) / canvas.width);
            pdf.save(`Receipt-${document.getElementById('receiptNo').value}.pdf`);
        });
    });

    document.getElementById('exportExcel').addEventListener('click', () => {
        const currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
        if (currentRecords.length === 0) return alert("No records to export.");
        let csv = "Receipt No,Date,Student Name,Phone,Course,Amount Paid,Payment Mode\n";
        currentRecords.forEach(r => csv += `"${r.receiptNo}","${r.date}","${r.studentName}","${r.phone}","${r.course}","${r.paidAmount}","${r.paymentMode}"\n`);
        const link = document.createElement("a");
        link.href = encodeURI("data:text/csv;charset=utf-8," + csv);
        link.download = "Batch_Export.csv";
        link.click();
        if(confirm("Clear log?")) { localStorage.removeItem('receiptLogs'); updateLiveLedgerDisplay(); }
    });

    document.getElementById('clearForm').addEventListener('click', () => {
        if(confirm("Reset form?")) document.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    });

    // Initialize display
    updateLiveLedgerDisplay();
</script>
