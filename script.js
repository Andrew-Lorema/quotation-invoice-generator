
// FORMAT CURRENCY INTO KENYAN SHILLINGS

function formatKES(amount) {

    return "KES " + Number(amount).toLocaleString(
        "en-KE",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


// ADD A NEW MATERIAL ROW

function addMaterial() {

    const tbody = document.getElementById(
        "materialsBody"
    );

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input type="text"
                   class="description"
                   placeholder="Material name">
        </td>

        <td>
            <input type="number"
                   class="quantity"
                   min="0"
                   step="any"
                   value="1">
        </td>

        <td>
            <input type="number"
                   class="price"
                   min="0"
                   step="any"
                   value="0">
        </td>

        <td class="line-total">KES 0.00</td>

        <td class="no-print">
            <button class="btn remove-btn"
                    onclick="removeRow(this)">
                Remove
            </button>
        </td>
    `;

    tbody.appendChild(row);

    calculateTotal();

}


// REMOVE A MATERIAL ROW

function removeRow(button) {

    const rows = document.querySelectorAll(
        "#materialsBody tr"
    );

    if (rows.length > 1) {

        button.closest("tr").remove();

        calculateTotal();

    } else {

        alert("At least one material row is required.");

    }

}


// CALCULATE ALL FINANCIAL AMOUNTS

function calculateTotal() {

    let materialsTotal = 0;

    const rows = document.querySelectorAll(
        "#materialsBody tr"
    );

    // Calculate individual material costs

    rows.forEach(row => {

        const quantity = Math.max(
            0,
            Number(row.querySelector(".quantity").value) || 0
        );

        const price = Math.max(
            0,
            Number(row.querySelector(".price").value) || 0
        );

        const total = quantity * price;

        row.querySelector(".line-total").textContent =
            formatKES(total);

        materialsTotal += total;

    });


    // Calculate labour cost

    const labour = Math.max(
        0,
        Number(document.getElementById("labourCost").value) || 0
    );


    // Calculate subtotal

    const subtotal = materialsTotal + labour;


    // Calculate VAT

    const vatRate = Math.max(
        0,
        Number(document.getElementById("vatRate").value) || 0
    );

    const vat = subtotal * (vatRate / 100);


    // Calculate grand total

    const grandTotal = subtotal + vat;


    // DISPLAY CALCULATIONS

    document.getElementById(
        "materialsSubtotal"
    ).textContent = formatKES(materialsTotal);

    document.getElementById(
        "labourTotal"
    ).textContent = formatKES(labour);

    document.getElementById(
        "subtotal"
    ).textContent = formatKES(subtotal);

    document.getElementById(
        "vatAmount"
    ).textContent = formatKES(vat);

    document.getElementById(
        "grandTotal"
    ).textContent = formatKES(grandTotal);

}


// AUTOMATICALLY RECALCULATE WHEN VALUES CHANGE

document.addEventListener("input", function(event) {

    if (
        event.target.matches(".quantity") ||
        event.target.matches(".price") ||
        event.target.id === "labourCost" ||
        event.target.id === "vatRate"
    ) {

        calculateTotal();

    }

});


// CLEAR ALL FORM FIELDS

function resetForm() {

    const confirmReset = confirm(
        "Are you sure you want to clear the form?"
    );

    if (!confirmReset) return;


    document.getElementById("documentNumber").value = "";

    document.getElementById("contractor").value = "";

    document.getElementById("client").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("labourDescription").value = "";

    document.getElementById("labourCost").value = 0;

    document.getElementById("vatRate").value = 16;

    document.getElementById("documentType").value = "QUOTATION";


    // Restore today's date

    document.getElementById("date").value =
        new Date().toISOString().split("T")[0];


    // Clear existing material rows

    document.getElementById("materialsBody").innerHTML = "";


    // Add one empty material row

    addMaterial();


    // Recalculate totals

    calculateTotal();

}


// SET TODAY'S DATE AUTOMATICALLY

document.getElementById("date").value =
    new Date().toISOString().split("T")[0];


// CALCULATE TOTALS WHEN PAGE LOADS

calculateTotal();
