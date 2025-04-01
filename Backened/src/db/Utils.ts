export const generateRandom = (len: number) => {
    let option = "sjdfghjkghhdfgiouhghfsdj1495488"; // Character pool
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += option[Math.floor(Math.random() * option.length)]; // ✅ Correct range
    }
    return ans;
};
