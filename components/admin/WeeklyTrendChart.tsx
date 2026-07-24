import type { DailyStat } from "@/lib/useAdminStats";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface WeeklyTrendChartProps {
  data: DailyStat[];
}

export default function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  const maxValue = Math.max(1, ...data.map((d) => Math.max(d.orders, d.pageViews)));

  const chartWidth = 700;
  const chartHeight = 180;
  const groupWidth = chartWidth / Math.max(1, data.length);
  const barWidth = Math.min(22, groupWidth / 3);
  const baselineY = chartHeight - 24;
  const usableHeight = baselineY - 12;

  return (
    <div>
      <div className="flex items-center gap-4 mb-3 text-xs text-turtle-gray-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-turtle-pink inline-block" /> Orders
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-turtle-green inline-block" /> Page views
        </span>
      </div>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44" preserveAspectRatio="none">
        <line x1={0} y1={baselineY} x2={chartWidth} y2={baselineY} stroke="#F0F0F0" strokeWidth={1} />
        {data.map((d, i) => {
          const groupX = i * groupWidth;
          const ordersHeight = (d.orders / maxValue) * usableHeight;
          const viewsHeight = (d.pageViews / maxValue) * usableHeight;
          const weekday = DAY_LABELS[new Date(`${d.date}T00:00:00Z`).getUTCDay()];
          return (
            <g key={d.date}>
              <rect
                x={groupX + groupWidth / 2 - barWidth - 2}
                y={baselineY - ordersHeight}
                width={barWidth}
                height={ordersHeight}
                rx={3}
                fill="#FF2B85"
              >
                <title>{`${d.date}: ${d.orders} orders`}</title>
              </rect>
              <rect
                x={groupX + groupWidth / 2 + 2}
                y={baselineY - viewsHeight}
                width={barWidth}
                height={viewsHeight}
                rx={3}
                fill="#2ECC71"
              >
                <title>{`${d.date}: ${d.pageViews} page views`}</title>
              </rect>
              <text
                x={groupX + groupWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                fontSize={11}
                fill="#9E9E9E"
              >
                {weekday}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
