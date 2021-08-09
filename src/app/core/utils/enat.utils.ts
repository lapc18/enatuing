import { CertificationModel } from "../domain/certifications/certifications.models";
import { Normative } from "../domain/normatives/normatives.models";
import { QueueModel } from "../domain/queue/queue.models";


export const generateNIU = (item: QueueModel, certifications: CertificationModel[], normatives: Normative[]): string => {
    let niu: string = '';
    let year: string = `${new Date().getFullYear()}`;
    let certificationsCount: number = certifications.filter(x => x.organization && item.organization && x.organization.id == item.organization.id).length++ || 1;
    let normativesCount: number = normatives.filter(x => `${x.category}${x.order}` == `${item.normative.category}${item.normative.order}`).length++ || 1;
    let normativesLength: number = normatives.length || 1;
    let nortic: string = `${item.normative.category}${item.normative.order}${item.normative.publishetAt}`;
    let norticPrefix: number = 0;
    let certificationType: string = item.type && item.type.toLowerCase().includes('re') ? '01' : '00';
    let strNorticPrefix: string = `${normativesLength}`;
    let arrNortics: number[] = [];
    for(let i: number = 0; i < 2; i++)  if(strNorticPrefix.length <= 3) arrNortics.push(0)
    norticPrefix =+ `${strNorticPrefix}${arrNortics.join('')}`;
    niu = `${year.substring(2)}${norticPrefix++}-${certificationsCount > 9 ? certificationsCount : '0'+ certificationsCount.toString() }-${nortic}${certificationType}${normativesCount}`;
    return niu;
}


export const convertBlobToBase64 = (blob:Blob) => new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        console.log(reader.result)
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

export const downloadAsTxt = (fileName:string, content:string):void => {
    let file = new Blob([content], {type: '.txt'});
    let a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}