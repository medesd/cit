export const DocxTable = (data = [{action: null, responsable: null, datePre: null, dateReel: null, comment: null}]) => {


    const rows = data.map(x => {
        return `
    <w:tr w:rsidR="009D0679" w:rsidRPr="00FA77B6" w14:paraId="68CA792E" w14:textId="77777777" w:rsidTr="00DA273A">
        <w:trPr>
            <w:trHeight w:val="588"/>
            <w:jc w:val="center"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="4918" w:type="dxa"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="558B2377" w14:textId="13AEF869" w:rsidR="009D0679" w:rsidRDefault="009D0679" w:rsidP="00DD1A1F">
                <w:pPr>
                    <w:tabs>
                        <w:tab w:val="left" w:pos="3210"/>
                    </w:tabs>
                    <w:spacing w:line="0" w:lineRule="atLeast"/>
                    <w:rPr>
                        <w:sz w:val="24"/>
                        <w:szCs w:val="36"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>${x.action}</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1601" w:type="dxa"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="55DC81A4" w14:textId="611C3F22" w:rsidR="009D0679" w:rsidRDefault="009D0679" w:rsidP="00163D07">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>${x.responsable}</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1312" w:type="dxa"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="0766629F" w14:textId="36F49C48" w:rsidR="009D0679" w:rsidRPr="00C169F2" w:rsidRDefault="009D0679" w:rsidP="00C169F2">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>${x.datePre}</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1292" w:type="dxa"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="7DE232C4" w14:textId="60F876DB" w:rsidR="00082EDA" w:rsidRPr="00C169F2" w:rsidRDefault="00082EDA" w:rsidP="00746FD2">
                <w:pPr>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>${x.dateReel}</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1593" w:type="dxa"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="69C29491" w14:textId="6D5E97F5" w:rsidR="009D0679" w:rsidRPr="00C169F2" w:rsidRDefault="009D0679" w:rsidP="00C169F2">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>${x.comment}</w:t>
                </w:r>
            </w:p>
        </w:tc>
    </w:tr>
    `
    })
    return `
    <w:tbl>
    <w:tblPr>
        <w:tblStyle w:val="Grilledutableau"/>
        <w:tblW w:w="10716" w:type="dxa"/>
        <w:jc w:val="center"/>
        <w:tblLayout w:type="fixed"/>
        <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>
    </w:tblPr>
    <w:tblGrid>
        <w:gridCol w:w="4918"/>
        <w:gridCol w:w="1601"/>
        <w:gridCol w:w="1312"/>
        <w:gridCol w:w="1292"/>
        <w:gridCol w:w="1593"/>
    </w:tblGrid>
    <w:tr w:rsidR="00FA77B6" w:rsidRPr="00FA77B6" w14:paraId="194FD78C" w14:textId="77777777" w:rsidTr="00D354A7">
        <w:trPr>
            <w:jc w:val="center"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="4918" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="31DBC625" w14:textId="77777777" w:rsidR="00FA77B6" w:rsidRPr="00BE48DC" w:rsidRDefault="00FA77B6" w:rsidP="0010237D">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>Action</w:t>
                </w:r>
            </w:p>
            <w:p w14:paraId="574D4B43" w14:textId="77777777" w:rsidR="00FA77B6" w:rsidRPr="00BE48DC" w:rsidRDefault="00FA77B6" w:rsidP="0010237D">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1601" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="4B4D30AA" w14:textId="77777777" w:rsidR="00FA77B6" w:rsidRPr="00BE48DC" w:rsidRDefault="00FA77B6" w:rsidP="0010237D">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>Responsable</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1312" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="6B50D61A" w14:textId="77777777" w:rsidR="00FA77B6" w:rsidRPr="00BE48DC" w:rsidRDefault="00FA77B6" w:rsidP="0010237D">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>Date prévue</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1292" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="17329650" w14:textId="77777777" w:rsidR="00FA77B6" w:rsidRPr="00BE48DC" w:rsidRDefault="00FA77B6" w:rsidP="0010237D">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t xml:space="preserve">Date de </w:t>
                </w:r>
                <w:r w:rsidR="0010237D">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>réelle</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1593" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="0ABD4013" w14:textId="77777777" w:rsidR="00FA77B6" w:rsidRPr="00BE48DC" w:rsidRDefault="00FA77B6" w:rsidP="0010237D">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00BE48DC">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t>Commentaire</w:t>
                </w:r>
                <w:r w:rsidR="00556617">
                    <w:rPr>
                        <w:rFonts w:ascii="Book Antiqua" w:hAnsi="Book Antiqua"/>
                        <w:b/>
                    </w:rPr>
                    <w:t xml:space="preserve"> et évaluation</w:t>
                </w:r>
            </w:p>
        </w:tc>
    </w:tr>
    ${rows.join("")}
    </w:tbl>
    `;
}
