This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/driftyco/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/driftyco/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.


```
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAKiUVVFdR0OlfrR34QtKu9sBf-oyYuiGs" --variable API_KEY_FOR_IOS="AIzaSyAKiUVVFdR0OlfrR34QtKu9sBf-oyYuiGs"
```

```
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="289767478086559" --variable APP_NAME="Cerveja.me"

```


## ANDROID INSTRUCTIONS

###build for release
```
ionic build --release android
```

### sign the build
```
 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cervejame.keystore -storepass cervejame platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame
```
### signed apk

```
rm cervejame.apk && zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame.apk
```

###UNIQUE COMMAND
```
rm cervejame.apk && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cervejame.keystore -storepass cervejame platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame && /Users/jefersonguardezi/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame.apk && cp cervejame.apk ../cervejame-landpage/apk && aws s3 sync ../cervejame-landpage/ s3://cerveja.me
```

### keyhash for facebook
```
keytool -exportcert -alias cervejame -keystore cervejame.keystore -storepass cervejame | openssl sha1 -binary | openssl base64

```




```
keytool -genkey -v -keystore cervejame.keystore -alias cervejame -keyalg RSA -keysize 2048 -validity 10000
```

```
Enter keystore password: cervejame
Re-enter new password:cervejame
What is your first and last name?
[Unknown]:  Jeferson Guardezi
What is the name of your organizational unit?
[Unknown]:  cervejame
What is the name of your organization?
[Unknown]:  cervejame
What is the name of your City or Locality?
[Unknown]:  São Paulo
What is the name of your State or Province?
[Unknown]:  São Paulo
What is the two-letter country code for this unit?
[Unknown]:  SP
Is CN=Jeferson Guardezi, OU=cervejame, O=cervejame, L=São Paulo, ST=São Paulo, C=SP correct?
[no]:  yes
```

###
install geolocation

```
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="Usamos a sua localização para identificar a sua região e mostrar os produtos disponiveis"
```

fix