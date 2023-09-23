import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavItem } from './menu/nav-item';
import { Router } from '@angular/router';

const BOSSES_ICON = `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="bosses" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bosses_g {
        fill: white;
        stroke: white;
        stroke-miterlimit: 10;
        stroke-width: 0;
      }
    </style>
  </defs>
  <g id="bosses_c" data-name="bosses">
    <path id="base" data-name="base" class="bosses_g" d="m1.2,5.6h0c-.2.2-.3.6-.1.7.2.2.4.3.7.4.7.2,1.4.3,2.1.3.8,0,1.6,0,2.3-.3.3,0,.5-.2.7-.4s.2-.4,0-.6c0,0-.1-.1-.2-.2,0,0,0,0,0,0,.4.1.8.2,1.1.5s.2.5,0,.7c-.2.2-.4.3-.7.4-.5.2-1,.3-1.6.4-.8.1-1.7.1-2.5,0-.7,0-1.5-.2-2.2-.5-.2,0-.4-.2-.5-.3-.3-.2-.3-.5,0-.7.2-.1.8-.4,1-.5h0Z"/>
    <path id="teeth" data-name="teeth" class="bosses_g" d="m3.4,6.5c-.2,0-.3,0-.5-.1,0-.2.1-.3.2-.5.1,0,.2,0,.4,0,0,.2,0,.3,0,.5h0Zm1.6-.1c-.2,0-.3,0-.5.1,0-.2,0-.3,0-.5.1,0,.3,0,.4,0,0,.2.1.3.2.5Zm-.8.2h-.5c0-.2,0-.3,0-.5h.4c0,.2,0,.3,0,.5Zm-1.4-.7c0,.2-.1.3-.2.5-.1,0-.3-.2-.4-.2,0-.1.2-.3.3-.4,0,0,.2,0,.3.1h0Zm2.9.2c-.1,0-.3.2-.4.2,0-.2-.1-.3-.2-.5,0,0,.2,0,.3-.1,0,.1.2.3.3.4h0Z"/>
    <path id="skull" data-name="skull" class="bosses_g" d="m6.3,1.7c-.4-1-1.1-1.6-2.1-1.6-.7,0-1.3,0-1.8.5-.3.3-.6.7-.8,1.1-.2.5-.3,1.1-.3,1.7,0,0,0,0,.1,0,.3.1.5.3.8.5.3.3.4.7.1,1.1.8.8,2.6.7,3.3,0-.3-.4-.2-.7,0-1s.3-.3.5-.4c.1,0,.3-.2.5-.3,0-.6-.1-1.1-.3-1.7Zm-3.8.3c1,.2,1.9.2,2.9,0l-.3.5c-.7.2-1.6.2-2.3,0l-.3-.5Zm-.6,1.4c-.1-.5,0-1,.5-1h0c.2.6.6.7,1.2.7v.5c-.5.3-1.1.2-1.7-.3Zm1.6,1.6c.1-.3.3-.7.4-1h0c.2.3.3.7.4,1h0c-.2.2-.6.2-.9,0Zm2.5-1.6h0c-.6.5-1.2.6-1.7.3v-.5c.6,0,1-.1,1.2-.7.5,0,.6.4.5,1Z"/>
  </g>
</svg>
`;

