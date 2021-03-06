
//讓金額加上千分號與錢字號，要去main.ts將這段函式注入

export default function (num) {
    const n = Number(num);
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
      return currency;
    })}`;
  }