import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "@app/_models/produto";
import { environment } from '@environments/environment';

@Injectable()
export class ProdutoService{
    private readonly _resource = 'api/v1/produto';
    private readonly _apiUrl = `${environment.apiUrl}${this._resource}`

    constructor (private httpClient: HttpClient) {}

    getProdutos(nome: string){        
       return this.httpClient.get<Produto[]>(this._apiUrl + '?nome=' + nome);
    }

    deleteProduto(id: string){
        return this.httpClient.delete<boolean>(this._apiUrl + '/' +  id);
    }

    // createProduto(produto: Produto){
    //     return this.httpClient.post<Produto>(this._apiUrl, produto);
    // }

    createProduto(formData: FormData){
        return this.httpClient.post<Produto>(this._apiUrl, formData);
    }
}