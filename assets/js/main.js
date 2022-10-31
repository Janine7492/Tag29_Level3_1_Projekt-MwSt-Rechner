/* =============================
    Anpassung der fallspezifischen Texte
=============================== */

function getTxt() {
    if (document.getElementById("nettoBrutto").checked) {
        document.getElementById("amountTxt").innerHTML = "Nettobetrag (Preis ohne MwSt) in Euro";
        document.getElementById("brutNetTxt").innerHTML = "Bruttobetrag (Endpreis)";
    } else if (document.getElementById("bruttoNetto").checked) {
        document.getElementById("amountTxt").innerHTML = "Bruttobetrag (Preis inkl. MwSt) in Euro";
        document.getElementById("brutNetTxt").innerHTML = "Nettobetrag";
    } else {
        document.getElementById("amountTxt").innerHTML = "Betrag in Euro";
        document.getElementById("brutNetTxt").innerHTML = "Betrag";
    }
}

/* =============================
    Rechner
=============================== */

function calculate(event) {
    // Zurücksetzen Fehlermeldung
    event.preventDefault();
    document.getElementById("notChosen").innerHTML = "";
    document.getElementById("noChoiceMade").innerHTML = "";
    document.getElementById("noEntry").innerHTML = "";

    //  Check in welche Richtung umgerechnet werden soll
    let netBrut = "";

    if (document.getElementById("nettoBrutto").checked) {
        netBrut = "netto";
        document.getElementById("amountTxt").innerHTML = "Nettobetrag (Preis ohne MwSt) in Euro";
    } else if (document.getElementById("bruttoNetto").checked) {
        netBrut = "brutto";
        document.getElementById("amountTxt").innerHTML = "Bruttobetrag (Preis inkl. MwSt) in Euro";
    } else {
        document.getElementById("notChosen").innerHTML = "Bitte triff eine Auswahl!"
    }
    console.log(netBrut);

    //  Check, welcher Steuersatz angewandt werden soll 
    let taxRate = "";

    if (document.getElementById("full").checked) {
        taxRate = 19;
    } else if (document.getElementById("reduced").checked) {
        taxRate = 7;
    } else {
        document.getElementById("noChoiceMade").innerHTML = "Bitte triff eine Auswahl!"
    }

    console.log(taxRate);

    //  Umrechnung 

    let amount = Number(document.getElementById("amount").value);
    console.log(amount);

    let mwstResult = "";
    let finalResult = "";

    if (document.getElementById("nettoBrutto").checked && taxRate > 0) {
        mwstResult = amount / 100 * taxRate;
        document.getElementById("mwstResult").innerHTML = mwstResult.toFixed(2) + " €";
        finalResult = amount + mwstResult;
        document.getElementById("finalResult").innerHTML = finalResult.toFixed(2) + " €";
    } else if (document.getElementById("bruttoNetto").checked && taxRate > 0) {
        mwstResult = amount / (100 + taxRate) * taxRate;
        document.getElementById("mwstResult").innerHTML = mwstResult.toFixed(2) + " €";
        finalResult = amount - mwstResult;
        document.getElementById("finalResult").innerHTML = finalResult.toFixed(2) + " €";
    } else {
        document.getElementById("mwstResult").innerHTML = "<span>-</span>"
        document.getElementById("finalResult").innerHTML = "<span>Bitte prüfe die Eingaben!</span>"
    }
}