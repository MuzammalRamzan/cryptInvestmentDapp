import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/font/Bw-Gradual/BwGradualDEMO-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/font/Bw-Gradual/BwGradualDEMO-Medium.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/font/Bw-Gradual/BwGradual-Bold.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/font/Bw-Gradual/BwGradualDEMO-Thin.otf"
          as="font"
          crossOrigin=""
        />
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        var im_domain = 'rajsharma';
        var im_project_id = 1;
        (function(e,t){window._improvely=[];var n=e.getElementsByTagName("script")[0];var r=e.createElement("script");r.type="text/javascript";r.src="https://"+im_domain+".iljmp.com/improvely.js";r.async=true;n.parentNode.insertBefore(r,n);if(typeof t.init=="undefined"){t.init=function(e,t){window._improvely.push(["init",e,t])};t.goal=function(e){window._improvely.push(["goal",e])};t.conversion=function(e){window._improvely.push(["conversion",e])};t.label=function(e){window._improvely.push(["label",e])}}window.improvely=t;t.init(im_domain,im_project_id)})(document,window.improvely||[])
      `,
          }}
        ></script> */}
        <script
          defer
          data-domain="ypredict.ai"
          src="https://plausible.io/js/script.tagged-events.js"
        ></script>
        <script
          defer
          data-domain="ypredict.ai"
          src="https://plausible.io/js/script.revenue.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"187026628"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
        `,
          }}
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="/img/dashboard/YPRED.png"
          type="image/x-icon"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-253580036-7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-253580036-7');
              `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-90P0Q649P9"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'G-90P0Q649P9');`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PDHNGK7');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Adroll Script */}

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          adroll_adv_id = "LEJIIZ33LNBX3KFS52AJIA";
          adroll_pix_id = "RFC36FDTHBHCXDG4VVPPDW";
          adroll_version = "2.0";
         
          (function(w, d, e, o, a) {
            w.__adroll_loaded = true;
            w.adroll = w.adroll || [];
            w.adroll.f = [ 'setProperties', 'identify', 'track' ];
            var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id
                + "/roundtrip.js";
            for (a = 0; a < w.adroll.f.length; a++) {
              w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                return function() {
                  w.adroll.push([ n, arguments ])
                }
              })(w.adroll.f[a])
            }
         
            e = d.createElement('script');
            o = d.getElementsByTagName('script')[0];
            e.async = 1;
            e.src = roundtripUrl;
            o.parentNode.insertBefore(e, o);
          })(window, document);
          adroll.track("pageView");
        `,
          }}
        ></script>

        {/* Start of LiveChat (www.livechat.com) code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.__lc = window.__lc || {};
          window.__lc.license = 14849241;
          ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))  
        
        `,
          }}
        ></script>
        <noscript>
          <a href="https://www.livechat.com/chat-with/14849241/" rel="nofollow">
            Chat with us
          </a>
          , powered by{" "}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PDHNGK7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End of live chat */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1293213041624221');
        fbq('track', 'PageView');  
        
        `,
          }}
        ></script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1293213041624221&ev=PageView&noscript=1"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
       (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"187020791"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq"); 
       `,
          }}
        ></script>
        <script
          src="https://my.hellobar.com/ad3f1dee48e8b690826f923220349844b80b3783.js"
          type="text/javascript"
          charSet="utf-8"
          async={true}
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          _linkedin_partner_id = "5652609"; window._linkedin_data_partner_ids =
          window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `,
          }}
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
        `,
          }}
        ></script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=5652609&fmt=gif"
          />
        </noscript>
      </body>
    </Html>
  );
}
