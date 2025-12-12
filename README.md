# **Sales Flow**

**Sales Flow** é um sistema de gestão de vendas desenvolvido em **Next.js**, com CRUD completo de clientes, produtos e vendas, além de um dashboard mensal com métricas essenciais para acompanhamento do desempenho comercial.

---

## 🚀 Tecnologias Utilizadas

- **Next.js**
- **MySQL**
- **Sequelize**
- **NextAuth**
- **TypeScript**

---

## 📌 Funcionalidades

### 🔹 CRUD Completo
- **Clientes**
- **Produtos**
- **Vendas**
  - Associação de cliente com produto
  - Status da venda: **Completo**, **Pendente**, **Perdido**

### 🔹 Dashboard Mensal
- 📈 Total de vendas no mês  
- 🧍 Novos clientes cadastrados  
- 📦 Quantidade de produtos em estoque  
- 🥧 Distribuição das vendas por status  
- 📊 Gráfico de produtos em estoque  

### Configure o .env

```
DB_HOST=
DB_USER=
DB_PASS=
DB_DATABASE=
NEXTAUTH_SECRET=
```

### Inicie a aplicação

```
npm run dev
```