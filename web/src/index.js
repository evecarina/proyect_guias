

global._babelPolyfill = false;
import './style/index.scss'
import './js/image'
import $ from "jquery";

// import 'bootstrap' ; 

require('babel-polyfill');

if (typeof window.fetch !== "function") {
    window.fetch = require('whatwg-fetch').fetch;
}


const is_dev = process.env.NODE_ENV === 'development'

const api_url = is_dev ? 'http://localhost:5001/guias-e20fc/us-central1/api/v1/' : ''

let grid_guides;

const LIMIT = 8
let last_id = 0

async function getGuides(from, limit) {
    const $btn_vermas = $('#btn_mas')
    const guides = await window.fetch(`${api_url}guias/?id=${guia_id}&from=${from}&limit=${limit}`)
    console.log("guides1",guides)

    // .then((response)=> {
    //     const data = response.json();
    //     console.log('respuestaaaaaaa', data);

    // }).catch((err) => {
    //     console.log("err", err);
    // });

    let response = await guides.json()
    let response_data = await response.data;
    console.log("Array", response_data)
    if (response_data && !response_data.length) {
        $btn_vermas.css('display', 'none')
    }

    let content_guides = $('#grid__guides');
    const res_length = response_data.length
    for (var i = 0; i < res_length; i++) {

        console.log('response_data', res_length)
        grid_guides = `
        <div class="molds_guides molds_guides-${response_data[i].size}">
            <a href="${response_data[i].url}">
            <div class="molds_guides_relative">
                <picture>
                    <source media="(min-width: 650px)"
                        srcset="/static/categorias/contenidoEstatico/guiasdecomprasope/2020/home-guias/images/${response_data[i].image_dkp}.jpg">
                    <img src="/static/categorias/contenidoEstatico/guiasdecomprasope/2020/home-guias/images/${response_data[i].image_mb}.jpg"
                        alt="Aire libre  y jardín">
                </picture>
                <div class="molds_description">

                    <div class="molds_text">
                        <h2>${response_data[i].label.title}</h2>
                        <p>
                        ${response_data[i].label.subtitle}
                        </p>
                    </div>

                    <div class="molds_btn_read">
                        <button> Leer más</button>
                    </div>

                </div>
            </div>
            </a>
        </div>
        `
        content_guides.append(grid_guides);

        if (i === res_length - 1) {
            last_id = response_data[i].id + 1
        }
    }
    $btn_vermas.data('from', last_id)
}

getGuides(1, LIMIT);

let $btn_mas = $('#btn_mas');

$btn_mas.on('click', (e) => {
    e.preventDefault()
    const $this = $btn_mas
    console.log($this)
    const from = $this.data('from')
    getGuides(from, LIMIT)
    // $btn_mas.css('display','none')
})

// click para que el tab sea de color azul, y las lineas se elimen
let $content__menu_sub = $(".content__menu_sub")
$content__menu_sub.on('click', function () {
    $content__menu_sub.removeClass('active-tab');
    $content__menu_sub.removeClass('remove-line');
    $(this).addClass('active-tab');
    $(this).addClass('remove-line');
    $(this).prev().addClass('remove-line');

})

//  click para el menu se vuelve fixed cuando haces click
let $content__menu  = $('.content__menu');
let $navbar__toggle = $(".navbar-toggle");

$content__menu.on('click', function () {
    $content__menu.toggleClass('active-menu');
    $navbar__toggle.toggleClass('collapsed')
})


// deslizamiento del mouse cuando el menu este en la parte superior
let $header = $('#header');
$(window).scroll (function () {     
    let $windowScroll= $(window).scrollTop();
    // console.log("adasdas",$(window).scrollTop());
    $windowScroll > 200 ? $header.css('display','none') : $header.css('display','block');
    $windowScroll > 200 ? $content__menu.addClass('active__menu__top'): $content__menu.removeClass('active__menu__top');
})
