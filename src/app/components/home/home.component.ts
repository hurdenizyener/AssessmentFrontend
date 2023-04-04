import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceHeader } from 'src/app/models/invoiceHeader';
import { InvoiceService } from 'src/app/services/invoice.service';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  invoiceHeaderList: InvoiceHeader[] = [];
  dataLoaded = false;
  searchHide = false;
  filterText: '';
  displayedColumns: string[] = ['invoiceId', 'senderTitle', 'receiverTitle', 'date'];
  dataSource: MatTableDataSource<InvoiceHeader> = new MatTableDataSource<InvoiceHeader>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllHeader();

  }

  getAllHeader() {
    this.invoiceService.getAllInvoiceHeader().subscribe({
      next: (x) => this.invoiceHeaderList = x,
      error: () => this.error(),
      complete: () => this.complete()
    });
  }

  error() {
    this.toastrService.error('Data Not Found', 'Error');
  }

  complete() {
    this.dataSource = new MatTableDataSource<InvoiceHeader>(this.invoiceHeaderList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort = this.sort;
    this.dataLoaded = true;
  }

  filterDataSource() {
    this.dataSource.filter = this.filterText.trim().toLocaleLowerCase();
  }

  openFilterDialog(data: any) {
    const dialogRef = this.dialog.open(InvoiceComponent, {
      width: '600px',
      data: data,
      disableClose: true
    });
  }

  invoiceCreate(event: any) {
    const file: File = event.target.files[0];

    this.invoiceService.invoiceCreate(file).subscribe({
      next: (val: any) => {
        this.toastrService.success('Invoice Created', 'Successful');
        this.getAllHeader();
      },
      error: (err: any) => {
        this.toastrService.error(err, 'Error');
      }
    });
  }

}

