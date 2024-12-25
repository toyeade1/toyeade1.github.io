import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useLocation } from 'wouter';
import { graphData } from '@/lib/data';

export function ForceGraph() {
  const graphRef = useRef<any>();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-100);
    }
  }, []);

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={graphData}
      nodeLabel={(node: any) => node.title}
      nodeColor={() => '#888'}
      linkColor={() => '#ddd'}
      nodeRelSize={6}
      linkWidth={1}
      onNodeClick={(node: any) => {
        if (node.path) {
          setLocation(node.path);
        }
      }}
      enableNodeDrag={false}
      height={window.innerHeight - 80}
      width={380}
      d3Force={(forceName: string) => {
        switch (forceName) {
          case 'center':
            return (width: number, height: number) => [width / 2, height / 2];
          case 'collision':
            return 15;
          case 'x':
            return (width: number) => [width / 2, 0.05];
          case 'y':
            return (height: number) => [height / 2, 0.05];
          default:
            return null;
        }
      }}
    />
  );
}