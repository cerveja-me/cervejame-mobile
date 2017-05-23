import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeviceProvider } from '../../providers/device/device';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { OrderProvider } from '../../providers/order/order';



declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public device:DeviceProvider,
        public order:OrderProvider,
        public geoLoc:GeolocationProvider
        ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.loadMap();
    }

    loadMap(){
        // this.loader.present();
        this.geoLoc.getPosition()
        .then((location)=>{
            console.log('aqui->',location);
            let latLng = new google.maps.LatLng(location['latitude'],location['longitude']);
            let mapOptions = {
                center:latLng,
                clickableIcons:false,
                disableDoubleClickZoom:true,
                fullscreenControl:false,
                panControl:false,
                rotateControl:false,
                scaleControl:false,
                scrollwheel  :false,
                signInControl:false,
                streetViewControl:false,
                zoomControl:false,
                mapTypeControl:false,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            // this.map.addListener('center_changed',()=>{
                //     let _loc={0:this.map.getCenter().lat(),1:this.map.getCenter().lng()}
                //     this._user.getAddressFromLocation(_loc)
                //     .then((address)=>{
                    //         this.address=address;
                    //         this.zone.run(()=>{});

                    //     });
                    // });
                    this.map.setCenter(latLng);
                    // this.loader.dismiss();
                })

    }

    openModal(){}

}
