# TDB Responde

Plataforma de atendimento centralizado desenvolvida para a ONG **Turma do Bem**, unificando WhatsApp, e-mail e redes sociais em um único sistema com gestão de voluntários, triagem de atendimentos e protocolo especial de sigilo.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.0-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.3-cyan?logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-MVP%20em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-Acad%C3%AAmico-green)

---

## 🎥 Pitch — Protótipo de Média Fidelidade

> Demonstração do protótipo/MVP sem banco de dados.

[![Assistir no YouTube](https://img.shields.io/badge/Assistir%20no%20YouTube-%23FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/qgpyiB0mFDw)

---

## Sobre o Projeto

O **TDB Responde** nasceu da necessidade real da ONG Turma do Bem, que recebia atendimentos por múltiplos canais (WhatsApp, e-mail, redes sociais) sem nenhuma centralização ou histórico. Casos urgentes se perdiam, voluntários respondiam em duplicidade e não havia como acompanhar a evolução de cada beneficiário.

Este projeto é um **MVP acadêmico** desenvolvido no curso de Análise e Desenvolvimento de Sistemas da **FIAP**, como Challenge em parceria com a ONG. O objetivo é centralizar, humanizar e organizar o fluxo de atendimento em uma única plataforma.

A plataforma atende dois públicos com regras distintas:

- **Crianças e Adolescentes** — beneficiários do programa de saúde bucal, identificados por código, com dados de escola, responsável e grau de gravidade bucal
- **Programa Apolônia** — mulheres em situação de vulnerabilidade, com protocolo de sigilo absoluto, codinomes e controle de acesso restrito por voluntário

---

## Funcionalidades

### Site Institucional
- Página inicial com contador de visitas e apresentação do projeto
- Página Sobre com desafios, soluções, fluxo de atendimento e roadmap
- FAQ interativo com acordeão de perguntas e respostas
- Formulário de contato com validação via React Hook Form
- Página de integrantes com links para GitHub e LinkedIn
- Roadmap visual com status de cada fase do projeto

### Sistema de Autenticação
- Login com dois perfis: **Voluntário** e **Beneficiário**
- Voluntários cadastrados no sistema têm acesso ao painel administrativo
- Qualquer outro login válido acessa o portal do beneficiário
- Sessão persistida via `localStorage`
- Rotas protegidas com redirecionamento automático

### Painel Administrativo (Voluntário)
- **Dashboard** com métricas em tempo real: total, abertos, em andamento, encerrados
- Alertas visuais de atendimentos com prioridade alta
- Gráficos de atendimentos por canal e por tipo de pessoa
- **Gestão de atendimentos** com filtros por status e busca por nome/canal/voluntário
- **Modal de atendimento** com dados completos do beneficiário, chat integrado, alteração de status com histórico imutável
- **Triagem em 3 passos** para abertura de novos atendimentos
- **Gestão de voluntários** com cadastro manual e controle de disponibilidade e acesso a sigilo
- **Aba de inscrições** para aprovar ou rejeitar candidatos a voluntário (login criado automaticamente ao aprovar)

### Portal do Beneficiário
- Visualização dos próprios atendimentos (filtrado pelo código/codinome de login)
- Chat com o voluntário responsável
- Indicação do voluntário atribuído ao caso
- Link direto para a página de contato

### Captação de Voluntários
- Formulário público em `/quero-ser-voluntario` sem necessidade de login
- Campos: nome, e-mail, telefone, área de atuação, disponibilidade e motivação
- Inscrição gera solicitação pendente no painel do admin
- Admin aprova ou rejeita; aprovação cria o acesso automaticamente

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Biblioteca principal de UI |
| TypeScript | 5.0 | Tipagem estática |
| Vite | 4.0 | Build tool e dev server |
| Tailwind CSS | 3.3 | Estilização utilitária |
| React Router DOM | 6 | Roteamento de páginas |
| React Hook Form | — | Validação de formulários |

---

## Arquitetura

```
src/
├── context/
│   ├── AuthContext.tsx          # AuthProvider — gerencia sessão do usuário
│   ├── authContextInstance.ts   # createContext separado (regra do react-refresh)
│   ├── useAuth.ts               # Hook de autenticação
│   ├── tdbStorage.ts            # load/save do estado no localStorage
│   └── seedData.ts              # Dados iniciais de demonstração
├── types/
│   └── index.ts                 # Interfaces TypeScript (espelham os models Java)
├── components/
│   ├── layout/
│   │   ├── Layout.tsx           # Wrapper com Header + NavBar + Footer
│   │   ├── Header.tsx           # Cabeçalho com logos
│   │   ├── NavBar.tsx           # Navegação com links condicionais por perfil
│   │   └── Footer.tsx           # Rodapé com links sociais
│   └── ui/
│       ├── Button.tsx           # Componente de botão reutilizável
│       ├── FeatureCard.tsx      # Card de funcionalidade com destaque opcional
│       └── ProtectedRoute.tsx   # HOC de proteção de rotas
├── pages/
│   ├── Home.tsx                 # Página inicial com contador de visitas
│   ├── Sobre.tsx                # Sobre o projeto
│   ├── FAQ.tsx                  # Perguntas frequentes
│   ├── Contato.tsx              # Formulário de contato
│   ├── Integrantes.tsx          # Equipe do projeto
│   ├── Roadmap.tsx              # Evolução do projeto
│   ├── Login.tsx                # Página de login (dois perfis)
│   ├── DashboardAdmin.tsx       # Painel completo do voluntário
│   ├── PortalBeneficiario.tsx   # Portal do beneficiário
│   └── CadastroVoluntario.tsx   # Formulário público de inscrição
└── App.tsx                      # Roteamento principal
```

---

## Regra de Negócio

Os tipos e fluxos do frontend foram desenvolvidos para espelhar diretamente os DAOs do backend Java:

| Frontend (TypeScript) | Backend (Java DAO) |
|---|---|
| `Atendimento` | `AtendimentoDAO` |
| `Voluntario` | `VoluntarioDAO` |
| `CriancaAdolescente` | `CriancaAdolescenteDAO` |
| `MulherApolonia` | `MulherApoloniaDAO` |
| `Mensagem` | `MensagemDAO` |
| `HistoricoStatus` | `HistoricoStatusDAO` |
| `SolicitacaoVoluntario` | `VoluntarioDAO` (inserir) |

O histórico de status é **imutável** — apenas inserção, nunca edição ou exclusão, refletindo a regra do `HistoricoStatusDAO` Java.

---

## Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/AlissonMarcoschalenge77/TDB-Responde.git

# Entre na pasta
cd TDB-Responde

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## Credenciais de Demonstração

| Usuário | Senha | Perfil | Acesso a sigilo |
|---|---|---|---|
| `ana.souza` | `123456` | Voluntária — Odontologia | ✅ Sim |
| `carlos.lima` | `123456` | Voluntário — Assistência Social | ❌ Não |
| `beatriz.nunes` | `123456` | Voluntária — Psicologia | ✅ Sim |
| *qualquer outro* | *mín. 4 caracteres* | Beneficiário | — |

Para testar a captação de voluntários, acesse `/quero-ser-voluntario` sem login, preencha o formulário e depois entre como `ana.souza` para ver a inscrição na aba **Inscrições** do painel.

Para resetar todos os dados durante a demonstração, execute no console do navegador:

```javascript
localStorage.removeItem('tdb_sistema_v2');
localStorage.removeItem('tdb_auth_user');
location.reload();
```

---

## Desenvolvedores

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Alisson Kawan | 567598 | 1TDSPS | [AlissonKawan](https://github.com/AlissonKawan) | [LinkedIn](https://www.linkedin.com/in/alisson-kawan-evangelista-silva-5a3355219/) |
| Marcos Vinicius | 567214 | 1TDSPS | [marcos-thebest](https://github.com/marcos-thebest) | [LinkedIn](https://www.linkedin.com/in/marcos-vinicius-de-jesus-almeida/) |

---

## Sobre a ONG

A **Turma do Bem** é uma ONG brasileira que oferece atendimento odontológico gratuito a crianças e adolescentes em situação de vulnerabilidade social, com voluntários profissionais de diversas áreas.

📍 Rua Maurício Francisco Klabin 449, Vila Mariana — São Paulo/SP  
📞 (11) 5084-7276  
🌐 [turmadobem.org.br](https://turmadobem.org.br)

---

*Projeto acadêmico desenvolvido para o Challenge FIAP — sem fins lucrativos.*