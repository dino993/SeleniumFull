var target = require('../app/application'),
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Litecart', function() {
    var app;

    test.before(function() {
        app = new target.Application();
    });

    var ducksColors = ["Green", "Red", "Purple"];
    var ducksCount = ducksColors.length;

    test.it('Task 19 - add to cart', function*() {

        var cartCount = yield app.getCartCount();
        assert.equal(cartCount, 0, "Корзин не пустая");
        console.log("\nИсходное число товаров в корзине = " + cartCount);

        for(var i = 0; i < ducksCount; i++) {
            cartCount++;
            app.addDuckToCart(ducksColors[i]);
            app.checkDuckAdded(cartCount);
        }

        var newCartCount = yield app.getCartCount();
        assert.equal(newCartCount, ducksCount, "Корзин не содержит нужное число уток");
        console.log("\nИсходное число товаров в корзине = " + cartCount);

    });

    test.it('Task 19 - delete from cart', function*() {

        app.goToCartPage();

        for(var i = 0; i < ducksCount; i++) {
            var duckTitleText = yield app.getDuckTitleText();
            app.deleteDuckFromCart(duckTitleText);
            console.log("\nУтка " + duckTitleText + " исчезла из таблицы, идем дальше");
        }

        var newCartCount = yield app.getCartCount();
        assert.equal(newCartCount, 0, "Корзин не пустая");
        console.log("\nЧисло товаров в корзине после удаления = " + newCartCount);
    });

    test.after(function() {
        app.quit();
    });
});
