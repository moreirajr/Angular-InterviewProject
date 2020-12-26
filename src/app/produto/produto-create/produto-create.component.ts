import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '@app/_services/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {
  formProduto!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.formProduto = this.formBuilder.group({
      nome: [{ value:'', disabled: false }, Validators.required],
      valor: [{ value:'', disabled: false }, Validators.required],
      file: [{ value:'', disabled: false } , Validators.required]
    });
  }

  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if(fileList)
      this.formProduto.controls['file'].setValue(fileList[0]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit() {

    if(!this.formProduto.valid){
      this.openSnackBar('Erro:', 'Preencha os dados corretamente.');
      return;
    }

    console.log(this.formProduto.getRawValue());

    let formData = new FormData();
    formData.append('nome', this!.formProduto!.get('nome')!.value);
    formData.append('valor', this!.formProduto!.get('valor')!.value);
    formData.append('imagem', this!.formProduto!.get('file')!.value);

    this.produtoService.createProduto(formData).subscribe(data =>{
      if(data != null)
        this.openSnackBar('Sucesso', 'Produto cadastrado com sucesso');
      else
        this.openSnackBar('Erro ao cadastrar o produto', '');
    });
  }
}
