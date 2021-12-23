export const XmlRowGmq01 = (type, client) => {
    const fill = [];

    switch (type) {
        case "nc":
            fill.push("F0FE", "F0A8", "F0A8");
            break;
        case "rec":
            fill.push("F0A8", "F0FE", "F0A8");
            break;
        case "prop":
            fill.push("F0A8", "F0A8", "F0FE");
            break;
        default:
            fill.push("F0A8", "F0A8", "F0A8");
    }


    return `
    <w:p>
            <w:pPr>
                <w:pStyle w:val="Header"/>
                <w:jc w:val="center"/>
                <w:rPr></w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr></w:rPr>
                <w:t xml:space="preserve">NC interne :  </w:t>
            </w:r>
            <w:r w:rsidR="008C2703">
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:bCs/>
                </w:rPr>
                <w:sym w:font="Wingdings" w:char="${fill[0]}"/>
            </w:r>
            <w:r>
                <w:rPr></w:rPr>
                <w:t xml:space="preserve">                                Réclamation client : </w:t>
            </w:r>
            <w:r w:rsidR="008C2703">
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:bCs/>
                </w:rPr>
                <w:sym w:font="Wingdings" w:char="${fill[1]}"/>
            </w:r>
            <w:r>
                <w:rPr></w:rPr>
                <w:t xml:space="preserve">                                Propriété client : </w:t>
            </w:r>
            <w:r w:rsidR="008C2703">
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:bCs/>
                </w:rPr>
                <w:sym w:font="Wingdings" w:char="${fill[2]}"/>
            </w:r>
        </w:p>
    `
}