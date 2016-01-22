/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// JavaScript Document
//script voor homepagina

$(function () {
    var ikoontjes = {
        header: "ui-icon-circle-arrow-e",
        headerSelected: "ui-icon-circle-arrow-s"
    };
    
    $('#keuzes').accordion({
        active: 1,
        icons: ikoontjes,
        heightStyle:"content",
        collapsible:true
        //,animate:"easeOutBounce"
    });
});//einde doc ready


