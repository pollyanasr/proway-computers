import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProduto, IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{

  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;
  constructor(
    public carrinhoService: CarrinhoService,
    public router: Router
  ){}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calculaTotal();
  }

  removerProdutoDoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId)
    this.carrinhoService.removerProdutoDoCarrinho(produtoId);
    this.calculaTotal();
  }

  calculaTotal(){
    this.total = this.itensCarrinho.reduce((prev,curr) => prev + (curr.preco * curr.quantidade),0);
    
  }

  comprar(){
    alert("Parabéns, voce finalizou a sua compra!!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }
}
