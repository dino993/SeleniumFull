var authorithation = {};

authorithation.admin = {
    login: "admin",
    password: "admin"
}
module.exports.authorithation = authorithation;

var expectedMenues = [
    {
        main: "'Appearence'",
        inserted: ["'Template'", "'Logotype'"],
        expectedTitles: ["' Template'", "' Logotype'"]
    },
    {
        main: "'Catalog'",
        inserted: [
            "'Catalog'", "'Product Groups'", "'Option Groups'",
            "'Manufacturers'", "'Suppliers'", "'Delivery Statuses'",
            "'Sold Out Statuses'", "'Quantity Units'", "'CSV Import/Export'"
        ],
        expectedTitles: [
            "' Catalog'", "' Product Groups'", "' Option Groups'",
            "' Manufacturers'", "' Suppliers'", "' Delivery Statuses'",
            "' Sold Out Statuses'", "' Quantity Units'", "' CSV Import/Export'"
        ]
    },
    {
        main: "'Countries'",
        inserted: [],
        expectedTitles: ["' Countries'"]
    },
    {
        main: "'Currencies'",
        inserted: [],
        expectedTitles: ["' Currencies'"]
    },
    {
        main: "'Customers'",
        inserted: ["'Customers'", "'CSV Import/Export'", "'Newsletter'"],
        expectedTitles: ["' Customers'", "' CSV Import/Export'", "' Newsletter'"]
    },
    {
        main: "'Geo Zones'",
        inserted: [],
        expectedTitles: ["' Geo Zones'"]
    },
    {
        main: "'Languages'",
        inserted: ["'Languages'", "'Storage Encoding'"],
        expectedTitles: ["' Languages'", "' Storage Encoding'"]
    },
    {
        main: "'Modules'",
        inserted: [
            "'Background Jobs'", "'Customer'", "'Shipping'",
            "'Payment'", "'Order Total'", "'Order Success'",
            "'Order Action'"
        ],
        expectedTitles: [
            "' Job Modules'", "' Customer Modules'", "' Shipping Modules'",
            "' Payment Modules'", "' Order Total Modules'", "' Order Success Modules'",
            "' Order Action Modules'"
        ]
    },
    {
        main: "'Orders'",
        inserted: ["'Orders'", "'Order Statuses'"],
        expectedTitles: ["' Orders'", "' Order Statuses'"]
    },
    {
        main: "'Pages'",
        inserted: [],
        expectedTitles: ["' Pages'"]
    },
    {
        main: "'Reports'",
        inserted: ["'Monthly Sales'", "'Most Sold Products'", "'Most Shopping Customers'"],
        expectedTitles: ["' Monthly Sales'", "' Most Sold Products'", "' Most Shopping Customers'"]
    },
    {
        main: "'Settings'",
        inserted: [
            "'Store Info'", "'Defaults'", "'General'",
            "'Listings'", "'Images'", "'Checkout'",
            "'Advanced'", "'Security'"
        ],
        expectedTitles: [
            "' Settings'", "' Settings'", "' Settings'",
            "' Settings'", "' Settings'", "' Settings'",
            "' Settings'", "' Settings'"
        ]
    },
    {
        main: "'Slides'",
        inserted: [],
        expectedTitles: ["' Slides'"]
    },
    {
        main: "'Tax'",
        inserted: ["'Tax Classes'", "'Tax Rates'"],
        expectedTitles: ["' Tax Classes'", "' Tax Rates'"]
    },
    {
        main: "'Translations'",
        inserted: ["'Search Translations'", "'Scan Files'", "'CSV Import/Export'"],
        expectedTitles: ["' Search Translations'", "' Scan Files For Translations'", "' CSV Import/Export'"]
    },
    {
        main: "'Users'",
        inserted: [],
        expectedTitles: ["' Users'"]
    },
    {
        main: "'vQmods'",
        inserted: ["'vQmods'"],
        expectedTitles: ["' vQmods'"]
    }
];
module.exports.expectedMenues = expectedMenues;

var XGenerate = {};

XGenerate.rand = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};

XGenerate.randNumber = function (length, fzero) {
    length = length || 10;
    fzero = (fzero === undefined) ? false : fzero;
    var result = '';
    for (var i = 1; i <= length; i++) {
        if (i == 1) {
            result += XGenerate.rand(fzero ? 0 : 1, 9);
        } else {
            result += XGenerate.rand(0, 9);
        }
    }
    return result;
};

XGenerate.randString = function (len) {
    len = len || 10;
    var arr = [];

    arr[0] = XGenerate.rand(0, 9);
    arr[1] = XGenerate.rand(0, 9);

    arr[2] = 0;
    arr[3] = 1;

    arr[4] = XGenerate.rand(0, 9);
    arr[5] = XGenerate.rand(0, 9);
    arr[6] = XGenerate.rand(0, 9);
    arr[7] = XGenerate.rand(0, 9);
    arr[8] = XGenerate.rand(0, 9);


    return arr.join('');
};
module.exports.XGenerate = XGenerate;