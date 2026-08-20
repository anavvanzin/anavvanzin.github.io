// anavanzin.com — mesa com memória mínima.
// /_state é o único endpoint dinâmico; todo o resto vai para os assets estáticos.
//
// Estado por mesa (JSON ≤ 4 KB): { v:1, lang, janelas:[{id,x,y}...] }
// - ids: /^[\w-]{3,40}$/
// - mesas "curada-*" não expiram (você grava via CLI); anônimas expiram em 90 dias.
// - Sem KV configurado, este arquivo simplesmente não roda: configure o binding
//   MESAS no wrangler.jsonc (npx wrangler kv namespace create MESAS) antes do deploy.

const ID_OK = /^[\w-]{3,40}$/;
const MAX_BYTES = 4000;
const TTL_ANONIMA_S = 60 * 60 * 24 * 90; // 90 dias

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname !== '/_state') return env.ASSETS.fetch(req);

    const id = url.searchParams.get('id');
    if (!id || !ID_OK.test(id)) return new Response('bad id', { status: 400 });

    if (req.method === 'PUT') {
      const body = await req.text();
      if (body.length > MAX_BYTES) return new Response('too big', { status: 413 });
      // validação mínima: tem que ser JSON de objeto
      try {
        const parsed = JSON.parse(body);
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          return new Response('bad json', { status: 400 });
        }
      } catch {
        return new Response('bad json', { status: 400 });
      }
      const opts = id.startsWith('curada-') ? {} : { expirationTtl: TTL_ANONIMA_S };
      await env.MESAS.put(id, body, opts);
      return new Response('ok', { headers: { 'cache-control': 'no-store' } });
    }

    if (req.method !== 'GET') return new Response('method not allowed', { status: 405 });

    return new Response((await env.MESAS.get(id)) ?? '{}', {
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
    });
  }
};
