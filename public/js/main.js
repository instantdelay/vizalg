/// <reference path="svgjs.d.ts" />
/// <reference path="d3.d.ts" />
var av;
(function (av) {
    var Node = (function () {
        function Node() {
            this.x = 0;
            this.y = 0;
            this.r = 8;
        }
        return Node;
    })();
    var Simulator = (function () {
        function Simulator() {
        }
        return Simulator;
    })();
    var n = new Node();
    var data = [n, new Node()];
    var svg;
    function render() {
        var nd = svg
            .selectAll(".node")
            .data(data);
        nd.enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", "translate(20, 20)")
            .append("circle");
        nd.select("circle").attr("r", function (n) { return n.r; });
        nd.exit().remove();
    }
    function main() {
        svg = d3.select("#drawing").append("svg");
        render();
        // n.draw(s);
        document.body.addEventListener('click', function () {
            n.r = 16;
            render();
        });
    }
    av.main = main;
})(av || (av = {}));
av.main();
