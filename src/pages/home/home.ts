import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController, Slides,ModalController} from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { HomeConfirmModalPage } from '../home-confirm-modal/home-confirm-modal';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    hours:{};
    closed:boolean;
    products:any=[];
    @ViewChild(Slides) slides: Slides;
    loadedcompleted;
    constructor(
        public navCtrl: NavController,
        public zone:NgZone,
        public device:DeviceProvider,
        public order:OrderProvider,
        public modalCtrl: ModalController
        ) {
        // this.device.camPage('home');
        //        this.device.startPush(); ver qual é o melhor momento pra ativar isso

    }

    ionViewDidLoad() {
        this.device.camPage('home');
        this.getZone();

    }

    ngAfterViewInit() {
        this.slides.loop=false;
    }



    //zona valida
    //produtos
    getZone(){
        this.order.getZone()
        .then(z=>{
            var closedtime = JSON.parse(z["schedule"]);
            this.hours =closedtime;
            var d=new Date();
            if(d.getHours() > closedtime[d.getDay()].start && d.getHours() < closedtime[d.getDay()].end){
                this.closed = true;
            }
            this.products=z['products'];

        })
        .catch(e=>{
            console.log(e);
            //code: 3, message: "Timeout expired"}
            //não estar com a geoliberada
            //nao estar em uma zona valida
            //estar sem conexão com a internet
        });
    }
    selectBeer(beer){
        let modal = this.modalCtrl.create(HomeConfirmModalPage,{'beer':beer});
        modal.present()
        modal.onDidDismiss(data => {
            this.device.camPage('home');
        });
    }
    openSchedule(){}

}
