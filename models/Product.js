function Product(titleFR, titleKR, brand, img, price, descriptionFR, descriptionKR, asin, category, url, available, isPrime, weight) {
    this.titleFR = titleFR || 'Undefined';
    this.titleKR = titleKR || 'Undefined';
    this.brand = brand || 'Undefined';
    this.img = img || 'Undefined';
    this.price = price || 0.00;
    this.descriptionFR = descriptionFR || 'Undefined';
    this.descriptionKR = descriptionKR || 'Undefined';
    this.asin = asin || 'Undefined';
    this.category = category || 'Undefined';
    this.url = url || 'Undefined';
    this.available = available || false;
    this.isPrime = isPrime || false;
    this.weight = weight || 0.00;

}

module.exports = Product;