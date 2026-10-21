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
  const terminalChecks = allChecks.length > 0 && allChecks.every((c) => c.status === 'completed');
  const combined = status.state; // success | failure | pending | error
  const anyDeploySuccess = depLine.some((l) => l.includes(': success'));
  const anyDeployFail = depLine.some((l) => /: (failure|error|inactive)/.test(l));

  if ((terminalChecks || combined === 'success' || combined === 'failure') && (allChecks.length || statuses.length || depLine.length)) {
    const greenChecks = allChecks.length === 0 || allChecks.every((c) => c.conclusion === 'success' || c.conclusion === 'neutral' || c.conclusion === 'skipped');
    const green = (combined === 'success' || combined === 'pending' && allChecks.length > 0) && greenChecks;
    console.log('\nRESULT:');
    console.log('  combined commit status:', combined);
    console.log('  check runs green:', greenChecks);
    console.log('  cloudflare deploy success:', anyDeploySuccess, anyDeployFail ? '(a failure/inactive seen)' : '');
    if ((greenChecks && anyDeploySuccess) || (combined === 'success' && anyDeploySuccess)) { console.log('  => GREEN + DEPLOY SUCCESS'); process.exit(0); }
    if (combined === 'failure' || anyDeployFail) { console.log('  => NOT GREEN'); process.exit(2); }
  }
  if (checks._error || status._error) console.log('  (api note: rate-remaining', checks._rl ?? status._rl, ')');
  await wait(20000);
}
console.log('\nTIMEOUT: no terminal success observed within the window.');
process.exit(3);
