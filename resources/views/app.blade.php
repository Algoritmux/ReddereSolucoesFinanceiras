<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="description" content="Reddere Soluções Financeiras oferece consultoria de investimentos, planejamento financeiro, previdência, seguros, câmbio e soluções patrimoniais para proteger e multiplicar seu patrimônio." />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Reddere Soluções Financeiras" />
    <meta name="theme-color" content="#0F3241" />
    <link rel="canonical" href="{{ url()->current() }}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Reddere Soluções Financeiras" />
    <meta property="og:title" content="Reddere Soluções Financeiras" />
    <meta property="og:description" content="Soluções financeiras completas para proteger, planejar e multiplicar seu patrimônio com estratégia." />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:image" content="{{ asset('images/logo.png') }}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Reddere Soluções Financeiras" />
    <meta name="twitter:description" content="Consultoria de investimentos, planejamento financeiro, seguros, previdência e câmbio para decisões patrimoniais mais estratégicas." />
    <meta name="twitter:image" content="{{ asset('images/logo.png') }}" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WFR82N8V');</script>
    <!-- End Google Tag Manager -->
    @php
        $structuredData = [
            '@' . 'context' => 'https://schema.org',
            '@' . 'type' => 'FinancialService',
            'name' => 'Reddere Soluções Financeiras',
            'url' => url('/'),
            'logo' => asset('images/logo.png'),
            'description' => 'Soluções financeiras completas para proteger, planejar e multiplicar patrimônio.',
            'areaServed' => 'BR',
            'address' => [
                '@' . 'type' => 'PostalAddress',
                'addressLocality' => 'São Paulo',
                'addressRegion' => 'SP',
                'addressCountry' => 'BR',
            ],
            'contactPoint' => [
                '@' . 'type' => 'ContactPoint',
                'contactType' => 'Atendimento',
                'email' => 'contato@reddere.com.br',
                'telephone' => '+55 11 9000-0000',
                'availableLanguage' => 'Portuguese',
            ],
        ];
    @endphp
    <script type="application/ld+json">{!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="antialiased">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WFR82N8V"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    @inertia
</body>
</html>
