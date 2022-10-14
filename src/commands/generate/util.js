export const getRandomYmd = (fromYmd) => {
  const d1 = new Date(fromYmd);
  const d2 = new Date();

  const c = (d2 - d1) / 86400000;
  const x = Math.floor(Math.random() * (c + 1));

  d1.setDate(d1.getDate() + x);

  const y = d1.getFullYear();
  const m = ("00" + (d1.getMonth() + 1)).slice(-2);
  const d = ("00" + d1.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
};

export const getRandomYmdhhmmss = (fromYmd) => {
  const d1 = new Date(fromYmd);
  const d2 = new Date();

  const c = (d2 - d1) / 86400000;
  const x = Math.floor(Math.random() * (c + 1));

  d1.setDate(d1.getDate() + x);

  const y = d1.getFullYear();
  const m = ("00" + (d1.getMonth() + 1)).slice(-2);
  const d = ("00" + d1.getDate()).slice(-2);
  const hh = ("00" + Math.round(Math.random() * 24)).slice(-2);
  const mm = ("00" + Math.round(Math.random() * 60)).slice(-2);
  const ss = ("00" + Math.round(Math.random() * 60)).slice(-2);
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
};
