export const XmlTableFac02 = (data = {
    totalHt: 0,
    tva: 0,
    ttc: 0,
    donnes: [{description: "", unite: "", quality: "", prix: 0, montant: 0}]
}) => {

    const rows = data.donnes.map(x => {
        return `
        <w:tr w:rsidR="00CB1BB7" w:rsidRPr="004C7104" w14:paraId="135DD12A" w14:textId="77777777" w:rsidTr="00433BF4">
                <w:trPr>
                    <w:gridAfter w:val="1"/>
                    <w:wAfter w:w="13" w:type="dxa"/>
                    <w:trHeight w:val="315"/>
                </w:trPr>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="4148" w:type="dxa"/>
                        <w:gridSpan w:val="4"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="center"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="7D750623" w14:textId="32957BC1" w:rsidR="00CB1BB7" w:rsidRPr="0067122A" w:rsidRDefault="00BA4A32" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:before="240" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${x.description}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="856" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="center"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="0D796B93" w14:textId="7BD095C3" w:rsidR="00CB1BB7" w:rsidRPr="00994209" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:before="240" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${x.unite}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1140" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="center"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="06209E61" w14:textId="0B1BD8DA" w:rsidR="00CB1BB7" w:rsidRPr="00994209" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:before="240" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${x.quality}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1995" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="center"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="2C6896A7" w14:textId="641377ED" w:rsidR="00CB1BB7" w:rsidRPr="004C7104" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:before="240" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${x.prix}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1926" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="center"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="43684CF9" w14:textId="0C14047F" w:rsidR="00CB1BB7" w:rsidRPr="004C7104" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:before="240" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${x.montant}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
            </w:tr>
        `
    });


    const foot = `
    <w:tr w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w14:paraId="36B6B75D" w14:textId="77777777" w:rsidTr="00433BF4">
                <w:trPr>
                    <w:trHeight w:val="364"/>
                </w:trPr>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="2475" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="112DF088" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:before="240" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1166" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="2A7154B2" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="507" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="58CAE87C" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1996" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="nil"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="7B45C33F" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1995" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                    </w:tcPr>
                    <w:p w14:paraId="3E603ECC" w14:textId="10E40A55" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00BA4A32" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>Total HT</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1939" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="0D55FC24" w14:textId="50057D34" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${data.totalHt}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
            </w:tr>
            <w:tr w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w14:paraId="2A79CAE0" w14:textId="77777777" w:rsidTr="00433BF4">
                <w:trPr>
                    <w:trHeight w:val="315"/>
                </w:trPr>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="605" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="1AA52CCD" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1870" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="4DB468EC" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1166" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="1D2A0545" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="507" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="7018F23E" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1996" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="08122DFC" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1995" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                    </w:tcPr>
                    <w:p w14:paraId="3C7AE0F5" w14:textId="72E36C7D" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00BA4A32" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>T.V.A</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1939" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="5114EAA0" w14:textId="189C3F19" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${data.tva}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
            </w:tr>
            <w:tr w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w14:paraId="275FC28F" w14:textId="77777777" w:rsidTr="00433BF4">
                <w:trPr>
                    <w:trHeight w:val="20"/>
                </w:trPr>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="605" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="1D68C98C" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1870" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="5808AEFD" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1166" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="602E036A" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="507" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="nil"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="6045DBBD" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1996" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="nil"/>
                            <w:left w:val="nil"/>
                            <w:bottom w:val="nil"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:noWrap/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="730BC084" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00CB1BB7" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1995" w:type="dxa"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                    </w:tcPr>
                    <w:p w14:paraId="24E58682" w14:textId="09D2D422" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00BA4A32" w:rsidP="00D128F9">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>Total TTC</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:tcPr>
                        <w:tcW w:w="1939" w:type="dxa"/>
                        <w:gridSpan w:val="2"/>
                        <w:tcBorders>
                            <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:bottom w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                            <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                        </w:tcBorders>
                        <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                        <w:vAlign w:val="bottom"/>
                        <w:hideMark/>
                    </w:tcPr>
                    <w:p w14:paraId="1465FB20" w14:textId="73A36002" w:rsidR="00CB1BB7" w:rsidRPr="00F3431F" w:rsidRDefault="00BA4A32" w:rsidP="00342BD6">
                        <w:pPr>
                            <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                            <w:jc w:val="center"/>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                        </w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                                <w:b/>
                                <w:bCs/>
                                <w:sz w:val="20"/>
                                <w:szCs w:val="20"/>
                            </w:rPr>
                            <w:t>${data.ttc}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
            </w:tr>
    `


    return `<w:tbl>
    <w:tblPr>
        <w:tblW w:w="10078" w:type="dxa"/>
        <w:tblInd w:w="70" w:type="dxa"/>
        <w:tblLayout w:type="fixed"/>
        <w:tblCellMar>
            <w:left w:w="70" w:type="dxa"/>
            <w:right w:w="70" w:type="dxa"/>
        </w:tblCellMar>
        <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>
    </w:tblPr>
    <w:tblGrid>
        <w:gridCol w:w="605"/>
        <w:gridCol w:w="1870"/>
        <w:gridCol w:w="1166"/>
        <w:gridCol w:w="507"/>
        <w:gridCol w:w="856"/>
        <w:gridCol w:w="1140"/>
        <w:gridCol w:w="1995"/>
        <w:gridCol w:w="1926"/>
        <w:gridCol w:w="13"/>
    </w:tblGrid>
    <w:tr w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w14:paraId="028683A5" w14:textId="77777777" w:rsidTr="00433BF4">
        <w:trPr>
            <w:gridAfter w:val="1"/>
            <w:wAfter w:w="13" w:type="dxa"/>
            <w:trHeight w:val="940"/>
        </w:trPr>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="4148" w:type="dxa"/>
                <w:gridSpan w:val="4"/>
                <w:tcBorders>
                    <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                </w:tcBorders>
                <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                <w:vAlign w:val="center"/>
                <w:hideMark/>
            </w:tcPr>
            <w:p w14:paraId="1C5E4C87" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                </w:pPr>
                <w:r>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                    <w:t>DESCRIPTION</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="856" w:type="dxa"/>
                <w:tcBorders>
                    <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                    <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                </w:tcBorders>
                <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                <w:vAlign w:val="center"/>
                <w:hideMark/>
            </w:tcPr>
            <w:p w14:paraId="68AA9B3A" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="009F6387">
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                    <w:t>Unité</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1140" w:type="dxa"/>
                <w:tcBorders>
                    <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                    <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                </w:tcBorders>
                <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                <w:vAlign w:val="center"/>
                <w:hideMark/>
            </w:tcPr>
            <w:p w14:paraId="7411E525" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="009F6387">
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                    <w:t>Quantité</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1995" w:type="dxa"/>
                <w:tcBorders>
                    <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                    <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                </w:tcBorders>
                <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                <w:vAlign w:val="center"/>
                <w:hideMark/>
            </w:tcPr>
            <w:p w14:paraId="6D90BDEA" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                </w:pPr>
                <w:r w:rsidRPr="009F6387">
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                    <w:t>Prix Unitaire</w:t>
                </w:r>
            </w:p>
        </w:tc>
        <w:tc>
            <w:tcPr>
                <w:tcW w:w="1926" w:type="dxa"/>
                <w:tcBorders>
                    <w:top w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:left w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                    <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
                    <w:right w:val="double" w:sz="4" w:space="0" w:color="548DD4" w:themeColor="text2" w:themeTint="99"/>
                </w:tcBorders>
                <w:shd w:val="clear" w:color="auto" w:fill="auto"/>
                <w:vAlign w:val="center"/>
                <w:hideMark/>
            </w:tcPr>
            <w:p w14:paraId="64D2B56A" w14:textId="77777777" w:rsidR="00CB1BB7" w:rsidRPr="009F6387" w:rsidRDefault="00CB1BB7" w:rsidP="00342BD6">
                <w:pPr>
                    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
                    <w:jc w:val="center"/>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                </w:pPr>
                <w:r>
                    <w:rPr>
                        <w:rFonts w:ascii="BankGothic Lt BT" w:hAnsi="BankGothic Lt BT"/>
                        <w:b/>
                        <w:bCs/>
                        <w:sz w:val="20"/>
                        <w:szCs w:val="20"/>
                    </w:rPr>
                    <w:t>Montant</w:t>
                </w:r>
            </w:p>
        </w:tc>
    </w:tr>
    ${rows.join("")}
    ${foot}
</w:tbl>`
}
