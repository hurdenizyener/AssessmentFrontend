import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceHeader } from '../models/invoiceHeader'
import { InvoiceLine } from '../models/invoiceLine';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private httpClient: HttpClient,
    @Inject('apiUrl') private apiUrl: string
  ) { }

  invoiceCreate(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("fileName", file);
    let newPath = this.apiUrl + 'InvoiceCreate';
    return this.httpClient.post<any>(newPath,formData);
  }

  getAllInvoiceHeader(): Observable<InvoiceHeader[]> {
    let newPath = this.apiUrl + 'InvoiceHeader/GetAll';
    return this.httpClient.get<InvoiceHeader[]>(newPath);
  }

  getAllInvoiceLine(invoiceId: string): Observable<InvoiceLine[]> {
    let newPath = this.apiUrl + 'InvoiceLine/GetAll?invoiceId=' + invoiceId;
    return this.httpClient.get<InvoiceLine[]>(newPath);
  }

}
