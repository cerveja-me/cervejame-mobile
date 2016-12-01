export class Library {
  // public static get URL():string { return "http://localhost:1337/api.cerveja.me/"; }
  public static get URL():string { return "http://api.cerveja.me/"; }
  public static get DEVICE():string { return "device"; }
  public static get LOCATION():string { return "location"; }
  public static get GOOGLE_GEOCODE():string { return "https://maps.googleapis.com/maps/api/geocode/json?address=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg"}
  public static get GOOGLE_ADDRESS():string { return "https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg"}
}
