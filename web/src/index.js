
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

const LIMIT = 1
let last_id = 0

async function getGuides(from, limit) {
    const $btn_vermas = $('#btn_mas')
    const guides = await window.fetch(`${api_url}guias/?id=${guia_id}&from=${from}&limit=${limit}`)

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
    for (var i=0 ; i < res_length; i++) { 

        console.log('response_data',res_length)
        grid_guides = `
        <div class="molds_guides molds_guides-${response_data[i].size}">
            <div class="molds_guides_relative">
                <picture>
                    <source media="(min-width: 650px)"
                        srcset="https://sodimac.scene7.com/is/image/SodimacPeru/dkp-2?wid=312&hei=350">
                    <img src="https://sodimac.scene7.com/is/image/SodimacPeru/mb-2?wid=183&hei=251"
                        alt="Aire libre  y jardín">
                </picture>
                <div class="molds_description">

                    <div class="molds_text">
                        <p>
                        ${response_data[i].label.subtitle}
                        </p>
                    </div>

                    <div class="molds_btn_read">
                        <button> Leer más</button>
                    </div>

                </div>
            </div>
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
})


