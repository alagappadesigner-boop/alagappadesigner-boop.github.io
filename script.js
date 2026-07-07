// =============================
// AUTO DATE & RECEIPT GENERATOR
// =============================
window.onload = function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    // Safe check to set structural Date input configuration
    const dateInput = document.getElementById("date");
    if (dateInput) {
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    // Set a dynamic random receipt number value on load initialization
    const receiptInput = document.getElementById("receiptNo");
    if (receiptInput) {
        receiptInput.value = "APA-" + yyyy + "-" + Math.floor(1000 + Math.random() * 9000);
    }
};

// =============================
// DYNAMIC LIVE TEXT PREVIEWS
// =============================
const nameInput = document.getElementById("name");
const studentPreview = document.getElementById("studentNamePreview");
if (nameInput && studentPreview) {
    nameInput.addEventListener("input", function() {
        studentPreview.textContent = this.value.trim() !== "" ? this.value : "______________________";
    });
}

const courseInput = document.getElementById("course");
const coursePreview = document.getElementById("coursePreview");
if (courseInput && coursePreview) {
    courseInput.addEventListener("input", function() {
        coursePreview.textContent = this.value.trim() !== "" ? this.value : "______________________";
    });
}

// =============================
// AMOUNT TO WORDS (INDIAN LAKH SYSTEM)
// =============================
const amountInput = document.getElementById("amount");
const wordsInput = document.getElementById("words");

if (amountInput && wordsInput) {
    amountInput.addEventListener("input", function () {
        const number = parseInt(this.value);

        if (isNaN(number) || number <= 0) {
            wordsInput.value = "";
            return;
        }

        wordsInput.value = convertNumberToWords(number).trim() + " Only";
    });
}

function convertNumberToWords(num) {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", 
                  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convert(n) {
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
        if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + convert(n % 100) : "");
        if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
        if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + convert(n % 100000) : "");
        return n;
    }
    return convert(num);
}

// =============================
// DOWNLOAD PDF (SECURE RENDER)
// =============================
const downloadBtn = document.getElementById("download");
if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadPDF);
}

function downloadPDF() {
    const receipt = document.getElementById("receipt");

    // Standard checking rules to avoid processing execution breaks
    if (typeof html2canvas === "undefined" || typeof window.jspdf === "undefined") {
        alert("Libraries are loading. Please verify your internet connection network.");
        return;
    }

    // Temporarily hide buttons array explicitly before drawing image frame 
    const buttonsDiv = document.querySelector(".buttons");
    if (buttonsDiv) buttonsDiv.style.display = "none";

    html2canvas(receipt, {
        scale: 2, // Standard distribution clear value scale
        useCORS: true,
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Receipt.pdf");

        // Restore interactive utilities block onto display view hierarchy
        if (buttonsDiv) buttonsDiv.style.display = "flex";
    }).catch(err => {
        console.error("PDF generation error: ", err);
        if (buttonsDiv) buttonsDiv.style.display = "flex";
    });
}

// =============================
// PRINT ACTION IMPLEMENTATION
// =============================
const printBtn = document.getElementById("printBtn");
if (printBtn) {
    printBtn.addEventListener("click", function() {
        window.print();
    });
}

// =============================
// CLEAR FORM LOGIC UTILITIES
// =============================
const clearBtn = document.getElementById("clearForm");
if (clearBtn) {
    clearBtn.addEventListener("click", function() {
        const inputs = document.querySelectorAll("#receipt input:not([readonly]), #receipt textarea, #receipt select");
        inputs.forEach(input => {
            if (input.type === "radio") {
                if (input.value === "Cash") input.checked = true;
            } else {
                input.value = "";
            }
        });
        
        // Reset dynamic preview values
        if (studentPreview) studentPreview.textContent = "______________________";
        if (coursePreview) coursePreview.textContent = "______________________";
        if (wordsInput) wordsInput.value = "";
    });
}
