import './style.css';
import { dom } from './view/dom';
/* import { Game } from './controller/game';
import { Gameboard } from './model/gameboard';
import { Player } from './model/player'; */
import { events } from './view/eventlisteners';

dom.createGameboards();
events.startListener();
events.orientationListener();
events.gridListener('human');
events.gridListener();
