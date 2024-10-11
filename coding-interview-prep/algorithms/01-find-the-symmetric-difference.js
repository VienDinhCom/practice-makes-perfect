function sym(...args) {
  const diff = args.reduce((prev, current) => {
    return [
      ...prev.filter((num) => !current.includes(num)),
      ...current.filter((num) => !prev.includes(num)),
    ];
  }, []);

  return Array.from(new Set(diff));
}

const r = sym([1, 2, 3, 3], [5, 2, 1, 4]);

console.log(r);
