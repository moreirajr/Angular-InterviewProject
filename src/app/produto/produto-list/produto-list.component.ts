import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '@app/_helpers/confirmation-dialog/confirmation-dialog.component';
import { Produto } from '@app/_models/produto';
import { ProdutoService } from '@app/_services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nome', 'Valor', 'Imagens', 'Acao'];
  dataSource = new MatTableDataSource<Produto>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatTable, {static:true}) table!: MatTable<Produto>;
  constructor(private produtoService: ProdutoService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.carregarProdutos();
  }

  carregarProdutos(){
    this.produtoService
      .getProdutos('')
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;
        this.dataSource = new MatTableDataSource<Produto>(data);
      });   
  }

  openUpdateDialog(obj: Produto){
    
  }

  openDeleteDialog(obj: Produto){
    console.log(obj);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Tem certeza que deseja deletar o produto?',
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.produtoService.deleteProduto(obj.Id)
          .subscribe(data => {
            console.log(data);
            if(data)
              this.carregarProdutos();
          });
      }
    });  
  }
}
