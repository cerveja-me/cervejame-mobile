import { Component,ViewChild,NgZone } from '@angular/core';
import { NavController,NavParams, Slides,ModalController,LoadingController} from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';

//relatedPages
import { HomeConfirmModalPage } from '../home-confirm-modal/home-confirm-modal';
import { ScheduleModalPage } from '../schedule-modal/schedule-modal';
import { StatusModalPage } from '../status-modal/status-modal';


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
    err:string;
    constructor(
        public navCtrl: NavController,
        public params:NavParams,
        public zone:NgZone,
        public load:LoadingController,
        public device:DeviceProvider,
        public order:OrderProvider,
        public modalCtrl: ModalController
        ) {
        // this.device.camPage('home');
        //        this.device.startPush(); ver qual é o melhor momento pra ativar isso

    }

    loader=this.load.create({
        content: this.device.getRandonLoading()
    })

    ionViewDidLoad() {
        if(this.params.get("justFinished")){
            this.openStatus();
        }else{
            this.device.camPage('home');
            this.getZone();
        }

    }

    ngAfterViewInit() {
        this.slides.loop=false;

        //this.slides.loop = true;
        this.slides.slidesPerView =2;
        this.slides.initialSlide = 0;
        this.slides.centeredSlides=true;
    }



    //zona valida
    //produtos
    getZone(){
        this.loader.present();
        this.order.getZone()
        .then(z=>{
            var closedtime = JSON.parse(z["schedule"]);
            this.hours =closedtime;
            var d=new Date();
            if(d.getHours() > closedtime[d.getDay()].start && d.getHours() < closedtime[d.getDay()].end){
                this.closed = true;
            }
            this.products=z['products'];

            this.loadedcompleted=true;
            this.slides.slideTo(1);
            this.loader.dismiss();

        })
        .catch(e=>{
            this.loadedcompleted=true;
            this.err=e.message;

            this.loader.dismiss();
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
    openSchedule(){
        let modal = this.modalCtrl.create(ScheduleModalPage,{hours:this.hours, closed:this.closed});
        modal.present();
        modal.onDidDismiss(data => {
            this.device.camPage('home');
        });
    }

    openStatus(){
        let modal = this.modalCtrl.create(StatusModalPage,{hours:this.hours, closed:this.closed});
        modal.present();
        modal.onDidDismiss(data => {
            this.device.camPage('home');
            this.getZone();
        });
    }
}
