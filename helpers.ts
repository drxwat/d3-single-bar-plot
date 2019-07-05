import { Selection } from 'd3-selection';
import { transition, Transition } from 'd3-transition';

export function drawBgBar(
  plotRoot: Selection<SVGGElement, any, HTMLElement, any>,
  width: number,
  height: number,
  onMouseOver: (d, i, n) => void
) {
  plotRoot
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr("fill", "#e91e63")
    .on('mouseover', onMouseOver);
}

/**
 * SELECT ONE TO remove dubplicates
 */
export function drawBar(
  plotRoot: Selection<SVGGElement, any, HTMLElement, any>,
  data: number[],
  width: number,
  height: number,
  duration: number,
  onMouseOver: (d, i, n) => void
) {
  const updateSelection = plotRoot
    .selectAll<SVGRectElement, unknown>('rect')
    .data(data);

  const updateAndEnterSelection = updateSelection
    .enter()
    .append('rect')
    .merge(updateSelection);

  updateAndEnterSelection.on('mouseover', onMouseOver);

  (transition.call(updateAndEnterSelection) as
    Transition<SVGRectElement, unknown, null, undefined>)
    .selectAll(() => updateAndEnterSelection.nodes())
    .duration(duration)
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr("fill", "#00bcd4");
}

export function onMouseOverFactory(
  bgRoot: Selection<SVGGElement, any, HTMLElement, any>,
  colorRoot: Selection<SVGGElement, any, HTMLElement, any>,
  isBgElement: boolean) {
  const bgRect = bgRoot.select('rect');
  const colorRect = bgRoot.select('rect');
  return (data, index, nodes) => {
    if (isBgElement) {
      bgRect.attr('opacity', '1');
      colorRect.attr('opacity', '0.8');
    } else {
      colorRect.attr('opacity', '1');
      bgRect.attr('opacity', '0.8');
    }
  }
}