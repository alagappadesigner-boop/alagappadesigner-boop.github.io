<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Academy Fee Receipt System</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <style>
        /* --- 1. GLOBAL STYLES & RESET --- */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f1f5f9;
            color: #1e293b;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }

        /* --- 2. CONTROL BUTTONS HEADER --- */
        .action-toolbar {
            display: flex;
            gap: 15px;
            width: 100%;
            max-width: 1000px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #ffffff;
        }

        #printBtn { background-color: #02529c; }
        #printBtn:hover { background-color: #013e75; }
        #download { background-color: #eab308; color: #1e293b; }
        #download:hover { background-color: #ca8a04; }
        #exportExcel { background-color: #16a34a; }
        #exportExcel:hover { background-color: #15803d; }
        #clearForm { background-color: #dc2626; }
        #clearForm:hover { background-color: #b91c1c; }

        /* --- 3. RECEIPT MAIN PANEL --- */
        .receipt-card {
            background-color: #ffffff;
            width: 100%;
            max-width: 1000px;
            border: 3px solid #004080;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
            position: relative;
        }

        /* Header Layout */
        .receipt-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 4px solid #004080;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }

        .receipt-title {
            font-size: 24px;
            font-weight: 800;
            color: #004080;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .receipt-number-block {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .receipt-number-block label {
            font-size: 13px;
            font-weight: 700;
            color: #004080;
            line-height: 1.2;
            text-align: right;
        }

        .receipt-number-block input {
            border: none;
            font-size: 16px;
            font-weight: 700;
            color: #1e293b;
            width: 150px;
            outline: none;
        }

        /* Form Content Splitting Layout */
        .receipt-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 30px;
            margin-bottom: 25px;
        }

        .section-box {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .section-header-tag {
            background-color: #004080;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            padding: 6px 16px;
            border-radius: 4px;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        /* Pill Input Form Elements */
        .pill-row {
            display: flex;
            align-items: center;
            border: 2px solid #004080;
            border-radius: 50px;
            background-color: #ffffff;
            height: 44px;
            overflow: hidden;
        }

        .pill-label {
            font-size: 11px;
            font-weight: 800;
            color: #004080;
            width: 90px;
            padding-left: 20px;
            border-right: 1px solid #cbd5e1;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .pill-input-field {
            flex: 1;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 15px;
            font-size: 14px;
            color: #334155;
            background: transparent;
        }

        /* Dropdown custom formatting matching course exactly */
        .pill-select-field {
            flex: 1;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 35px 0 15px;
            font-size: 14px;
            color: #334155;
            background: transparent;
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23004080' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>");
            background-repeat: no-repeat;
            background-position: calc(100% - 15px) center;
            cursor: pointer;
        }

        /* Sub containers layout details */
        .payment-inner-flex {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .border-panel {
            border: 2px solid #004080;
            border-radius: 8px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .panel-subtitle {
            font-size: 12px;
            font-weight: 700;
            color: #004080;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 2px;
        }

        .radio-option {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 600;
            color: #334155;
            cursor: pointer;
        }

        .radio-option input[type="radio"] {
            accent-color: #004080;
            transform: scale(1.1);
        }

        .small-input-stack {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .small-input-stack label {
            font-size: 11px;
            font-weight: 700;
            color: #004080;
        }

        .box-text-input, .box-select-input {
            width: 100%;
            height: 34px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 0 10px;
            font-size: 13px;
            outline: none;
            color: #334155;
        }

        .remarks-textarea {
            width: 100%;
            height: 60px;
            border: 2px solid #004080;
            border-radius: 6px;
            padding: 10px 15px;
            font-size: 13px;
            resize: none;
            outline: none;
            color: #334155;
        }

        /* Declarative Footer Statement Layout */
        .thank-you-statement {
            background-color: #f8fafc;
            border-left: 4px solid #ca8a04;
            border-right: 4px solid #ca8a04;
            padding: 12px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #334155;
            margin-top: 15px;
            border-radius: 4px;
        }

        .dynamic-underline {
            font-weight: 700;
            color: #004080;
            text-decoration: underline;
        }

        /* Authorized Signature Component Layout */
        .signature-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-top: 40px;
            padding-right: 20px;
        }

        .signature-line {
            width: 220px;
            border-top: 2px solid #004080;
            margin-top: 5px;
        }

        .signature-text {
            font-size: 11px;
            font-weight: 700;
            color: #004080;
            letter-spacing: 1px;
            text-align: center;
            width: 220px;
            margin-top: 6px;
        }

        /* --- 4. LIVE VIEW RECORDS LEDGER VIEW (ACTION REMOVED) --- */
        .ledger-card {
            background-color: #ffffff;
            width: 100%;
            max-width: 1000px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        .ledger-title {
            font-size: 16px;
            font-weight: 700;
            color: #004080;
            margin-bottom: 15px;
            border-bottom: 2px solid #004080;
            padding-bottom: 8px;
        }

        .ledger-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            text-align: left;
        }

        .ledger-table thead tr {
            background-color: #004080;
            color: #ffffff;
        }

        .ledger-table th {
            padding: 12px 16px;
            font-weight: 600;
            font-size: 13px;
        }

        .ledger-table td {
            padding: 12px 16px;
            border-bottom: 1px solid #f1f5f9;
            color: #475569;
        }

        .ledger-table tbody tr:hover {
            background-color: #f8fafc;
        }

        /* Hidden Print Elements Setup Container */
        .print-text-preview {
            display: none;
        }

        /* --- 5. PRINT PAGE CSS MEDIA RULES --- */
        @media print {
            body {
                background-color: #ffffff;
                padding: 0;
            }
            .action-toolbar, .ledger-card {
                display: none !important;
            }
            .receipt-card {
                border: none;
                box-shadow: none;
                padding: 0;
                width: 100%;
            }
            input, select, textarea {
                display: none !important;
            }
            .print-text-preview {
                display: inline-block !important;
                font-size: 14px;
                color: #000000;
                font-weight: 600;
            }
            .pill-row {
                border: none;
            }
            .pill-label {
                border: none;
                padding-left: 0;
            }
        }
    </style>
</head>
<body>

    <div class="action-toolbar">
        <button id="printBtn" class="btn"><i class="fa-solid fa-print"></i> Print Receipt</button>
        <button id="download" class="btn"><i class="fa-solid fa-file-pdf"></i> Download PDF</button>
        <button id="exportExcel" class="btn"><i class="fa-solid fa-file-csv"></i> Export Batch Records</button>
        <button id="clearForm" class="btn"><i class="fa-solid fa-rotate-left"></i> Reset Form</button>
    </div>

    <div id="receipt" class="receipt-card">
        
        <div class="receipt-header">
            <div class="receipt-title">Fee Receipt</div>
            <div class="receipt-number-block">
                <label>RECEIPT<br>NO.</label>
                <input type="text" id="receiptNo" placeholder="APA-2026-0001" value="APA-2026-0001">
                <span id="print_receiptNo" class="print-text-preview"></span>
            </div>
        </div>

        <div class="receipt-grid">
            
            <div class="section-box">
                <div class="section-header-tag">STUDENT INFORMATION</div>
                
                <div class="pill-row">
                    <div class="pill-label">NAME</div>
                    <input type="text" id="name" class="pill-input-field" placeholder="Enter Student Name">
                    <span id="print_name" class="print-text-preview"></span>
                </div>

                <div class="pill-row">
                    <div class="pill-label">PHONE</div>
                    <input type="text" id="phone" class="pill-input-field" placeholder="Phone Number" maxlength="10">
                    <span id="print_phone" class="print-text-preview"></span>
                </div>

                <div class="section-header-tag" style="margin-top: 10px;">COURSE DETAILS</div>

                <div class="pill-row">
                    <div class="pill-label">COURSE</div>
                    <select id="course" class="pill-select-field">
                        <option value="" disabled selected>Select Course</option>
                        <option value="Bharatanatyam">Bharatanatyam</option>
                        <option value="Carnatic Vocal">Carnatic Vocal</option>
                        <option value="Kathak Dance">Kathak Dance</option>
                        <option value="Western Musical Instrumental">Western Musical Instrumental</option>
                    </select>
                    <span id="print_course" class="print-text-preview"></span>
                </div>

                <div class="pill-row">
                    <div class="pill-label">YEAR</div>
                    <select id="year" class="pill-select-field">
                        <option value="" disabled selected>Select Year Details</option>
                        <option value="1st Year">1st Year (Foundational)</option>
                        <option value="2nd Year">2nd Year (Intermediate)</option>
                        <option value="3rd Year">3rd Year (Advanced Diploma)</option>
                    </select>
                    <span id="print_year" class="print-text-preview"></span>
                </div>
            </div>

            <div class="section-box">
                <div class="section-header-tag">PAYMENT DETAILS</div>

                <div class="pill-row">
                    <div class="pill-label">AMOUNT PAID ₹</div>
                    <input type="number" id="paidAmount" class="pill-input-field" placeholder="0">
                    <span id="print_paidAmount" class="print-text-preview"></span>
                </div>

                <div class="pill-row">
                    <div class="pill-label">IN WORDS</div>
                    <input type="text" id="words" class="pill-input-field" placeholder="Amount in words" readonly>
                    <span id="print_words" class="print-text-preview"></span>
                </div>

                <div class="payment-inner-flex">
                    
                    <div class="border-panel">
                        <div class="panel-subtitle">Payment Mode</div>
                        <label class="radio-option">
                            <input type="radio" name="payment" value="Cash" checked> Cash
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="payment" value="UPI"> UPI
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="payment" value="Card"> Card
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="payment" value="Bank"> Bank
                        </label>
                        <span id="print_paymentMode" class="print-text-preview"></span>
                    </div>

                    <div class="border-panel">
                        <div class="small-input-stack">
                            <label>TXN / UPI ID</label>
                            <input type="text" id="transactionId" class="box-text-input" placeholder="Transaction ID">
                            <span id="print_transactionId" class="print-text-preview"></span>
                        </div>
                        <div class="small-input-stack">
                            <label>INSTALLMENT</label>
                            <select id="installment" class="box-select-input">
                                <option value="" disabled selected>Select Installment</option>
                                <option value="Full Payment">Full Payment</option>
                                <option value="1st Installment">1st Installment</option>
                                <option value="2nd Installment">2nd Installment</option>
                                <option value="3rd Installment">3rd Installment</option>
                            </select>
                            <span id="print_installment" class="print-text-preview"></span>
                        </div>
                    </div>

                </div>

                <div class="section-header-tag" style="margin-top: 5px;">REMARKS</div>
                <textarea id="remarks" class="remarks-textarea" placeholder="Remarks (Optional)"></textarea>
                <span id="print_remarks" class="print-text-preview"></span>

            </div>
        </div>

        <div class="thank-you-statement">
            Received with thanks from <span id="lblStudentName" class="dynamic-underline">______________________</span> towards the course fee for <span id="lblCourseName" class="dynamic-underline">______________________</span> at Alagappa Performing Arts Academy.
        </div>

        <div class="signature-container">
            <svg width="200" height="45" viewBox="0 0 200 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 35C45 12 85 8 115 22C135 32 105 45 145 18C165 5 175 12 188 8" stroke="#004080" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="signature-line"></div>
            <div class="signature-text">AUTHORIZED SIGNATURE</div>
        </div>

    </div>

    <div class="ledger-card">
        <div class="ledger-title">Current Batch Records Ledger (Live View)</div>
        <table class="ledger-table">
            <thead>
                <tr>
                    <th>Receipt No</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Paid</th>
                    <th>Mode</th>
                </tr>
            </thead>
            <tbody id="ledgerBody">
                <tr>
                    <td colspan="5" style="text-align:center; color:#94a3b8;">No records captured yet.</td>
                </tr>
            </tbody>
        </table>
    </div>

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

        // --- 2. FORM VALIDATION ENGINE ---
        function validateReceiptForm() {
            const fields = [
                { id: 'receiptNo', name: 'Receipt Number' },
                { id: 'name', name: 'Student Name' },
                { id: 'phone', name: 'Phone Number' },
                { id: 'course', name: 'Course' },
                { id: 'year', name: 'Year Details' },
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
            document.getElementById('print_year').innerText = document.getElementById('year').value || 'N/A';
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

        // --- 5. TABLE UI MANAGEMENT (ACTION COLUMN TRUNCATED COMPLETELY) ---
        function updateLiveLedgerDisplay() {
            const currentRecords = JSON.parse(localStorage.getItem('receiptLogs')) || [];
            const tbody = document.getElementById('ledgerBody');
            if (!tbody) return;
            
            tbody.innerHTML = currentRecords.length === 0 ? '<tr><td colspan="5" style="text-align:center; color:#94a3b8;">No records captured yet.</td></tr>' : '';
            
            currentRecords.forEach((rec) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${rec.receiptNo}</td>
                    <td>${rec.studentName}</td>
                    <td>${rec.course}</td>
                    <td>₹${rec.paidAmount}</td>
                    <td>${rec.paymentMode}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // --- 6. LIVE VIEW PREVIEW INPUT EVENT INTERCEPTORS ---
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
            document.getElementById('lblStudentName').innerText = e.target.value.trim() || "______________________";
        });

        document.getElementById('course').addEventListener('change', (e) => {
            document.getElementById('lblCourseName').innerText = e.target.value || "______________________";
        });

        // --- 7. UTILITY ACTION LISTENERS ---
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
            
            document.querySelectorAll('input, select, textarea').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.print-text-preview').forEach(el => el.style.display = 'inline-block');
            
            html2canvas(document.getElementById('receipt'), { scale: 3, useCORS: true }).then(canvas => {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('l', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 5, 5, 287, (canvas.height * 287) / canvas.width);
                pdf.save(`Receipt-${document.getElementById('receiptNo').value}.pdf`);
                
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
                document.getElementById('lblStudentName').innerText = "______________________";
                document.getElementById('lblCourseName').innerText = "______________________";
            }
        });

        // Initialize display state setup
        updateLiveLedgerDisplay();
    </script>
</body>
</html>
