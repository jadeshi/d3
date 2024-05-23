// Sample data
const data = [
  { x: 30, y: 20, img: 'https://via.placeholder.com/100' },
  { x: 50, y: 80, img: 'https://via.placeholder.com/100' },
  { x: 90, y: 50, img: 'https://via.placeholder.com/100' },
  { x: 60, y: 40, img: 'https://via.placeholder.com/100' },
  { x: 80, y: 70, img: 'https://via.placeholder.com/100' }
];

// Set up SVG dimensions
const width = 500;
const height = 500;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };

// Create SVG container
const svg = d3.select('#scatterplot')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// Set up scales
const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

// Add X axis
svg.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(xScale));

// Add Y axis
svg.append('g')
  .call(d3.axisLeft(yScale));

// Create tooltip
const tooltip = d3.select('#tooltip');

// Add scatterplot points
svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.x))
  .attr('cy', d => yScale(d.y))
  .attr('r', 5)
  .style('fill', 'blue')
  .on('mouseover', (event, d) => {
    tooltip.style('opacity', 1)
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY + 10}px`);
    tooltip.html(`<img src="${d.img}" alt="Image">`);
  })
  .on('mouseout', () => {
    tooltip.style('opacity', 0);
  });
