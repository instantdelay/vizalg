/// <reference path="svgjs.d.ts" />
/// <reference path="d3.d.ts" />

module av {
	
	class Simulator {
		
	}
	
	class Graph {
		vertices:Array<any>;
		edges:Array<{source:any,target:any}>;
		
		constructor(vertices:Array<any>,edges:Array<any>) {
			this.vertices = vertices;
			this.edges = edges;
		}
	}
	
	class GraphView {
		private svg:d3.Selection<any>;
		private nodeView:d3.selection.Update<any>;
		private edgeView:d3.selection.Update<any>;
		private force:d3.layout.Force<any,any>;
		private graph:Graph;
		
		constructor(selector:string) {
			var elem = <HTMLElement>document.querySelector(selector);
			
			this.svg = d3.select(selector).append("svg");
			this.setupLayout(elem.offsetWidth, elem.offsetHeight);
		}
		
		setData(graph:Graph) {
			this.graph = graph;
			this.update();
			return this;
		}
		
		refresh() {
			this.update();
			return this;
		}
		
		private update() {
			this.nodeView = this.svg
				.selectAll(".node")
				.data(sample.vertices);
			
			this.edgeView = this.svg.selectAll('.edge')
				.data(sample.edges);
				
			this.nodeView.enter()
				.append("g")
				.attr("class", "node")
				.append("circle");
			
			this.nodeView.select("circle").attr("r", 8);
			
			this.nodeView.exit().remove();
			
			this.edgeView.enter()
				.append("line")
				.attr("class", "edge");
			
			this.edgeView.exit().remove();
			
			this.force.start();
		}
		
		private setupLayout(width, height) {
			this.force = d3.layout.force()
				.charge(-120)
				.linkDistance(30)
				.size([width, height]);
				
			this.force.nodes(sample.vertices)
				.links(sample.edges)
				.start();
			
			this.force.on('tick', () => {
				if (!this.nodeView)
					return;
				
				this.nodeView
					.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
				this.edgeView
					.attr("x1", (d) => d.source.x)
					.attr("y1", (d) => d.source.y)
					.attr("x2", (d) => d.target.x)
					.attr("y2", (d) => d.target.y);
			});
		}
		
	}
	
	var sample = {vertices: [
		{}, {}, {}
	],
	edges: [
		{source: 0, target: 1},
		{source: 1, target: 2}
	]};
	
	export function main() {
		var g = new GraphView("#graph")
			.setData(new Graph(sample.vertices, sample.edges));
		
		document.body.addEventListener('click', function() {
			var idx = Math.floor(Math.random() * sample.vertices.length);
			
			sample.vertices.push({});
			sample.edges.push({source: idx, target: sample.vertices.length - 1});
			
			g.refresh();
		});
	}
	
}

av.main();