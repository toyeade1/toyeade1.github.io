const createGraph = () => {
    const width = 600;
    const height = 400;
    
    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");
    
    const nodes = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "blog", label: "Blog" },
        // Add more nodes for blog posts
    ];
    
    const links = [
        { source: "home", target: "about" },
        { source: "home", target: "blog" },
        // Add more links as needed
    ];
    
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .style("stroke", "#666")
        .style("stroke-width", 2);
    
    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 8)
        .style("fill", "#6b9fed");
    
    const labels = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(d => d.label)
        .attr("font-size", "12px")
        .attr("dx", 12)
        .attr("dy", 4)
        .style("fill", "#e0e0e0");
    
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        labels
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
};

document.addEventListener("DOMContentLoaded", createGraph);