const INVENTORY_ICON =
  '<svg id="inventory__b" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><style>.inventory__d,.inventory__e,.inventory__g{stroke:#9fa8da}.inventory__d,.inventory__g,.inventory__h{fill:#9fa8da}.inventory__d,.inventory__g{stroke-miterlimit:10}.inventory__e{fill:none;stroke-linejoin:round;stroke-linecap:round}.inventory__h{stroke-width:0}.inventory__g{stroke-width:.8px}</style></defs><g id="inventory__c" data-name="Layer 1"><path class="inventory__h" d="M55.2 8.1c.7 0 1.3.6 1.3 1.3v66.4c0 .7-.6 1.3-1.3 1.3H3.3c-.7 0-1.3-.6-1.3-1.3V9.4c0-.7.6-1.3 1.3-1.3h51.9m0-2H3.3C1.5 6.1 0 7.6 0 9.4v66.4c0 1.8 1.5 3.3 3.3 3.3h51.9c1.8 0 3.3-1.5 3.3-3.3V9.4c0-1.8-1.5-3.3-3.3-3.3z"/><path class="inventory__h" d="M4.1 15.1c1.3 2.4 3 4.3 5 6.2l1.4 1.4c-.4.3-.8.6-1.3.9l.6.6 1.5-1.5c.9.6 1.6 1.4 2.2 2.3l.6-.6c-.9-.6-1.7-1.3-2.3-2.2l1.5-1.5-.6-.6c-.2.5-.5.9-.8 1.3-.9-.9-1.8-1.8-2.8-2.7C7.6 17.3 6 16 4.1 15zm10.1 0c-1.8 1-3.3 2.2-4.7 3.4l.5.5 1.2-1.2.3.3-1.2 1.2.5.5c1.3-1.4 2.5-2.9 3.4-4.7zm-7 2.7l4.3 4.3-.3.3-4.3-4.3.3-.3zm-1.6 2.4l-.6.6 1.5 1.5c-.6.9-1.4 1.6-2.3 2.2l.6.6c.6-.9 1.3-1.7 2.2-2.3l1.5 1.5.6-.6c-.4-.3-.9-.5-1.3-.9l1.1-1.1-.5-.5-1.2 1.2-.3-.3 1.2-1.2-.5-.5-1.2 1.2c-.3-.4-.6-.8-.8-1.3zM5.5 31.4l-.2.2.6 7.1-1.8 2 .7.7 1.9-1.7 7.1.5.2-.2v-.1c-.5-.5-.5-1.3-.8-2.3-.2-.8-.5-1.7-1.1-2.7l-.8 1.1c.6.8 1 1.4 1.3 2 .3.7.6 1.3.9 1.8l-6.4-.5 3.7-3.3 1.4-1.8-.9-.9-1.8 1.4-3.2 3.6-.5-6.4c.5.4 1.1.6 1.8.9.6.3 1.3.7 2 1.3l1.1-.8c-.9-.7-1.8-1-2.7-1.1-1-.2-1.8-.3-2.3-.8h-.1zm6.7 0H12h-.3-.2V32.8h.2l.7.7h1.3c0 .1.1 0 .1 0v-.2-.3-.3s0-.2-.1-.3L12.3 31s-.2 0-.3-.1zm0 .3l1.4 1.4v.4h-1.2l-.6-.7v-1.2h.4zm-1 2.6l-.4.7-4.3 4.3h-.2V39l4.3-4.3.7-.4zM10.8 47.7c-1.1.5-2.3.6-3.4 0v1c1.1.6 2.2.5 3.4 0v-1zm-4.7.2h-.5c0 .6.2 1.3.6 1.8.2-.1.3-.3.5-.4-.2-.5-.3-1-.3-1.5h-.2H6zm6.1 0H12h-.2c0 .5-.1 1-.3 1.5.1.1.3.3.5.4.5-.5.7-1.2.6-1.8h-.5zm-7 0c-.3 0-.6.2-.9.3 0 .7.3 1.5.8 1.9.3 0 .6-.1.8-.3-.5-.6-.7-1.3-.7-2zm8 0c0 .7-.2 1.4-.7 2 .2.1.5.2.8.3.5-.5.8-1.2.8-1.9-.3-.2-.6-.3-.9-.3zm-9.4.7c-.3.4-.5.9-.5 1.5.4.1.9.1 1.2.1-.4-.4-.7-1-.7-1.7zm10.7 0c0 .6-.3 1.2-.7 1.7.4 0 .8 0 1.2-.1 0-.7-.2-1.2-.5-1.5zm-3.3.4c-.6.3-1.2.5-1.8.5v5.3c1.8-.6 3-2 3-3.6s0-.6-.2-.9c-.4-.2-.8-.5-1.1-.8H11v-.2-.3zm-4.1 0v.3c0 .1-.1.2-.1.2-.3.3-.7.6-1.2.8 0 .3-.1.6-.1.9 0 1.6 1.3 2.9 3.1 3.6v-5.3c-.6 0-1.2-.2-1.8-.5zm-.4 5.1c-.1.1-.3.2-.4.4.5.4 1.3.9 2 1.1l.4-.4-2-1zm4.9 0l-2 1c.2.1.3.3.4.4.7-.2 1.4-.6 2-1.1l-.4-.4zm-5.6.7c-.2.2-.3.4-.4.6.6.5 1.3.9 2.1 1.1 0-.2.2-.4.3-.6-.8-.2-1.4-.7-2-1.1zm6.4 0c-.5.4-1.2.9-2 1.1l.3.6c.8-.2 1.5-.6 2.1-1.1-.1-.2-.3-.4-.4-.6zm-7 .9c-.1.2-.3.5-.4.7.7.7 1.5 1 2.4 1.1 0-.2.1-.5.2-.7-.8-.2-1.6-.7-2.2-1.1zm7.7 0c-.6.5-1.3.9-2.2 1.1 0 .2.2.5.2.7.9 0 1.7-.5 2.4-1.1-.1-.2-.3-.5-.4-.7zM11.5 64.1h-.2l-.3.7h-.1l-.2-.2v.2l-.4 1c-.5.8-1.2 1.2-1.9 1.6-.9.4-1.9.7-2.8 1-.5.2-.8.5-.9.9s-.1.9 0 1.4c.2 1 .9 2 1.7 2.6.8.6 2 .8 3 .7.5 0 1-.2 1.3-.5.4-.3.6-.7.6-1.2 0-.9-.1-2 0-3 0-.8.3-1.6.9-2.3s.3-.3.3-.3v1.9c-.3 0-.5.4-.5.7v.3l.5 2.5 1.4-.5-.5-2.5c0-.2-.2-.4-.3-.4h-.2v-2.2h.1l.2-.2-.2-.2h-.1l.5-.6c0-.7-1-1.4-1.8-1.4zm-.7 1.1l1.6 1.1-.5.4c-.6 0-1-.4-1.3-.9l.2-.7zm-.5 1.1c.3.4.7.7 1.2.8-.5.7-.7 1.5-.8 2.3-.1 0-.3-.2-.6-.2-.6-.2-1.4-.3-2.3-.3s-1.7.1-2.3.3c-.2 0-.5.2-.6.2.1-.3.3-.5.7-.7.9-.3 1.9-.6 2.8-1 .7-.4 1.4-.8 1.9-1.6zm2.2 2.9c.2 0 .3.1.3.3s-.1.3-.3.3-.3-.1-.3-.3.1-.3.3-.3zm-7.7.9c.1 0 .4.2.7.3.6.2 1.4.3 2.3.3s1.7-.1 2.3-.3c.2 0 .4-.1.6-.2v.4c-.1 0-.3.1-.4.2-.6.2-1.5.3-2.4.3s-1.8-.1-2.4-.3c-.2 0-.4-.1-.5-.2v-.5z"/><path class="inventory__g" d="M18 34.4h36M18 39.4h18M18 67.1h36M18 72.1h18M18 50.7h36M18 55.7h18"/><g><path class="inventory__d" d="M18 18.1h36M18 23.1h18"/></g><path d="M37.7 3.6H35C35 .4 33.4.1 29.1.1s-5.3.3-5.5 3.5h-1.9c-3 0-5.5 2.5-5.5 5.5h26.2c0-3-1.7-5.5-4.7-5.5zm-8.4-1.2c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z" stroke-width=".2" stroke-linecap="round" stroke-miterlimit="10" fill="#9fa8da" stroke="#9fa8da"/><g><path class="inventory__e" transform="rotate(-82.5 67.405 39.646)" d="M54.2 37.2h26.4v4.9H54.2z"/><path class="inventory__e" d="M66.7 26.2l4.8.6.6-4.4c.2-1.5-4.6-2.1-4.8-.6l-.6 4.4zM68.1 53.1l-3.2 5.5-1.7-6.2 4.9.7z"/></g></g></svg>';
