import './style.css';
import { dom } from './view/dom';
import { events } from './view/eventlisteners';

dom.createGameboards();
events.startListener();
events.orientationListener();
events.gridListener('human');
events.gridListener('AI');
