// Poll GitHub for the commit's check runs, commit statuses and deployments until
// the Cloudflare Pages build reaches a terminal state (or timeout).
const REPO = 'SikanderMalik300/hitchmath';
const SHA = process.argv[2];
const API = `https://api.github.com/repos/${REPO}`;
const H = { 'User-Agent': 'hitchmath-deploy-check', Accept: 'application/vnd.github+json' };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  const r = await fetch(API + path, { headers: H });
  if (!r.ok) return { _error: r.status, _rl: r.headers.get('x-ratelimit-remaining') };
  return r.json();
}

const MAX = 24; // ~8 min at 20s
for (let i = 1; i <= MAX; i++) {
  const checks = await get(`/commits/${SHA}/check-runs`);
  const status = await get(`/commits/${SHA}/status`);
  const deps = await get(`/deployments?sha=${SHA}`);

  const runs = (checks.check_runs || []).map((c) => `${c.name}: ${c.status}/${c.conclusion ?? '-'}`);
  const statuses = (status.statuses || []).map((s) => `${s.context}: ${s.state}`);
  let depLine = [];
  if (Array.isArray(deps)) {
    for (const d of deps) {
      const ds = await get(`/deployments/${d.id}/statuses`);
      const latest = Array.isArray(ds) && ds[0];
      depLine.push(`${d.environment}: ${latest ? latest.state : 'no-status'}${latest?.environment_url ? ' ' + latest.environment_url : ''}`);
    }
  }

  console.log(`[poll ${i}] checks=[${runs.join(' | ')}] statuses=[${statuses.join(' | ')}] deploys=[${depLine.join(' | ')}]`);

  const allChecks = checks.check_runs || [];
  // Cloudflare Pages reports its deploy as a GitHub check run (not the Deployments API).
  const cf = allChecks.find((c) => /cloudflare/i.test(c.name));
  const terminalChecks = allChecks.length > 0 && allChecks.every((c) => c.status === 'completed');

  if (terminalChecks && allChecks.length) {
    const greenChecks = allChecks.every((c) => ['success', 'neutral', 'skipped'].includes(c.conclusion));
    console.log('\nRESULT:');
    console.log('  check runs:', allChecks.map((c) => `${c.name}=${c.conclusion}`).join(', '));
    console.log('  cloudflare deploy:', cf ? `${cf.conclusion} (${cf.output?.title ?? ''})` : 'no cloudflare check');
    if (greenChecks && cf && cf.conclusion === 'success') { console.log('  => GREEN + DEPLOY SUCCESS'); process.exit(0); }
    console.log('  => NOT GREEN'); process.exit(2);
  }
  if (checks._error || status._error) console.log('  (api note: rate-remaining', checks._rl ?? status._rl, ')');
  await wait(20000);
}
console.log('\nTIMEOUT: no terminal success observed within the window.');
process.exit(3);
