import moment from "moment";
import WrittenNumber from "written-number";
import PizZip from "pizzip";
import DocxTemplate from "docxtemplater";
import {saveAs} from "file-saver";
import PizZipUtils from "pizzip/utils";
import XlsxTemplate from "xlsx-template";
import EX from "../assets/GMQ09.docx"
import {DocxTable} from "./XmlDocx";
import {XmlTableFac02} from "./XmlTableFac02";
import {XmlTableRh03} from "./XmlTableRh03";
import {XmlTableRh06} from "./XmlTableRh06";
import {XmlRowRh07} from "./XmlRowRh07";
import {Demande, Paragraphe} from "./XmlDataRh08";

export const ConvertDate = (input = moment(), format = "DD/MM/YYYY") => {
    return input.format(format);
}


export const RemoveEmpty = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] !== undefined) newObj[key] = obj[key];
        else newObj[key] = null;
    });
    return newObj;
};

export const ReplaceWithEmpty = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] !== undefined) newObj[key] = obj[key];
        else newObj[key] = "";
    });
    return newObj;
};


export const GetLastTacheAdd = (state, values) => {
    let tache = null;
    let jreelStart;
    let jestStart;
    if (state.taches.length !== 0) {
        for (let i = state.taches.length - 1; i >= 0; i--) {
            if (values.nb.includes(state.taches[i].currentKey)) {
                tache = state.taches[i];
                break;
            }
        }

        if (tache) {
            jreelStart = moment(tache.jreelStart).add(tache.jreel, 'days').format("YYYY-MM-DD");
            jestStart = moment(tache.jestStart).add(tache.jest, 'days').format("YYYY-MM-DD");
        } else {
            jestStart = state.project.dateDebut;
            jreelStart = state.project.dateDebut;

        }
    } else {
        jestStart = state.project.dateDebut;
        jreelStart = state.project.dateDebut;
    }
    return {jreelStart, jestStart}
}


export const GetLastTacheEdit = (state, values) => {
    let tache = null;
    let jreelStart;
    let jestStart;
    if (state.taches.length !== 0) {
        for (let i = state.taches.length - 1; i >= 0; i--) {
            if (values.nb.includes(state.taches[i].currentKey)) {
                tache = state.taches[i];
                break;
            }
        }

        if (tache) {
            jreelStart = moment(tache.jreelStart).add(tache.jreel, 'days').format("YYYY-MM-DD");
            jestStart = moment(tache.jestStart).add(tache.jest, 'days').format("YYYY-MM-DD");
        } else {
            jestStart = state.project.dateDebut;
            jreelStart = state.project.dateDebut;

        }
    } else {
        jestStart = state.project.dateDebut;
        jreelStart = state.project.dateDebut;
    }
    return {jreelStart, jestStart}
}


export const ParseJwt = () => {
    const res = localStorage.getItem("token");
    if (!res) return null;
    const base64Url = res.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


export const SplitNumber = (num) => {
    const entier = WrittenNumber(parseInt(num.split('.')[0]), {lang: 'fr'}) + " Dirham";
    const notEntier = num.split('.')[1];
    const cpt = [];
    if (parseInt(notEntier) === 0) return entier;


    for (const n in notEntier) {
        if (parseInt(notEntier[n]) >= 1) break;
        cpt.push('zéro');
    }

    return entier + " virgule " + cpt.join(' ') + ' ' + WrittenNumber(parseInt(num.split('.')[1]), {lang: 'fr'}) + " Centimes";
}


export const ReplaceWeekendDays = (jours, days) => {

    const lastDate = moment(jours);
    const filteredDays = [];
    let length;
    if (days === 1) length = days * 3;
    else length = days;
    for (let i = 0; i < length * 2; i++) {
        if (lastDate.weekday() !== 6 && lastDate.weekday() !== 5) {
            filteredDays.push(lastDate.clone());
        }
        lastDate.add(1, "days");
    }
    const date = filteredDays[days - 1];

    return moment(date).diff(jours, 'days') + 1;
}

export const CutDonnes = (donnes = [], setS) => {
    if (donnes.length < 14) {
        setS(f => ({...f, donnesPerElement: [...f.donnesPerElement, donnes]}));
    } else {
        const filter = donnes.slice(0, 16);
        setS(f => ({...f, donnesPerElement: [...f.donnesPerElement, filter]}));
        CutDonnes(donnes.slice(16), setS);
    }
}


export const FindAllPilotes = (project, employees = []) => {
    if (!project) return [];
    const pilotes = Object.keys(project).filter(x => x.includes("pilote"));
    const res = [];
    pilotes.forEach(x => {
        if (!project[x]) return;

        const e = employees.find(f => f.name === project[x]);
        res.push(e.firstName[0] + "." + e.lastName);
    })
    return res;
}


function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}


export const GenerateDocument = (data, preFile, fileName) => {
    const keys = Object.keys(data);
    keys.forEach(x => {
        if (!data[x]) data[x] = "";
    })


    loadFile(
        preFile,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip, /*{
                modules: [new XlsxModule()]
            }*/);

            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render(data);
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            console.log(out);
            saveAs(out, `${fileName}.docx`);
        }
    );
};

export const GenerateSheet = (content, preFile, fileName) => {


    loadFile(preFile, function (err, data) {

        // Create a template
        const template = new XlsxTemplate(data);

        // Replacements take place on first sheet
        const sheetNumber = 1;

        // Set up some placeholder values matching the placeholders in the template

        // Perform substitution
        template.substitute(sheetNumber, content);

        // Get binary data
        const res = template.generate({type: "blob"});
        saveAs(res, `${fileName}.xlsx`);

    })

};


export const ExportTest = (form) => {
    loadFile(
        EX,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip);


            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render({
                ...form,
                row: DocxTable(form.decisions)
            });
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            console.log(out);
            saveAs(out, `file.docx`);
        }
    );
}


export const ExportACH02 = (form, ach02) => {
    loadFile(
        ach02,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip);

            doc.render({
                ...form,
                row: XmlTableFac02(form)
            });
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(out, `${form.ref}.docx`);
        }
    );
}


export const ExportRH03 = (form, file) => {
    loadFile(
        file,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip);

            doc.render({
                ...form,
                row: XmlTableRh03(form.donnes)
            });
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(out, `${form.ref}.docx`);
        }
    );
}


export const ExportRH06 = (form, file) => {
    loadFile(
        file,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip);

            doc.render({
                date: ConvertDate(form.date),
                row: XmlTableRh06(form.donnes)
            });
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(out, `planning_des_formations_${new Date().getFullYear()}_.docx`);
        }
    );
}


export const ExportRH07 = (form, file) => {
    loadFile(
        file,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip);

            doc.render({
                ...form,
                row: XmlRowRh07(form.decision, form.modif2)
            });
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(out, `planning_des_formations_${new Date().getFullYear()}_.docx`);
        }
    );
}


export const ExportRH08 = (form, file) => {
    loadFile(
        file,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new DocxTemplate(zip);

            doc.render({
                ...form,
                row1: Paragraphe(form.postType),
                row2: Demande(form.demande)
            });
            const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(out, `planning_des_formations_${new Date().getFullYear()}_.docx`);
        }
    );
}



