import { useEffect, useState } from 'react';

interface ContribResponse {
  total: Record<string, number>;
}

export const useContributions = (user: string): string | null => {
  const [total, setTotal] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=all`)
      .then((r) => (r.ok ? (r.json() as Promise<ContribResponse>) : Promise.reject()))
      .then((d) => {
        const sum = Object.values(d.total ?? {}).reduce((a, b) => a + b, 0);
        if (alive && sum > 0) setTotal(sum.toLocaleString('en-US'));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [user]);

  return total;
};
