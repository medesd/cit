import {ConvertDate} from "./index";
import moment from "moment";

export const XmlTableRh06 = (donnes = [
    {
        theme: "",
        objectifs: [""],
        personnes: [""],
        periods: [moment(), moment()],
        lieu: "",
        formateurs: "",
        suivi: "",
        comment: ""
    }
]) => {


    const rows = donnes.map((x, i) => {
        return `
        
        <w:tr w:rsidR="00DB5DDE" w:rsidRPr="00646079" w14:paraId="5026DF80" w14:textId="77777777" w:rsidTr="0087177F">
    <w:trPr>
        <w:cantSplit/>
        <w:trHeight w:val="737"/>
    </w:trPr>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="982" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="0BF9C5B8" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="009F6B8C" w:rsidP="00A1002F">
            <w:pPr>
                <w:pStyle w:val="Titre6"/>
                <w:spacing w:line="276" w:lineRule="auto"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                    <w:b w:val="0"/>
                    <w:bCs w:val="0"/>
                    <w:szCs w:val="22"/>
                    <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                    <w:b w:val="0"/>
                    <w:bCs w:val="0"/>
                    <w:szCs w:val="22"/>
                    <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                </w:rPr>
                <w:t xml:space="preserve">F${i + 1} : </w:t>
            </w:r>
            <w:r w:rsidR="00A97102">
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                    <w:b w:val="0"/>
                    <w:bCs w:val="0"/>
                    <w:szCs w:val="22"/>
                    <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                </w:rPr>
                <w:t>${x.theme}</w:t>
            </w:r>
        </w:p>
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="913" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        ${x.objectifs.map(f => `
        <w:p w14:paraId="7641BA76" w14:textId="77777777" w:rsidR="00E37533" w:rsidRDefault="00A97102" w:rsidP="00A811E9">
            <w:pPr>
                <w:numPr>
                    <w:ilvl w:val="0"/>
                    <w:numId w:val="1"/>
                </w:numPr>
                <w:spacing w:after="0"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
                <w:t>${f}</w:t>
            </w:r>
        </w:p>
        `)}
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="678" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        ${x.personnes.map(f => `
        <w:p w14:paraId="3A9FE27D" w14:textId="77777777" w:rsidR="00E37533" w:rsidRDefault="00231D64" w:rsidP="00231D64">
            <w:pPr>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
                <w:t>${f}</w:t>
            </w:r>
        </w:p>
        `)}
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="466" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="54F05D58" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="004A6D93" w:rsidP="00A1002F">
            <w:pPr>
                <w:spacing w:after="0"/>
                <w:jc w:val="center"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
                <w:t>Du ${ConvertDate(x.periods[0])} Au ${ConvertDate(x.periods[1])}</w:t>
            </w:r>
        </w:p>
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="393" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="2439D954" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00B80A71" w:rsidP="00A1002F">
            <w:pPr>
                <w:spacing w:after="0"/>
                <w:jc w:val="center"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
                <w:t>${x.lieu}</w:t>
            </w:r>
        </w:p>
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="541" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="5A53359E" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00B80A71" w:rsidP="00A1002F">
            <w:pPr>
                <w:spacing w:after="0"/>
                <w:jc w:val="center"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
                <w:t>${x.formateurs}</w:t>
            </w:r>
        </w:p>
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="178" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="453CE0E4" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00576DA9" w:rsidP="00A1002F">
            <w:pPr>
                <w:spacing w:after="0"/>
                <w:jc w:val="center"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            ${x.suivi !== "Fait" || '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/></w:rPr><w:t>X</w:t></w:r>'}
        </w:p>
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="180" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="4B8C5349" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
            <w:pPr>
                <w:spacing w:after="0"/>
                <w:jc w:val="center"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            ${x.suivi !== "PasFait" || '<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/></w:rPr><w:t>X</w:t></w:r>'}
        </w:p>
    </w:tc>
    <w:tc>
        <w:tcPr>
            <w:tcW w:w="669" w:type="pct"/>
            <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            <w:vAlign w:val="center"/>
        </w:tcPr>
        <w:p w14:paraId="6163E3CB" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00DE1E30" w:rsidP="00DE1E30">
            <w:pPr>
                <w:spacing w:after="0"/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                </w:rPr>
                <w:t xml:space="preserve">${x.comment} </w:t>
            </w:r>
        </w:p>
    </w:tc>
</w:tr>
        `
    })


    return `
    <w:tbl>
    <w:tblPr>
        <w:tblpPr w:leftFromText="141" w:rightFromText="141" w:vertAnchor="text" w:horzAnchor="margin" w:tblpXSpec="center" w:tblpY="381"/>
        <w:tblW w:w="5533" w:type="pct"/>
        <w:tblBorders>
            <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
            <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
            <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
            <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
            <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        </w:tblBorders>
        <w:tblCellMar>
            <w:left w:w="70" w:type="dxa"/>
            <w:right w:w="70" w:type="dxa"/>
        </w:tblCellMar>
        <w:tblLook w:val="0000" w:firstRow="0" w:lastRow="0" w:firstColumn="0" w:lastColumn="0" w:noHBand="0" w:noVBand="0"/>
    </w:tblPr>
    <w:tblGrid>
        <w:gridCol w:w="3198"/>
        <w:gridCol w:w="2973"/>
        <w:gridCol w:w="2207"/>
        <w:gridCol w:w="1517"/>
        <w:gridCol w:w="1279"/>
        <w:gridCol w:w="1761"/>
        <w:gridCol w:w="579"/>
        <w:gridCol w:w="586"/>
        <w:gridCol w:w="2178"/>
    </w:tblGrid>
    <w:tr w:rsidR="009416A2" w:rsidRPr="00646079" w14:paraId="4D025891" w14:textId="77777777" w:rsidTr="0087177F">
        <w:trPr>
            <w:cantSplit/>
            <w:trHeight w:val="210"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="982" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="218BCD98" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00ED0CA8" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Thèmes de</w:t>
                </w:r>
                <w:r w:rsidR="00E37533" w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t xml:space="preserve"> formation</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="913" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="0B5B0F6C" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Objectifs</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="678" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="3F6B557C" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Personnes concernées</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="466" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="13BB592E" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Période</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="393" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="1558F91A" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Lieu</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="541" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="1159278D" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t xml:space="preserve">Formateurs </w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="358" w:type="pct"/>
                <w:gridSpan w:val="2"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="244EFC2E" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:pStyle w:val="Titre7"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:szCs w:val="22"/>
                        <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:szCs w:val="22"/>
                        <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                    </w:rPr>
                    <w:t>Suivi</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="669" w:type="pct"/>
                <w:vMerge w:val="restart"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            </w:tcPr>
            <w:p w14:paraId="052D2DC8" w14:textId="77777777" w:rsidR="00E37533" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:pStyle w:val="Titre7"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:szCs w:val="22"/>
                        <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                    </w:rPr>
                </w:pPr>
            </w:p>
            <w:p w14:paraId="3142068F" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:pStyle w:val="Titre7"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:szCs w:val="22"/>
                        <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                    </w:rPr>
                </w:pPr>
                <w:r>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:szCs w:val="22"/>
                        <w:lang w:val="fr-FR" w:eastAsia="fr-FR"/>
                    </w:rPr>
                    <w:t xml:space="preserve">Commentaire </w:t>
                </w:r>
            </w:p>
        </w:tc>
    </w:tr>
    <w:tr w:rsidR="00DB5DDE" w:rsidRPr="00646079" w14:paraId="3CDD2C50" w14:textId="77777777" w:rsidTr="0087177F">
        <w:trPr>
            <w:cantSplit/>
            <w:trHeight w:val="501"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="982" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="6E0C8A7D" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="913" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="7229D91D" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="678" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="4A7B298B" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="466" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="71F584A5" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="393" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="72EEB542" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="541" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="4AACA6FA" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="178" w:type="pct"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="5C8EA45A" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Fait</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="180" w:type="pct"/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
                <w:vAlign w:val="center"/>
            </w:tcPr>
            <w:p w14:paraId="6744013C" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="00646079">
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                    <w:t>Pas fait</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="669" w:type="pct"/>
                <w:vMerge/>
                <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
            </w:tcPr>
            <w:p w14:paraId="36F05442" w14:textId="77777777" w:rsidR="00E37533" w:rsidRPr="00646079" w:rsidRDefault="00E37533" w:rsidP="00A1002F">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                        <w:b/>
                        <w:bCs/>
                    </w:rPr>
                </w:pPr>
            </w:p>
        </w:tc>
    </w:tr>
    ${rows.join("")}
</w:tbl>
    `

}
