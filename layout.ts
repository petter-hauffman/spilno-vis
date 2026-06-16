import { Node } from 'reactflow';
import { SpilnoNodeData, PartnerNodeData } from './types';

type AnyNodeData = SpilnoNodeData | PartnerNodeData;

// ─── Radii ──────────────────────────────────────────────────────────────────
const R = {
  center:    0,
  branch:    320,
  subBranch: 250,
  leaf:      660,
};

// ─── Program map branch angles (degrees, clockwise from right = 0°) ───────────
const BRANCH_ANGLE: Record<string, number> = {
  // Program map
  why:    -90,
  what:   -18,
  who:     54,
  how:    126,
  where:  198,
  // Consortium map
  lead:      -90,
  technical: -18,
  financing:  54,
  public:    126,
  civil:     198,
};

// Sub-branches (WHAT pillars, and consortium-lead sub-roles)
const SUB_BRANCH_ANGLE: Record<string, number> = {
  remember: -18 - 20,
  cocreate: -18,
  rebuild:  -18 + 20,
};

const LEAF_ARC = 68;

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

export function computeLayout<T extends AnyNodeData>(nodes: Node<T>[]): Node<T>[] {
  const branchLeafCounts: Record<string, number> = {};
  for (const n of nodes) {
    if ((n.data as AnyNodeData & { depth: number }).depth === 2) {
      const bid = (n.data as AnyNodeData & { branchId: string }).branchId;
      branchLeafCounts[bid] = (branchLeafCounts[bid] ?? 0) + 1;
    }
  }

  return nodes.map((node) => {
    const data = node.data as AnyNodeData & { depth: number; branchId: string; leafIndex?: number };
    const { depth, branchId, leafIndex } = data;

    let position = { x: 0, y: 0 };

    if (depth === 0) {
      position = polarXY(0, R.center);
    } else if (depth === 1) {
      if (branchId in BRANCH_ANGLE) {
        position = polarXY(BRANCH_ANGLE[branchId], R.branch);
      } else if (branchId in SUB_BRANCH_ANGLE) {
        position = polarXY(SUB_BRANCH_ANGLE[branchId], R.subBranch);
      }
    } else if (depth === 2) {
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
