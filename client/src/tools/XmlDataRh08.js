export const Paragraphe = (data = "") => {
    const fill = [];
    switch (data) {
        case "plein":
            fill.push("F0FE", "F0A8", "F0A8");
            break;
        case "partiel":
            fill.push("F0A8", "F0FE", "F0A8");
            break;
        case "stage":
            fill.push("F0A8", "F0A8", "F0FE");
            break;
        default:
            fill.push("F0A8", "F0A8", "F0A8");
    }


    return `
    <w:p w14:paraId="3C6A09BD" w14:textId="6B14C968" w:rsidR="00F9290E" w:rsidRDefault="00783F21" w:rsidP="00292046">
    <w:pPr>
        <w:spacing w:line="480" w:lineRule="auto"/>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
    </w:pPr>
    <w:r w:rsidRPr="00A93958">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
            <w:u w:val="single"/>
        </w:rPr>
        <w:t>Type poste</w:t>
    </w:r>
    <w:r>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t> :       Temps plein</w:t>
    </w:r>
    <w:r w:rsidR="00D630D0">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="00D630D0">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:sym w:font="Wingdings" w:char="${fill[0]}"/>
    </w:r>
    <w:r w:rsidRPr="00F01822">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t>                        Temps partiel</w:t>
    </w:r>
    <w:r w:rsidR="00D630D0">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="00D630D0">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:sym w:font="Wingdings" w:char="${fill[1]}"/>
    </w:r>
    <w:r w:rsidRPr="00F01822">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="00A93958">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t>                        Stage</w:t>
    </w:r>
    <w:r w:rsidR="00D630D0">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="00D630D0">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:sym w:font="Wingdings" w:char="${fill[2]}"/>
    </w:r>
    <w:r w:rsidRPr="00F01822">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
</w:p>
    `
}
export const Demande = (data = false) => {
    return `
    <w:p w14:paraId="35CBF881" w14:textId="2DBE65B6" w:rsidR="000247FC" w:rsidRDefault="000247FC" w:rsidP="000247FC">
    <w:pPr>
        <w:pBdr>
            <w:top w:val="single" w:sz="4" w:space="1" w:color="auto"/>
            <w:left w:val="single" w:sz="4" w:space="4" w:color="auto"/>
            <w:bottom w:val="single" w:sz="4" w:space="1" w:color="auto"/>
            <w:right w:val="single" w:sz="4" w:space="4" w:color="auto"/>
            <w:bar w:val="single" w:sz="4" w:color="auto"/>
        </w:pBdr>
        <w:tabs>
            <w:tab w:val="left" w:pos="1453"/>
            <w:tab w:val="left" w:pos="4004"/>
            <w:tab w:val="left" w:leader="dot" w:pos="7123"/>
            <w:tab w:val="left" w:leader="dot" w:pos="9674"/>
        </w:tabs>
        <w:spacing w:line="276" w:lineRule="auto"/>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
    </w:pPr>
    <w:r w:rsidRPr="000247FC">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="00EE3C23">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidRPr="000247FC">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve">                        </w:t>
    </w:r>
    <w:r w:rsidR="005447EF">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:sym w:font="Wingdings" w:char="${data ? 'F0FE' : 'F0A8'}"/>
    </w:r>
    <w:r w:rsidR="00EE3C23">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidRPr="000247FC">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve">Approuvée     </w:t>
    </w:r>
    <w:r w:rsidR="00EE3C23">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="005447EF">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:sym w:font="Wingdings" w:char="${!data ? 'F0FE' : 'F0A8'}"/>
    </w:r>
    <w:r w:rsidR="005447EF">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
    <w:r w:rsidR="00EE3C23">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve">Refusée </w:t>
    </w:r>
    <w:r w:rsidRPr="000247FC">
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
            <w:b/>
        </w:rPr>
        <w:t xml:space="preserve"></w:t>
    </w:r>
</w:p>
    `
}
