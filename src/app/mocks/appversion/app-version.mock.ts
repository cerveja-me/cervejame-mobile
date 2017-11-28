import { AppVersion } from '@ionic-native/app-version';


export class AppVersionMock extends AppVersion {
    constructor() {
        super();
    }
    getVersionNumber() {
        return new Promise((resolve, reject) => {
            resolve('3.0.5');
        })
    }
}