export const XmlTableRh03 = (data = [{name: "", service: "", emergement: ""}]) => {
    const tr = data.map(x => {
        return `
    <w:tr w:rsidR="006C244D" w14:paraId="11A61168" w14:textId="77777777" w:rsidTr="003843F2">
        <w:trPr>
            <w:trHeight w:val="737"/>
            <w:jc w:val="center"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="4234" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="0045B5B4" w14:textId="05DDC4DF" w:rsidR="006C244D" w:rsidRDefault="00D150C0" w:rsidP="00D150C0">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:sz w:val="24"/>
                    </w:rPr>
                </w:pPr>
                <w:proofErr w:type="spellStart"/>
                <w:proofErr w:type="gramStart"/>
                <w:r>
                    <w:rPr>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>${x.name}</w:t>
                </w:r>
                <w:proofErr w:type="spellEnd"/>
                <w:proofErr w:type="gramEnd"/>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="3497" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="0D586255" w14:textId="5A186351" w:rsidR="006C244D" w:rsidRDefault="00D150C0" w:rsidP="00D150C0">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:sz w:val="24"/>
                    </w:rPr>
                </w:pPr>
                <w:proofErr w:type="spellStart"/>
                <w:proofErr w:type="gramStart"/>
                <w:r>
                    <w:rPr>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>${x.service}</w:t>
                </w:r>
                <w:proofErr w:type="spellEnd"/>
                <w:proofErr w:type="gramEnd"/>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="2418" w:type="dxa"/>
            </w:tcPr>
            <w:p w14:paraId="12C1033E" w14:textId="340ADAE5" w:rsidR="006C244D" w:rsidRDefault="00D150C0" w:rsidP="00D150C0">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:sz w:val="24"/>
                    </w:rPr>
                </w:pPr>
                <w:proofErr w:type="spellStart"/>
                <w:proofErr w:type="gramStart"/>
                <w:r>
                    <w:rPr>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>${x.emergement}</w:t>
                </w:r>
                <w:proofErr w:type="spellEnd"/>
                <w:proofErr w:type="gramEnd"/>
            </w:p>
        </w:tc>
    </w:tr>
        `
    })
    return `
    <w:tbl>
    <w:tblPr>
        <w:tblStyle w:val="Grilledutableau"/>
        <w:tblW w:w="10149" w:type="dxa"/>
        <w:jc w:val="center"/>
        <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>
    </w:tblPr>
    <w:tblGrid>
        <w:gridCol w:w="4234"/>
        <w:gridCol w:w="3497"/>
        <w:gridCol w:w="2418"/>
    </w:tblGrid>
    <w:tr w:rsidR="006C244D" w14:paraId="5733FB8A" w14:textId="77777777" w:rsidTr="0016441D">
        <w:trPr>
            <w:trHeight w:val="373"/>
            <w:jc w:val="center"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="4234" w:type="dxa"/>
                <w:shd w:val="clear" w:color="auto" w:fill="F2DBDB" w:themeFill="accent2" w:themeFillTint="33"/>
            </w:tcPr>
            <w:p w14:paraId="175B6A6B" w14:textId="77777777" w:rsidR="006C244D" w:rsidRPr="006C244D" w:rsidRDefault="006C244D" w:rsidP="00D150C0">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:b/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="006C244D">
                    <w:rPr>
                        <w:b/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>Nom du participant</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="3497" w:type="dxa"/>
                <w:shd w:val="clear" w:color="auto" w:fill="F2DBDB" w:themeFill="accent2" w:themeFillTint="33"/>
            </w:tcPr>
            <w:p w14:paraId="290E4817" w14:textId="1F7C402F" w:rsidR="006C244D" w:rsidRPr="006C244D" w:rsidRDefault="009903D8" w:rsidP="00D150C0">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:b/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                </w:pPr>
                <w:r>
                    <w:rPr>
                        <w:b/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>Service</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="2418" w:type="dxa"/>
                <w:shd w:val="clear" w:color="auto" w:fill="F2DBDB" w:themeFill="accent2" w:themeFillTint="33"/>
            </w:tcPr>
            <w:p w14:paraId="23F05D32" w14:textId="77777777" w:rsidR="006C244D" w:rsidRPr="006C244D" w:rsidRDefault="006C244D" w:rsidP="00D150C0">
                <w:pPr>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:b/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="006C244D">
                    <w:rPr>
                        <w:b/>
                        <w:sz w:val="24"/>
                    </w:rPr>
                    <w:t>Emergement</w:t>
                </w:r>
            </w:p>
        </w:tc>
    </w:tr>
    ${tr.join("")}
</w:tbl>
    `
}
