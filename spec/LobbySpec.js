define([
    "App"
], function (App) {
    "use strict";

    describe("Lobby-describe", function () {
        it("Lobby-it", function () {
            runs(function () {
                waitsFor(function () {
                    return window.isAppInitialized;
                }, "App never initialized!", 10000);

                runs(function () {
                    expect(App.Lobby.FIXTURES.length).toBe(3);
                });
            });
        });
    });
});
