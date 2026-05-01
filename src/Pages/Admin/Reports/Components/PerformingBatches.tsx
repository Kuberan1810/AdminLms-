import React from 'react';

interface Batch {
  name: string;
  value: number;
  color: string;
}

interface PerformingBatchesProps {
  batches: Batch[];
}

const PerformingBatches: React.FC<PerformingBatchesProps> = ({ batches }) => {
  const pieTotal = batches.reduce((s, b) => s + b.value, 0);
  let pieAngle = -90;
  
  const slices = batches.map(b => {
    const deg = (b.value / pieTotal) * 360;
    const start = pieAngle;
    const end = pieAngle + deg;
    pieAngle = end;
    const r = 110, cx = 115, cy = 115;
    const rad1 = start * Math.PI / 180, rad2 = end * Math.PI / 180;
    const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
    return { 
      ...b, 
      d: `M${cx} ${cy} L${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}Z` 
    };
  });

  return (
    <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-[#F1F5F9] dark:border-slate-800 p-7 transition-colors duration-300">
      <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist']">Top Performing Batches</h3>
      <p className="text-[13px] text-[#64748B] dark:text-slate-400 mt-0.5 mb-6">Batch ID</p>

      <div className="flex justify-center mb-6">
        <svg width="230" height="230" viewBox="0 0 230 230">
          {slices.map((s, i) => (
            <path key={i} d={s.d} fill={s.color} className="stroke-white dark:stroke-slate-900" strokeWidth="3" />
          ))}
        </svg>
      </div>

      <div className="space-y-3">
        {batches.map((b, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: b.color }} />
              <span className="text-[15px] font-medium text-[#475569] dark:text-slate-400 leading-[18px] font-['Urbanist']">{b.name}</span>
            </div>
            <span className="text-[14px] font-bold text-[#171C1F] dark:text-white">{b.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformingBatches;
