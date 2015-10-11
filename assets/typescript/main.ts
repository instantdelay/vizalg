/// <reference path="svgjs.d.ts" />
/// <reference path="d3.d.ts" />

module av {
	
	class Node {
		x:number = 0;
		y:number = 0;
		r:number = 8;
		constructor() {
			
		}
		// draw(s:svgjs.Doc) {
		// 	s.circle(16).center(this.x, this.y);
		// 	s.circle(22).center(this.x, this.y).fill('none').stroke({color:'#000', width:2});
		// }
	}
	
	class Simulator {
		
	}
	
	var n = new Node();
	var data = [n, new Node()];
	var svg:d3.Selection<any>;
	
	function render() {
		var nd = svg
			.selectAll(".node")
			.data(data);
			
		nd.enter()
			.append("g")
			.attr("class", "node")
			.attr("transform", "translate(20, 20)")
			.append("circle");
		
		nd.select("circle").attr("r", (n:Node) => n.r);
		
		nd.exit().remove();
	}
	
	export function main() {
		svg = d3.select("#drawing").append("svg")
		render();
		
		// n.draw(s);
		
		document.body.addEventListener('click', function() {
			n.r = 16;
			render();
		});
	}
	
}

av.main();