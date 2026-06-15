import { Node } from 'reactflow';
import { SpilnoNodeData } from './types';

type SpilnoNode = Node<SpilnoNodeData>;

// ─── Radii ──────────────────────────────────────────────────────────────────
const R = {
  center:    0,
  branch:    320,   // depth-1 main branches
  subBranch: 250,   // depth-1 sub-branches of WHAT (remember/cocreate/rebuild)
  leaf:      660,   // depth-2 leaf nodes
};

// ─── Branch angles (degrees, clockwise from right = 0°) ─────────────────────
const BRANCH_ANGLE: Record<string, number> = {
  why:    -90,
  what:   -18,
  who:     54,
  how:    126,
  where:  198,
};

// Sub-branches of WHAT sit ±20° around the WHAT angle at a closer radius
const SUB_BRANCH_ANGLE: Record<string, number> = {
  remember: -18 - 20,   // -38°
  cocreate: -18,         // -18°
  rebuild:  -18 + 20,    //   2°
};

// ─── Leaf arc spread ─────────────────────────────────────────────────────────
// Total arc for a group of leaves around their parent angle
const LEAF_ARC = 68; // degrees

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarXY(angleDeg: number, radius: number) {
  const r = toRad(angleDeg);
  return {
    x: Math.round(radius * Math.cos(r)),
    y: Math.round(radius * Math.sin(r)),
  };
}

function leafAngle(parentAngle: number, idx: number, total: number): number {
  if (total === 1) return parentAngle;
  return parentAngle - LEAF_ARC / 2 + (LEAF_ARC / (total - 1)) * idx;
}

/**
 * Assigns x/y positions to every node based on its depth and branch.
 * Nodes in constants.tsx carry branchId and leafIndex metadata.
 */
export function computeLayout(nodes: SpilnoNode[]): SpilnoNode[] {
  // Group depth-2 nodes by branchId to know total count per branch
  const branchLeafCounts: Record<string, number> = {};
  for (const n of nodes) {
    if (n.data.depth === 2) {
      const bid = n.data.branchId;
      branchLeafCounts[bid] = (branchLeafCounts[bid] ?? 0) + 1;
    }
  }

  return nodes.map((node) => {
    const { depth, branchId, leafIndex } = node.data;

    let position = { x: 0, y: 0 };

    if (depth === 0) {
      // Center node
      position = polarXY(0, R.center);
    } else if (depth === 1) {
      // Main branches (why/what/who/how/where) or WHAT sub-branches
      if (branchId in BRANCH_ANGLE) {
        position = polarXY(BRANCH_ANGLE[branchId], R.branch);
      } else if (branchId in SUB_BRANCH_ANGLE) {
        position = polarXY(SUB_BRANCH_ANGLE[branchId], R.subBranch);
      }
    } else if (depth === 2) {
      // Determine parent angle
      let parentAngle = 0;
      if (branchId in BRANCH_ANGLE) {
        parentAngle = BRANCH_ANGLE[branchId];
      } else if (branchId in SUB_BRANCH_ANGLE) {
        parentAngle = SUB_BRANCH_ANGLE[branchId];
      }

      const total = branchLeafCounts[branchId] ?? 1;
      const idx = leafIndex ?? 0;
      const angle = leafAngle(parentAngle, idx, total);
      position = polarXY(angle, R.leaf);
    }

    return { ...node, position };
  });
}
