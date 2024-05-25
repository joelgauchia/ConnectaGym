import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportToExcel(headers: string[], data: any[][], fileName: string, sheetName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}