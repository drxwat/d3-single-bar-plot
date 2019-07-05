import './style.css';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { transition, Transition } from 'd3-transition';
import { drawBgBar, drawBar, onMouseOverFactory } from './helpers';

const MARGIN = 25;
const W = 400;
const H = 100;

const data = [137, 168];
const dataSum = data[0] + data[1];

const plotRoot = select('#plot')
  .attr('viewBox', `0 0 ${W + MARGIN} ${H + MARGIN}`)
  .append('g')
  .attr('transform', `translate(${MARGIN / 2}, 0)`);

/**
 * Creating scale
 */
const scaleX = scaleLinear()
  .domain([0, dataSum])
  .range([0, W]);

/**
 * Drawing scale
 */
plotRoot
  .append('g')
  .attr('transform', `translate(0, ${H})`)
  .call(axisBottom(scaleX));

const bgRoot = plotRoot.append('g');
const barRoot = plotRoot.append('g');

const bgMouseOver = onMouseOverFactory(bgRoot, barRoot, true);
const colorMouseOver = onMouseOverFactory(bgRoot, barRoot, false);


drawBgBar(bgRoot, scaleX(dataSum), H, bgMouseOver);

drawBar(barRoot, data, scaleX(0), H, 0, colorMouseOver);
drawBar(barRoot, data, scaleX(data[0]), H, 700, colorMouseOver);

