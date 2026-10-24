# US Health Dashboard

United States health indicators organized by the Triple Aim framework:
Population Health, Experience of Care, and Per Capita Cost. The Next.js app
fetches public World Bank, WHO GHO, and CMS data through `/api/indicators`.

## Local development

Use Node.js 24 (the deployment version is defined in `.node-version`).

```sh
npm ci --include=dev
npm run dev
```

Open <http://localhost:3000>.

## Production

```sh
npm ci --include=dev
npm run build
PORT=10000 npm start
```

The production server binds to `0.0.0.0` and uses the `PORT` environment
variable. Without `PORT`, Next.js defaults to port 3000. The build includes
development dependencies because TypeScript and Tailwind are build tools.
The build downloads Geist fonts from Google through `next/font`.

## Render deployment

[`render.yaml`](render.yaml) defines a Node web service that builds from
`main` and deploys automatically on commits. Deploy the server rather than a
static export: the dashboard needs the `/api/indicators` route at runtime.

1. Open [the Render Blueprint setup](https://dashboard.render.com/select-repo?type=blueprint)
   and connect `JohnW8111/us-health-dashboard` after the migration changes
   have been merged into `main`.
2. Review the service settings from `render.yaml` and create the Blueprint.
   It selects Render's free instance type. Free services can sleep when idle
   and take time to wake; select a paid instance in Render if always-on
   availability is required.
3. Wait for a successful deploy, then check the assigned `onrender.com` URL.
   Confirm `/`, `/about`, the dimension and indicator pages, and
   `/api/health`. Check `/api/indicators?id=life-expectancy` for data, not
   just an HTTP success response.
4. If the Vercel project has a custom domain, add that same domain in the
   Render service's **Settings > Custom Domains**, update DNS using Render's
   displayed instructions, and wait for domain verification and HTTPS.
5. Verify the public domain serves the Render deployment before retiring
   the Vercel deployment. A `vercel.app` address cannot move to Render;
   use the Render address or an owned custom domain instead.

No application API keys, database, or persistent disk are required by the
current code. The 24-hour indicator cache is per process and resets on
restart, sleep, or redeploy. The next request refetches data; upstream
availability still determines which indicators are populated.

`/api/health` checks the application server without contacting upstream
providers, so a provider outage does not trigger repeated service restarts.

References: [Render Next.js deployment](https://render.com/docs/deploy-nextjs-app),
[Render custom domains](https://render.com/docs/custom-domains), and
[Render free services](https://render.com/docs/free).
