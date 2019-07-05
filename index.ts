import './style.css';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { transition, Transition } from 'd3-transition';

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

const updateSelection = plotRoot
  .selectAll<SVGRectElement, unknown>('rect')
  .data(data);

const updateAndEnterSelection = updateSelection
  .enter()
  .append('rect')
  .merge(updateSelection);

(transition.call(updateAndEnterSelection) as
  Transition<SVGRectElement, unknown, null, undefined>)
  .selectAll(() => updateAndEnterSelection.nodes())
  .duration(700)
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', scaleX(dataSum))
  .attr('height', H)
  .attr("fill", "#20c997")
  .attr('stroke', '#fff')
  .attr('stroke-width', '3')
  .attr('opacity', '.8');