const INVENTORY = `
  <?xml version="1.0" encoding="UTF-8"?>
<svg id="inventory" data-name="inventory_b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <defs>
 <style> .inventory_b { stroke-width: 1px; } .inventory_b, .inventory_c { stroke-linejoin: round; } .inventory_b, .inventory_c, .inventory_d, .inventory_e, .inventory_f { stroke: #9fa8da; } .inventory_b, .inventory_c, .inventory_d, .inventory_f { fill: none; } .inventory_b, .inventory_c, .inventory_e { stroke-linecap: round; } .inventory_d { stroke-width: .8px; } .inventory_d, .inventory_e, .inventory_f { stroke-miterlimit: 10; } .g { stroke-width: 0px; } .g, .inventory_e { fill: #9fa8da; } .inventory_e { stroke-width: .2px; } </style>
  </defs>
  <path class="inventory_g" d="m60.7,10.5c.6,0,1.1.5,1.1,1.2v59.7c0,.6-.5,1.2-1.1,1.2H17.2c-.6,0-1.1-.5-1.1-1.2V11.7c0-.6.5-1.2,1.1-1.2h43.6m0-1.8H17.2c-1.5,0-2.8,1.3-2.8,3v59.7c0,1.6,1.3,3,2.8,3h43.6c1.5,0,2.8-1.3,2.8-3V11.7c0-1.6-1.3-3-2.8-3h0Z"/>
  <path class="inventory_g" d="m18,16.8c1.2,2.2,2.7,3.9,4.5,5.6h0l1.2,1.3c-.4.3-.7.5-1.2.8l.5.5,1.3-1.3c.8.5,1.4,1.3,2,2.1l.5-.5c-.8-.5-1.5-1.2-2-2l1.3-1.3-.5-.5c-.2.4-.4.8-.7,1.2-.8-.8-1.6-1.6-2.5-2.4h0c-1.3-1.3-2.8-2.4-4.5-3.3h0Zm9,0c-1.6.9-2.9,2-4.2,3.1l.4.4,1.1-1.1.3.3-1.1,1.1.4.4c1.2-1.3,2.2-2.6,3-4.2h0Zm-6.2,2.4l3.8,3.9s-.2.2-.3.3l-3.8-3.9s.3-.3.3-.3Zm-1.4,2.2l-.5.5,1.3,1.3c-.5.8-1.2,1.4-2,2l.5.5c.5-.8,1.2-1.5,2-2.1l1.3,1.3.5-.5c-.4-.3-.8-.4-1.2-.8.4-.4.7-.7,1-1l-.4-.4-1.1,1.1s-.2-.2-.3-.3l1.1-1.1-.4-.4c-.4.4-.7.7-1.1,1.1-.3-.4-.5-.7-.7-1.2h0Z"/>
  <path class="inventory_g" d="m19.3,31.5l-.2.2h0l.5,6.4-1.6,1.8.6.6,1.7-1.5,6.3.4h0l.2-.2h0c-.4-.5-.4-1.3-.7-2.2-.2-.7-.4-1.5-1-2.4l-.7,1h0c.5.7.9,1.3,1.2,1.8.3.6.5,1.2.8,1.6l-5.7-.4,3.3-3,1.2-1.6-.8-.8-1.6,1.3-2.8,3.2-.4-5.8c.4.4,1,.5,1.6.8.5.3,1.2.6,1.8,1.2l1-.7c-.8-.6-1.6-.9-2.4-1-.9-.2-1.6-.3-2-.7h-.2Zm6,0h-.6v1.3h.2l.6.6h1.2c0,0,0,0,0,0v-.7s0-.2,0-.3l-1.2-1.3s-.2,0-.3,0h0l.2.4Zm0,.3h0l1.2,1.3h0v.4h-1.1l-.5-.6v-1.1h.4Zm-.9,2.3l-.4.6-3.8,3.9h-.2v-.3l3.8-3.9.6-.4h0Z"/>
  <path class="inventory_g" d="m24,46.1c-1,.4-2,.5-3,0v.9c1,.5,2,.4,3,0v-.9Zm-4.2.2h-.4c0,.5.2,1.2.5,1.6.2,0,.3-.3.4-.4-.2-.4-.3-.9-.3-1.3h-.4,0Zm5.4,0h-.4c0,.4,0,.9-.3,1.3,0,0,.3.3.4.4.4-.4.6-1.1.5-1.6h-.4,0Zm-6.2,0c-.3,0-.5.2-.8.3,0,.6.3,1.3.7,1.7h0c.3,0,.5,0,.7-.3-.4-.5-.6-1.2-.6-1.8h0Zm7.1,0c0,.6-.2,1.3-.6,1.8.2,0,.4.2.7.3h0c.4-.4.7-1.1.7-1.7-.3-.2-.5-.3-.8-.3h0Zm-8.4.6c-.3.4-.4.8-.4,1.3.4,0,.8,0,1.1,0-.4-.4-.6-.9-.6-1.5h0Zm9.5,0c0,.5-.3,1.1-.6,1.5.4,0,.7,0,1.1,0,0-.6-.2-1.1-.4-1.3h0Zm-2.9.4h0c-.5.3-1.1.4-1.6.4v4.8c1.6-.5,2.7-1.8,2.7-3.2s0-.5-.2-.8c-.4-.2-.7-.4-1-.7h0v-.4h.2Zm-3.7,0v.3h0c0,0,0,.2,0,.2-.3.3-.6.5-1.1.7,0,.3,0,.5,0,.8,0,1.4,1.2,2.6,2.8,3.2v-4.8c-.5,0-1.1-.2-1.6-.4h0Zm-.4,4.6c0,0-.3.2-.4.4.4.4,1.2.8,1.8,1,0,0,.3-.3.4-.4l-1.8-.9h0Zm4.4,0l-1.8.9c.2,0,.3.3.4.4.6-.2,1.2-.5,1.8-1,0,0-.3-.3-.4-.4h0Zm-5,.6c-.2.2-.3.4-.4.5.5.4,1.2.8,1.9,1,0-.2.2-.4.3-.5-.7-.2-1.2-.6-1.8-1h0Zm5.7,0c-.4.4-1.1.8-1.8,1,0,.2.2.4.3.5.7-.2,1.3-.5,1.9-1,0-.2-.3-.4-.4-.5h0Zm-6.2.8c0,.2-.3.4-.4.6.6.6,1.3.9,2.1,1,0-.2,0-.4.2-.6-.7-.2-1.4-.6-2-1h0Zm6.9,0c-.5.4-1.2.8-2,1,0,.2.2.4.2.6.8,0,1.5-.4,2.1-1,0-.2-.3-.4-.4-.6h0Z"/>
  <path class="inventory_g" d="m24.6,60.9h-.2l-.3.6h0l-.2-.2v.2l-.4.9h0c-.4.7-1.1,1.1-1.7,1.4-.8.4-1.7.6-2.5.9-.4.2-.7.4-.8.8s0,.8,0,1.3c.2.9.8,1.8,1.5,2.3s1.8.7,2.7.6c.4,0,.9-.2,1.2-.4.4-.3.5-.6.5-1.1,0-.8,0-1.8,0-2.7,0-.7.3-1.4.8-2.1h0l.3-.3v1.7c-.3,0-.4.4-.4.6v.3h0l.4,2.2,1.2-.4-.4-2.2c0-.2-.2-.4-.3-.4h-.2v-2h0l.2-.2-.2-.2h0l.4-.5c0-.6-.9-1.3-1.6-1.3h0Zm-.6,1l1.4,1h0l-.4.4c-.5,0-.9-.4-1.2-.8l.2-.6h0Zm-.4,1c.3.4.6.6,1.1.7-.4.6-.6,1.3-.7,2.1h0c0,0-.3-.2-.5-.2-.5-.2-1.2-.3-2-.3s-1.5,0-2,.3c-.2,0-.4.2-.5.2,0-.3.3-.4.6-.6.8-.3,1.7-.5,2.5-.9.6-.4,1.2-.7,1.7-1.4h0v.2Zm2,2.6c.2,0,.3,0,.3.3s0,.3-.3.3-.3,0-.3-.3,0-.3.3-.3h0Zm-6.9.8h0c0,0,.4.2.6.3.5.2,1.2.3,2,.3s1.5,0,2-.3c.2,0,.4,0,.5-.2v.4c0,0-.3,0-.4.2-.5.2-1.3.3-2.1.3s-1.6,0-2.1-.3c-.2,0-.4,0-.4-.2v-.4h-.2Z"/>
  <g>
    <line class="inventory_d" x1="30.4" y1="34.2" x2="57.2" y2="34.2"/>
    <line class="inventory_d" x1="30.4" y1="38.7" x2="43.8" y2="38.7"/>
  </g>
  <g>
    <line class="inventory_d" x1="30.4" y1="63.6" x2="57.2" y2="63.6"/>
    <line class="inventory_d" x1="30.4" y1="68" x2="43.8" y2="68"/>
  </g>
  <g>
    <line class="inventory_d" x1="30.4" y1="48.8" x2="57.2" y2="48.8"/>
    <line class="inventory_d" x1="30.4" y1="53.3" x2="43.8" y2="53.3"/>
  </g>
  <g>
    <line class="inventory_f" x1="30.4" y1="19.5" x2="57.2" y2="19.5"/>
    <line class="inventory_f" x1="30.4" y1="24" x2="43.8" y2="24"/>
  </g>
  <path class="inventory_e" d="m46.4,6.5h-2.4c0-2.9-1.4-3.1-5.3-3.1s-4.7.3-4.9,3.1h-1.7c-2.7,0-4.9,2.2-4.9,4.9h23.3c0-2.7-1.5-4.9-4.2-4.9Zm-7.4-.5c-.4,0-.9-.5-.9-.9s.4-.9.9-.9.9.5.9.9-.4.9-.9.9Z"/>
  <g>
    <polygon class="inventory_b" points="65.2 51.9 68 28.3 72.4 28.8 69.6 52.4 65.2 51.9"/>
    <path class="inventory_c" d="m68,28.3l4.3.5.5-4c.2-1.3-4.1-1.8-4.3-.5l-.5,4Z"/>
    <polygon class="inventory_c" points="69.5 52.4 66.7 57.4 65.2 51.8 69.5 52.4"/>
  </g>
</svg>
  `;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'farmer-companion';
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    iconReg: MatIconRegistry,
    sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconReg.addSvgIconLiteral(
      'bosses',
      sanitizer.bypassSecurityTrustHtml(BOSSES_ICON),
      {
        viewBox: '0 0 8 7.5'
      }
    );
    iconReg.addSvgIconLiteral(
      'inventory',
      sanitizer.bypassSecurityTrustHtml(INVENTORY)
    );
  }

  navItems: NavItem[] = [
    {
      title: 'Bosses',
      icon: 'bosses',
      route: '/bosses',
    },
    {
      title: 'Inventory',
      icon: 'inventory',
      route: '/inventory',
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: '/settings',
    },
  ];

  navigate(route: string) {
    this.router.navigate([route]);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
