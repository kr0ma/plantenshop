/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// JavaScript Document
// KNIPOOG, widget om het figcaption element van figure element dynamisch te tonen
// maakt gebruik van de widget factory
(function ($) {
    $.widget("ui.knipoog", {
        options: {
            location: "top",
            color: "black",
            bgColor: "silver",
            speed: "slow",
            padding: 4

        },
        _active: false,
        _destroyCalled: false,
        _create: function () {
            //initialisatie van de widget
            //this.element bevat het figure element als JQset
            this.element.img = $('img', this.element);
            this.element.cap = $('figcaption', this.element);
            var o = this.options;
            //console.log(this.element[0].nodeName);
            //vaste eigenschappen
            this.element.css({position: 'relative', height: '100px'});
            this.element.cap
                    .hide()
                    .css({
                        position: 'absolute',
                        left: 0,
                        width: this.element.img.width() - (o.padding * 2),
                        height: '80px',
                        opacity: '0.7',
                        padding: o.padding
                    });
            //aanpasbare eigenschappen
            this._CSStoepassen();
            //hover event handler voor het element
            this._setMouseHandler();
        },
        _CSStoepassen: function () {
            //alle aanpasbare eigenschappen hier
            console.log(this.element.cap);
            this.element.cap.css({
                color: this.options.color,
                backgroundColor: this.options.bgColor
            });
            //location speciaal
            switch (this.options.location) {
                case "top":
                    this.element.cap.css({top: 0});
                    break;
                case "bottom":
                    this.element.cap.css({bottom: 0});
                    break;
                default:
                    this.element.cap.css({top: 0});
                    break;
            }
            ;
        }, // einde _csstoepassen
        _setMouseHandler: function () {
//hover event handler
            var self = this;
            var o = self.options;
            self.element.hover(
                    function () {
                        self.element.cap.show("slide", {direction: "left"}, o.speed, function () { });
                    },
                    function () {
                        self.element.cap.hide('slide', {direction: "right"}, o.speed, function () {
                            self._active = false;
                            if (self._destroyCalled === true) {
                                self._vernietig();
                            }
                            ;
                        });
                    });
        }, // einde _setMouseHandler
        enable: function () {
            $.Widget.prototype.enable.apply(this, arguments);
            this._setMouseHandler();
        }, // einde enable
        disable: function () {
            $.Widget.prototype.disable.apply(this, arguments);
            this._removeMouseHandler();
        }, // einde disable
        _removeMouseHandler: function () {
            this.element.unbind('mouseenter mouseleave');
        }, // einde _removeMouseHandler
        _setOption: function (option, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            this._CSStoepassen();
        }, // einde _setOption
        destroy: function () {
            this._destroyCalled = true;
            if (this._active === false) {
                this._vernietig();
                this._destroyCalled = false;
            };
        }, // einde destroy
        _vernietig: function () {
            // call the base destroy function
            $.Widget.prototype.destroy.call(this, arguments);
            this._removeMouseHandler();
            this.element.css({height: '180px'});
            this.element.cap
                    .css({
                        position: 'static',
                        width: 'auto',
                        height: 'auto',
                        color: 'inherit',
                        backgroundColor: 'inherit',
                        opacity: '1',
                        padding: 0
                    })
                    .show();
        } // einde _vernietig
    });//einde widget
})(jQuery);

