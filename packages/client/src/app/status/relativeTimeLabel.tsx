import { Tooltip } from '@nextui-org/react';

const relativeTimeFormat = new Intl.RelativeTimeFormat('en', { style: 'narrow', numeric: 'auto' });

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const getRelativeTime = (date1: number, date2 = Date.now()) => {
  const elapsed = date1 - date2;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units) {
    const unit = u as keyof typeof units;

    if (Math.abs(elapsed) > units[unit]) {
      return relativeTimeFormat.format(Math.round(elapsed / units[unit]), unit);
    }
  }

  return relativeTimeFormat.format(Math.round(elapsed / units.second), 'second');
};

export const RelativeTimeLabel = ({ timestamp }: { timestamp: number }): JSX.Element => {
  return <Tooltip content={new Date(timestamp).toLocaleString()}>{getRelativeTime(timestamp)}</Tooltip>;
};
