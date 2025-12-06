// middleware.ts

import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Lista de rotas de API que DEVEM SER PROTEGIDAS
const protectedApiRoutes = [
    '/api/client',
    '/api/dashboard',
    '/api/product',
    '/api/sale',
];

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const pathname = request.nextUrl.pathname;
        const token = request.nextauth.token;
        console.log('Caminho:', pathname, 'Token:', !!token);

        // --- 1. Autorização (Verificação de Role) ---
        if (pathname.startsWith('/dashboard/admin') && token?.role !== 'admin') {
            return NextResponse.rewrite(new URL('/denied', request.url));
        }

        // --- 2. Redirecionamento para Logado (Acesso Invertido) ---
        // Se o usuário estiver autenticado e tentar acessar a página raiz (que é o login)
        if (pathname === '/' && token) {
            // Redireciona para a página principal do sistema (ex: /home ou /dashboard)
            return NextResponse.redirect(new URL('/home', request.url));
        }

        // --- 3. Proteção Manual para APIs (Se o matcher falhar) ---
        // Se a rota da API estiver na lista e não houver token, retorne 401.
        // Isso é uma segurança extra, já que o matcher deveria pegar essas rotas.
        if (protectedApiRoutes.some(route => pathname.startsWith(route)) && !token) {
             // Retorna 401 (Unauthorized) para rotas de API
             return new NextResponse("Unauthorized", { status: 401 });
        }
        
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname;
                
                // 1. Autoriza o acesso à página de login (a raiz /)
                if (pathname === '/') {
                    return true;
                }
                
                // 2. Para todas as outras rotas (que estão no matcher), exige token.
                return !!token;
            },
        },
        // Configura que, se o usuário não estiver logado, o NextAuth deve enviá-lo para a rota raiz.
        pages: {
            signIn: '/', 
        },
    }
);

// 🎯 Defina quais rotas o Middleware deve processar.
export const config = {
    matcher: [
        // Inclui /home e todas as APIs protegidas
        '/home',
        '/api/client/:path*',
        '/api/dashboard/:path*',
        '/api/product/:path*',
        '/api/sale/:path*',
        // O matcher agora protege a rota /home.
        // O restante das rotas (como /) é excluído para ser tratado pelo 'authorized'
        // e pelo fluxo 'if (pathname === '/' && token)'
        '/((?!api|_next/static|_next/image|favicon.ico|/).*)',
    ],
};