function getPerms(str) {
  if (str.length === 1) {
    return [str];
  }

  const perms = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainChars = str.slice(0, i) + str.slice(i + 1);
    const remainPerms = getPerms(remainChars);

    for (let remainPerm of remainPerms) {
      perms.push(char + remainPerm);
    }
  }

  return perms;
}

function permAlone(str) {
  const perms = getPerms(str);
  const chars = str.split('');

  const noRepeatPerms = perms.filter((perm) => {
    for (let char of chars) {
      if (perm.includes(char + char)) {
        return false;
      }
    }

    return true;
  });

  return noRepeatPerms.length;
}

const r = permAlone('aab');

console.log(r);
