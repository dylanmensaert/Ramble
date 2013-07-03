define([
    "App"
], function (App) {
    "use strict";

    describe("Video-describe", function () {
        it("Video-it", function () {
            runs(function () {
                waitsFor(function () {
                    return window.isAppInitialized;
                }, "App never initializing ", 10000);

                runs(function () {
                    expect(App.Video.FIXTURES.length).toBe(31);
                });
            });
        });
    });
});
