## ANDROID INSTRUCTIONS

###build for release
```
cordova build --release android
```

### sign the build
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cervejame.keystore -storepass cervejame platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame


```
/Users/guardezi/Library/Android/sdk/build-tools/23.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk cervejame.apk
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


