import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  sectors: any = [
    {
      sectorName: 'Finance',
      data: {
        stocksQty: 600,
        ratePerQty: 100
      }
    },
    {
      sectorName: 'Technology',
      data: {
        stocksQty: 1000,
        ratePerQty: 650
      }
    },
    {
      sectorName: 'Consumer Service',
      data: {
        stocksQty: 4500,
        ratePerQty: 50
      }
    },
    {
      sectorName: 'Manufaturing',
      data: {
        stocksQty: 400,
        ratePerQty: 200
      }
    }
  ];

  yourAssets: any = [
    {
      sectorName: 'Finance',
      style: 'bg-info',
      sellingRate: 0,
      data: {
        stocksQty: 600,
        ratePerQty: 100
      }
    },
    {
      sectorName: 'Technology',
      style: 'bg-success',
      sellingRate: 0,
      data: {
        stocksQty: 1000,
        ratePerQty: 650
      }
    },
    {
      sectorName: 'Consumer Service',
      style: 'bg-primary',
      sellingRate: 0,
      data: {
        stocksQty: 4500,
        ratePerQty: 50
      }
    },
    {
      sectorName: 'Manufaturing',
      style: 'bg-rose',
      sellingRate: 0,
      data: {
        stocksQty: 400,
        ratePerQty: 200
      }
    }
  ];

  otherPlayerMarket: any = [
    {
      player: 'Jimy',
      finance: {
        stocksQty: 100,
        rate: 0.5
      },
      technology: {
        stocksQty: 100,
        rate: 100
      },
      consService: {
        stocksQty: 100,
        rate: 100
      },
      manufaturing: {
        stocksQty: 100,
        rate: 100
      },
    },
    {
      player: 'Goku',
      finance: {
        stocksQty: 550,
        rate: 25
      },
      technology: {
        stocksQty: 100,
        rate: 100
      },
      consService: {
        stocksQty: 100,
        rate: 100
      },
      manufaturing: {
        stocksQty: 100,
        rate: 100
      },
    }
  ];

  name: string = 'Emal Isuranga';
  start: number = 1000;
  Income: number = 600;
  playerStartFrom: number = 1000;
  playerCurrentIncome: number = 0;
  playerTransactions: any = [];
  playerTotal: number = this.playerStartFrom;

  // Share Market

  purchaseModalData: any = { index: 0, stocksQty: 0, ratePerQty: 0 };
  puchaseModalTotal: number = 0;
  mPurchaseStockQuantity: number = 0;

  // Game data
  turn: number = 1;

  turnTime: number = 1;
  gameTime: number = 2;
  timerMns: number = 0;
  timerSecs: number = 0;

  // Your Assets
  // yourAssets: any = [];
  sellModalData = { stockName: '', index: 0, stocksQty: 0, marketRate: 0, netWorth: 0 };
  mSellingRate = 0;

  // Other Player Selling - Buy from other players
  // otherPlayerMarket: any = [];
  // tslint:disable-next-line:max-line-length
  selectedPlayerMarket: any = { player: '', finance: { stocksQty: 0, rate: 0 }, technology: { stocksQty: 0, rate: 0 }, consService: { stocksQty: 0, rate: 0 }, manufaturing: { stocksQty: 0, rate: 0 } };
  mQtyBuyingFromOtherPlayer = 0;
  otherPlayerMarketTotal = 0;
  selectTabWhenOpenFromOtherPlayerModal: any = '';

  constructor() { }

  ngOnInit() {
    console.log(this.sellModalData);
  }


  showPurchaseModal(item, index) {

    if (item.data.stocksQty > 0) {
      $('#modalPurchaseStock').modal('show');

      this.purchaseModalData = {
        index: index,
        stockName: item.sectorName,
        stocksQty: item.data.stocksQty,
        ratePerQty: item.data.ratePerQty,
      };
    }
  }

  calculatePurchaseTotal(rate) {
    this.puchaseModalTotal = Math.round(this.mPurchaseStockQuantity * rate);
  }

  makePurchase(itemQty, index) {

    this.sectors[index].data.stocksQty = (itemQty.stocksQty - this.mPurchaseStockQuantity);

    const record = {
      turn: this.turn,
      sector: this.sectors[index].sectorName,
      status: 'PURCHASED',
      qty: this.mPurchaseStockQuantity,
      cps: itemQty.ratePerQty,
      total: this.puchaseModalTotal,
      income: 0
    };

    this.playerTotal = this.playerTotal - this.puchaseModalTotal;

    this.pushToPlayerTransactions(record);

    this.mPurchaseStockQuantity = 0;
    this.puchaseModalTotal = 0;
  }

  pushToPlayerTransactions(record) {
    if (record.status === 'SOLD') {
      record.income = parseFloat(record.income) + parseFloat(record.total);

      this.playerCurrentIncome = this.playerTransactions
        .map(record => record.income)
        .reduce((i1, i2) => { return parseFloat(i1) + parseFloat(i2) });

    } else {
      record.income = parseFloat(record.income) - parseFloat(record.total);
    }

    this.playerTransactions.unshift(record);
  }

  showSellingRateModal(item, index) {

    if (item.data.stocksQty > 0) {
      $('#modalSellStock').modal('show');

      const marketRate = this.sectors[index].data.ratePerQty;
      const netWorth = this.sectors[index].data.ratePerQty * item.data.stocksQty;

      this.sellModalData = {
        stockName: item.sectorName,
        index: index,
        stocksQty: item.data.stocksQty,
        marketRate: marketRate,
        netWorth: netWorth

      };
    }

  }

  saveSellingRate(item) {
    this.yourAssets[item.index].sellingRate = this.mSellingRate;
  }

  openBuyFromOthersModal(item, sector) {
    this.selectedPlayerMarket = item;
    this.selectTabWhenOpenFromOtherPlayerModal = sector;
    $('#modalBuyFromOtherPlayers').modal('show');
  }


}
