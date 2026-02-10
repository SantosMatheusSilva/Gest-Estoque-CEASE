# 🏷️ Nome fictício do produto

**StockFlow**  
_Smart Inventory Management for Growing Businesses_

---

# Estrutura geral (Next.js App Router)

src
├─ app/
│  ├─ (marketing)/  Route Groups (Grupos de Rotas)
│  │  ├─ (home)/  Route Groups (Grupos de Rotas)
│  │  │  └─ page.tsx  
│  │  ├─ contacto/
│  │  │  └─ page.tsx
│  │  ├─ faq/
│  │  │  └─ page.tsx
│  │  ├─ funcionalidades/
│  │  │  └─ page.tsx
│  │  └─ sobrenos/
│  │     └─ page.tsx
│  │
│  ├─ layout/
│  │
│  ├─ aplicacao/
│  │  └─ (dashboard)/
│  │     └─ page.tsx
│  │
│  └─ categorias/
│     └─ [id]/
│        └─ detalhes/
│           └─ page.tsx
│
├─ db/ - neon sql
│  ├─ data.ts → queries (SELECT)
│  ├─ definition.ts → tipos
│  └─ index.ts → conexão
│
├─ lib/
│  ├─ actions.ts
│  ├─ data.ts
│  └─ utils.ts
│
├─ ui/
│  ├─ Categorias/
│  │  ├─ CategoryCard.tsx
│  │  ├─ CategoryPageLayout.tsx
│  │  ├─ CreateCategoryForm.tsx
│  │  ├─ CreateSubcategoryForm.tsx
│  │  ├─ DetailPageLayout.tsx
│  │  ├─ EditCategoryForm.tsx
│  │  └─ EditSubcategoryForm.tsx
│  │
│  ├─ Contacto/
│  │  └─ ContactoForm.tsx    
│  │
│  ├─ Faq/
│  │  └─ FaqAccordion.tsx
│  │
│  ├─ Funcionalidades/
│  │  ├─ FeaturesCard.tsx
│  │  ├─ FeaturesGrid.tsx
│  │  └─ FeaturesIntro.tsx
│  │
│  ├─ Produtos/
│  │  ├─ CreateProductForm.tsx
│  │  ├─ DeleteProductButton.tsx
│  │  ├─ EditProductForm.tsx
│  │  ├─ ProductCard.tsx
│  │  ├─ ProductDetailPageLayout.tsx
│  │  └─ ProductPageLayout.tsx
│  │
│  ├─ SobreNos/
│  │  ├─ Imagem.tsx
│  │  ├─ Texto.tsx
│  │  └─ Titulo.tsx
│  │
│  ├─ Usuario/
│  │  ├─ Title.tsx
│  │  ├─ UserDropdown.tsx
│  │  └─ UsuarioForm.tsx
│  │
│  ├─Button.tsx
│  ├─ Footer.tsx
│  ├─ FormSurface.tsx
│  ├─ IconButton.tsx
│  ├─ InputField.tsx
│  ├─ Navbar.tsx
│  ├─ PageLayout.tsx
│  ├─ SelectField.tsx
│  ├─ Sidenav.tsx
│  ├─ Surface.tsx
│  └─ Topbar.tsx


🏠 HOME (/) -> FEITO!
Objetivo
Apresentar o produto, valor principal e direcionar para as outras páginas. - Feito
Estrutura sugerida

Hero Section
Benefícios principais
Resumo de features
Call to Action

Conteúdo
Hero
Gestão de estoque simples, rápida e eficiente
Controle produtos, entradas e saídas em tempo real, tudo num só lugar.
Botões:

Ver funcionalidades
Saber mais

Benefícios

📦 Controle total do inventário
📊 Relatórios claros e objetivos - FEITO EXEMPLO
⚡ Interface rápida e intuitiva
🔐 Dados seguros e centralizados

Preview de features

Monitoramento de estoque em tempo real
Alertas de baixo estoque
Histórico de movimentações
Gestão de múltiplos produtos

CTA
Comece a organizar seu estoque hoje mesmo.

ℹ️ SOBRE (/sobre)
Objetivo
Explicar o propósito do sistema e o problema que resolve.
Estrutura

Missão
Problema
Solução
Público-alvo

Conteúdo
Missão
Ajudar pequenas e médias empresas a terem controle total do seu estoque sem complexidade.

O problema
Muitas empresas ainda controlam estoque com:

Planilhas desatualizadas
Processos manuais
Falta de visibilidade em tempo real

A solução
O StockFlow centraliza todas as informações de estoque num único sistema, reduzindo erros e melhorando decisões.

Para quem é?

Pequenos negócios
Lojas físicas
Armazéns
Startups em crescimento

⚙️ FEATURES (/features) - > FEITO
Objetivo
Detalhar funcionalidades (mesmo que ainda não existam).
Estrutura
Grid de cards reutilizáveis.
Conteúdo (Feature Cards)

Gestão de Produtos

Cadastro de produtos
Categorias e quantidades

Controle de Entradas e Saídas

Registro de movimentações
Histórico completo

Alertas Inteligentes

Notificação de estoque baixo
Prevenção de rupturas

Relatórios

Visão geral do inventário
Dados claros para decisão

Interface Intuitiva

Fácil de usar
Sem curva de aprendizagem

📞 CONTACTOS (/contactos) - > FEITO
Objetivo
Página institucional com formulário (estático).
Estrutura

Texto introdutório
Formulário
Informações de contacto

Conteúdo
Texto
Tem alguma dúvida ou deseja saber mais sobre o StockFlow?
Entre em contacto connosco.

Formulário (sem backend)
Campos:

Nome
Email
Assunto
Mensagem
Botão: Enviar mensagem

Informações

📧 Email: contacto@stockflow.com
📍 Localização: Lisboa, Portugal

❓ FAQ (/faq) -> FEITO - REMOVER ???
Objetivo
Responder dúvidas comuns.
Estrutura
Lista de perguntas expansíveis (FAQItem).
Conteúdo
O que é o StockFlow?
É um sistema de gestão de estoque pensado para empresas que querem simplicidade e eficiência.

Preciso de conhecimento técnico para usar?
Não. O sistema foi desenhado para qualquer utilizador.

Posso acessar de qualquer dispositivo?
Sim, o StockFlow é acessível via navegador.

O sistema é seguro?
Sim. Segurança e integridade dos dados são prioridades.

Este produto é real?
Este projeto foi desenvolvido com fins académicos.

🧩 Componentes reutilizáveis (bons para avaliação)

Hero
Section
FeatureCard
CTA
FAQItem
ContactForm

```

```

Próximos Passos:

Home - corrigir o BUTTON - está redirecionando para páginas inexistentes
Cards - dashboard
CloudFire

Funcionalidades:

Plano Premim e Gratuito

db: tabela planos
    tabela movimentos (formMovimentosEstoque / pageMovimentosEstoque)
    tabela business (id_bussiness, nome_business, id_adm, id_usario)


    Admin:

✅ Gerenciar usuários (CRUD)
✅ Gerenciar produtos (CRUD)
✅ Registrar entrada/saída de estoque
✅ Visualizar perfis e ações de todos os usuários

User:

✅ Gerenciar produtos (CRUD) - pode deletar produtos de qualquer um
✅ Registrar entrada/saída de estoque
✅ Visualizar todos os produtos

Criar Fluxo de Login

dashboard por usuário
adm adiciona convite
business db

Ideia de Negócio




