// Number theory functions
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
function divisors(n) {
  const d = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i);
  return d;
}
function totient(n) {
  return Array.from({ length: n }, (_, i) => i + 1)
    .filter(x => gcd(n, x) === 1)
    .length;
}
// Combinatorics
function getCombinations(arr, k) {
  const res = [];
  const comb = (start, picked) => {
    if (picked.length === k) return res.push([...picked]);
    for (let i = start; i < arr.length; i++) {
      picked.push(arr[i]);
      comb(i + 1, picked);
      picked.pop();
    }
  };
  comb(0, []);
  return res;
}
function getPermutations(arr, k) {
  const res = [];
  const permute = (picked, used) => {
    if (picked.length === k) return res.push([...picked]);
    arr.forEach((val, i) => {
      if (!used[i]) {
        used[i] = true;
        picked.push(val);
        permute(picked, used);
        picked.pop();
        used[i] = false;
      }
    });
  };
  permute([], Array(arr.length).fill(false));
  return res;
}

// UI handlers
function showSection(sectionId) {
  ['numberTheory', 'combinatorics'].forEach(id => {
    document.getElementById(id).classList.toggle('hidden', id !== sectionId);
  });
}

function divisibility() {
  const x = parseInt(prompt("Enter dividend:"));
  const y = parseInt(prompt("Enter divisor:"));
  const r = x % y;
  document.getElementById('nt-output').textContent =
    `Remainder = ${r}\n${r === 0 ? "It's divisible!" : "Not divisible."}`;
}
function computeGCD() {
  const a = parseInt(prompt("First number:"));
  const b = parseInt(prompt("Second number:"));
  document.getElementById('nt-output').textContent = `G.C.D = ${gcd(a, b)}`;
}
function computeLCM() {
  const a = parseInt(prompt("First number:"));
  const b = parseInt(prompt("Second number:"));
  document.getElementById('nt-output').textContent = `L.C.M = ${lcm(a, b)}`;
}
function countDivisors() {
  const n = parseInt(prompt("Enter number:"));
  const arr = divisors(n);
  document.getElementById('nt-output').textContent =
    `Count = ${arr.length}\nDivisors: ${arr.join(', ')}`;
}
function sumDivisors() {
  const n = parseInt(prompt("Enter number:"));
  const arr = divisors(n);
  document.getElementById('nt-output').textContent = `Sum = ${arr.reduce((a, b) => a + b, 0)}`;
}
function computeTotient() {
  const n = parseInt(prompt("Enter number:"));
  document.getElementById('nt-output').textContent = `Euler's Totient φ(${n}) = ${totient(n)}`;
}
function primeCheck() {
  const n = parseInt(prompt("Enter number:"));
  document.getElementById('nt-output').textContent =
    isPrime(n) ? "It's a prime number!" : "Not a prime number.";
}

// Combinatorics handlers
function computeCombinations() {
  const elems = document.getElementById('elements').value;
  const k = parseInt(document.getElementById('subsetSize').value);
  const arr = elems.split('');
  const combos = getCombinations(arr, k);
  document.getElementById('combo-output').textContent =
    `Total = ${combos.length}\n[${combos.map(c => c.join('')).join(', ')}]`;
}
function computePermutations() {
  const elems = document.getElementById('elements').value;
  const k = parseInt(document.getElementById('subsetSize').value);
  const arr = elems.split('');
  const perms = getPermutations(arr, k);
  document.getElementById('combo-output').textContent =
    `Total = ${perms.length}\n[${perms.map(c => c.join('')).join(', ')}]`;
}
particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#00faff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00faff",
          opacity: 0.4,
          width: 1
        },
        move: { enable: true, speed: 2, bounce: true }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 100 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
