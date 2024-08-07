import { Component, OnInit, OnDestroy } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],  // Assuming you use common directives
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;  // Using definite assignment assertion
  prices: { stxPrice: number, btcPrice: number, ethPrice: number } | null = null;

  constructor(
    public cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
    this.fetchStxPrice();
    this.fetchLastBlock();

  }
  fetchStxPrice() {
    this.subscription = this.cryptoService.getCryptoPrices().subscribe(
      prices => this.prices = prices,  // Set the fetched price to the component property
      error => console.error('Failed to fetch STX price:', error)
    );
  }
  fetchLastBlock() {
    this.subscription = this.cryptoService.getLatestBlock().subscribe(
      response => console.log('Latest BTC Block:', response),
      error => console.error('Error fetching latest BTC block:', error)
    )
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
