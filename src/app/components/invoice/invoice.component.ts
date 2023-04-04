import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { InvoiceLine } from 'src/app/models/invoiceLine';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  invoiceLineList: InvoiceLine[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'unitCode', 'unitPrice', 'total'];
  dataSource: MatTableDataSource<InvoiceLine> = new MatTableDataSource<InvoiceLine>();

  invoiceId: string;
  senderTitle: string;
  receiverTitle: string;
  date: string;


  constructor(
    private invoiceService: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.invoiceId = this.data.invoiceId
    this.senderTitle = this.data.senderTitle
    this.receiverTitle = this.data.receiverTitle
    this.date = this.data.date

    this.getAllInvoiceLine();
  }

  getAllInvoiceLine() {
    this.invoiceService.getAllInvoiceLine(this.data.invoiceId).subscribe({
      next: (x) => this.invoiceLineList = x,
      error: () => this.error(),
      complete: () => this.complete()
    });
  }

  error() {
    this.toastrService.error('Data Not Found', 'Error');
  }

  complete() {
    this.dataSource = new MatTableDataSource<InvoiceLine>(this.invoiceLineList);
  }

  getTotalQuantity() {
    return this.invoiceLineList.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice() {
    return this.invoiceLineList.map(t => t.quantity * t.unitPrice).reduce((acc, value) => acc + value, 0);
  }


}
